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
import {I129HPage1Component} from '../components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-1/page-1.component';
import {I129Page2Component} from '../components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {ChartsModule} from 'ng2-charts';
import {ClientsService} from '../components/immigrationview/clients-tab/clients/clients.service';

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

    /*Reports*/
    ChartsModule,
  ],
  exports: [
    // SmartTable related components
    SmartTableFrameworkComponent,
    FilterComponent,
    PaginationComponent,
    MyDatePickerModule,
    DragulaModule,
    FileUploadModule,



    /*Temporary Components*/
    I129Page2Component,
    I129HPage1Component,

    ChartsModule,

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


    /*Temporary Components*/
    I129Page2Component,
    I129HPage1Component,

  ]
})
export class AppSharedModule {

}
