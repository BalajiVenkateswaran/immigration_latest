import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SmartTableFramework} from '../smarttable.component';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
  addMorefilters: boolean;
}

@Component({
  selector: 'smart-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit{
  @Input() public quickFilters: any[];
  @Input() public smartTable: SmartTableFramework;
  @Input() public addMorefilters: boolean;  //for morefilters
  @Output() onMoreFiltersClick = new EventEmitter();

  moreFilterFields: Object = {};

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
      this.addMorefilters = true;
    console.log("moreFilters: %o", this.smartTable.queryParameters.filter);

    this.dialogService.addDialog(FilterComponent, {
      addMorefilters: true,
      title: 'More Fiters'
    });

  }

  onApplyFiltersClick(){

  }
  addRecord(){}
}
