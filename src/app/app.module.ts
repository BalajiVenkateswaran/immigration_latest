import {viewAddressInfo} from './models/viewAddressInfo';
import {CustomFilterRow} from './components/framework/smarttable/CustomFilterRow';
import {SmartTableFramework} from './components/framework/smarttable/smarttable.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {APP_BASE_HREF, CurrencyPipe} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {ChartsModule} from 'ng2-charts';
import Chart from 'chart.js';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {ActionColumns} from './components/framework/smarttable/ActionColumns';
import {SendToClientQuestionnaire} from './components/immigrationview/petitions-tab/petition-details/questionnaire/SendToClientQuestionnaire';

import {AppComponent} from './components/app/app.component';
import {Quetionairervice} from "./components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129/i129.service";
import {RestService} from "./services/rest.service";
import {FooterComponent} from "./components/common/footer/footer.component";
import {routing, appRoutingProviders} from './app.routes';
import {SearchPipe} from './pipes/search-pipe';
import {LooseCurrencyPipe} from "./pipes/loose.currency.pipe";
import {Http, ConnectionBackend, RequestOptions, HttpModule} from "@angular/http";
import {AppService} from "./services/app.service";
import {ImmigrationviewPetitionDetailsComponent} from './components/immigrationview/petitions-tab/petition-details/petition-details/petition-details.component';
import {ImmigrationviewFormsComponent} from './components/immigrationview/petitions-tab/petition-details/forms/forms.component';
import {OrganizationDocumentRepositoryComponent} from "./components/immigrationview/organization-tab/document-repository/document-repository.component";
import {DocumentManagementComponent} from "./components/immigrationview/clients-tab/client-details/document-management/document-management.component";
import {PetitionDocumentRepositoryComponent} from "./components/immigrationview/petitions-tab/petition-details/document-repository/document-repository.component";
import {ClientDocumentRepositoryComponent} from "./components/immigrationview/clients-tab/client-details/document-repository/document-repository.component";

import {DependentDetailsComponent} from './components/immigrationview/clients-tab/client-details/dependent-details/dependent-details.component';

import {PetitionsComponent} from './components/immigrationview/petitions-tab/petitions/petitions.component';
import {ClientsComponent} from './components/immigrationview/clients-tab/clients/clients.component';
import {ClientsService} from './components/immigrationview/clients-tab/clients/clients.service';
import { AddressinfoComponent } from './components/clientview/client-details-tab/addressinfo/addressinfo.component';
import { AddressInfoService } from './components/clientview/client-details-tab/addressinfo/addressinfo.service';
import { ArrivalDespartureInfoComponent } from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.component';
import { ArrivalDespartureInfoService } from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.service';
import { ClientDetailsComponent } from './components/clientview/client-details-tab/client-details/client-details.component';
import { ClientDetailsService } from './components/clientview/client-details-tab/client-details/client-details.service';
import { DependentsComponent } from './components/clientview/client-details-tab/dependents/dependents.component';
import { DependentService } from './components/clientview/client-details-tab/dependents/dependents.service';
import { DocumentExpirationsComponent } from './components/clientview/client-details-tab/document-expirations/document-expirations.component';
import { DocumentExpirationsService } from './components/clientview/client-details-tab/document-expirations/document-expirations.service';
import { I797HistoryComponent } from './components/clientview/client-details-tab/i-797-history/i-797-history.component';
import { I797HistoryService } from './components/clientview/client-details-tab/i-797-history/i-797-history.service';
import { JobDetailsComponent } from './components/clientview/client-details-tab/job-details/job-details.component';
import { JobDetailsService } from './components/clientview/client-details-tab/job-details/job-details.service';
import { PassportInfoComponent } from './components/clientview/client-details-tab/passport-info/passport-info.component';
import { PassportInfoService } from './components/clientview/client-details-tab/passport-info/passport-info.service';
import { VisasComponent } from './components/clientview/client-details-tab/visas/visas.component';
import { VisasService } from './components/clientview/client-details-tab/visas/visas.service';
import {ManageAccountUserComponent} from "./components/immigrationview/manage-account-tab/user/user.component";
import {ManageAccountOrganizationsComponent} from "./components/immigrationview/manage-account-tab/organizations/organizations.component";

