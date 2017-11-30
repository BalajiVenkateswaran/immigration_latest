import {NgModule} from '@angular/core';
import {SmartTableFrameworkComponent} from '../components/framework/smarttable/smarttable.component';
import {FilterComponent} from '../components/framework/smarttable/filter/filter.component';
import {PaginationComponent} from '../components/framework/smarttable/pagination/pagination.component';
import {AgGridModule} from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {MyDatePickerModule} from 'mydatepicker';
import {DragulaModule} from 'ng2-dragula';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,

    /*Smart table modules*/
    MyDatePickerModule,
    AgGridModule.withComponents([SmartTableFrameworkComponent]),

    /*Immigration view modules*/
    DragulaModule,
    FileUploadModule,
  ],
  exports: [
    // SmartTable related components
    SmartTableFrameworkComponent,
    FilterComponent,
    PaginationComponent,
    MyDatePickerModule,
    DragulaModule,
    FileUploadModule,
  ],
  entryComponents: [
    FilterComponent,
    SmartTableFrameworkComponent,

  ],
  declarations: [
    // SmartTable related components
    FilterComponent,
    PaginationComponent,
    SmartTableFrameworkComponent,

  ]
})
export class AppSharedModule {

}
