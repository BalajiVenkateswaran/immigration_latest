import { Component, OnInit, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
import { CustomFilterRow } from './CustomFilterRow';
import { AgGridModule } from "ag-grid-angular/main";
import { GridOptions } from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { ActionColumns } from './ActionColumns';
import { RequestButton } from '../../clientview/request-tab/RequestButton';
@Component({
    selector: 'smart-table',
    templateUrl: './smarttable.component.html'
})
export class SmartTableFramework implements OnChanges {
    filteredQueryParams: any;
    paginationWithFilterData: boolean;
    pageSize: number;
    totalElements: number;
    totalPages: number;

    /*
    * following options are available in IH smart table
    *    - columnsettings : columnsettings
    *
    */

    @Input() settings: Object = {};
    @Input() data: Object = {};
    @Input() paginationData: Object = {};
    @Output() onAddClick = new EventEmitter();
    @Output() onRowClick = new EventEmitter();
    @Output() onDeleteClick = new EventEmitter();
    @Output() onColumnFilterClick = new EventEmitter();
    @Output() onPaginationTemplateClick = new EventEmitter();
    @Output() dataWithQueryParams = new EventEmitter();
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
    public pageNumber: number = 0;
    public itemStartIndex = 1;
    public endNumber: number;
    public pageSelectionDisable: boolean = false;
    public queryParameters;
    public deleteFilterClicked:boolean=false;
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


                this.appendParamValues({ 'data': that.filterQueries, 'filterFlag': true });
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
        }
        this.prepareSettings();
        if (changes['data']) {
            console.log('Data changed');
            if (this.data != undefined) {
                if (this.gridOptions.api != undefined) {
                    this.gridOptions.api.hideOverlay();
                    this.gridOptions.api.setRowData(this.data);
                    let eGridDiv = <HTMLElement>document.querySelectorAll('div.ag-header-row')[document.querySelectorAll('div.ag-header-row').length - 1];
                    eGridDiv.style.width = "100%";
                    this.gridOptions.api.doLayout();
                    this.gridOptions.api.sizeColumnsToFit();

                }
            }
        }
        if (changes['paginationData']) {
            if (this.paginationData) {
                this.pageSize = this.paginationData['size'];
                this.totalElements = this.paginationData['totalElements'];
                this.totalPages = this.paginationData['totalPages'];
                if (this.totalElements < this.pageSize) {
                    this.pageSelectionDisable = true;
                    this.endNumber = this.totalElements;
                }
                else {
                    if (this.endNumber < this.pageSize || this.endNumber == undefined) {

                        this.endNumber = this.pageSize;
                    }
                }
            }
        }



    }

    delete(index, x) {
        this.deleteFilterClicked=true;
        this.filterWholeArray.splice(index, 1);
        this.filterQueries.splice(index, 1);
        this.appendParamValues({ 'data': this.filterQueries, 'filterFlag': true });

    }
    onPageSizeChanged(newPageSize) {
        this.pageNumber = 0;
        this.pageSize = +newPageSize;
        this.appendParamValues({ 'pgNo': this.pageNumber, 'size': this.pageSize, 'paginationFlag': true });
        this.itemStartIndex = 1;
        if (this.totalElements < this.pageSize) {
            this.endNumber = this.totalElements;
        } else {
            this.endNumber = this.pageSize;
        }

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
        }
        else {
            this.gridOptions.pagination = true;

        }
        if (this.settings.hasOwnProperty('customPannel')) {
            this.gridOptions.suppressPaginationPanel = true;
            this.paginationTemplate = true;
        }
        else {
            this.gridOptions.suppressPaginationPanel = false;
            this.gridOptions.paginationPageSize = 10;
        }
        if (this.settings.hasOwnProperty('context')) {
            this.gridOptions['context'] = this.settings['context'];
        }

        /*if (this.settings.hasOwnProperty('paginationPageSize')) {
            this.gridOptions['paginationPageSize'] = this.settings['paginationPageSize'];
        }
        else {
            this.gridOptions.paginationPageSize = 10;
        }*/
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
        if (this.settings.hasOwnProperty('columnFilter')) {
            this.settings['columnFilter'] = this.settings['columnFilter'];
            if (this.settings['columnFilter'] == true) {
                this.gridOptions['headerHeight'] = 72;
                for (var i = 0; i < this.settings['columnsettings'].length; i++) {
                    if (i > 0 || this.settings['isDeleteEnable'] == false) {
                        this.settings['columnsettings'][i]['headerComponentFramework'] = CustomFilterRow;
                    }
                }
            }
            else {
                this.gridOptions['headerHeight'] = 25;
            }
        }
        else {
            this.settings['columnFilter'] = false;
            this.settings['headerHeight'] = 25;
        }
        if(this.settings.hasOwnProperty('defaultFilter')){
            if(this.filterWholeArray.length<=0 && !this.deleteFilterClicked){
                this.filterWholeArray.push(this.settings['defaultFilter'][0]);
                this.filterQueries = this.filterWholeArray.map(function (item) {
                    return item.headingName + ":" + item.filterValue;
                })
                this.appendParamValues({ 'data': this.filterQueries, 'filterFlag': true });
            }



        }
        this.settings['columnsettings'].map(function (item) {
            if (item['headerTooltip'] == null && item['headerName'] != '') {
                item['headerTooltip'] = item['headerName'];
            }
        })
        this.settings['columnsettings'].map(function (item) {
            if (item['tooltipField'] == null && item['tooltipField'] != '') {
                item['tooltipField'] = item['field'];
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
            this.gridOptions['rowHeight'] = 25;
        }
        this.gridOptions['columnDefs'] = this.settings['columnsettings'];
    }
    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }
    nextPage() {
        this.itemStartIndex = this.endNumber + 1;
        this.pageNumber = this.pageNumber + 1;
        if (this.totalPages - 1 == this.pageNumber) {
            this.endNumber = this.totalElements
        }
        else {
            this.endNumber = (this.pageNumber + 1) * (this.pageSize);
        }
        this.appendParamValues({ 'pgNo': this.pageNumber, 'size': this.pageSize, 'paginationFlag': true });
    }
    firstPage() {
        this.pageNumber = 0;
        this.itemStartIndex = this.pageNumber + 1;
        this.endNumber = this.pageSize;
        this.appendParamValues({ 'pgNo': this.pageNumber, 'size': this.pageSize, 'paginationFlag': true });
    }
    lastPage() {
        this.endNumber = this.totalElements;
        this.pageNumber = this.totalPages - 1;
        this.itemStartIndex = this.pageNumber * this.pageSize + 1;
        this.appendParamValues({ 'pgNo': this.pageNumber, 'size': this.pageSize, 'paginationFlag': true });
    }
    previousPage() {
        if (this.pageNumber == 1) {
            this.itemStartIndex = this.pageNumber;
        }
        else {
            this.itemStartIndex = (this.pageNumber - 1) * (this.pageSize) + 1;
        }
        this.endNumber = this.pageSize * this.pageNumber;
        this.pageNumber = this.pageNumber - 1;
        this.appendParamValues({ 'pgNo': this.pageNumber, 'size': this.pageSize, 'paginationFlag': true });

    }
    appendParamValues(queryParameters) {
        if (queryParameters.hasOwnProperty('filterFlag')) {
            this.pageNumber = 0;
            this.itemStartIndex = 1;
            this.endNumber = this.pageSize;
            this.filteredQueryParams = queryParameters.data;
            let queryParams = "?filter=" + this.filteredQueryParams;
            this.dataWithQueryParams.emit(queryParams);
            if (queryParameters.data.length > 0) {
                this.paginationWithFilterData = true;
            }
            else {
                this.paginationWithFilterData = false;
            }

        }
        if (queryParameters.hasOwnProperty('paginationFlag')) {

            if (this.paginationWithFilterData && this.totalElements > this.pageSize) {
                let queryParams = "?page=" + queryParameters['pgNo'] + "&size=" + queryParameters['size'] + "&filter=" + this.filteredQueryParams;
                this.dataWithQueryParams.emit(queryParams);
            }
            else {
                let queryParams = "?page=" + queryParameters['pgNo'] + "&size=" + queryParameters['size'];
                this.dataWithQueryParams.emit(queryParams);
            }

        }






    }
}

