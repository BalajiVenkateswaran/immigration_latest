import { viewAddressInfo } from './models/viewAddressInfo';
import { CustomFilterRow } from './components/smarttableframework/CustomFilterRow';
import { SmartTableFramework } from './components/smarttableframework/smarttable-framework.component';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {APP_BASE_HREF, CurrencyPipe} from '@angular/common';
import {RouterModule, Router}   from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { ChartsModule } from 'ng2-charts';
import Chart from 'chart.js';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {ActionColumns} from './components/smarttableframework/ActionColumns';
import {SendToClientQuestionnaire} from './components/immigrationview-questionnaire/SendToClientQuestionnaire';

import {AppComponent}  from './components/app/app.component';
import {Quetionairervice} from "./components/questionnaire-i129/questionnaire-i129.service";
import {loginService} from "./components/login/login.service";
import {RestService} from "./services/rest.service";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {routing, appRoutingProviders}  from './app.routes';
import {MenuComponent} from "./components/menu/menu.component";
import {SearchPipe} from './pipes/search-pipe';
import {LooseCurrencyPipe} from "./pipes/loose.currency.pipe";
import {Http, ConnectionBackend, RequestOptions, HttpModule} from "@angular/http";
import { ClientDetailsComponent } from './components/clientview-client-details/client-details.component';
import {AppService} from "./services/app.service";
import { ImmigrationviewPetitionDetailsComponent } from './components/immigrationview-petition-details/petition-details.component';
import { ImmigrationviewQuestionnaireComponent } from './components/immigrationview-questionnaire/questionnaire.component';
import { ImmigrationviewFormsComponent } from './components/immigrationview-forms/forms.component';
import {OrganizationDocumentRepositoryComponent} from "./components/immigrationview-organization-document-repository/organization-document-repository.component";
import {DocumentManagementComponent} from "./components/immigrationview-document-management/document-management.component";
import { AddressinfoComponent } from './components/clientview-addressinfo/addressinfo.component';
import {PetitionDocumentRepositoryComponent} from "./components/immigrationview-petition-document-repository/petition-document-repository.component";
import {ClientDocumentRepositoryComponent} from "./components/immigrationview-client-document-repository/client-document-repository.component";

import { DependentDetailsComponent } from './components/dependentdetails/dependentdetails.component';

import {ImmigrationviewDocumentExpirationsComponent} from "./components/immigrationview-document-expirations/document-expirations.component";
import { PassportInfoComponent } from './components/clientview-passport-info/passport-info.component';
import { JobDetailsComponent } from './components/clientview-job-details/job-details.component';
import { ArrivalDespartureInfoComponent } from './components/clientview-arrival-desparture-info/arrival-desparture-info.component';
import { VisasComponent } from './components/clientview-visas/visas.component';
import { I797HistoryComponent } from './components/clientview-i-797-history/i-797-history.component';
import { DocumentsComponent } from './components/clientview-documents/documents.component';
import { DependentsComponent } from './components/clientview-dependents/dependents.component';
import { PetitionsComponent } from './components/petitions/petitions.component';
import { ClientsComponent } from './components/clients/clients.component';
import { OrganizationComponent } from './components/organization/organization.component';
import {ManageAccountUserComponent} from "./components/manageaccount-user/manageaccount-user.component";
import {ManageAccountOrganizationsComponent} from "./components/manageaccount-organizations/manageaccount-organizations.component";
import {ManageAccountPetitionTypeStagesComponent} from "./components/manageaccount-petitiontypestages/manageaccount-petitiontypestages.component";
import {ManageAccountShippingAddressComponent} from "./components/manageaccount-shippingaddress/manageaccount-shippingaddress.component";
import {ManageAccountPreferencesComponent} from "./components/manageaccount-preferences/manageaccount-preferences.component";
import {ManageAccountInvoicesComponent} from './components/manageaccount-invoices/manageaccount-invoices.component';
import {ManageAccountPaymentsComponent} from './components/manageaccount-payments/manageaccount-payments.component';
import {DocumentExpirationsComponent} from './components/clientview-document-expirations/document-expirations.component';

