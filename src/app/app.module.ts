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
import {InvoicedownloadButton} from './components/superuserview/accounts-tab/account-details/invoice/invoicedownloadbutton';
import {ConfirmComponent} from './components/framework/confirmbox/confirm.component';
import {ConfirmorgComponent} from './components/framework/confirmbox/confirmorg.component';
import {ProductCatalogProductService} from './components/superuserview/product-catalog-tab/products/product-catalog.service';
import {SmartTableService} from './components/framework/smarttable/common/smarttable.service';
import {SuperUserViewAccountsComponent} from './components/superuserview/accounts-tab/accounts/accounts.component';
import {SuperUserviewAccountService} from './components/superuserview/accounts-tab/accounts/accounts.service';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview/accounts-tab/account-details/account-details/account-details.component';
import {SuperuserViewAccountDetailsService} from './components/superuserview/accounts-tab/account-details/account-details/account-details.service';
import {AccountInvoiceComponent} from './components/superuserview/accounts-tab/account-details/invoice/invoice.component';
import {AccountInvoiceService} from './components/superuserview/accounts-tab/account-details/invoice/invoice.service';
import {SuperuserviewProductcatalogComponent} from './components/superuserview/product-catalog-tab/products/product-catalog.component';
import {AccountsManagers} from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountManagersService} from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.service';
import {SuperuserviewAccountdetailsMfdComponent} from './components/superuserview/accounts-tab/account-details/mfd/mfd.component';
import {SuperUserViewInvoicestabService} from './components/superuserview/invoices-tab/invoices.service';
import {AccountPreferencesComponent} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.component';
import {ReportsCommonService} from './components/superuserview/reports-tab/common/reports-common.service';


import {profileCommonService} from './components/immigrationview/profile-tab/common/immigration-profile.service';
import {InvoiceUploadButton} from './components/superuserview/accounts-tab/account-details/invoice/invoiceuploadbutton';
// immigrationview reports tab
import {ActionIcons} from './components/framework/smarttable/cellRenderer/ActionsIcons';
// superuser reports tab
import {statsaccountscomponent} from './components/superuserview/reports-tab/stats/accounts/accounts.component';
import {statsaccountsservice} from './components/superuserview/reports-tab/stats/accounts/accounts.service';
import {SuperUserPetitionsStatusReportsComponent} from './components/superuserview/reports-tab/petitions/status/status.component';
import {SuperUserPetitionStageReportsComponent} from './components/superuserview/reports-tab/petitions/stage/stage.component';
import {superuserpetfinalactionreportscomponent} from './components/superuserview/reports-tab/petitions/final-action/final-action.component';
import {SuperUserPetitionFinalActionReportsService} from './components/superuserview/reports-tab/petitions/final-action/final-action.service';
import {superuserclientstatusreportsservice} from './components/superuserview/reports-tab/clients/status/status.service';
import {SuperUserClientsCreatedReportsComponent} from './components/superuserview/reports-tab/clients/created/created.component';
import {SuperUserClientsCreatedReportsService} from './components/superuserview/reports-tab/clients/created/created.service';
import {SuperUserTotalPetitionsReportsComponent} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.component';
import {SuperUserTotalPetitionsReportsService} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.service';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.component';
import {SuperUsersOpenPetitionService} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.service';
import {superuserstatsotgsReportsComponent} from './components/superuserview/reports-tab/stats/orgs/orgs.component';
import {SuperUserstatorgsReportsService} from './components/superuserview/reports-tab/stats/orgs/orgs.service';
import {superuserstatsclientsReportsComponent} from './components/superuserview/reports-tab/stats/clients/clients.component';
import {SuperUserstatclientsReportsService} from './components/superuserview/reports-tab/stats/clients/clients.service';
import {superuserstatspetitionReportsComponent} from './components/superuserview/reports-tab/stats/petitions/petitions.component';
import {SuperUserstatpetitonReportsService} from './components/superuserview/reports-tab/stats/petitions/petitions.service';
import {SuperUserMonthlyReportsComponent} from './components/superuserview/reports-tab/payments/monthly/monthly.component';
import {SuperUsermonthlyReportsService} from './components/superuserview/reports-tab/payments/monthly/monthly.service';
import {AngularDraggableModule} from 'angular2-draggable';
import {AccountDetailsPaymentsService} from './components/superuserview/accounts-tab/account-details/payments/payments.service';
import {SuperuserViewAccountpreferencessService} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.service';
import {AccountDetailsCommonService} from './components/superuserview/accounts-tab/account-details/common/account-details-common.service';
import {SuperUserViewMFDService} from './components/superuserview/accounts-tab/account-details/mfd/mfd.service';
import {accountDetailsPaymentsComponent} from './components/superuserview/accounts-tab/account-details/payments/payments.component';
import {SuperUserPetitionStagesReportsService} from './components/superuserview/reports-tab/petitions/stage/stage.service';
import {SuperUserPetitionsStatusReportsService} from './components/superuserview/reports-tab/petitions/status/status.service';
import {SuperUserH1BReportsComponent} from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.component';
import {superuserH1Breportsservice} from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.service';
import {SuperUserPetitionTagReportsComponent} from './components/superuserview/reports-tab/petitions/tag/tag.component';
import {SuperUserPetitionTagReportsService} from './components/superuserview/reports-tab/petitions/tag/tag.service';
import {SuperUserViewPaymentstabService} from './components/superuserview/payments-tab/payments.service';
import {SuperuserviewProductcatalogDiscountsComponent} from './components/superuserview/product-catalog-tab/discounts/discounts.component';
import {ProductCatalogDiscountService} from './components/superuserview/product-catalog-tab/discounts/discounts.service';
import {HeaderService} from './components/common/header/header.service';

