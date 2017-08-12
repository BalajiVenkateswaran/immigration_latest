import { AppService } from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../confirmbox/confirm.component';
import { Component, OnInit } from '@angular/core';
import {ImmigrationViewI797HistoryService} from "./i-797-history.service";
import {FormGroup, FormControl} from "@angular/forms";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface ConfirmModel {
    title: string;
    message: string;
    getI797History: boolean;
    addI797His: boolean;
    receiptDate: string;
    approvedOn: string;
    validFrom: string;
    validTill: string;
    addNewI797: Object;
}
@Component({
  selector: 'app-i-797-history',
  templateUrl: './i-797-history.component.html',
  styleUrls: ['./i-797-history.component.sass']
})
export class ImmigrationViewI797HistoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public settings;
    public data;
    private delmessage;
    public addI797History: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public getI797History: boolean = true;
    public addI797His: boolean;
    public addNewI797: any = {};
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public editi797Flag: boolean = true;
    public beforei797Edit: any;
    constructor(private immigrationViewI797HistoryService: ImmigrationViewI797HistoryService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        this.settings={
            'columnsettings': [
                {

                    headerName: "Receipt Number",
                    field: "receiptNumber",
                },
                {

                    headerName: "Status",
                    field: "status",
                },
                {

                    headerName: "Receipt Date",
                    field: "receiptDate"
                },
                {
                    headerName: "Approved on",
                    field: "approvedOn"
                },
                {

                    headerName: "Valid From",
                    field: "validFrom"
                },
                {

                    headerName: "Valid Till",
                    field: "validTill"
                },
                
            ]
        }

        
    }
   
    get1797history() {
        this.immigrationViewI797HistoryService.getI797Details(this.appService.clientId)
            .subscribe((res) => {
                this.data=res['i797HistoryList'];
               
            });

    }
   ngOnInit() {
       this.get1797history();
    }
   highlightSBLink(link) {
       this.appService.currentSBLink = link;

   }
   addFunction() {
       this.dialogService.addDialog(ImmigrationViewI797HistoryComponent, {
           addI797His: true,
           getI797History: false,
           title: 'Add I-797 History',
       }).subscribe((isConfirmed) => {
           if (isConfirmed) {
               this.immigrationViewI797HistoryService.saveI797Details(this.appService.addNewI797).subscribe((res) => {
                   if (res['statusCode'] == 'SUCCESS') {
       this.get1797history();

                   }
               });
           }
       });
   }
   I797HistorySave() {
       this.addNewI797['clientId'] = this.appService.clientId;


       if (this.addNewI797['approvedOn'] && this.addNewI797['approvedOn']['formatted']) {
           this.addNewI797['approvedOn'] = this.addNewI797['approvedOn']['formatted'];
       }
       if (this.addNewI797['receiptDate'] && this.addNewI797['receiptDate']['formatted']) {
           this.addNewI797['receiptDate'] = this.addNewI797['receiptDate']['formatted'];
       }
       if (this.addNewI797['validFrom'] && this.addNewI797['validFrom']['formatted']) {
           this.addNewI797['validFrom'] = this.addNewI797['validFrom']['formatted'];
       }
       if (this.addNewI797['validTill'] && this.addNewI797['validTill']['formatted']) {
           this.addNewI797['validTill'] = this.addNewI797['validTill']['formatted'];
       }
       this.appService.addNewI797 = this.addNewI797;
       this.result = true;
       this.close();
   }
   cancel() {
       this.result = false;
       this.close();
   }
   editRecord(event): void {
       this.editi797Flag = true;
       if (this.editi797Flag) {
           this.beforei797Edit = (<any>Object).assign({}, event.data);
       }
       this.dialogService.addDialog(ImmigrationViewI797HistoryComponent, {
           addI797His: true,
           getI797History: false,
           title: 'Edit I-797 History',
           addNewI797: this.editi797Flag ? this.beforei797Edit : this.addNewI797,
           receiptDate: event.data.receiptDate,
           approvedOn: event.data.approvedOn,
           validFrom: event.data.validFrom,
           validTill: event.data.validTill
       }).subscribe((isConfirmed) => {
           if (isConfirmed) {
              
             this.immigrationViewI797HistoryService.saveI797Details(this.appService.addNewI797).subscribe((res) => {
                 if (res['statusCode'] == 'SUCCESS') {
                 
       this.get1797history();

                   }
               });
           }
       });
  
   }
   deleteRecord(immViewi797) {
       this.delmessage = immViewi797.data.receiptNumber
       this.dialogService.addDialog(ConfirmComponent, {
           title: 'Confirmation',
           message: 'Are you sure you want to Delete ' +this.delmessage+'?'
       })
           .subscribe((isConfirmed) => {
               //Get dialog result
               if (isConfirmed) {
                   this.immigrationViewI797HistoryService.removeI797Details(immViewi797.data['i797HistoryId']).subscribe((res) => {
                       this.message = res['statusCode'];
                       if (this.message == 'SUCCESS') {
                           this.get1797history();
                           
                       }
                          
                   });
               }
           });
   }
}
