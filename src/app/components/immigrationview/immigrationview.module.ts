import {NgModule} from '@angular/core';
import {ClientsComponent} from './clients-tab/clients/clients.component';
import {immigrationViewRoute} from './immigrationview.route';
import {StatusButtonComponent} from './clients-tab/clients/statusButton';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {SmartTableFrameworkComponent} from '../framework/smarttable/smarttable.component';
import {FilterComponent} from '../framework/smarttable/filter/filter.component';
import {PaginationComponent} from '../framework/smarttable/pagination/pagination.component';
import {AppSharedModule} from '../../shared/app.shared.module';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,


    AppSharedModule,
    /*Immigration view routes*/
    immigrationViewRoute
  ],
  declarations: [
    /*Immigration view components*/
    StatusButtonComponent,
    ClientsComponent,
  ]
})
export class ImmigrationViewModule {}
