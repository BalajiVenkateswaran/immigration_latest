import { AppService } from '../../../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import {ImmigrationViewI797HistoryService} from './i-797-history.service';
import {FormGroup, FormControl} from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {IHDateUtil} from '../../../../framework/utils/date.component';

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
  styleUrls: ['./i-797-history.component.sass'],
  providers: [ImmigrationViewI797HistoryService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ImmigrationViewI797HistoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public settings;
    public data;
    private delmessage;
    public addI797History: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public getI797History = true;
    public addI797His: boolean;
    public addNewI797: any = {};
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    public editi797Flag = true;
    public saveButtonProgress = false;
    public beforei797Edit: any;
    constructor(private immigrationViewI797HistoryService: ImmigrationViewI797HistoryService, public appService: AppService, public dialogService: DialogService,
                public dialog: MatDialog, public headerService: HeaderService) {
        super(dialogService);
        this.settings = {
            'columnsettings': [
                {
                    headerName: 'Receipt Number',
                    field: 'receiptNumber'
                },
                {
                    headerName: 'Status',
                    field: 'status'
                },
                {
                    headerName: 'Receipt Date',
                    field: 'receiptDate'
                },
                {
                    headerName: 'Approved on',
                    field: 'approvedOn'
                },
                {
                    headerName: 'Valid From',
                    field: 'validFrom'
                },
                {
                    headerName: 'Valid Till',
                    field: 'validTill'
                }
            ]
        };
    }

    get1797history() {
      this.immigrationViewI797HistoryService.getI797Details(this.appService.clientId)
          .subscribe((res) => {
              this.data = res['i797HistoryList'];
          });
    }
    ngOnInit() {
       this.get1797history();
    }
   highlightSBLink(link) {
       this.appService.currentSBLink = link;
   }
  addNewI797History(event) {
       this.dialogService.addDialog(ImmigrationViewI797HistoryComponent, {
           addI797His: true,
           getI797History: false,
           title: 'Add I-797 History',
       }).subscribe((isConfirmed) => {
           if (isConfirmed) {
               this.immigrationViewI797HistoryService.saveI797Details(this.appService.addNewI797, this.headerService.user.userId).subscribe((res) => {
                   if (res['statusCode'] === 'SUCCESS') {
                      this.get1797history();
                   }
               });
           }
       });
   }
   I797HistorySave() {
       this.addNewI797['clientId'] = this.appService.clientId;
       
    this.saveButtonProgress = true;
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

             this.immigrationViewI797HistoryService.saveI797Details(this.appService.addNewI797, this.headerService.user.userId).subscribe((res) => {
                 if (res['statusCode'] === 'SUCCESS') {

       this.get1797history();

                   }
               });
           }
       });
   }
   deleteRecord(immViewi797) {
       this.delmessage = immViewi797.data.receiptNumber
       this.dialog.open(ConfirmationDialogComponent, {
           data: {
             message: 'Are you sure you want to Delete ' + this.delmessage + '?'
           }
       }).afterClosed().subscribe((isConfirmed) => {
             // Get dialog result
             if (isConfirmed) {
                 this.immigrationViewI797HistoryService.removeI797Details(immViewi797.data['i797HistoryId']).subscribe((res) => {
                     this.message = res['statusCode'];
                     if (this.message === 'SUCCESS') {
                         this.get1797history();
                     }
                 });
             }
         });
   }
}