import {ImmigrationViewClientDetailsComponent} from './components/immigrationview/clients-tab/client-details/client-details/client-details.component';
import {PetitionsService} from "./components/immigrationview/petitions-tab/petitions/petitions.service";
import {ClientRequestService} from "./components/clientview/request-tab/request.service";
import {OrganizationDocumentRepositoryService} from "./components/immigrationview/organization-tab/document-repository/document-repository.service";
import {FormsService} from "./components/immigrationview/petitions-tab/petition-details/forms/forms.service";
import {DocumentsComponent} from './components/clientview/documents-tab/documents.component';
import {UiFieldService} from "./services/uifield.service";
import {OrganizationService} from "./components/immigrationview/organization-tab/organization/organization.service";
import {DependentDetailsService} from "./components/immigrationview/clients-tab/client-details/dependent-details/dependent-details.service";
import {ImmigrationViewPetitionDetailsService} from "./components/immigrationview/petitions-tab/petition-details/petition-details/petition-details.service";
import {QuestionnaireService} from './components/immigrationview/petitions-tab/petition-details/questionnaire/questionnaire.service';
import {PetitionDocumentRepositoryService} from './components/immigrationview/petitions-tab/petition-details/document-repository/document-repository.service';
import {DocumentService} from './components/clientview/documents-tab/documents.service';
import {MoreDetails} from './components/clientview/petitions-tab/MoreDetails';
import {petitionsclientviewComponent} from './components/clientview/petitions-tab/petitions.component';
import { ClientViewPetitionsService } from './components/clientview/petitions-tab/petitions.service';
import { QuestionnaireI129ClientComponent } from './components/clientview/questionnaries-tab/i129/i129.component';
import { QuestionnaireClientViewService } from './components/clientview/questionnaries-tab/i129/i129.service';
import { QuestionnaireI129HclientviewComponent } from './components/clientview/questionnaries-tab/i129h/i129h.component';
import { QuestionnaireI129HClentviewService } from './components/clientview/questionnaries-tab/i129h/i129h.service';
import { clientviewQuestionnaireComponent } from './components/clientview/questionnaries-tab/questionnaires/questionnaries.component';
import { ClientQuestionnaireService } from './components/clientview/questionnaries-tab/questionnaires/questionnaries.service';
import {RequestButton} from './components/clientview/request-tab/RequestButton';
import { requestclientviewcomponent } from './components/clientview/request-tab/request.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LoginComponent } from './components/common/login/login.component';
import { loginService } from './components/common/login/login.service';
import { MenuComponent } from './components/common/menu/menu.component';
import { MenuService } from './components/common/menu/menu.service';
import { ResetPasswordComponent } from './components/common/reset-password/reset-password.component';
import { ResetPasswordService } from './components/common/reset-password/reset-password.service';
import {QuestionnaireI129DCComponent} from './components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129dc/i129dc.component';
import {QuestionnaireI129DCService} from './components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129dc/i129dc.service';
import {MyDatePickerModule} from 'mydatepicker';
import {InvoicedownloadButton} from "./components/superuserview/accounts-tab/account-details/invoice/invoicedownloadbutton";

import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from './components/framework/confirmbox/confirm.component';
import { ConfirmorgComponent } from './components/framework/confirmbox/confirmorg.component';

import {AgGridModule} from "ag-grid-angular/main";
import {ProductCatalogProductService} from './components/superuserview/product-catalog-tab/products/product-catalog.service';
import {checklistdownloadButton} from './components/immigrationview/manage-account-tab/checklist/downloadButton';

//superusersview

