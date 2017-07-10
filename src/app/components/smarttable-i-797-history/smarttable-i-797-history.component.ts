import { Component, OnInit,Input} from '@angular/core';
import {SmartTableI797HistoryService} from "./smarttable-i-797-history.service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {SmartTableFramework} from '../smarttableframework/SmartTableFramework';
@Component({
  selector: 'app-i-797-history',
  templateUrl: './smarttable-i-797-history.component.html',

})
export class SmartTableImmigrationViewI797HistoryComponent   {
    public settings;
    public data: any = {
                        		"i797HistoryId": "2c9fc60d5caecc99015caf9e07090000",
                        		"clientId": "2c9fc60d5c7e1f31015c9adda135003a",
                        		"receiptNumber": "1234777773423",
                        		"receiptDate": "06-28-2017",
                        		"status": "H1B",
                        		"approvedOn": "06-28-2017",
                        		"validFrom": "06-28-2017",
                        		"validTill": "06-28-2017"
                        	};
   constructor(private smartTableI797HistoryService: SmartTableI797HistoryService, public appService: AppService){
       this.settings={
       'columnsettings': [
            {
                headerName: "Approved on",
                field: "approvedOn",
                width: 100,
            },
            {
                headerName: "Receipt Number",
                field: "receiptNumber",
                width: 100,
            },
            {
                headerName: "Status",
                field: "status",
                width: 100,
            },
            {
                headerName: "Valid From",
                field: "validFrom",
                width: 100,
            },
            {
                headerName: "Valid Till",
                field: "validTill",
                width: 100
            },
            {
                headerName: "Receipt Date",
                field: "receiptDate",
                width: 100,
            }
       ]
       }
       this.smartTableI797HistoryService.getI797Details(this.appService.clientId).subscribe((res) => {
          this.data = res['i797HistoryList'];
       });
   }
}
