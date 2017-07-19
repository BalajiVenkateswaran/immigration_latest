import { Component, OnInit, Injector, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
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
    @Output() onColumnFilterClick = new EventEmitter();
    @Output() onItemChecked = new EventEmitter();
    public gridOptions;
    public paginationTemplate: boolean;
    public rowClickDone: boolean = false;
    public editableData: any;
    public clickFlag: boolean = false;
    public checkFlag: boolean = false;
    public filterSubscription;
    public deleteSubscription;
    public deleteData;
    public checkedData;
    public filterValues: any;
    public filteredData;
    public filterKeys = [];
    public filterWholeArray = new Array();
    public isAddButtonEnable: boolean;
    public filterQueries = [];
    public static sendCustomFilterValue = new Subject<boolean>();
    public checkSubscription;
    constructor() {
        console.log('constructor %o', this.settings);
        this.gridOptions = <GridOptions>{};
        this.deleteSubscription = ActionColumns.sendDeleteData.subscribe(res => {
            if (res != undefined) {
                this.deleteData = res;
                this.clickFlag = true;
            }
            else {
                this.clickFlag = false;
            }

        })
        this.filterSubscription = CustomFilterRow.fillValues.subscribe(res => {
            let that = this;
            if (res) {
                this.filterValues = res;
                for (let i = 0; i < this.filterValues.length; i++) {
                    if (this.filterWholeArray.indexOf(this.filterValues[i]) == -1) {
                        this.filterWholeArray.push(this.filterValues[i]);
                        this.filterValues.splice(i, 1);

                    }
                }
                that.filterWholeArray = this.removeDuplicates(this.filterWholeArray);
                this.filterQueries = this.filterWholeArray.map(function (item) {
                    return item.headingName + ":" + item.filterValue;
                })
                this.onColumnFilterClick.emit(that.filterQueries);
            }


        });
       

    }
    removeDuplicates(data) {
        return data.filter((obj, pos, arr) => {
            if (arr.map(mapObj => mapObj['headingName']).indexOf(obj['headingName']) === pos) {
                return arr;
            }
            else {
                alert("Only one filter Allowed Per column");
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
        this.filterQueries.splice(index, 1);
        this.onColumnFilterClick.emit(this.filterQueries);
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
    onCellClick(data) {
        if (this.clickFlag == true) {
            this.onDeleteClick.emit(data);
            this.clickFlag = false;
        }
        else {
            this.onRowClick.emit(data);
        }
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
                headerName: "",
                headerTooltip: "Actions",
                width: 80,
                cellRendererFramework: ActionColumns,

            });
        }
       /* if (this.settings.hasOwnProperty('questionnaireTable')) {
            this.settings['questionnaireTable'] = this.settings['questionnaireTable'];
             this.settings['columnsettings'].unshift({
                 headerName: "Checkbox",
                 headerTooltip: "Checkbox",
                 width: 80,
                 cellRendererFramework: SendToClientQuestionnaire,
             });
           this.settings['columnsettings'].splice(1, 0, {
                headerName: "Checkbox",
                headerTooltip: "Checkbox",
                width: 80,
                cellRendererFramework: SendToClientQuestionnaire,
            })
        }
*/


        if (this.settings.hasOwnProperty('columnFilter')) {
            this.settings['columnFilter'] = this.settings['columnFilter'];
            if (this.settings['columnFilter'] == true) {
                this.gridOptions['headerHeight'] = 60;
                for (var i = 0; i < this.settings['columnsettings'].length; i++) {
                    if (i > 0 || this.settings['isDeleteEnable'] == false) {
                        this.settings['columnsettings'][i]['headerComponentFramework'] = CustomFilterRow;
                    }

                }
            }
            else {
                this.gridOptions['headerHeight'] = 35;
            }
        }
        else {
            this.settings['columnFilter'] = false;
            this.settings['headerHeight'] = 35;
        }
        this.settings['columnsettings'].map(function (item) {
            if (item['headerTooltip'] == null && item['headerName'] != '') {
                item['headerTooltip'] = item['headerName'];
            }
        })
        if (this.settings.hasOwnProperty('isAddButtonEnable')) {
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