import {QuestionnaireCommonService} from './components/immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';
import {SuperUserClientStatusReportsComponent} from './components/superuserview/reports-tab/clients/status/status.component';
import {SuperUserViewInvoicestabComponent} from './components/superuserview/invoices-tab/invoices.component';
import {SuperUserViewPaymentstabComponent} from './components/superuserview/payments-tab/payments.component';
// superuser misc tab
import {DemoRequestDetailsComponent} from './components/superuserview/misc-tab/demorequestdetails/demorequestdetails.component';
import {Demorequestdetailsservice} from './components/superuserview/misc-tab/demorequestdetails/demorequestdetails.service';
import {miscsuperusersComponent} from './components/superuserview/misc-tab/superusers/miscsuperusers.component';
import {MiscSuperUsersService} from './components/superuserview/misc-tab/superusers/miscsuperusers.service';
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
        ActionIcons, InvoicedownloadButton, InvoiceUploadButton, FilterComponent
    ],
    declarations: [
        CategoryPipe,

        // pdf page components imported above which is for testing only
        ActionIcons,  RequestButton, MoreDetails, InvoicedownloadButton,
        InvoiceUploadButton,
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
        SuperUserViewAccountsComponent,
        SuperuserViewAccountDetailsComponent,

        ResetPasswordComponent,
        ConfirmComponent,
        InformationComponent,
        ConfirmorgComponent,

        // superuserview
        AccountInvoiceComponent,
        accountDetailsPaymentsComponent,
        SuperuserviewProductcatalogComponent,
        AccountsManagers,
        SuperUserViewInvoicestabComponent,
        SuperUserViewPaymentstabComponent,


        AccountPreferencesComponent,
        // superuserreports
        statsaccountscomponent,
        SuperUserPetitionsStatusReportsComponent,
        SuperUserH1BReportsComponent,

        SuperUserPetitionStageReportsComponent,
        SuperUserPetitionTagReportsComponent,
        SuperuserviewProductcatalogDiscountsComponent,
        superuserpetfinalactionreportscomponent,
        SuperUserClientStatusReportsComponent,
        SuperUserClientsCreatedReportsComponent,
        SuperUserTotalPetitionsReportsComponent,
        SuperUserOpenPetitionComponent,
        superuserstatsotgsReportsComponent,
        superuserstatsclientsReportsComponent,
        superuserstatspetitionReportsComponent,
        SuperUserMonthlyReportsComponent,
        // reports


        // profile

        SuperuserviewAccountdetailsMfdComponent,
        DemoRequestDetailsComponent,
        miscsuperusersComponent,

        HomeComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DatePipe,
        HeaderService,
        ClientsService,
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
        ProductCatalogProductService,

        // superuserview
        SuperUserviewAccountService,
        SuperuserViewAccountDetailsService,
        AccountInvoiceService,
        AccountManagersService,
        SuperUserViewMFDService,
        SuperUserViewPaymentstabService,
        AccountDetailsPaymentsService,
        ProductCatalogDiscountService,
        SuperUserViewInvoicestabService,

        ReportsCommonService,
        SuperuserViewAccountpreferencessService,
        AccountDetailsCommonService,
        profileCommonService,
        // reports
        SuperUserstatorgsReportsService,
        SuperUserstatclientsReportsService,
        SuperUserstatpetitonReportsService,
        SuperUsermonthlyReportsService,
        // superuserreports
        statsaccountsservice,
        SuperUserPetitionsStatusReportsService,
        superuserH1Breportsservice,
        SuperUserPetitionStagesReportsService,
        SuperUserPetitionFinalActionReportsService,
        SuperUserPetitionTagReportsService,
        superuserclientstatusreportsservice,
        SuperUserClientsCreatedReportsService,
        SuperUserTotalPetitionsReportsService,
        SuperUsersOpenPetitionService,
        MiscSuperUsersService,
        Demorequestdetailsservice,
        SmartTableService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
