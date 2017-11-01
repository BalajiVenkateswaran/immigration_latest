import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SmartTableFramework} from '../smarttable.component';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
  addMorefilters: boolean;
  showFilters: boolean;
  smartTable: SmartTableFramework;
  moreFilterFields: any[];
}

@Component({
  selector: 'smart-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit{
  @Input() public quickFilters: any[];
  @Input() public smartTable: SmartTableFramework;
  @Output() onMoreFiltersClick = new EventEmitter();

  showFilters = true;
  addMorefilters = false;
  /**
   * Parent array has array of objects: (Each object represents an row)
   *  - Each object is an array:
   *    - Each object in child array represents a field, with name, value, type
   *
   *
   * Note: Each rows will have 3 fields
   */
  moreFilterFields: any[] = [];

  constructor(public dialogService: DialogService){
    super(dialogService);
  }
  ngOnInit(){

  }
  onChange(event){
    console.log("Filter Component: %o", event);
    let headerName = event.target.options[0].innerText;
    let field = event.srcElement.id;

    this.smartTable.queryParameters.addFilter(headerName, field, this.smartTable.getFilterType(headerName), event.target.value);
    this.smartTable.invokeResource();
    event.target.value = event.target.options[0].value;
  }

  moreFilters() {
      console.log("moreFilters: %o", this.smartTable.queryParameters.filter);

      //Prepare moreFilterFields information from smartTable.settings
      if(this.moreFilterFields.length == 0){
        let columnsettings = this.smartTable.settings['columnsettings'];
        let fieldCount = 0, rowCount = 0;
        //Have 3 fields in one object
        for(let column of columnsettings){
          if(fieldCount == 3){
            fieldCount = 0;
            rowCount++;
          }
          if(fieldCount == 0){
            this.moreFilterFields[rowCount] = [];
          }
          this.moreFilterFields[rowCount][fieldCount] = {};
          this.moreFilterFields[rowCount][fieldCount]['field'] = column['field'];
          this.moreFilterFields[rowCount][fieldCount]['headerName'] = column['headerName'];
          this.moreFilterFields[rowCount][fieldCount]['type'] = column['type'];
          fieldCount++;
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

  onApplyFiltersClick(){
    //Add filters for the columns that has values entered
    for(let row of this.moreFilterFields){
      for(let column of row){
        if(column['value'] != null){
          this.smartTable.queryParameters.addFilter(column['headerName'], column['field'], this.smartTable.getFilterType(column['headerName']), column['value']);
        }
      }
    }

    this.smartTable.invokeResource();
    this.close();
  }
  addRecord(){

  }
}