import {SuperUserViewAccountsComponent} from './components/superuserview/accounts-tab/accounts/accounts.component';
import {superUserviewAccountService} from './components/superuserview/accounts-tab/accounts/accounts.service';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview/accounts-tab/account-details/account-details/account-details.component';
import {SuperuserViewAccountDetailsService} from './components/superuserview/accounts-tab/account-details/account-details/account-details.service';
import {AccountInvoiceComponent} from './components/superuserview/accounts-tab/account-details/invoice/invoice.component';
import {AccountInvoiceService} from './components/superuserview/accounts-tab/account-details/invoice/invoice.service';
import {SuperuserviewProductcatalogComponent} from './components/superuserview/product-catalog-tab/products/product-catalog.component';
import {AccountsManagers} from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountManagersService} from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.service';
import {SuperuserviewAccountdetailsMfdComponent} from './components/superuserview/accounts-tab/account-details/mfd/mfd.component';
import {ManageAccountInvoiceService} from "./components/immigrationview/manage-account-tab/invoices/invoices.service";
import {ImmigrationviewPetitionNotesComponent} from './components/immigrationview/petitions-tab/petition-details/notes/notes.component';
import {SuperUserViewInvoicestabService} from './components/superuserview/invoices-tab/invoices.service';
import {AccountPreferencesComponent} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.component';
import {ReportsCommonService} from './components/superuserview/reports-tab/common/reports-common.service';


import {profileCommonService} from './components/immigrationview/profile-tab/common/immigration-profile.service';
import {InvoiceUploadButton} from './components/superuserview/accounts-tab/account-details/invoice/invoiceuploadbutton';

//immigrationview reports tab
import {petitionsstatusreportscomponent} from './components/immigrationview/reports-tab/petition/status/status.component';
import {petitionsstatusreportsservice} from './components/immigrationview/reports-tab/petition/status/status.service';
import {ActionIcons} from './components/framework/smarttable/cellRenderer/ActionsIcons';
import {GenerateFormButton} from "./components/immigrationview/petitions-tab/petition-details/forms/GenerateFormButton";
import {DownloadButton} from "./components/immigrationview/petitions-tab/petition-details/forms/DownloadButton";
import {clientscreatedreportscomponent} from './components/immigrationview/reports-tab/client/created/created.component';
import {usertotalpetitionscomponent} from './components/immigrationview/reports-tab/user/total-petitions/total-petitions.component';
import {usertotalpetitionservice} from './components/immigrationview/reports-tab/user/total-petitions/total-petitions.service';

import {useropenpetitioncomponent} from './components/immigrationview/reports-tab/user/open-petitions/open-petitions.component';
import {usersopenpetitionservice} from './components/immigrationview/reports-tab/user/open-petitions/open-petitions.service';

import { ImmigrationViewAddressinfoComponent } from './components/immigrationview/clients-tab/client-details/address/addressinfo.component';
import { Addressinfoservice } from './components/immigrationview/clients-tab/client-details/address/addressinfo.service';
import { ImmigrationViewArrivalDepartureInfoComponent } from './components/immigrationview/clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import { ImmigrationViewArrivalDepartureInfoService } from './components/immigrationview/clients-tab/client-details/arrival-departure-info/arrival-departure-info.service';
import { ImmigrationViewClientDetailsService } from './components/immigrationview/clients-tab/client-details/client-details/client-details.service';
import { ImmigrationViewDependentsComponent } from './components/immigrationview/clients-tab/client-details/dependents/dependents.component';
import { ImmigrationViewDependentService } from './components/immigrationview/clients-tab/client-details/dependents/dependents.service';
import { ImmigrationviewDocumentExpirationsComponent } from './components/immigrationview/clients-tab/client-details/document-expirations/document-expirations.component';
import { ImmigrationviewDocumentExpirationsService } from './components/immigrationview/clients-tab/client-details/document-expirations/document-expirations.service';
import { DocumentManagementService } from './components/immigrationview/clients-tab/client-details/document-management/document-management.service';
import { ClientDocumentRepositoryService } from './components/immigrationview/clients-tab/client-details/document-repository/document-repository.service';
import { ImmigrationViewI797HistoryComponent } from './components/immigrationview/clients-tab/client-details/i-797-history/i-797-history.component';
import { ImmigrationViewI797HistoryService } from './components/immigrationview/clients-tab/client-details/i-797-history/i-797-history.service';
import { ImmigrationViewJobDetailsComponent } from './components/immigrationview/clients-tab/client-details/job-details/job-details.component';
import { JobdetailsService } from './components/immigrationview/clients-tab/client-details/job-details/job-details.service';
import { ImmigrationViewPassportInfoComponent } from './components/immigrationview/clients-tab/client-details/passport-info/passport-info.component';
import { passportInfoService } from './components/immigrationview/clients-tab/client-details/passport-info/passport-info.service';
import { CustomRenderComponent } from './components/immigrationview/clients-tab/client-details/petitions/custom-render.component';
import { ImmigrationViewPetitionsComponent } from './components/immigrationview/clients-tab/client-details/petitions/petitions.component';
import { ImmigrationViewPetitionsService } from './components/immigrationview/clients-tab/client-details/petitions/petitions.service';
import { ImmigrationViewVisasComponent } from './components/immigrationview/clients-tab/client-details/visas/visas.component';
import { ImmigrationViewVisasService } from './components/immigrationview/clients-tab/client-details/visas/visas.service';
import {petitionfinalactioncomponent} from './components/immigrationview/reports-tab/petition/final-action/final-action.component';

