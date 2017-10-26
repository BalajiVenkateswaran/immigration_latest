import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SmartTableFramework} from '../smarttable.component';

@Component({
  selector: 'smart-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent{
  @Input() public quickFilters: any[];
  @Input() public smartTable : SmartTableFramework;
  @Output() onMoreFiltersClick = new EventEmitter();

  onChange(event){
    console.log("Filter Component: %o", event);
    let headerName = event.target.options[0].innerText;
    let field = event.srcElement.id;

    this.smartTable.queryParameters.addFilter(headerName, field, this.smartTable.getFilterType(headerName), event.target.value);
    this.smartTable.invokeResource();
    event.target.value = event.target.options[0].value;
  }

  moreFilters(){
    console.log("moreFilters: %o", this.smartTable.queryParameters.filter);
    this.onMoreFiltersClick.emit(this.smartTable.queryParameters.filter);
  }

}
