import { Component, OnInit,Input} from '@angular/core';
//import {ImmigrationViewI797HistoryService} from "./i-797-history.service";
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
   constructor(){
       this.settings=[
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
                width: 100,
               
            },
            {
               
                headerName: "Receipt Date",
                field: "receiptDate",
                width: 100,
               
            },
       ]
   }
}
