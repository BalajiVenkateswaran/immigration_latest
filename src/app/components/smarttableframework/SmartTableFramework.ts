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
import {ActionColumns} from './ActionColumns';
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
    @Input() swapping:boolean;
    @Input() actionsColumn:boolean;
    @Output() addButtonClicked = new EventEmitter();
    @Output() rowClick=new EventEmitter();
    @Output() deleteClicked=new EventEmitter();
    public gridOptions;
    public pagniationDynamicEnable:boolean;
    public rowClickDone:boolean=false;
    public editableData:any;
    public clickFlag:boolean=false;
    public subscription;
    public deleteData;
    public static sendCustomFilterValue = new Subject<boolean>();
    constructor(){
       console.log('constructor %o', this.settings);
       this.gridOptions = <GridOptions>{};
       if(this.rowClickDone){
           console.log("rowClicked");
       }
       this.subscription=ActionColumns.sendDeleteData.subscribe(res=>{
           if(res!=undefined){
               this.deleteData=res;
               this.deleteClicked.emit(this.deleteData);
           }
       })
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
      console.log('ngOnChanges %o',this.settings);
      if (changes['settings']) {
          this.addButton=this.settings['addButton'];
          console.log('Settings Changed');
          this.gridOptions.headerHeight=this.settings['headerNumber'];
          this.gridOptions.pagination=this.settings['pagination'];
          this.gridOptions.paginationPageSize=this.settings['paginationPageSize'];
          this.gridOptions.rowSelection=this.settings['rowSelection'];
          this.pagniationDynamicEnable=this.settings['paginationRandomPage'];
          this.gridOptions.suppressMovableColumns=this.settings['swapping'];
          this.gridOptions.onSelectionChanged=this.onSelectionChanged;
          this.gridOptions.suppressRowClickSelection=true;
          //SmartTableFramework.sendCustomFilterValue.next(this.customFilter);
          this.gridOptions['columnDefs'] = this.settings['columnsettings'];
          //this.gridOptions.api.refreshView();
         
        
      }
      
      if(changes['data']){
        console.log('Data changed');
        if(this.data!=undefined){
            this.gridOptions.api.setRowData(this.data);
            this.gridOptions.api.sizeColumnsToFit();
            this.gridOptions.columnApi.setColumnVisible('actions',this.settings['actionsColumn']);
        }
      }
    }
    onPageSizeChanged(newPageSize) {
        this.gridOptions.api.paginationSetPageSize(Number(newPageSize));
    } 
    onSelectionChanged(){
        let selectedRows=this['api'].getSelectedRows();      
    }
    addRecord(){
        this.addButtonClicked.emit(this.addButton);
    }
    onRowClicked(data){
        this.clickFlag=true;
        this.rowClick.emit({'data':data,'flag':this.clickFlag});
    }
    /*onDelete(data){
        this.clickFlag=false;
        this.deleteClick.emit({'data':data,'flag':this.clickFlag});
    }*/
    deleing(event){
        console.log(event);
    }
    
}

