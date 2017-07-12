import { Component, OnInit, Injector, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
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
    /*
    * following options are available in IH smart table
    *    - columnsettings : columnsettings
    *
    */

    @Input() settings: Object = {};
    @Input() data: Object = {};
    @Input() pagination:boolean;
    @Input() paginationPageSize:number;
    @Input() headerNumber:number;
    @Input() customFilter:boolean;
    @Input() paginationRandomPage:boolean;
    @Input() rowSelection;
    @Input() addButton:boolean;
    @Output()  addButtonClicked = new EventEmitter();
    public gridOptions;
    public pagniationDynamicEnable:boolean;
    public static sendCustomFilterValue = new Subject<boolean>();
    constructor(){
       console.log('constructor %o', this.settings);
       this.gridOptions = <GridOptions>{};
       //this.gridOptions.pagination=this.pagination;
       //this.gridOptions.paginationPageSize=this.paginationPageSize;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
      console.log('ngOnChanges %o',this.settings);
      if (changes['settings']) {
          console.log('Settings Changed');
          this.gridOptions.headerHeight=this.headerNumber;
          this.gridOptions.pagination=this.pagination;
          this.gridOptions.paginationPageSize=this.paginationPageSize;
          this.gridOptions.rowSelection='single';
          this.gridOptions.onSelectionChanged=this.onSelectionChanged;
          SmartTableFramework.sendCustomFilterValue.next(this.customFilter);
          this.gridOptions['columnDefs'] = this.settings['columnsettings'];
          //this.gridOptions.api.refreshView();
          this.pagniationDynamicEnable=this.paginationRandomPage;
        
      }
      if(changes['data']){
        console.log('Data changed');
        this.gridOptions.api.setRowData(this.data);
        this.gridOptions.api.sizeColumnsToFit();
        
      }
    
    }
    onPageSizeChanged(newPageSize) {
        this.gridOptions.api.paginationSetPageSize(Number(newPageSize));
    } 
    onSelectionChanged(){
        if(this.gridOptions){
            let x=this.gridOptions.api.getSelectedRows();
        }
        /*let selectedRows=this.gridOptions.api.getSelectedRows();*/
        
    }
    addRecord(){
        this.addButtonClicked.emit(this.addButton);
    }
    
}

