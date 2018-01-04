import {Component, Input, SimpleChange, OnChanges, EventEmitter, Output} from '@angular/core';
import { GridOptions } from 'ag-grid';
import { ActionColumns } from './ActionColumns';
import {QueryParameters, SortType} from './types/query-parameters';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { SmartTableService } from './common/smarttable.service'
import {PaginationMetadata} from './types/pagination-metadata';
import {PaginationComponent} from './pagination/pagination.component';
import {FilterComponent} from './filter/filter.component';
export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
    selector: 'ih-smart-table',
    templateUrl: './smarttable.component.html',
    entryComponents: [PaginationComponent]
})
export class SmartTableFrameworkComponent extends DialogComponent<ConfirmModel, boolean> implements OnChanges {
    public paginationMetadata: PaginationMetadata = new PaginationMetadata();
    public tableView = true;

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
    @Input() addMorefilters: boolean;  // for morefilters
    @Output() onRowClick = new EventEmitter();
    @Output() onAddClick = new EventEmitter();
    @Output() onEditClick = new EventEmitter();
    @Output() onDeleteClick = new EventEmitter();
    @Output() onColumnFilterClick = new EventEmitter();
    @Output() onPaginationTemplateClick = new EventEmitter();
    @Output() dataWithQueryParams = new EventEmitter();
    public gridOptions;
    public paginationTemplate: boolean;
    //public clickFlag = false;
    public deleteData;
    public isAddButtonEnable: boolean;
    public isAddFilterButtonEnable: boolean;
    public headerArray: any;
    public queryParameters: QueryParameters;
    public quickFilters: any[] = [];
    private defaultPageSize = 15;
    public isMorefilters;


  constructor(public dialogService: DialogService, public smartTableService: SmartTableService) {
        super(dialogService);
        console.log('constructor %o', this.settings);
        this.gridOptions = <GridOptions>{};
        this.queryParameters = new QueryParameters();

        /*this.smartTableService.getFilterData().subscribe(data => {
            let newData = data.data
            for (let i = 0; i < newData.length; i++) {
                this.queryParameters.addFilter(newData[i].headerName, newData[i].fieldName, this.getFilterType(newData[i].headerName), newData[i].fieldValue);
                this.invokeResource();
            }
        })*/
    }
    removeDuplicates(data) {
        return data.filter((obj, pos, arr) => {
            if (arr.map(mapObj => mapObj['headingName']).indexOf(obj['headingName']) === pos) {
                return arr;
            } else {
                alert('Only one filter Allowed Per column');
            }

        });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        console.log('ngOnChanges %o', this.settings);

        if (changes['settings']) {
            console.log('Settings are changed');
            this.prepareSettings();
            this.invokeResource();
        }

        if (changes['data']) {
            console.log('Data changed');
            // reset new data to ag-grid table
            if (this.data !== undefined) {
                if (this.gridOptions.api !== undefined) {
                    this.gridOptions.api.hideOverlay();
                    this.gridOptions.api.setRowData(this.data);
                    let eGridDiv = <HTMLElement>document.querySelectorAll('div.ag-header-row')[document.querySelectorAll('div.ag-header-row').length - 1];
                    if (eGridDiv !== undefined) {
                        eGridDiv.style.width = '100%';
                        this.gridOptions.api.doLayout();
                    }
                    this.gridOptions.api.sizeColumnsToFit();

                }
            }
        }
        if (changes['paginationData']) {
             console.log('Pagination Data change:%o', this.paginationData);
            if (this.paginationData) {
                this.paginationMetadata.pageSize = this.paginationData['size'];
                this.paginationMetadata.totalElements = this.paginationData['totalElements'];
                this.paginationMetadata.totalPages = this.paginationData['totalPages'];
                let number = this.paginationData['number'];

                this.paginationMetadata.itemStartIndex = this.paginationMetadata.totalElements === 0 ? 0 : (number * this.paginationMetadata.pageSize) + 1;

                if ((number * this.paginationMetadata.pageSize) + this.paginationMetadata.pageSize > this.paginationMetadata.totalElements) {
                    this.paginationMetadata.endNumber = this.paginationMetadata.totalElements;
                } else {
                    this.paginationMetadata.endNumber = (number * this.paginationMetadata.pageSize) + this.paginationMetadata.pageSize;
                }
            }
        }

        this.smartTableService.headerNamesArray = this.settings['columnsettings'].map(item => {return {'headerName': item.headerName, 'fieldName': item.field, 'type': item.type, 'data': item.data}});

        this.smartTableService.filteredData = this.queryParameters.filter;
    }


    addRecord() {
        this.onAddClick.emit(this.isAddButtonEnable);
    }
    onCellClick(data) {
      if (data.column.colDef.headerTooltip !== 'Actions') {
          this.onRowClick.emit(data);
      }
    }

