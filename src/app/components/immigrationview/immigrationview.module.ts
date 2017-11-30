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
import {ImmigrationViewAddressinfoComponent} from './clients-tab/client-details/address/addressinfo.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import {ImmigrationViewClientDetailsComponent} from './clients-tab/client-details/client-details/client-details.component';
import {DependentDetailsComponent} from './clients-tab/client-details/dependent-details/dependent-details.component';
import {ImmigrationViewDependentsComponent} from './clients-tab/client-details/dependents/dependents.component';
import {ImmigrationviewDocumentExpirationsComponent} from './clients-tab/client-details/document-expirations/document-expirations.component';
import {DocumentManagementComponent} from './clients-tab/client-details/document-management/document-management.component';
import {ClientDocumentRepositoryComponent} from './clients-tab/client-details/document-repository/document-repository.component';
import {ImmigrationViewI797HistoryComponent} from './clients-tab/client-details/i-797-history/i-797-history.component';
import {ImmigrationViewPassportInfoComponent} from './clients-tab/client-details/passport-info/passport-info.component';
import {ImmigrationViewPetitionsComponent} from './clients-tab/client-details/petitions/petitions.component';
import {ImmigrationViewVisasComponent} from './clients-tab/client-details/visas/visas.component';
import {ImmigrationViewJobDetailsComponent} from './clients-tab/client-details/job-details/job-details.component';
import {DragulaModule} from 'ng2-dragula';

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
    immigrationViewRoute,
  ],
  declarations: [
    /*Immigration view components*/
    StatusButtonComponent,
    ClientsComponent,
    /*Client detail components*/
    ImmigrationViewAddressinfoComponent,
    ImmigrationViewArrivalDepartureInfoComponent,
    ImmigrationViewClientDetailsComponent,
    DependentDetailsComponent,
    ImmigrationViewDependentsComponent,
    ImmigrationviewDocumentExpirationsComponent,
    DocumentManagementComponent,
    ClientDocumentRepositoryComponent,
    ImmigrationViewI797HistoryComponent,
    ImmigrationViewPassportInfoComponent,
    ImmigrationViewPetitionsComponent,
    ImmigrationViewVisasComponent,
    ImmigrationViewJobDetailsComponent
  ]
})
export class ImmigrationViewModule {}
