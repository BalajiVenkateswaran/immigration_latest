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
import {QueryParameters, SortType} from "./types/query-parameters";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FilterpopupComponent } from "./filterpopup/filterpopup.component";
import {ConfirmComponent} from '../confirmbox/confirm.component';
import { SmartTableService } from './common/smarttable.service'
export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
    selector: 'smart-table',
    templateUrl: './smarttable.component.html'
})
export class SmartTableFramework extends DialogComponent<ConfirmModel, boolean> implements OnChanges{
    pageSize: number;
    totalElements: number;
    totalPages: number;
    public pageNumber: number = 0;
    public itemStartIndex = 1;
    public endNumber: number;
    public filterPopupForm : boolean;
    public tableView : boolean = true;

    /*
    * following options are available in IH smart table
    *    - columnsettings : columnsettings
    *    - pagination :
    *             - (Default) true, if pagination should be enabled
    *             - false, if pagination should be disabled
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
    public clickFlag: boolean = false;
    public filterSubscription;
    public deleteSubscription;
    public deleteData;
    public isAddButtonEnable: boolean;
    public isAddFilterButtonEnable: boolean;
    public headerArray:any;
    public pageSelectionDisable: boolean = false;
    public queryParameters : QueryParameters;
    public deleteFilterClicked: boolean = false;
    constructor(public dialogService: DialogService,public smartTableService: SmartTableService) {
        super(dialogService);
        console.log('constructor %o', this.settings);
        this.gridOptions = <GridOptions>{};
        this.queryParameters = new QueryParameters();
        this.deleteSubscription = ActionColumns.sendDeleteData.subscribe(res => {
            if (res != undefined) {
                this.deleteData = res;
                this.clickFlag = true;
            }
            else {
                this.clickFlag = false;
            }
        });

        this.filterSubscription = CustomFilterRow.fillValues.subscribe(res => {
            if (res) {
                res.forEach(filter => {
                  filter.operator = this.getFilterType(filter.fieldName);
                  this.queryParameters.addFilter(filter.fieldHeader, filter.fieldName,this.getFilterType(filter.fieldName),filter.fieldValue)
                });
                this.pageNumber = 0;
                this.queryParameters.pagination.pageNumber = 0;
                this.invokeResource();
            }
        });
        this.smartTableService.getFilterData().subscribe(data=>{
            var newData=data.data
            for(var i = 0; i < newData.length; i++){
                this.queryParameters.addFilter(newData[i].headerName,newData[i].fieldName,this.getFilterType(newData[i].headerName),newData[i].fieldValue);
                this.invokeResource();
            }
        })
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
            console.log("Settings are changed");
            this.prepareSettings();
            this.invokeResource();
        }

        if (changes['data']) {
            console.log('Data changed');
            //reset new data to ag-grid table
            if (this.data != undefined) {
                if (this.gridOptions.api != undefined) {
                    this.gridOptions.api.hideOverlay();
                    this.gridOptions.api.setRowData(this.data);
                    let eGridDiv = <HTMLElement>document.querySelectorAll('div.ag-header-row')[document.querySelectorAll('div.ag-header-row').length - 1];
                    if(eGridDiv!=undefined){
                        eGridDiv.style.width = "100%";
                        this.gridOptions.api.doLayout();
                    }
                    this.gridOptions.api.sizeColumnsToFit();

                }
            }
        }
        if (changes['paginationData']) {
             console.log('Pagination Data change:%o',this.paginationData);
            if (this.paginationData) {
                this.pageSize = this.paginationData['size'];
                this.totalElements = this.paginationData['totalElements'];
                this.totalPages = this.paginationData['totalPages'];
                let number = this.paginationData['number'];

                this.itemStartIndex = this.totalElements == 0 ? 0 : (number * this.pageSize) +1;

                if ((number * this.pageSize) + this.pageSize > this.totalElements) {
                    this.endNumber = this.totalElements;
                }
                else {
                    this.endNumber = (number * this.pageSize) + this.pageSize;
                }
            }
        }
        this.smartTableService.headerNamesArray = this.settings['columnsettings'].map(item=>{return {'headerName':item.headerName,'fieldName':item.field,'type':item.type,'data':item.data}});

        this.smartTableService.filteredData = this.queryParameters.filter;
    }

    deleteFilter(index, x) {
        this.deleteFilterClicked = true;
        this.queryParameters.filter.splice(index,1);
        this.queryParameters.setPagination(this.pageSize,0);
        this.itemStartIndex = 1;
        this.pageNumber=0;
        this.invokeResource();
    }
    onPageSizeChanged(newPageSize) {
        this.pageNumber = 0;
        this.pageSize = +newPageSize;
        this.itemStartIndex = 1;
        if (this.totalElements < this.pageSize) {
            this.endNumber = this.totalElements;
        } else {
            this.endNumber = this.pageSize;
        }
        this.queryParameters.setPagination(this.pageSize,this.pageNumber);
        this.invokeResource();
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

    getFilterType(headerName: string): string {
        let operator = null;
        if (this.settings['filter'] != null && this.settings['filter']['types'] != null) {
            let filterTypes = this.settings['filter']['types'];
            filterTypes.map(function (item) {
                if (item.field == headerName && item.operator != null) {
                    operator = item.operator;
                }
            });
        }
        if (operator == null) {
            operator = ':';
        }
        return operator;
    }

  /**
   * Prepare settings
   */
    prepareSettings() {
        //default setting for framework
        if (this.settings.hasOwnProperty('pagination')) {
            this.gridOptions['pagination'] = this.settings['pagination'];
        }
        else {
            this.gridOptions.pagination = true;
            this.queryParameters.setPagination(20,0);
        }

        if (this.settings.hasOwnProperty('customPanel')) {
            this.gridOptions.suppressPaginationPanel = true;
            this.paginationTemplate = true;
            this.queryParameters.setPagination(20,0);
        }
        else {
            this.gridOptions.suppressPaginationPanel = false;
            this.gridOptions.paginationPageSize = 10;
        }
        //Pass any objects to child components through context
        if (this.settings.hasOwnProperty('context')) {
            this.gridOptions['context'] = this.settings['context'];
        }
        //Add Filter Button to enable or disable add filter button to open filter popup
        if (this.settings.hasOwnProperty('isAddFilterButtonEnable')) {
            this.isAddFilterButtonEnable = this.settings['isAddFilterButtonEnable'];
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
                cellRendererFramework: ActionColumns
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
                this.gridOptions['headerHeight'] = 90;
            }
        }
        else {
            this.settings['columnFilter'] = false;
            this.settings['headerHeight'] = 25;

            this.queryParameters.setPagination(20,0);
        }