import {DownloadInvoiceButton} from "./components/immigrationview/manage-account-tab/invoices/DownloadInvoiceButton";
//immiviewprofiletab
import {profileusercomponent} from './components/immigrationview/profile-tab/user/user.component';
import {profileuserservice} from './components/immigrationview/profile-tab/user/user.service';
import {profileloginhiscomponent} from './components/immigrationview/profile-tab/loginhistory/loginhistory.component';
import {profilechangepwdcomponent} from './components/immigrationview/profile-tab/changepassword/changepassword.component';
import {ManageaccountChecklistComponent} from './components/immigrationview/manage-account-tab/checklist/checklist.component';
import {ManageAccountChecklistService} from "./components/immigrationview/manage-account-tab/checklist/checklist.service";
import { MarkforDeletionComponent } from './components/immigrationview/manage-account-tab/markfordeletion/markfordeletion.component';
import { markfordeletionservice } from './components/immigrationview/manage-account-tab/markfordeletion/markfordeletion.service';
import { ManageAccountOrganizationsService } from './components/immigrationview/manage-account-tab/organizations/organizations.service';
import { ManageAccountPaymentsComponent } from './components/immigrationview/manage-account-tab/payments/payments.component';
import { ManageAccountPaymentsService } from './components/immigrationview/manage-account-tab/payments/payments.service';
import { ManageAccountPetitionTypeStagesComponent } from './components/immigrationview/manage-account-tab/petitiontypestages/petitiontypestages.component';
import { ManageAccountPetitionStagesService } from './components/immigrationview/manage-account-tab/petitiontypestages/petitiontypestages.service';
import { ManageAccountPreferencesComponent } from './components/immigrationview/manage-account-tab/preferences/preferences.component';
import { ManageAccountpreferencessService } from './components/immigrationview/manage-account-tab/preferences/preferences.service';
import { ManageAccountShippingAddressComponent } from './components/immigrationview/manage-account-tab/shippingaddress/shippingaddress.component';
import { ManageAccountShippingAddressService } from './components/immigrationview/manage-account-tab/shippingaddress/shippingaddress.service';
import { ManageaccountUserDetailsComponent } from './components/immigrationview/manage-account-tab/user-details/user-details.component';
import { ManageAccountUserDetailsService } from './components/immigrationview/manage-account-tab/user-details/user-details.service';
import { ManageAccountUserService } from './components/immigrationview/manage-account-tab/user/user.service';
import { ImmigrationViewPetitionNotesService } from './components/immigrationview/petitions-tab/petition-details/notes/notes.service';

