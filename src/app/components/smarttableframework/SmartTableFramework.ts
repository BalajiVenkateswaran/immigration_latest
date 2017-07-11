import { Component, OnInit,Injector,Input, SimpleChange, OnChanges } from '@angular/core';
import {SmartTableFrameworkService} from "./SmartTableFramework-service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
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
export class SmartTableFramework implements OnChanges {
    @Input() settings: Object = {};
    @Input() data: Object = {};
    public gridOptions;
    constructor(){
       console.log('constructor %o', this.settings);
       this.gridOptions = <GridOptions>{};
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
      console.log('ngOnChanges %o',this.settings);
      if (changes['settings']) {
          console.log('Settings Changed');
          this.gridOptions['columnDefs'] = this.settings['columnsettings'];
          this.gridOptions.api.refreshView();
      }
      if(changes['data']){
        console.log('Data changed');
        this.gridOptions.api.setRowData(this.data);
        this.gridOptions.api.sizeColumnsToFit();
      }
    }
}