import {ImmigrationViewClientDetailsComponent} from './components/immigrationview-client-details/client-details.component';
import {ImmigrationViewAddressinfoComponent} from "./components/immigrationview-address/addressinfo.component";
import {ImmigrationViewDependentsComponent} from "./components/immigrationview-dependents/dependents.component";
import {ImmigrationViewPassportInfoComponent} from './components/immigrationview-passport-info/passport-info.component';
import {ImmigrationViewJobDetailsComponent} from './components/immigrationview-job-details/job-details.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './components/immigrationview-arrival-departure-info/arrival-departure-info.component';
import { ImmigrationViewArrivalDepartureInfoService } from './components/immigrationview-arrival-departure-info/arrival-departure-info.service';
import { ImmigrationViewVisasComponent } from './components/immigrationview-visas/visas.component';
import { ImmigrationViewI797HistoryComponent } from './components/immigrationview-i-797-history/i-797-history.component';
import { ImmigrationViewPetitionsComponent } from './components/immigrationview-petitions/petitions.component';
import {PetitionsService} from "./components/petitions/petitions.service";
import {ClientsService} from "./components/clients/clients.service";
import {ClientRequestService} from "./components/clientview-request/clientview-request.service";
import {ManageAccountUserService} from "./components/manageaccount-user/manageaccount-user.service";
import {ManageAccountOrganizationsService} from "./components/manageaccount-organizations/manageaccount-organizations.service";
import {ImmigrationViewDependentService} from "./components/immigrationview-dependents/dependents.service";
import {OrganizationDocumentRepositoryService} from "./components/immigrationview-organization-document-repository/organization-document-repository.service";
import {ImmigrationViewVisasService} from "./components/immigrationview-visas/visas.service";
import {ImmigrationViewI797HistoryService} from "./components/immigrationview-i-797-history/i-797-history.service";
import {ImmigrationViewPetitionsService} from "./components/immigrationview-petitions/petitions.service";
import {FormsService} from "./components/immigrationview-forms/forms.service";
import {DependentService} from "./components/clientview-dependents/dependents.service";
import {DocumentExpirationsService} from "./components/clientview-document-expirations/document-expirations.service";
import {ArrivalDespartureInfoService} from "./components/clientview-arrival-desparture-info/arrival-desparture-info.service";
import {VisasService} from "./components/clientview-visas/visas.service";
import {I797HistoryService} from "./components/clientview-i-797-history/i-797-history.service";
import {PassportInfoService} from "./components/clientview-passport-info/passport-info.service";
import {Addressinfoservice} from "./components/immigrationview-address/addressinfo.service";
import {clientviewPetitionsService} from "./components/clientview-petitions/clientview-petitions.service";
import {UiFieldService} from "./services/uifield.service";
import {JobDetailsService} from "./components/clientview-job-details/job-details.service";
import {AddressInfoService} from "./components/clientview-addressinfo/addressinfo.service";
import {ClientDetailsService} from "./components/clientview-client-details/client-details.service";
import {OrganizationService} from "./components/organization/organization.service";
import {DependentDetailsService} from "./components/dependentdetails/dependentdetails.service";
import {DocumentManagementService} from "./components/immigrationview-document-management/document-management.service";
import {ImmigrationViewPetitionDetailsService} from "./components/immigrationview-petition-details/petition-details.service";
import {ManageAccountShippingAddressService} from "./components/manageaccount-shippingaddress/manageaccount-shippingaddress.service";
import {ManageAccountPetitionStagesService} from "./components/manageaccount-petitiontypestages/manageaccount-petitiontypestages.service";
import { QuestionnaireService } from './components/immigrationview-questionnaire/questionnaire.service';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {LoginComponent} from "./components/login/login.component";
import {QuestionnaireI129Component} from "./components/questionnaire-i129/questionnaire-i129.component";
import {MenuService} from "./components/menu/menu.service";
import {petitionsclientviewComponent} from "./components/clientview-petitions/clientview-petitions.component";
import {requestclientviewcomponent} from "./components/clientview-request/clientview-request.component";
import {clientviewQuestionnaireComponent} from "./components/clientview-Questionnaries/clientview-Questionnaries.component";
import {passportInfoService} from './components/immigrationview-passport-info/passport-info.service';
import {ImmigrationViewClientDetailsService} from './components/immigrationview-client-details/client-details.service';
import {PetitionDocumentRepositoryService} from './components/immigrationview-petition-document-repository/petition-document-repository.service';
import {ClientDocumentRepositoryService} from './components/immigrationview-client-document-repository/client-document-repository.service';
import {DocumentService} from './components/clientview-documents/documents.service';
import {JobdetailsService} from './components/immigrationview-job-details/job-details-service';
import {ImmigrationviewDocumentExpirationsService} from './components/immigrationview-document-expirations/document-expirations.service';
import {QuestionnaireI129ClientComponent} from './components/questionnaire-i129client/questionnaire-i129-client.component';
import {QuestionnaireI129DCComponent} from './components/i129dc/questionnaire-i129dc.component';
import {QuestionnaireI129DCService} from './components/i129dc/questionnaire-i129dc.service';
import {QuestionnaireI129HComponent} from './components/i129h/questionnaire-i129h.component';
import { MyDatePickerModule } from 'mydatepicker';

