import { viewAddressInfo } from './models/viewAddressInfo';
import { SmartTableFramework } from './components/framework/smarttable/smarttable.component';
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HeaderComponent} from "./components/common/header/header.component";
import {MenuComponent} from "./components/common/menu/menu.component";
import {FooterComponent} from "./components/common/footer/footer.component";
import {ImmigrationviewPetitionDetailsComponent} from "./components/immigrationview/petitions-tab/petition-details/petition-details/petition-details.component";
import {ImmigrationviewPetitionNotesComponent} from "./components/immigrationview/petitions-tab/petition-details/notes/notes.component";
import {ImmigrationviewFormsComponent} from "./components/immigrationview/petitions-tab/petition-details/forms/forms.component";
import {OrganizationDocumentRepositoryComponent} from "./components/immigrationview/organization-tab/document-repository/document-repository.component";
import {PetitionDocumentRepositoryComponent} from "./components/immigrationview/petitions-tab/petition-details/document-repository/document-repository.component";
import {ClientDocumentRepositoryComponent} from "./components/immigrationview/clients-tab/client-details/document-repository/document-repository.component";

import {DependentDetailsComponent} from "./components/immigrationview/clients-tab/client-details/dependent-details/dependent-details.component";
import {OrganizationComponent} from "./components/immigrationview/organization-tab/organization/organization.component";
import {ClientsComponent} from "./components/immigrationview/clients-tab/clients/clients.component";
import { AddressinfoComponent } from './components/clientview/client-details-tab/addressinfo/addressinfo.component';
import { ArrivalDespartureInfoComponent } from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.component';
import { ClientDetailsComponent } from './components/clientview/client-details-tab/client-details/client-details.component';
import { DependentsComponent } from './components/clientview/client-details-tab/dependents/dependents.component';
import { DocumentExpirationsComponent } from './components/clientview/client-details-tab/document-expirations/document-expirations.component';
import { I797HistoryComponent } from './components/clientview/client-details-tab/i-797-history/i-797-history.component';
import { JobDetailsComponent } from './components/clientview/client-details-tab/job-details/job-details.component';
import { PassportInfoComponent } from './components/clientview/client-details-tab/passport-info/passport-info.component';
import { VisasComponent } from './components/clientview/client-details-tab/visas/visas.component';
import { DocumentsComponent } from './components/clientview/documents-tab/documents.component';
import {ManageAccountUserComponent} from "./components/immigrationview/manage-account-tab/user/user.component";
import {ManageAccountOrganizationsComponent} from "./components/immigrationview/manage-account-tab/organizations/organizations.component";
import {ImmigrationViewClientDetailsService} from './components/immigrationview/clients-tab/client-details/client-details/client-details.service';
import {ImmigrationViewClientDetailsComponent} from './components/immigrationview/clients-tab/client-details/client-details/client-details.component';
import {LoginComponent} from "./components/common/login/login.component";
import {petitionsclientviewComponent} from "./components/clientview/petitions-tab/petitions.component";
import { QuestionnaireI129ClientComponent } from './components/clientview/questionnaries-tab/i129/i129.component';
import { QuestionnaireI129HclientviewComponent } from './components/clientview/questionnaries-tab/i129h/i129h.component';
import { clientviewQuestionnaireComponent } from './components/clientview/questionnaries-tab/questionnaires/questionnaries.component';
import { requestclientviewcomponent } from './components/clientview/request-tab/request.component';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';

//superuserview
import {SuperUserViewAccountsComponent} from './components/superuserview/accounts-tab/accounts/accounts.component';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview/accounts-tab/account-details/account-details/account-details.component';
import { SuperuserviewProductcatalogComponent } from './components/superuserview/product-catalog-tab/products/product-catalog.component';
import { AccountsManagers } from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountInvoiceComponent} from './components/superuserview/accounts-tab/account-details/invoice/invoice.component';
import {accountDetailsPaymentsComponent} from './components/superuserview/accounts-tab/account-details/payments/payments.component';

import { SuperuserviewAccountdetailsMfdComponent } from "./components/superuserview/accounts-tab/account-details/mfd/mfd.component";
import {AccountPreferencesComponent} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.component';

