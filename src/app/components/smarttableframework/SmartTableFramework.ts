import { Component, OnInit,Injector,Input } from '@angular/core';
import {SmartTableFrameworkService} from "./SmartTableFramework-service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {CustomFilterRow} from './CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService,DialogComponent} from "ng2-bootstrap-modal";
import { AgGridModule } from "ag-grid-angular/main";
import { GridOptions } from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface ConfirmModel {
    title: string;
    message: string;
    editI797:boolean;
    getI797:boolean;
    i797:Object;
    approvedOn:string;
    validFrom:string;
    validTill:string;
    receiptDate:string;
    beforeEdit:Object;
}

@Component({
  selector: 'smart-table',
  templateUrl: './SmartTableFramework.html',
 
})
export class SmartTableFramework  {
    @Input('settings')sample: Object;
   
    constructor(){
       console.log(this.sample);
    }
}