import {QuestionnaireI129HclientviewComponent} from './components/clientview-i129h/questionnaire-i129h.component';

import {QuestionnaireClientViewService} from './components/questionnaire-i129client/questionnaire-i129-client.component.service';
import {ResetPasswordService} from './components/reset-password/reset-password.service';

import {QuestionnaireI129HService} from "./components/i129h/questionnaire-i129h.service";
import {QuestionnaireI129HClentviewService} from "./components/clientview-i129h/questionnaire-i129h.service";
import {ClientQuestionnaireService} from "./components/clientview-Questionnaries/clientview-Questionnaries.service";


import { RequestButton } from "./components/clientview-request/RequestButton";
import { switchButton } from "./components/immigrationview-profileswitch/switchButton";
import { InvoicedownloadButton } from "./components/superuserview-accountdetails-invoice/invoicedownloadbutton";




import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './components/confirmbox/confirm.component';
import { ConfirmorgComponent } from './components/confirmbox/confirmorg.component';

import { CustomRenderComponent } from './components/immigrationview-petitions/custom-render.component';


import {AgGridModule} from "ag-grid-angular/main";
import { ProductCatalogProductService} from './components/superuserview-productcatalog/superuserview-productcatalog.service';
//superusersview

import {superuserViewAccountsComponent} from './components/superuserview-accounts/accounts.component';
import {superUserviewAccountService} from './components/superuserview-accounts/accounts.component.service';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview-account-details/superuserview-account-details';
import {SuperuserViewAccountDetailsService} from './components/superuserview-account-details/superuserview-account-details.service';
import {AccountInvoiceComponent} from './components/superuserview-accountdetails-invoice/invoice-component';
import {AccountInvoiceService} from './components/superuserview-accountdetails-invoice/invoice.service';
import { SuperuserviewProductcatalogComponent } from './components/superuserview-productcatalog/superuserview-productcatalog.component';
import { AccountsManagers } from './components/superuserview-accountdetails-managers/accountmanagers-component';
import { AccountManagersService } from './components/superuserview-accountdetails-managers/accountmanagers.service';
import {accountDetailsPaymentsComponent} from './components/superuserview-accountdetails-payments/accountdetails-payments.component';
import { ManageAccountPaymentsService } from "./components/manageaccount-payments/manageaccount-payments.service";
import { SuperuserviewAccountdetailsMfdComponent } from './components/superuserview-accountdetails-mfd/superuserview-accountdetails-mfd.component';
import { SuperUserViewMFDService } from "./components/superuserview-accountdetails-mfd/accountdetails-mfd-service";
import { ManageAccountInvoiceService } from "./components/manageaccount-invoices/manageaccount-invoices.service";
import {ImmigrationviewPetitionNotesComponent } from './components/immigrationview-petition-notes/petition-notes.component';
import { ManageaccountUserDetailsComponent } from './components/manageaccount-user-details/manageaccount-user-details.component'
import { ImmigrationViewPetitionNotesService } from "./components/immigrationview-petition-notes/petition-notes.service";


