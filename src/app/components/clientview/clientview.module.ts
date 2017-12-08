import {NgModule} from '@angular/core';
import {AppSharedModule} from '../../shared/app.shared.module';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {clientViewClientDetailsRoute, clientViewTabsRoute} from './clientview.route';
import {AddressinfoComponent} from './client-details-tab/addressinfo/addressinfo.component';
import {ArrivalDepartureInfoComponent} from './client-details-tab/arrival-departure-info/arrival-departure-info.component';
import {ClientDetailsComponent} from './client-details-tab/client-details/client-details.component';
import {DependentsComponent} from './client-details-tab/dependents/dependents.component';
import {DocumentExpirationsComponent} from './client-details-tab/document-expirations/document-expirations.component';
import {I797HistoryComponent} from './client-details-tab/i-797-history/i-797-history.component';
import {JobDetailsComponent} from './client-details-tab/job-details/job-details.component';
import {ClientViewPassportInfoComponent} from './client-details-tab/passport-info/passport-info.component';
import {VisasComponent} from './client-details-tab/visas/visas.component';
import {DocumentsComponent} from './documents-tab/documents.component';
import {ClientViewPetitionsComponent} from './petitions-tab/petitions.component';
import {MoreDetailsComponent} from './petitions-tab/MoreDetails';
import {ClientViewRequestComponent} from './request-tab/request.component';
import {ClientViewQuestionnaireComponent} from './questionnaries-tab/questionnaires/questionnaries.component';
import {RequestButtonComponent} from './request-tab/RequestButton';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,

    AppSharedModule,
    /*Client view routes*/
    clientViewClientDetailsRoute,
    clientViewTabsRoute,

  ],
  declarations: [
    /*Client details*/
    AddressinfoComponent,
    ArrivalDepartureInfoComponent,
    ClientDetailsComponent,
    DependentsComponent,
    DocumentExpirationsComponent,
    I797HistoryComponent,
    JobDetailsComponent,
    ClientViewPassportInfoComponent,
    VisasComponent,

    /*Document tab*/
    DocumentsComponent,
    /*Petitions tab*/
    ClientViewPetitionsComponent, MoreDetailsComponent,
    /*Questionnaire tab*/
    ClientViewQuestionnaireComponent,
    /*Requests tab*/
    ClientViewRequestComponent, RequestButtonComponent


  ]
})
export class ClientViewModule {}
