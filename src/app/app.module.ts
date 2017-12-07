import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {APP_BASE_HREF, CurrencyPipe, DatePipe} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgIdleModule} from '@ng-idle/core';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {ActionColumns} from './components/framework/smarttable/ActionColumns';

import {AppComponent} from './components/app/app.component';
import {RestService} from './services/rest.service';
import {FooterComponent} from './components/common/footer/footer.component';
import {appRoutingProviders, routing} from './app.routes';
import {SearchPipe} from './pipes/search-pipe';
import {LooseCurrencyPipe} from './pipes/loose.currency.pipe';
import {HttpModule} from '@angular/http';
import {AppService} from './services/app.service';

import {AddressinfoComponent} from './components/clientview/client-details-tab/addressinfo/addressinfo.component';
import {AddressInfoService} from './components/clientview/client-details-tab/addressinfo/addressinfo.service';
import {ArrivalDespartureInfoComponent} from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.component';
import {ArrivalDespartureInfoService} from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.service';
import {ClientDetailsComponent} from './components/clientview/client-details-tab/client-details/client-details.component';
import {ClientDetailsService} from './components/clientview/client-details-tab/client-details/client-details.service';
import {DependentsComponent} from './components/clientview/client-details-tab/dependents/dependents.component';
import {DependentService} from './components/clientview/client-details-tab/dependents/dependents.service';
import {DocumentExpirationsComponent} from './components/clientview/client-details-tab/document-expirations/document-expirations.component';
import {DocumentExpirationsService} from './components/clientview/client-details-tab/document-expirations/document-expirations.service';
import {I797HistoryComponent} from './components/clientview/client-details-tab/i-797-history/i-797-history.component';
import {I797HistoryService} from './components/clientview/client-details-tab/i-797-history/i-797-history.service';
import {JobDetailsComponent} from './components/clientview/client-details-tab/job-details/job-details.component';
import {JobDetailsService} from './components/clientview/client-details-tab/job-details/job-details.service';
import {ClientViewPassportInfoComponent} from './components/clientview/client-details-tab/passport-info/passport-info.component';
import {ClientViewPassportInfoService} from './components/clientview/client-details-tab/passport-info/passport-info.service';
import {VisasComponent} from './components/clientview/client-details-tab/visas/visas.component';
import {VisasService} from './components/clientview/client-details-tab/visas/visas.service';

import {ClientRequestService} from './components/clientview/request-tab/request.service';
import {DocumentsComponent} from './components/clientview/documents-tab/documents.component';
import {UiFieldService} from './services/uifield.service';
import {DocumentService} from './components/clientview/documents-tab/documents.service';
import {MoreDetails} from './components/clientview/petitions-tab/MoreDetails';
import {petitionsclientviewComponent} from './components/clientview/petitions-tab/petitions.component';
import {ClientViewPetitionsService} from './components/clientview/petitions-tab/petitions.service';
import {clientviewQuestionnaireComponent} from './components/clientview/questionnaries-tab/questionnaires/questionnaries.component';
import {ClientQuestionnaireService} from './components/clientview/questionnaries-tab/questionnaires/questionnaries.service';
import {RequestButton} from './components/clientview/request-tab/RequestButton';
import {requestclientviewcomponent} from './components/clientview/request-tab/request.component';
import {HeaderComponent} from './components/common/header/header.component';

import {MenuComponent} from './components/common/menu/menu.component';
import {MenuService} from './components/common/menu/menu.service';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';
import {ConfirmComponent} from './components/framework/confirmbox/confirm.component';
import {ConfirmorgComponent} from './components/framework/confirmbox/confirmorg.component';
import {SmartTableService} from './components/framework/smarttable/common/smarttable.service';


import {profileCommonService} from './components/immigrationview/profile-tab/common/immigration-profile.service';
// immigrationview reports tab
import {ActionIcons} from './components/framework/smarttable/cellRenderer/ActionsIcons';
// superuser reports tab
import {AngularDraggableModule} from 'angular2-draggable';
import {HeaderService} from './components/common/header/header.service';

import {QuestionnaireCommonService} from './components/immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';
// superuser misc tab
import {HomeComponent} from './components/common/website/home/home.component';
import {HeaderComponentService} from './components/common/header/header.component.service';
import {FilterComponent} from './components/framework/smarttable/filter/filter.component';
import {CategoryPipe} from './components/framework/pipes/pipes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {InformationComponent} from './components/framework/confirmbox/information.component';
import {ImmigrationClientCommonService} from './components/immigrationview/clients-tab/client-details/common/immigration-client.service';
import {AppSharedModule} from './shared/app.shared.module';
import {ClientsService} from './components/immigrationview/clients-tab/clients/clients.service';


@NgModule({
    imports: [
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        BrowserModule,
        AngularDraggableModule,

        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        AppSharedModule,
        NgbModule.forRoot(),
      NgIdleModule.forRoot()],
    entryComponents: [
        ConfirmComponent, InformationComponent, ConfirmorgComponent, ActionColumns,
         RequestButton, MoreDetails,
        ActionIcons, FilterComponent
    ],
    declarations: [
        CategoryPipe,

        // pdf page components imported above which is for testing only
        ActionIcons,  RequestButton, MoreDetails,
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SearchPipe,
        LooseCurrencyPipe,
        ClientDetailsComponent,
        AddressinfoComponent,
        ClientViewPassportInfoComponent,
        JobDetailsComponent,
        ArrivalDespartureInfoComponent,
        VisasComponent,
        I797HistoryComponent,
        DocumentsComponent,
        DependentsComponent,
        DocumentExpirationsComponent,
        ActionColumns,

        petitionsclientviewComponent,
        requestclientviewcomponent,
        clientviewQuestionnaireComponent,

        ResetPasswordComponent,
        ConfirmComponent,
        InformationComponent,
        ConfirmorgComponent,

        HomeComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DatePipe,
        HeaderService,
        HeaderComponentService,
        CurrencyPipe,
        RestService,
        AppService,
        MenuService,

        ClientRequestService,
        appRoutingProviders,

        DependentService,
        DocumentExpirationsService,
        ArrivalDespartureInfoService,
        VisasService,
        I797HistoryService,
        JobDetailsService,
        UiFieldService,
        DocumentService,
        ClientDetailsService,
        AddressInfoService,
        ClientViewPassportInfoService,
        ImmigrationClientCommonService,
        QuestionnaireCommonService,
        ClientViewPetitionsService,
        ClientQuestionnaireService,
        MenuComponent,

        profileCommonService,
        SmartTableService,
        ClientsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