import {MarkforDeletionComponent} from './components/manageaccount-markfordeletion/manageaccount-markfordeletion.component';
import {markfordeletionservice} from './components/manageaccount-markfordeletion/manageaccount-markfordeletion.service';
import { AccountDetailsPaymentsService } from './components/superuserview-accountdetails-payments/accountdetails-payments.service';
import { SuperuserviewProductcatalogDiscountsComponent } from './components/superuserview-productcatalog-discounts/superuserview-productcatalog-discounts.component';
import {ProductCatalogDiscountService} from './components/superuserview-productcatalog-discounts/superuserview-productcatalog-discounts.service';
import {SuperUserViewPaymentstabComponent} from './components/superuserview-payments/payments.component';
import {SuperUserViewPaymentstabService} from './components/superuserview-payments/payments.service';
import {SuperUserViewInvoicestabComponent} from './components/superuserview-invoices/invoices.component';
import {SuperUserViewInvoicestabService} from './components/superuserview-invoices/invoices.service';
import { ManageAccountpreferencessService } from "./components/manageaccount-preferences/manageaccount-preferences.service";
import {AccountPreferencesComponent} from './components/superuserview-accountpreferences/accountpreferences.component';
import {SuperuserViewAccountpreferencessService} from './components/superuserview-accountpreferences/accountpreferences.service';
import {AccountDetailsCommonService} from './components/superuserview/accounts-tab/account-details/common/account-details-common.service';
import {ReportsCommonService} from './components/superuserview/reports-tab/common/reports-common.service';


import {profileCommonService} from './components/immigrationview/profile/common/immigration-profile.service';
import {InvoiceUploadButton} from './components/superuserview-accountdetails-invoice/invoiceuploadbutton';
import { ManageAccountUserDetailsService } from "./components/manageaccount-user-details/manageaccount-user-details.service";

//immigrationview reports tab
import {petitionsstatusreportscomponent} from './components/immigrationview-petitions-statusreports/petitions-statusreports.component';
import {petitionsstatusreportsservice} from './components/immigrationview-petitions-statusreports/petitions-statusreports.service';
import {ActionIcons} from './components/smarttableframework/cellRenderer/ActionsIcons';
import { GenerateFormButton } from "./components/immigrationview-forms/GenerateFormButton";
import { DownloadButton } from "./components/immigrationview-forms/DownloadButton";
import {clientscreatedreportscomponent} from './components/immigrationview-clients-createdreports/clients-createdreports.component';
import {clientscreatedreportsservice} from './components/immigrationview-clients-createdreports/clients-createdreports.service';
import {petitionstypesreportscomponent} from './components/immigrationview-petitontypereports/petitiontypereports.component';
import {petitionstypesreportsservice} from './components/immigrationview-petitontypereports/petitiontypereports.service';
import {petitionstagesreportscomponent} from './components/immigrationview-petitionstagesreports/petitionstagesreports.component';
import {petitionstagesreportsservice} from './components/immigrationview-petitionstagesreports/petitionstagesreports.service';
import {petitionstagsreportscomponent} from './components/immigrationview-petitiontagsreports/petitiontagsreports.component';
import {petitionstagsreportsservice} from './components/immigrationview-petitiontagsreports/petitiontagsreports.service';
import {clientstatusreportscomponent} from './components/immigartioniew-clientsstatusreports/clientstatusreports.component';
import {clientstatusreportsservice} from './components/immigartioniew-clientsstatusreports/clientstatusreports.service';
import {usertotalpetitionscomponent} from './components/immigrationview-userstotalpetreports/userstotalpetitionreports.component';
import {usertotalpetitionservice} from './components/immigrationview-userstotalpetreports/userstotalpetitionreports.service';

import {useropenpetitioncomponent} from './components/immigrationview-usersopenpetreports/usersopenreports.component';
import {usersopenpetitionservice} from './components/immigrationview-usersopenpetreports/usersopenreports.service';

import {petitionfinalactioncomponent} from './components/immigrationview-petitionfinalactionreports/petitionfinalaction.component';
import {petitionfinalactionservice} from './components/immigrationview-petitionfinalactionreports/petitionfinalaction.service';

import { MoreDetails } from "./components/clientview-petitions/MoreDetails";
import { HeaderService } from "./components/header/header.service";