//immigrationview reports
import {petitionsstatusreportscomponent} from './components/immigrationview/reports-tab/petition/status/status.component';
import {clientscreatedreportscomponent} from './components/immigrationview/reports-tab/client/created/created.component';
import { ImmigrationViewAddressinfoComponent } from './components/immigrationview/clients-tab/client-details/address/addressinfo.component';
import { ImmigrationViewArrivalDepartureInfoComponent } from './components/immigrationview/clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import { ImmigrationViewDependentsComponent } from './components/immigrationview/clients-tab/client-details/dependents/dependents.component';
import { ImmigrationviewDocumentExpirationsComponent } from './components/immigrationview/clients-tab/client-details/document-expirations/document-expirations.component';
import { DocumentManagementComponent } from './components/immigrationview/clients-tab/client-details/document-management/document-management.component';
import { ImmigrationViewI797HistoryComponent } from './components/immigrationview/clients-tab/client-details/i-797-history/i-797-history.component';
import { ImmigrationViewJobDetailsComponent } from './components/immigrationview/clients-tab/client-details/job-details/job-details.component';
import { ImmigrationViewPassportInfoComponent } from './components/immigrationview/clients-tab/client-details/passport-info/passport-info.component';
import { ImmigrationViewPetitionsComponent } from './components/immigrationview/clients-tab/client-details/petitions/petitions.component';
import { ImmigrationViewVisasComponent } from './components/immigrationview/clients-tab/client-details/visas/visas.component';
import {usertotalpetitionscomponent} from './components/immigrationview/reports-tab/user/total-petitions/total-petitions.component';
import {useropenpetitioncomponent} from './components/immigrationview/reports-tab/user/open-petitions/open-petitions.component';
import {petitionfinalactioncomponent} from './components/immigrationview/reports-tab/petition/final-action/final-action.component';


//profile
import {profileusercomponent} from './components/immigrationview/profile-tab/user/user.component';
import {profileloginhiscomponent} from './components/immigrationview/profile-tab/loginhistory/loginhistory.component';
import { ManageaccountChecklistComponent } from "./components/immigrationview/manage-account-tab/checklist/checklist.component";
import { MarkforDeletionComponent } from './components/immigrationview/manage-account-tab/markfordeletion/markfordeletion.component';
import { ManageAccountPaymentsComponent } from './components/immigrationview/manage-account-tab/payments/payments.component';
import { ManageAccountPetitionTypeStagesComponent } from './components/immigrationview/manage-account-tab/petitiontypestages/petitiontypestages.component';
import { ManageAccountPreferencesComponent } from './components/immigrationview/manage-account-tab/preferences/preferences.component';
import { ManageAccountShippingAddressComponent } from './components/immigrationview/manage-account-tab/shippingaddress/shippingaddress.component';
import { ManageaccountUserDetailsComponent } from './components/immigrationview/manage-account-tab/user-details/user-details.component';

//superuser reports
import {statsaccountscomponent} from './components/superuserview/reports-tab/stats/accounts/accounts.component';
import {superpetitionsstatusreportscomponent} from './components/superuserview/reports-tab/petitions/status/status.component';
import {superuserpetfinalactionreportscomponent} from './components/superuserview/reports-tab/petitions/final-action/final-action.component';
import {SuperUserClientsCreatedReportsComponent} from './components/superuserview/reports-tab/clients/created/created.component';
import {superusertotalpetitionsreportscomponent} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.component';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.component';
import {superuserstatsotgsReportsComponent} from './components/superuserview/reports-tab/stats/orgs/orgs.component';

