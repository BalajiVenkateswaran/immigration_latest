import { Component, OnInit, Input, Renderer, ElementRef, ViewChild } from '@angular/core';
import { SmartTableI797HistoryService } from "./smarttable-i-797-history.service";
import { ActionColumns } from '../../components/smarttableframework/ActionColumns';
import { i797history } from "../../models/i797history";
import { FormGroup, FormControl } from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import { CustomFilterRow } from '../smarttableframework/CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { SmartTableFramework } from '../smarttableframework/SmartTableFramework';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
export interface ConfirmModel {
    title: string;
    message: string;
    getI797History: boolean;
    addI797: boolean;
    receiptDate: string;
    approvedOn: string;
    validFrom: string;
    validTill: string;
    addNewI797: Object;

}
@Component({
    selector: 'app-i-797-history',
    templateUrl: './smarttable-i-797-history.component.html',

})
export class SmartTableImmigrationViewI797HistoryComponent extends DialogComponent<ConfirmModel, boolean> {

    public settings;
    /*   public data: any = {
                                   "i797HistoryId": "2c9fc60d5caecc99015caf9e07090000",
                                   "clientId": "2c9fc60d5c7e1f31015c9adda135003a",
                                   "receiptNumber": "1234777773423",
                                   "receiptDate": "06-28-2017",
                                   "status": "H1B",
                                   "approvedOn": "06-28-2017",
                                   "validFrom": "06-28-2017",
                                   "validTill": "06-28-2017"
                               };*/
    public data: any;
    public addI797: boolean = false;
    public addNewI797: any = {};
    public getI797History: boolean = true;
    public editi797Flag: boolean = true;
    public beforei797Edit: any;
    public deleteData;
    public deleteBoolean = false;
    public delmessage: string;
    public message;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private smartTableI797HistoryService: SmartTableI797HistoryService, public appService: AppService, public dialogService: DialogService, private renderer: Renderer) {
        super(dialogService);
        this.getI797historys();
        this.settings = {
            'columnsettings': [

                {
                    headerName: "Approved on",
                    field: "approvedOn",
                    width: 100
                },
                {

                    headerName: "Receipt Number",
                    field: "receiptNumber",
                },
                {

                    headerName: "Status",
                    field: "status",
                    width:100
                },
                {

                    headerName: "Valid From",
                    field: "validFrom",
                    width: 100
                },
                {

                    headerName: "Valid Till",
                    field: "validTill",
                    width: 100
                },
                {

                    headerName: "Receipt Date",
                    field: "receiptDate",
                    width: 100
                }
            ]
        }
    }

    getI797historys() {
        this.smartTableI797HistoryService.getI797Details(this.appService.clientId).subscribe((res) => {
            this.data = res['i797HistoryList'];
        });
    }

    addFunction(addDiv) {

         this.dialogService.addDialog(SmartTableImmigrationViewI797HistoryComponent, {
           addI797: true,
           getI797History: false,
           title: 'Add I-797 History',
       }).subscribe((isConfirmed) => {
           if (isConfirmed) {
           
               this.smartTableI797HistoryService.saveI797Details(this.appService.addNewI797).subscribe((res) => {
                   if (res['statusCode'] == 'SUCCESS') {
       this.getI797historys();

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
    editRecord(event) {
        this.editi797Flag = true;
       if (this.editi797Flag) {
           this.beforei797Edit = (<any>Object).assign({}, event.data);
       }
       this.dialogService.addDialog(SmartTableImmigrationViewI797HistoryComponent, {
           addI797: true,
           getI797History: false,
           title: 'Edit I-797 History',
           addNewI797: this.editi797Flag ? this.beforei797Edit : this.addNewI797,
           receiptDate: event.data.receiptDate,
           approvedOn: event.data.approvedOn,
           validFrom: event.data.validFrom,
           validTill: event.data.validTill
       }).subscribe((isConfirmed) => {
           if (isConfirmed) {
              
             this.smartTableI797HistoryService.saveI797Details(this.appService.addNewI797).subscribe((res) => {
                 if (res['statusCode'] == 'SUCCESS') {
                 
       this.getI797historys();

                   }
               });
           }
       });
    }
    deleteRecord(data) {
        
        this.delmessage = data.data.receiptNumber
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.smartTableI797HistoryService.removeI797Details(data.data['i797HistoryId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            this.getI797historys();

                            //immViewi797.confirm.resolve();
                        }

                    });
                }
                this.deleteBoolean = false;
            });

    }



}