    getFilterType(headerName: string): string {
        let operator = null;
        if (this.settings['filter'] != null && this.settings['filter']['types'] != null) {
            let filterTypes = this.settings['filter']['types'];
            filterTypes.map(function (item) {
                if (item.field === headerName && item.operator != null) {
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
        // default setting for framework
        if (this.settings.hasOwnProperty('pagination')) {
            this.gridOptions['pagination'] = this.settings['pagination'];
        } else {
            this.gridOptions.pagination = true;
            this.queryParameters.setPagination(this.defaultPageSize, 0);
        }
        if (this.settings.hasOwnProperty('isMorefilters')) {
          this.isMorefilters = this.settings['isMorefilters'];
          console.log(this.isMorefilters)
        }
        if (this.settings.hasOwnProperty('customPanel')) {
            this.gridOptions.suppressPaginationPanel = true;
            this.paginationTemplate = true;
            this.queryParameters.setPagination(this.defaultPageSize, 0);
        } else {
            this.gridOptions.suppressPaginationPanel = false;
            this.gridOptions.paginationPageSize = this.defaultPageSize;
        }
        // Pass any objects to child components through context
        if (this.settings.hasOwnProperty('context')) {
            this.gridOptions['context'] = this.settings['context'];
        }
        // Add Filter Button to enable or disable add filter button to open filter popup
        if (this.settings.hasOwnProperty('isAddFilterButtonEnable')) {
            this.isAddFilterButtonEnable = this.settings['isAddFilterButtonEnable'];
        }
        if (this.settings.hasOwnProperty('headerHeight')) {
            this.gridOptions['headerHeight'] = this.settings['headerHeight'];
        } else {
            this.gridOptions.headerHeight = 35;
        }
        if (this.settings.hasOwnProperty('suppressMovableColumns')) {
            this.gridOptions['suppressMovableColumns'] = this.settings['suppressMovableColumns'];
        } else {
            this.gridOptions.suppressMovableColumns = true;
        }
        if (this.settings.hasOwnProperty('isDeleteEnable')) {
            this.gridOptions['isDeleteEnable'] = this.settings['isDeleteEnable'];
        } else {
            this.gridOptions.isDeleteEnable = true;
        }

        if (this.settings.hasOwnProperty('isEditEnable')) {
          this.gridOptions.isEditEnable = this.settings['isEditEnable'];
        } else {
          this.gridOptions.isEditEnable = false;
        }

        if (this.gridOptions.isDeleteEnable || this.gridOptions.isEditEnable) {
          this.settings['columnsettings'].unshift({
            headerName: '',
            headerTooltip: 'Actions',
            width: 80,
            cellRendererFramework: ActionColumns,
            data: {
              isDeleteEnable: this.gridOptions.isDeleteEnable,
              isEditEnable: this.gridOptions.isEditEnable,
              onEditClick: this.onEditClick,
              onDeleteClick: this.onDeleteClick
            }
          });
        }

        if (this.settings.hasOwnProperty('columnFilter')) {
            this.settings['columnFilter'] = this.settings['columnFilter'];
            this.gridOptions['headerHeight'] = 35;
        } else {
            this.settings['columnFilter'] = false;
            this.settings['headerHeight'] = 25;

            this.queryParameters.setPagination(this.defaultPageSize, 0);
        }

        if (this.settings.hasOwnProperty('defaultFilter')) {
            for (let item of this.settings['defaultFilter']) {
                this.queryParameters.addFilter(item.headerName, item.headingName, this.getFilterType(item.field), item.filterValue)
            }
        }

        if (this.settings.hasOwnProperty('filter')) {
          let filter = this.settings['filter'];
          if (filter != null && filter.hasOwnProperty('quick')) {
            this.quickFilters = filter['quick'];
          }
        }
        if (this.settings.hasOwnProperty('sort')) {
          // TODO implement in a generic way
          for (let item of this.settings['sort']) {
              this.queryParameters.addSort(item.headingName, item.sort);
          }
             /*this.queryParameters.addSort(this.settings['sort'][0]['headingName'],this.settings['sort'][0]['sort']);*/
        }
        // Configuring tool tip for header and data
        this.settings['columnsettings'].map(function (item) {
            if (item['headerTooltip'] == null && item['headerName'] !== '') {
                item['headerTooltip'] = item['headerName'];
            }
        });
        this.settings['columnsettings'].map(function (item) {
            if (item['tooltipField'] == null && item['tooltipField'] !== '') {
                item['tooltipField'] = item['field'];
            }
        });
        if (this.settings.hasOwnProperty('isAddButtonEnable')) {
            this.isAddButtonEnable = this.settings['isAddButtonEnable'];
        } else {
            this.isAddButtonEnable = true;
        }
        this.gridOptions.domLayout = 'autoHeight';
        this.gridOptions.rowBuffer = 100;
        if (this.settings.hasOwnProperty('rowHeight')) {
            this.gridOptions['rowHeight'] = this.settings['rowHeight'];
        } else {
            this.gridOptions['rowHeight'] = 40;
        }
        this.gridOptions.suppressNoRowsOverlay = true;
        this.gridOptions['columnDefs'] = this.settings['columnsettings'];

        if (this.settings.hasOwnProperty('gridOptions')) {
          let keys = Object.keys(this.settings['gridOptions']);
          for (let key of keys) {
            this.gridOptions[key] = this.settings['gridOptions'][key];
          }
        }
    }

    invokeResource() {
        let queryString = '?';
        if (this.queryParameters.pagination != null) {
          if (this.queryParameters.pagination.size != null) {
            queryString += 'size=' + this.queryParameters.pagination.size + '&';
          }
          if (this.queryParameters.pagination.pageNumber != null) {
            queryString += 'page=' + this.queryParameters.pagination.pageNumber + '&';
          }
        }

        if (this.queryParameters.filter != null) {
          let filterUrl = 'filter=';
          this.queryParameters.filter.forEach(value => {
            filterUrl += value.fieldName + value.operator + value.fieldValue + ',';
          });
          if (filterUrl !== 'filter=') {
            queryString += filterUrl.slice(0, -1) + '&';
          }
        }

        if (this.queryParameters.sort != null) {
          let sortUrl = 'sort='
          this.queryParameters.sort.forEach((value, key) => {
            sortUrl += key + ',' + SortType[value] + ',';
          });
          if (sortUrl !== 'sort=') {
            queryString += sortUrl.slice(0, -1) + '&';
          }
        }

        queryString = queryString.slice(0, -1);
        console.log('Query String after slice: %o', queryString);

        this.dataWithQueryParams.emit(queryString);
    }
}

