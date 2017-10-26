import {Component, Input} from '@angular/core';
import {QueryParameters} from '../types/query-parameters';
import {SmartTableFramework} from '../smarttable.component';

@Component({
  selector: 'smart-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent{
  @Input() public quickFilters: any[];
  @Input() public smartTable : SmartTableFramework;

  onChange(event){
    console.log("Filter Component: %o", event);
    let headerName = event.target.options[0].innerText;
    let field = event.srcElement.id;

    this.smartTable.queryParameters.addFilter(headerName, field, this.smartTable.getFilterType(headerName), event.target.value);
    this.smartTable.invokeResource();
    event.target.value = event.target.options[0].value;
  }

}
