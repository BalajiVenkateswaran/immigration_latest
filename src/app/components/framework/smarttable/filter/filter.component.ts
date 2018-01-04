import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SmartTableFrameworkComponent} from '../smarttable.component';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {FilterEntry} from '../types/query-parameters';
import {DatePipe} from '@angular/common';


export interface ConfirmModel {
  title: string;
  message: string;
  addMorefilters: boolean;
  showFilters: boolean;
  smartTable: SmartTableFrameworkComponent;
  moreFilterFields: any[];
}

@Component({
  selector: 'ih-smart-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends DialogComponent<ConfirmModel, boolean> {
  @Input() public quickFilters: any[];
  @Input() public smartTable: SmartTableFrameworkComponent;
  @Output() addRecordClick = new EventEmitter();

  public dateValue;

  showFilters = true;
  addMorefilters = false;
  /**
   * Parent array has array of objects: (Each object represents an row)
   *  - Each object is an array:
   *    - Each object in child array represents a field, with name, value, type
   *
   * Note: Each rows will have 3 fields
   */
  moreFilterFields: any[] = [];

  constructor(public dialogService: DialogService, private datePipe: DatePipe) {
    super(dialogService);

  }
  onChange(event) {
    console.log('Filter Component: %o', event);
    let headerName = event.target.options[0].innerText;
    let field = event.srcElement.id;

    this.smartTable.queryParameters.addFilter(headerName, field, this.smartTable.getFilterType(headerName), event.target.value);
    this.smartTable.invokeResource();
    event.target.value = event.target.options[0].value;
  }


  moreFilters() {
      console.log('moreFilters: %o', this.smartTable.queryParameters.filter);
       this.moreFilterFields = [];

      // Prepare moreFilterFields information from smartTable.settings
      if (this.moreFilterFields.length === 0) {
        let columnsettings = this.smartTable.settings['columnsettings'];
        let fieldCount = 0, rowCount = 0;

        // Have 3 fields in one object
        for (let column of columnsettings) {

          if (fieldCount === 3) {
            fieldCount = 0;
            rowCount++;
          }
          if (fieldCount === 0) {
            this.moreFilterFields[rowCount] = [];
          }
          if ((column.filter == null || column.filter === undefined) || column.filter === true) {
            this.moreFilterFields[rowCount][fieldCount] = {};
            this.moreFilterFields[rowCount][fieldCount]['field'] = column['field'];
            this.moreFilterFields[rowCount][fieldCount]['headerName'] = column['headerName'];
            this.moreFilterFields[rowCount][fieldCount]['type'] = column['type'];
            this.moreFilterFields[rowCount][fieldCount]['data'] = column['data'];

            fieldCount++;
          }

          if (column.headerTooltip === 'Actions') {
            console.log(this.moreFilterFields);
            fieldCount = 0;
          }
        }
      }

    this.dialogService.addDialog(FilterComponent, {
      addMorefilters: true,
      showFilters: false,
      moreFilterFields: this.moreFilterFields,
      smartTable: this.smartTable,
      title: 'More Fiters'
    });

  }

  onApplyFiltersClick() {
    // Add filters for the columns that has values entered
    for (let row of this.moreFilterFields) {
      for (let column of row) {
        console.log(column['value'])
        if (column['value'] != null) {
          let columnValue = null;
          if (column['type'] === 'datePicker') {
            columnValue = column['value']['formatted'];
            columnValue = this.datePipe.transform(columnValue, 'MM-dd-yyyy')

          } else {
            columnValue = column['value'];
          }
          this.smartTable.queryParameters.addFilter(column['headerName'], column['field'], this.smartTable.getFilterType(column['field']), columnValue);
        }
      }
    }

    this.smartTable.invokeResource();
    this.close();
  }
  onAddClick() {
    this.addRecordClick.emit();
  }

  deleteFilter(index, x) {
    this.smartTable.queryParameters.filter.splice(index, 1);
    this.smartTable.queryParameters.setPagination(this.smartTable.paginationMetadata.pageSize, 0);
    this.smartTable.paginationMetadata.itemStartIndex = 1;
    this.smartTable.paginationMetadata.pageNumber = 0;
    this.smartTable.invokeResource();
  }

  clearAllFilters() {
    this.smartTable.queryParameters.filter = new Array<FilterEntry>();
    this.smartTable.queryParameters.setPagination(this.smartTable.paginationMetadata.pageSize, 0);
    this.smartTable.paginationMetadata.itemStartIndex = 1;
    this.smartTable.paginationMetadata.pageNumber = 0;
    this.smartTable.invokeResource();
  }
}