import { DownloadInvoiceButton } from "./components/manageaccount-invoices/DownloadInvoiceButton";
//immiviewprofiletab
import {profileusercomponent} from './components/immigrationview-profileuser/profileuser.component';
import {profileuserservice} from './components/immigrationview-profileuser/profileuser.service';
import {profileloginhiscomponent} from './components/immigrationview-profileloginhistory/profileloginhistory.component';
import {profileloginhisservice} from './components/immigrationview-profileloginhistory/profileloginhistory.service';
import {profileswitchcomponent} from './components/immigrationview-profileswitch/profileswitch.component';
import {profileswitchservice} from './components/immigrationview-profileswitch/profileswitch.service';
import {profilechangepwdcomponent} from './components/immigrationview-profilechangepassword/profilechangepassword.component';
import {profilechangepwdservice} from './components/immigrationview-profilechangepassword/profilechangepassword.service';
import {profiletodolistcomponent} from './components/immigrationview-profiletodolist/profiletodolist.component';
import {profiletodolistservice} from './components/immigrationview-profiletodolist/profiletodolist.service';
import { ManageaccountChecklistComponent } from './components/manageaccount-checklist/manageaccount-checklist.component';
import { ManageAccountChecklistService } from "./components/manageaccount-checklist/manageaccount-checklist.service";

//superuser reports tab
import {statsaccountscomponent} from './components/superuser-statsaccountsreports/statsaccountsreports.component';
import {statsaccountsservice} from './components/superuser-statsaccountsreports/statsaccountsreports.service';
import {superpetitionsstatusreportscomponent} from './components/superuser-petitionstatusreports/superpetitionstatusreports.component';
import {superpetitionsstatusreportsservice} from './components/superuser-petitionstatusreports/superpetitionstatusreports.service';
import {superuserH1Breportscomponent} from './components/superuser-petitiontypeh1breports/petitiontypesH1Breports.component';
import {superuserH1Breportsservice} from './components/superuser-petitiontypeh1breports/petitiontypesH1Breports.service';
import {superuserL1Areportscomponent} from './components/superuser-petitiontypeL1Areports/petitionsubtypeL1A.component';
import {superuserL1Areportsservice} from './components/superuser-petitiontypeL1Areports/petitionsubtypeL1A.service';
import {superuserpetstagereportscomponent} from './components/superuser-petitionstagereports/superuser-petitionstagereports.component';
import {superuserpetitionstagesreportsservice} from './components/superuser-petitionstagereports/superuser-petitionstagereports.service';
import {superuserpettagreportscomponent} from './components/superuser-petitiontagreports/superuser-petitiontagreport.component';
import {superuserpetitiontagreportsservice} from './components/superuser-petitiontagreports/superuser-petitiontagreport.service';
import {superuserpetfinalactionreportscomponent} from './components/superuser-petionfinalactionreports/superuser-petitionfinalaction.component';
import {superuserpetitionfinalactionreportsservice} from './components/superuser-petionfinalactionreports/superuser-petitionfinalaction.service';
import {superuserclientstatusreportscomponent} from './components/superuser-clientstatusreports/superuser-clientstatusreports.component';
import {superuserclientstatusreportsservice} from './components/superuser-clientstatusreports/superuser-clientstatusreports.service';
import {SuperUserClientsCreatedReportsComponent} from './components/superuser-clientscreatedreports/superuser-clientscreatedreports.component';
import {SuperUserClientsCreatedReportsService} from './components/superuser-clientscreatedreports/superuser-clientscreatedreports.service';
import {superusertotalpetitionsreportscomponent} from './components/superuser-usertotalpetitions/superuser-usertotalpetitions.component';
import {sperusertotalpetitionsreportsservice} from './components/superuser-usertotalpetitions/superuser-usertotalpetitions.service';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/useropenpetitions.component';
import {SuperUsersOpenPetitionService} from './components/superuserview/reports-tab/users/openpetitions/useropenpetitions.service';


//PDF Pages for testing only
import {page1of36Component} from './components/page1of36/page1of36.component';
import {page2of36Component} from './components/page2of36/page2of36.component';





