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
    @Input() pagination: boolean;
    @Input() paginationPageSize: number;
    @Input() headerHeight: number;
    @Input() headerHeightwithFilters: number;
    @Input() customFilter: boolean;
    @Input() paginationRandomPage: boolean;
    @Input() rowSelection;
    @Input() addButton: boolean;
    @Input() swapping: boolean;
    @Input() actionsColumn: boolean;
    @Output() addButtonClicked = new EventEmitter();
    @Output() rowClick = new EventEmitter();
    @Output() deleteClicked = new EventEmitter();
    public gridOptions;
    public pagniationDynamicEnable: boolean;
    public rowClickDone: boolean = false;
    public editableData: any;
    public clickFlag: boolean = false;
    public subscription;
    public deleteData;
    public filterValues: any;
    public filteredData;
    public filterKeys = [];
    public filterWholeArray = [];
    public static sendCustomFilterValue = new Subject<boolean>();
    constructor() {
        console.log('constructor %o', this.settings);
        this.gridOptions = <GridOptions>{};
        this.subscription = ActionColumns.sendDeleteData.subscribe(res => {
            if (res != undefined) {
                this.deleteData = res;
                this.deleteClicked.emit(this.deleteData);
            }
        })
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

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        console.log('ngOnChanges %o', this.settings);
        if (changes['settings']) {
            this.addButton = this.settings['addButton'];
            console.log('Settings Changed');
            this.gridOptions.headerHeight = this.settings['headerHeight'];
            this.gridOptions.rowHeight = 35;
            this.gridOptions.domLayout = 'autoHeight'
            this.gridOptions.pagination = this.settings['pagination'];
            this.gridOptions.paginationPageSize = this.settings['paginationPageSize'];
            this.gridOptions.rowSelection = this.settings['rowSelection'];
            this.pagniationDynamicEnable = this.settings['paginationRandomPage'];
            this.gridOptions.suppressMovableColumns = this.settings['swapping'];
            this.gridOptions.onSelectionChanged = this.onSelectionChanged;
            this.gridOptions.suppressRowClickSelection = true;
            this.gridOptions['columnDefs'] = this.settings['columnsettings'];
            //this.gridOptions.api.refreshView();
            if (this.settings['actionsColumn'] == true || this.settings['customFilter'] == true) {
                this.prepareSettings(this.gridOptions);
            }
            if (this.settings['customFilter'] == true) {
                this.gridOptions.headerHeight = this.settings['headerHeightwithFilters'];
            }


        }

        if (changes['data']) {
            console.log('Data changed');
            if (this.data != undefined) {
                this.gridOptions.api.setRowData(this.data);
                this.gridOptions.api.sizeColumnsToFit();
                //this.gridOptions.columnApi.setColumnVisible('actions',this.settings['actionsColumn']);
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
        this.addButtonClicked.emit(this.addButton);
    }
    onRowClicked(data) {
        this.clickFlag = true;
        this.rowClick.emit({ 'data': data, 'flag': this.clickFlag });
    }
    prepareSettings(gridOptions) {
        console.log(gridOptions);
        if (this.settings['actionsColumn'] == true) {
            gridOptions.columnDefs.unshift({
                headerName: "Actions",
                cellRendererFramework: ActionColumns,
                width: 100
            });
        }
        if (this.settings['customFilter'] == true) {
            for (var i = 0; i < gridOptions.columnDefs.length; i++) {
                if (i > 0) {
                    gridOptions.columnDefs[i]['headerComponentFramework'] = CustomFilterRow;
                }

            }
        }

    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}

