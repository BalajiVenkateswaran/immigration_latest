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
import {HeaderComponent} from './components/common/header/header.component';

import {MenuComponent} from './components/common/menu/menu.component';
import {MenuService} from './components/common/menu/menu.service';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';
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
import {MatButtonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {ImmigrationClientCommonService} from './components/immigrationview/clients-tab/client-details/common/immigration-client.service';
import {AppSharedModule} from './shared/app.shared.module';
import {ClientsService} from './components/immigrationview/clients-tab/clients/clients.service';
import {DocumentService} from './components/clientview/documents-tab/documents.service';
import {InformationDialogComponent} from './components/framework/popup/information/information.component';
import {ConfirmationDialogComponent} from './components/framework/popup/confirmation/confirmation.component';


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
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
        ConfirmorgComponent, ActionColumns, InformationDialogComponent, ConfirmationDialogComponent,
        ActionIcons, FilterComponent
    ],
    declarations: [
        CategoryPipe,

        // pdf page components imported above which is for testing only
        ActionIcons,
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SearchPipe,
        LooseCurrencyPipe,
        ActionColumns,

        InformationDialogComponent,
        ConfirmationDialogComponent,
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

        appRoutingProviders,

        ImmigrationClientCommonService,
        QuestionnaireCommonService,
        MenuComponent,

        profileCommonService,
        SmartTableService,
        ClientsService,
        DocumentService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