import { AngularDraggableModule } from 'angular2-draggable';
@NgModule({
    imports: [
        BrowserModule,
        AngularDraggableModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        DragulaModule,
        MyDatePickerModule,
        BootstrapModalModule,
        AgGridModule.withComponents([SmartTableFramework]),
        NgbModule.forRoot()],
    entryComponents: [
        ConfirmComponent, ConfirmorgComponent, CustomRenderComponent, CustomFilterRow, SmartTableFramework, ActionColumns, SendToClientQuestionnaire, ActionIcons, GenerateFormButton, DownloadButton, RequestButton, MoreDetails, DownloadInvoiceButton, switchButton, InvoicedownloadButton,InvoiceUploadButton/*AdvancedExamplesCustomEditorComponent*/
    ],
    declarations: [
        page1of36Component,
        page2of36Component,
        //pdf oage components imported above which is for testing only
        CustomRenderComponent, ActionIcons, GenerateFormButton, DownloadButton, RequestButton, MoreDetails, DownloadInvoiceButton, switchButton, InvoicedownloadButton,InvoiceUploadButton,/*AdvancedExamplesCustomEditorComponent,*/
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SearchPipe,
        LooseCurrencyPipe,
        ClientDetailsComponent,
        ImmigrationviewPetitionDetailsComponent,
        ImmigrationviewQuestionnaireComponent,
        ImmigrationviewFormsComponent,
        OrganizationDocumentRepositoryComponent,
        DocumentManagementComponent,
        AddressinfoComponent,
        DependentDetailsComponent,
        ImmigrationviewDocumentExpirationsComponent,
        PassportInfoComponent,
        JobDetailsComponent,
        ArrivalDespartureInfoComponent,
        VisasComponent,
        I797HistoryComponent,
        DocumentsComponent,
        PetitionsComponent,
        ClientsComponent,
        OrganizationComponent,
        ManageAccountUserComponent,
        ManageAccountOrganizationsComponent,
        ManageAccountPetitionTypeStagesComponent,
        ManageAccountShippingAddressComponent,
        ManageAccountPreferencesComponent,
        ManageAccountInvoicesComponent,
        ManageAccountPaymentsComponent,
        DependentsComponent,
        DocumentExpirationsComponent,
        PetitionDocumentRepositoryComponent,
        ClientDocumentRepositoryComponent,
        ImmigrationViewClientDetailsComponent,
        ImmigrationViewAddressinfoComponent,
        ImmigrationViewDependentsComponent,
        ActionColumns,
        SendToClientQuestionnaire,
        ImmigrationViewPassportInfoComponent,
        ImmigrationViewJobDetailsComponent,
        ImmigrationViewArrivalDepartureInfoComponent,
        ImmigrationViewVisasComponent,
        ImmigrationViewI797HistoryComponent,
        ImmigrationViewPetitionsComponent,

        LoginComponent,
        QuestionnaireI129Component,
        petitionsclientviewComponent,
        requestclientviewcomponent,
        clientviewQuestionnaireComponent,
        QuestionnaireI129ClientComponent,
        QuestionnaireI129DCComponent,
        QuestionnaireI129HComponent,
        QuestionnaireI129HclientviewComponent,
        superuserViewAccountsComponent,
        SuperuserViewAccountDetailsComponent,

        ResetPasswordComponent,
        ConfirmComponent,
        ConfirmorgComponent,
    

        //SmartTableFramework
        SmartTableFramework, CustomFilterRow,
        //superuserview
        AccountInvoiceComponent,
        accountDetailsPaymentsComponent,
        SuperuserviewProductcatalogComponent,
        AccountsManagers,
        SuperUserViewInvoicestabComponent,
        SuperUserViewPaymentstabComponent,

        MarkforDeletionComponent,
        AccountPreferencesComponent,
        //superuserreports
        statsaccountscomponent,
        superpetitionsstatusreportscomponent,
        superuserH1Breportscomponent,
        superuserL1Areportscomponent,
        superuserpetstagereportscomponent,
        superuserpettagreportscomponent,
        SuperuserviewProductcatalogDiscountsComponent,
        ImmigrationviewPetitionNotesComponent,
        ManageaccountUserDetailsComponent,
        superuserpetfinalactionreportscomponent,
        superuserclientstatusreportscomponent,
        SuperUserClientsCreatedReportsComponent,
        superusertotalpetitionsreportscomponent,
        SuperUserOpenPetitionComponent,
        //reports
        petitionsstatusreportscomponent,
        clientscreatedreportscomponent,
        petitionstypesreportscomponent,
        petitionstagesreportscomponent,
        petitionstagsreportscomponent,
        clientstatusreportscomponent,
        usertotalpetitionscomponent,
        useropenpetitioncomponent,
        petitionfinalactioncomponent,

        //profile
        profileusercomponent,
        profileloginhiscomponent,
        profileswitchcomponent,
        profilechangepwdcomponent,
        profiletodolistcomponent,
        SuperuserviewAccountdetailsMfdComponent,
        ManageaccountChecklistComponent

    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        HeaderService,
        CurrencyPipe,
        RestService,
        AppService,
        MenuService,
        PetitionsService,
        ClientsService,
        ClientRequestService,
        appRoutingProviders,
        ManageAccountUserService,
        ManageAccountOrganizationsService,
        QuestionnaireService,
        ImmigrationViewDependentService,
        OrganizationDocumentRepositoryService,
        Addressinfoservice,
        ImmigrationViewVisasService,
        ImmigrationViewI797HistoryService,
        ImmigrationViewPetitionsService,
        ImmigrationViewArrivalDepartureInfoService,
        FormsService,
        DependentService,
        DocumentExpirationsService,
        ArrivalDespartureInfoService,
        VisasService,
        I797HistoryService,
        JobDetailsService,
        UiFieldService,
        OrganizationService,
        DependentDetailsService,
        ClientDocumentRepositoryService,
        DocumentService,
        ClientDetailsService,
        AddressInfoService,
        PassportInfoService,
        DocumentManagementService,
        passportInfoService,
        ImmigrationViewClientDetailsService,
        ImmigrationViewPetitionDetailsService,
        JobdetailsService,
        loginService,
        PetitionDocumentRepositoryService,
        ImmigrationviewDocumentExpirationsService,
        clientviewPetitionsService,
        ManageAccountShippingAddressService,
        ManageAccountPetitionStagesService,
        Quetionairervice,
        QuestionnaireClientViewService,
        QuestionnaireI129DCService,
        QuestionnaireI129HService,
        QuestionnaireI129HClentviewService,
        ResetPasswordService,
        ClientQuestionnaireService,
        MenuComponent,
        //
        ImmigrationViewPetitionNotesService,
        ManageAccountInvoiceService,
        ManageAccountpreferencessService,
        ProductCatalogProductService,
        ManageAccountPaymentsService,
        ManageAccountChecklistService,
        //superuserview
        superUserviewAccountService,
        SuperuserViewAccountDetailsService,
        AccountInvoiceService,
        AccountManagersService,
        SuperUserViewMFDService,
        markfordeletionservice,
        SuperUserViewPaymentstabService,
        AccountDetailsPaymentsService,
        ProductCatalogDiscountService,
        //superuserview
        superUserviewAccountService,
        SuperuserViewAccountDetailsService,
        AccountInvoiceService,
        AccountManagersService,
        SuperUserViewInvoicestabService,
        markfordeletionservice,
        SuperUserViewPaymentstabService,
        AccountDetailsPaymentsService,
        ManageAccountUserDetailsService,
        ReportsCommonService,
        SuperuserViewAccountpreferencessService,
        AccountDetailsCommonService,
        profileCommonService,
        //reports
        petitionsstatusreportsservice,
        clientscreatedreportsservice,
        petitionstypesreportsservice,
        petitionstagesreportsservice,
        clientstatusreportsservice,
        petitionstagsreportsservice,
        usertotalpetitionservice,
        usersopenpetitionservice,
        petitionfinalactionservice,
        //profile
        profileuserservice,
        profileloginhisservice,
        profileswitchservice,
        profilechangepwdservice,
        profiletodolistservice,
        //superuserreports
        statsaccountsservice,
        superpetitionsstatusreportsservice,
        superuserH1Breportsservice,
        superuserL1Areportsservice,
        superuserpetitionstagesreportsservice,
        superuserpetitionfinalactionreportsservice,
        superuserpetitiontagreportsservice,
        superuserclientstatusreportsservice,
        SuperUserClientsCreatedReportsService,
        sperusertotalpetitionsreportsservice,
        SuperUsersOpenPetitionService

    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
