import { Component, OnInit, Injector, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
import { SmartTableFrameworkService } from "./SmartTableFramework-service";
import { i797history } from "../../models/i797history";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomFilterRow } from './CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { AgGridModule } from "ag-grid-angular/main";
import { GridOptions } from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { ActionColumns } from './ActionColumns';
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
    @Output() onAddClick = new EventEmitter();
    @Output() onRowClick = new EventEmitter();
    @Output() onDeleteClick = new EventEmitter();
    public gridOptions;
    public paginationTemplate: boolean;
    public rowClickDone: boolean = false;
    public editableData: any;
    public clickFlag: boolean = false;
    public filterSubscription;
    public deleteSubscription;
    public deleteData;
    public filterValues: any;
    public filteredData;
    public filterKeys = [];
    public filterWholeArray = [];
    public isAddButtonEnable: boolean;
    public static sendCustomFilterValue = new Subject<boolean>();
    constructor() {
        console.log('constructor %o', this.settings);
        this.gridOptions = <GridOptions>{};
        this.deleteSubscription = ActionColumns.sendDeleteData.subscribe(res => {
            if (res != undefined) {
                this.deleteData = res;
                this.onDeleteClick.emit(this.deleteData);
            }
        })
        this.filterSubscription = CustomFilterRow.fillValues.subscribe(res => {
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

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        console.log('ngOnChanges %o', this.settings);
        if (changes['settings']) {
            this.prepareSettings();
        }
        if (changes['data']) {
            console.log('Data changed');
            if (this.data != undefined) {
                this.gridOptions.api.setRowData(this.data);
                this.gridOptions.api.sizeColumnsToFit();
            }
        }
    }
    delete(index, x) {
        this.filterWholeArray.splice(index, 1);
    }
    onPageSizeChanged(newPageSize) {
        this.gridOptions.api.paginationSetPageSize(Number(newPageSize));
    }
    onSelectionChanged() {
        let selectedRows = this['api'].getSelectedRows();
    }
    addRecord() {
        this.onAddClick.emit(this.isAddButtonEnable);
    }
    onRowClicked(data) {
        this.clickFlag = true;
        this.onRowClick.emit({ 'data': data, 'flag': this.clickFlag });
    }
    prepareSettings() {
        //default setting for framework
        if (this.settings.hasOwnProperty('pagination')) {
            this.gridOptions['pagination'] = this.settings['pagination'];
            if (this.gridOptions['pagination'] == true) {
                this.paginationTemplate = true;
            }
        }
        else {
            this.gridOptions.pagination = true;
            this.paginationTemplate = true;
        }
        if (this.settings.hasOwnProperty('paginationPageSize')) {
            this.gridOptions['paginationPageSize'] = this.settings['paginationPageSize'];
        }
        else {
            this.gridOptions.paginationPageSize = 10;
        }
        if (this.settings.hasOwnProperty('headerHeight')) {
            this.gridOptions['headerHeight'] = this.settings['headerHeight'];
        }
        else {
            this.gridOptions.headerHeight = 35;
        }
        if (this.settings.hasOwnProperty('suppressMovableColumns')) {
            this.gridOptions['suppressMovableColumns'] = this.settings['suppressMovableColumns'];
        }
        else {
            this.gridOptions.suppressMovableColumns = true;
        }
        if (this.settings.hasOwnProperty('isDeleteEnable')) {
            this.gridOptions['isDeleteEnable'] = this.settings['isDeleteEnable'];
        }
        else {
            this.gridOptions.isDeleteEnable = true;
            this.settings['columnsettings'].unshift({
                headerName: "Actions",
                cellRendererFramework: ActionColumns,

            });
        }
        if (this.settings.hasOwnProperty('columnFilter')) {
            this.settings['columnFilter'] = this.settings['columnFilter'];
            if (this.settings['columnFilter'] == true) {
                this.gridOptions['headerHeight']=60;
                for (var i = 0; i < this.settings['columnsettings'].length; i++) {
                    if (i > 0) {
                        this.settings['columnsettings'][i]['headerComponentFramework'] = CustomFilterRow;
                    }

                }
            }
            else{
                this.gridOptions['headerHeight']=35;
            }
        }
        else {
            this.settings['columnFilter'] = false;
            this.settings['headerHeight']=35;
        }
        if (this.settings.hasOwnProperty('isisAddButtonEnableEnable')) {
            this.isAddButtonEnable = this.settings['isAddButtonEnable'];
        }
        else {
            this.isAddButtonEnable = true;
        }
        this.gridOptions.domLayout = 'autoHeight';
  
        if (this.settings.hasOwnProperty('rowHeight')) {
            this.gridOptions['rowHeight'] = this.settings['rowHeight'];
        }
        else {
            this.gridOptions['rowHeight'] = 35;
        }
        this.gridOptions['columnDefs'] = this.settings['columnsettings'];

    }
    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }

}