//superuser reports tab
import {statsaccountscomponent} from './components/superuserview/reports-tab/stats/accounts/accounts.component';
import {statsaccountsservice} from './components/superuserview/reports-tab/stats/accounts/accounts.service';
import {superpetitionsstatusreportscomponent} from './components/superuserview/reports-tab/petitions/status/status.component';
import {superuserpetstagereportscomponent} from './components/superuserview/reports-tab/petitions/stage/stage.component';
import {superuserpetfinalactionreportscomponent} from './components/superuserview/reports-tab/petitions/final-action/final-action.component';
import {SuperUserPetitionFinalActionReportsService} from './components/superuserview/reports-tab/petitions/final-action/final-action.service';
import {superuserclientstatusreportsservice} from './components/superuserview/reports-tab/clients/status/status.service';
import {SuperUserClientsCreatedReportsComponent} from './components/superuserview/reports-tab/clients/created/created.component';
import {SuperUserClientsCreatedReportsService} from './components/superuserview/reports-tab/clients/created/created.service';
import {superusertotalpetitionsreportscomponent} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.component';
import {sperusertotalpetitionsreportsservice} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.service';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.component';
import {SuperUsersOpenPetitionService} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.service';
import {superuserstatsotgsReportsComponent} from './components/superuserview/reports-tab/stats/orgs/orgs.component';
import {SuperUserstatorgsReportsService} from './components/superuserview/reports-tab/stats/orgs/orgs.service';
import {superuserstatsclientsReportsComponent} from './components/superuserview/reports-tab/stats/clients/clients.component';
import {SuperUserstatclientsReportsService} from './components/superuserview/reports-tab/stats/clients/clients.service';
import {superuserstatspetitionReportsComponent} from './components/superuserview/reports-tab/stats/petitions/petitions.component';
import {SuperUserstatpetitonReportsService} from './components/superuserview/reports-tab/stats/petitions/petitions.service';
import {superusermonthlyReportsComponent} from './components/superuserview/reports-tab/payments/monthly/monthly.component';
import {SuperUsermonthlyReportsService} from './components/superuserview/reports-tab/payments/monthly/monthly.service';