//PDF Pages I-129
import {i129Page1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-1/page-1.component';
import {i129Page2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {i129Page3Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-3/page-3.component';
import {i129Page4Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-4/page-4.component';
import {i129Page5Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-5/page-5.component';
import {i129Page6Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-6/page-6.component';
import {i129Page7Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-7/page-7.component';
import {i129Page8Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-8/page-8.component';
import {i129dcPage1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129DC/page-1/page-1.component';
import {i129dcPage2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129DC/page-2/page-2.component';
import {i129dcPage3Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129DC/page-3/page-3.component';


import { PetitionsComponent } from './components/immigrationview/petitions-tab/petitions/petitions.component';
import { profilechangepwdcomponent } from './components/immigrationview/profile-tab/changepassword/changepassword.component';
import { profileswitchcomponent } from './components/immigrationview/profile-tab/switch/switch.component';
import { profiletodolistcomponent } from './components/immigrationview/profile-tab/todolist/todolist.component';
import { petitionstagesreportscomponent } from './components/immigrationview/reports-tab/petition/stages/stages.component';
import { petitionstagsreportscomponent } from './components/immigrationview/reports-tab/petition/tags/tags.component';
import { petitionstypesreportscomponent } from './components/immigrationview/reports-tab/petition/type/type.component';
import { clientstatusreportscomponent } from './components/immigrationview/reports-tab/client/status/status.component';
import { superuserpetstagereportscomponent } from './components/superuserview/reports-tab/petitions/stage/stage.component';
import { superuserL1Areportscomponent } from './components/superuserview/reports-tab/petitions/petitiontypeL1A/petitionsubtypeL1A.component';
import { superuserH1Breportscomponent } from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.component';
import { superuserpettagreportscomponent } from './components/superuserview/reports-tab/petitions/tag/tag.component';
import {superuserstatsclientsReportsComponent} from './components/superuserview/reports-tab/stats/clients/clients.component';
import {superuserstatspetitionReportsComponent} from './components/superuserview/reports-tab/stats/petitions/petitions.component';
import {superusermonthlyReportsComponent} from './components/superuserview/reports-tab/payments/monthly/monthly.component';

import {i129HPage1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-1/page-1.component';
import {i129HPage2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-2/page-2.component';
import {i129HPage3Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-3/page-3.component';
import {i129HPage4Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-4/page-4.component';
import {i129HPage5Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-5/page-5.component';
import {i129HPage6Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-6/page-6.component';


import {ManageAccountInvoicesComponent} from './components/immigrationview/manage-account-tab/invoices/invoices.component';
import {ImmigrationviewQuestionnaireComponent} from './components/immigrationview/petitions-tab/petition-details/questionnaire/questionnaire.component';
import { SuperuserviewProductcatalogDiscountsComponent } from './components/superuserview/product-catalog-tab/discounts/discounts.component';
import {superuserclientstatusreportscomponent} from './components/superuserview/reports-tab/clients/status/status.component';
import {SuperUserViewInvoicestabComponent} from './components/superuserview/invoices-tab/invoices.component';
import {SuperUserViewPaymentstabComponent} from './components/superuserview/payments-tab/payments.component';

import {demorequestdetailsComponent} from './components/superuserview/misc-tab/demorequestdetails/demorequestdetails.component';
import {miscsuperusersComponent} from './components/superuserview/misc-tab/superusers/miscsuperusers.component';


export const appRoutes: Routes = [
    {
        path: 'i129hPage1/:questionnaireId',
        component: i129HPage1Component,
    },
    {
        path: 'i129hPage2',
        component: i129HPage2Component,
    },
    {
        path: 'i129hPage3',
        component: i129HPage3Component,
    },
    {
        path: 'i129hPage4',
        component: i129HPage4Component,
    },
    {
        path: 'i129hPage5',
        component: i129HPage5Component,
    },
    {
        path: 'i129hPage6',
        component: i129HPage6Component,
    },
    {
        path: 'i129Page1/:questionnaireId',
        component: i129Page1Component,
    },
    {
        path: 'i129Page2',
        component: i129Page2Component,
    },
    {
        path: 'clientview-i129Page2/:questionnaireId',
        component: i129Page2Component,
    },
    {
        path: 'i129Page3',
        component: i129Page3Component,
    },
    {
        path: 'i129Page4',
        component: i129Page4Component,
    },
    {
        path: 'i129Page5',
        component: i129Page5Component,
    },
    {
        path: 'i129Page6',
        component: i129Page6Component,
    },
    {
        path: 'i129Page7',
        component: i129Page7Component,
    },
    {
        path: 'i129Page8',
        component: i129Page8Component,
    },
    {
        path: 'i129dcPage1/:questionnaireId',
        component: i129dcPage1Component,
    },
    {
        path: 'i129dcPage2',
        component: i129dcPage2Component,
    },
    {
        path: 'i129dcPage3',
        component: i129dcPage3Component,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'clientview-i129hPage1/:questionnaireId',
        component: i129HPage1Component
    },
    {
        path: 'header',
        component: HeaderComponent,
        outlet: 'header'
    },
    {
        path: 'menu',
        component: MenuComponent,
        outlet: 'menu'
    },
    {
        path: 'footer',
        component: FooterComponent,
        outlet: 'footer'
    },
    {
        path: 'petitions',
        component: PetitionsComponent
    },
    {
        path: 'clients',
        component: ClientsComponent
    },
    {
        path: 'organization',
        component: OrganizationComponent
    },
    {
        path: 'clientview-client-details',
        component: ClientDetailsComponent
    },
    {
        path: 'immigrationview-petition-details',
        component: ImmigrationviewPetitionDetailsComponent
    },
    {
        path: 'immigrationview-petition-notes',
        component: ImmigrationviewPetitionNotesComponent
    },
    {
        path: 'immigrationview-questionnaire',
        component: ImmigrationviewQuestionnaireComponent
    },
    {
        path: 'clientview-Questionnaries',
        component: clientviewQuestionnaireComponent
    },
    {
        path: 'immigrationview-forms',
        component: ImmigrationviewFormsComponent
    },
    {
        path: 'immigrationview-organization-document-repository',
        component: OrganizationDocumentRepositoryComponent
    },
    {
        path: 'immigrationview-petition-document-repository',
        component: PetitionDocumentRepositoryComponent
    },
    {
        path: 'immigrationview-client-document-repository',
        component: ClientDocumentRepositoryComponent
    },
    {
        path: 'immigrationview-document-management',
        component: DocumentManagementComponent
    },
    {
        path: 'clientview-addressinfo',
        component: AddressinfoComponent
    },
    {
        path: 'dependentDetails/:dependentId',
        component: DependentDetailsComponent
    },
    {
        path: 'immigrationview-document-expirations',
        component: ImmigrationviewDocumentExpirationsComponent
    },
    {
        path: 'clientview-document-expirations',
        component: DocumentExpirationsComponent
    },
    {
        path: 'clientview-documents/:clientId',
        component: DocumentsComponent
    },
    {
        path: 'clientview-dependents',
        component: DependentsComponent
    },
    {
        path: 'clientview-passport-info',
        component: PassportInfoComponent
    },
    {
        path: 'clientview-job-details',
        component: JobDetailsComponent
    },
    {
        path: 'clientview-arrival-desparture-info',
        component: ArrivalDespartureInfoComponent
    },
    {
        path: 'clientview-visas',
        component: VisasComponent
    },
    {
        path: 'clientview-I-797-history',
        component: I797HistoryComponent
    },
    {
        path: 'manageaccount-user',
        component: ManageAccountUserComponent
    },
    {
        path: 'manageaccount-organizations',
        component: ManageAccountOrganizationsComponent
    },
    {
        path: 'manageaccount-petitiontypestages',
        component: ManageAccountPetitionTypeStagesComponent
    },
    {
        path:'manageaccount-checklist',
        component:ManageaccountChecklistComponent
    },
    {
        path: 'manageaccount-shippingaddress',
        component: ManageAccountShippingAddressComponent
    },
    {
        path: 'manageaccount-preferences',
        component: ManageAccountPreferencesComponent
    },
    {
        path: 'manageaccount-invoices',
        component: ManageAccountInvoicesComponent
    },
    {
        path: 'manageaccount-payments',
        component: ManageAccountPaymentsComponent
    },
    {
        path: 'clientview-petitions',
        component: petitionsclientviewComponent
    },

    {
        path: 'immigrationview-client-details',
        component: ImmigrationViewClientDetailsComponent
    },
    {
        path: 'immigrationview-addressinfo',
        component: ImmigrationViewAddressinfoComponent
    },
    {
        path: 'immigrationview-dependents',
        component: ImmigrationViewDependentsComponent
    },
    {
        path: 'immigrationview-passport-info',
        component: ImmigrationViewPassportInfoComponent
    },
    {
        path: 'immigrationview-job-details',
        component: ImmigrationViewJobDetailsComponent
    },
    {
        path: 'immigrationview-arrival-departure-info',
        component: ImmigrationViewArrivalDepartureInfoComponent
    },
    {
        path: 'immigrationview-visas',
        component: ImmigrationViewVisasComponent
    },
    {
        path: 'immigrationview-I-797-history',
        component:  ImmigrationViewI797HistoryComponent
    },
    {
        path: 'immigrationview-petitions',
        component: ImmigrationViewPetitionsComponent
    },
    {
        path: 'clientview-Requests',
        component: requestclientviewcomponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path:'user-details',
        component:ManageaccountUserDetailsComponent
    },
    //superuserview
    {
        path: 'superuser-accounts',
        component: SuperUserViewAccountsComponent
    },
  {
        path: 'invoices',
        component: SuperUserViewInvoicestabComponent
    },
    {
        path: 'payments',
        component: SuperUserViewPaymentstabComponent
    },
    {
        path: 'superuserview-productcatalog',
        component: SuperuserviewProductcatalogComponent
    },
    {
        path: 'account-details',
        component: SuperuserViewAccountDetailsComponent
    },
    {
        path: 'accountdetails-invoice',
        component: AccountInvoiceComponent
    },
    {
        path: 'accountdetails-payments',
        component: accountDetailsPaymentsComponent
    },
    {
        path: 'superuserview-accountmanagers',
        component: AccountsManagers
    },
    {
        path: 'superuserview-preference',
        component: AccountPreferencesComponent
    },
    {
        path: 'manageaccount-markfordeletion',
        component: MarkforDeletionComponent
    },
    {
        path: 'superuserview-productcatalog-discounts',
        component: SuperuserviewProductcatalogDiscountsComponent
    },
    {
        path:'accountdetails-mfd',
        component:SuperuserviewAccountdetailsMfdComponent,
    },
    {
        path: 'immiview-petitionreports',
        component: petitionsstatusreportscomponent
    },
    {
        path: 'immiview-clientscreated',
        component: clientscreatedreportscomponent
    },
    {
        path: 'immiview-petiontypes',
        component: petitionstypesreportscomponent
    },
    {
        path: 'immiview-petionstagereports',
        component: petitionstagesreportscomponent
    },
    {
        path: 'immiview-petiontagreports',
        component: petitionstagsreportscomponent
    },
    {
        path: 'immiview-clientstatusreports',
        component: clientstatusreportscomponent
    },
    {
        path: 'immiview-profileuser',
        component: profileusercomponent
    },
    {
        path: 'immiview-profileloginhis',
        component: profileloginhiscomponent
    },
    {
        path: 'immiview-profileswitch',
        component: profileswitchcomponent
    },
    {
        path: 'immiview-profilechangepwd',
        component: profilechangepwdcomponent
    },
    {
        path: 'immiview-profileTodo',
        component: profiletodolistcomponent
    },
    {
        path: 'user-totalpetitions',
        component: usertotalpetitionscomponent
    },
    {
        path: 'user-openpetitions',
        component: useropenpetitioncomponent
    },
    {
        path: 'petiton-finalaction',
        component: petitionfinalactioncomponent
    },
    {
        path: 'superuser-statsaccounts',
        component: statsaccountscomponent
    },
    {
        path: 'superuser-petitionreports',
        component: superpetitionsstatusreportscomponent
    },
    {
        path: 'superuser-petiontypes',
        component: superuserH1Breportscomponent
    },
    {
        path: 'superuser-petiontypesL1A',
        component: superuserL1Areportscomponent
    },
    {
        path: 'superuser-petionstagereports',
        component: superuserpetstagereportscomponent
    },
    {
        path: 'superuser-petiontagreports',
        component: superuserpettagreportscomponent
    },
    {
        path: 'superuser-finalaction',
        component: superuserpetfinalactionreportscomponent

    },
    {
        path: 'superuser-clientstatusreports',
        component: superuserclientstatusreportscomponent
    },
    {
        path: 'superuser-clientscreated',
        component: SuperUserClientsCreatedReportsComponent
    },
    {
        path: 'superuser-totalpetitions',
        component: superusertotalpetitionsreportscomponent
    },
    {
        path: 'superuser-openpetitions',
        component: SuperUserOpenPetitionComponent
    },
    {
        path: 'superuser-statsorgs',
        component: superuserstatsotgsReportsComponent
    },
    {
        path: 'superuser-statsclients',
        component: superuserstatsclientsReportsComponent
    },
    {
        path: 'superuser-statspetitions',
        component: superuserstatspetitionReportsComponent
    },
    {
        path: 'superuser-payments',
        component: superusermonthlyReportsComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'superuser-misc',
        component: demorequestdetailsComponent
    },
    {
        path: 'superuser-miscsuperusers',
        component: miscsuperusersComponent
    },
    {
        path: '**',
        component: LoginComponent
    }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);



