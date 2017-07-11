import { Component, OnInit, Input } from '@angular/core';
import { SmartTableI797HistoryService } from "./smarttable-i-797-history.service";
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
    public subscription;
    public filterValues: any;
    public filteredData;
    public filterKeys = [];
    public filterWholeArray = [];
    public addI797: boolean=false;
    public addNewI797: any = {};
    public getI797History: boolean = true;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private smartTableI797HistoryService: SmartTableI797HistoryService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        this.getI797historys();
        this.settings = {
            'columnsettings': [
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Approved on",
                    field: "approvedOn",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Receipt Number",
                    field: "receiptNumber",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Status",
                    field: "status",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Valid From",
                    field: "validFrom",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Valid Till",
                    field: "validTill",
                    width: 100
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Receipt Date",
                    field: "receiptDate",
                    width: 100,
                }
            ]
        }


        this.subscription = CustomFilterRow.fillValues.subscribe(res => {
            if (res) {
                this.filterValues = res;
                for (let i = 0; i < this.filterValues.length; i++) {
                    if (this.filterWholeArray.indexOf(this.filterValues[i]) == -1) {
                        this.filterWholeArray.push(this.filterValues[i]);
                        this.filterKeys.push(this.filterValues[i]['filterValue']);
                        this.filterValues.splice(i, 1);
                    }
                }

            }
        });
    }
    
    getI797historys() {
        this.smartTableI797HistoryService.getI797Details(this.appService.clientId).subscribe((res) => {
            this.data = res['i797HistoryList'];
        });
    }
    delete(index, x) {
        this.filterWholeArray.splice(index, 1);
    }
    addFunction(addDiv) {
        
        this.dialogService.addDialog(SmartTableImmigrationViewI797HistoryComponent, {
            addI797: addDiv,
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
}