        if (this.settings.hasOwnProperty('defaultFilter')) {
            for (var item of this.settings['defaultFilter']) {
                this.queryParameters.addFilter(item.headerName, item.headingName,this.getFilterType(item.headingName),item.filterValue)
            }
        }
        if(this.settings.hasOwnProperty('sort')){
          //TODO implement in a generic way
          for(var item of this.settings['sort']){
              this.queryParameters.addSort(item.headingName,item.sort);
          }
             /*this.queryParameters.addSort(this.settings['sort'][0]['headingName'],this.settings['sort'][0]['sort']);*/
        }
        //Configuring tool tip for header and data
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
            this.gridOptions['rowHeight'] = 60;
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

       this.queryParameters.setPagination(this.pageSize,this.pageNumber);
       this.invokeResource();
    }
    firstPage() {
        this.pageNumber = 0;
        this.itemStartIndex = this.pageNumber + 1;
        this.endNumber = this.pageSize;

       this.queryParameters.setPagination(this.pageSize,this.pageNumber);
           this.invokeResource();
    }
    lastPage() {
        this.endNumber = this.totalElements;
        this.pageNumber = this.totalPages - 1;
        this.itemStartIndex = this.pageNumber * this.pageSize + 1;

       this.queryParameters.setPagination(this.pageSize,this.pageNumber);
          this.invokeResource();
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

        this.queryParameters.setPagination(this.pageSize,this.pageNumber);
          this.invokeResource();
    }
    invokeResource() {
        let queryString : string = '?';
        if(this.queryParameters.pagination != null){
          if(this.queryParameters.pagination.size != null){
            queryString += "size="+this.queryParameters.pagination.size+"&";
          }
          if(this.queryParameters.pagination.pageNumber != null){
            queryString += "page="+this.queryParameters.pagination.pageNumber+"&";
          }
        }

        if(this.queryParameters.filter != null){
          let filterUrl = 'filter=';
          this.queryParameters.filter.forEach(value => {
            filterUrl += value.fieldName+value.operator+value.fieldValue+',';
          });
          if(filterUrl != 'filter='){
            queryString += filterUrl.slice(0, -1)+ '&';
          }
        }

        if(this.queryParameters.sort != null){
          let sortUrl = 'sort='
          this.queryParameters.sort.forEach((value, key) => {
            sortUrl += key +','+SortType[value]+',';
          });
          if(sortUrl != 'sort='){
            queryString += sortUrl.slice(0, -1)+ '&';
          }
        }
        console.log("Query String before slice: %o", queryString);
        queryString = queryString.slice(0, -1);
        console.log("Query String after slice: %o", queryString);

        this.dataWithQueryParams.emit(queryString);
    }
    filterPopup(){
        this.dialogService.addDialog(FilterpopupComponent,{
            title: 'Add Filter',
            message: 'Add Filter'
        })
    }
}