//PDF Pages for testing only
import {i129Page1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-1/page-1.component';
import {i129Page2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {i129Page3Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-3/page-3.component';
import {i129Page4Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-4/page-4.component';
import {i129Page5Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-5/page-5.component';
import {i129Page6Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-6/page-6.component';
import { profilechangepwdservice } from './components/immigrationview/profile-tab/changepassword/changepassword.service';
import { profileloginhisservice } from './components/immigrationview/profile-tab/loginhistory/loginhistory.service';
import { profileswitchcomponent } from './components/immigrationview/profile-tab/switch/switch.component';
import { profileswitchservice } from './components/immigrationview/profile-tab/switch/switch.service';
import { switchButton } from './components/immigrationview/profile-tab/switch/switchButton';
import { profiletodolistcomponent } from './components/immigrationview/profile-tab/todolist/todolist.component';
import { profiletodolistservice } from './components/immigrationview/profile-tab/todolist/todolist.service';
import { clientscreatedreportsservice } from './components/immigrationview/reports-tab/client/created/created.service';
import { petitionstagesreportscomponent } from './components/immigrationview/reports-tab/petition/stages/stages.component';
import { petitionstagesreportsservice } from './components/immigrationview/reports-tab/petition/stages/stages.service';
import { petitionstagsreportscomponent } from './components/immigrationview/reports-tab/petition/tags/tags.component';
import { petitionstagsreportsservice } from './components/immigrationview/reports-tab/petition/tags/tags.service';
import { petitionstypesreportscomponent } from './components/immigrationview/reports-tab/petition/type/type.component';
import { petitionstypesreportsservice } from './components/immigrationview/reports-tab/petition/type/type.service';
import { OrganizationComponent } from './components/immigrationview/organization-tab/organization/organization.component';
import {QuestionnaireI129Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129/i129.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {AccountDetailsPaymentsService} from './components/superuserview/accounts-tab/account-details/payments/payments.service';
import {SuperuserViewAccountpreferencessService} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.service';
import { AccountDetailsCommonService } from './components/superuserview/accounts-tab/account-details/common/account-details-common.service';
import { SuperUserViewMFDService } from './components/superuserview/accounts-tab/account-details/mfd/mfd.service';
import { accountDetailsPaymentsComponent } from './components/superuserview/accounts-tab/account-details/payments/payments.component';
import { clientstatusreportscomponent } from './components/immigrationview/reports-tab/client/status/status.component';
import { clientstatusreportsservice } from './components/immigrationview/reports-tab/client/status/status.service';
import { superuserpetitionstagesreportsservice } from './components/superuserview/reports-tab/petitions/stage/stage.service';
import { superpetitionsstatusreportsservice } from './components/superuserview/reports-tab/petitions/status/status.service';
import { superuserL1Areportscomponent } from './components/superuserview/reports-tab/petitions/petitiontypeL1A/petitionsubtypeL1A.component';
import { superuserL1Areportsservice } from './components/superuserview/reports-tab/petitions/petitiontypeL1A/petitionsubtypeL1A.service';
import { superuserH1Breportscomponent } from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.component';
import { superuserH1Breportsservice } from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.service';
import { superuserpettagreportscomponent } from './components/superuserview/reports-tab/petitions/tag/tag.component';
import { superuserpetitiontagreportsservice } from './components/superuserview/reports-tab/petitions/tag/tag.service';
import { SuperUserViewPaymentstabService } from './components/superuserview/payments-tab/payments.service';
import { SuperuserviewProductcatalogDiscountsComponent } from './components/superuserview/product-catalog-tab/discounts/discounts.component';
import { ProductCatalogDiscountService } from './components/superuserview/product-catalog-tab/discounts/discounts.service';

import {HeaderService} from './components/common/header/header.service';


import {ManageAccountInvoicesComponent} from './components/immigrationview/manage-account-tab/invoices/invoices.component';
import {ImmigrationviewQuestionnaireComponent} from './components/immigrationview/petitions-tab/petition-details/questionnaire/questionnaire.component';
import { QuestionnaireI129HComponent } from './components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129h/i129h.component';
import { QuestionnaireI129HService } from './components/immigrationview/petitions-tab/petition-details/questionnaires/old/i129h/i129h.service';
import { petitionfinalactionservice } from './components/immigrationview/reports-tab/petition/final-action/final-action.service';
import {superuserclientstatusreportscomponent} from './components/superuserview/reports-tab/clients/status/status.component';
import {SuperUserViewInvoicestabComponent} from './components/superuserview/invoices-tab/invoices.component';
import {SuperUserViewPaymentstabComponent} from './components/superuserview/payments-tab/payments.component';


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
    ConfirmComponent, ConfirmorgComponent, CustomRenderComponent, CustomFilterRow, SmartTableFramework, ActionColumns, SendToClientQuestionnaire, ActionIcons,
      GenerateFormButton, DownloadButton, RequestButton, checklistdownloadButton,MoreDetails, DownloadInvoiceButton, switchButton, InvoicedownloadButton, InvoiceUploadButton
  ],
  declarations: [
    i129Page1Component,
    i129Page2Component,
    i129Page3Component,
    i129Page4Component,
    i129Page5Component,
    i129Page6Component,
    //pdf oage components imported above which is for testing only
      CustomRenderComponent, ActionIcons, GenerateFormButton, DownloadButton, RequestButton, checklistdownloadButton, MoreDetails, DownloadInvoiceButton, switchButton, InvoicedownloadButton,
    InvoiceUploadButton,
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
    SuperUserViewAccountsComponent,
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
      superuserstatsotgsReportsComponent,
      superuserstatsclientsReportsComponent,
      superuserstatspetitionReportsComponent,
      superusermonthlyReportsComponent,
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
    {provide: APP_BASE_HREF, useValue: '/'},
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
    ClientViewPetitionsService,
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
      SuperUserstatorgsReportsService,
      SuperUserstatclientsReportsService,
      SuperUserstatpetitonReportsService,
      SuperUsermonthlyReportsService,
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
    SuperUserPetitionFinalActionReportsService,
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
