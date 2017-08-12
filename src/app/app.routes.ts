import { viewAddressInfo } from './models/viewAddressInfo';
import { SmartTableFramework } from './components/smarttableframework/smarttable-framework.component';
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {MenuComponent} from "./components/menu/menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ClientDetailsComponent} from "./components/clientview-client-details/client-details.component";
import {ImmigrationviewPetitionDetailsComponent} from "./components/immigrationview-petition-details/petition-details.component";
import {ImmigrationviewPetitionNotesComponent} from "./components/immigrationview-petition-notes/petition-notes.component";
import {ImmigrationviewQuestionnaireComponent} from "./components/immigrationview-questionnaire/questionnaire.component";
import {ImmigrationviewFormsComponent} from "./components/immigrationview-forms/forms.component";
import {OrganizationDocumentRepositoryComponent} from "./components/immigrationview-organization-document-repository/organization-document-repository.component";
import {PetitionDocumentRepositoryComponent} from "./components/immigrationview-petition-document-repository/petition-document-repository.component";
import {ClientDocumentRepositoryComponent} from "./components/immigrationview-client-document-repository/client-document-repository.component";

import {DocumentManagementComponent} from "./components/immigrationview-document-management/document-management.component";
import {AddressinfoComponent} from "./components/clientview-addressinfo/addressinfo.component";
import {DependentDetailsComponent} from "./components/dependentdetails/dependentdetails.component";
import {ImmigrationviewDocumentExpirationsComponent} from "./components/immigrationview-document-expirations/document-expirations.component";
import {PassportInfoComponent} from "./components/clientview-passport-info/passport-info.component";
import {JobDetailsComponent} from "./components/clientview-job-details/job-details.component";
import {ArrivalDespartureInfoComponent} from "./components/clientview-arrival-desparture-info/arrival-desparture-info.component";
import {VisasComponent} from "./components/clientview-visas/visas.component";
import {I797HistoryComponent} from "./components/clientview-i-797-history/i-797-history.component";
import {DocumentsComponent} from "./components/clientview-documents/documents.component";
import {DependentsComponent} from './components/clientview-dependents/dependents.component';
import {DocumentExpirationsComponent} from './components/clientview-document-expirations/document-expirations.component';

import {OrganizationComponent} from "./components/organization/organization.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {PetitionsComponent} from "./components/petitions/petitions.component";
import {ManageAccountUserComponent} from "./components/manageaccount-user/manageaccount-user.component";
import {ManageAccountOrganizationsComponent} from "./components/manageaccount-organizations/manageaccount-organizations.component";
import {ManageAccountPetitionTypeStagesComponent} from "./components/manageaccount-petitiontypestages/manageaccount-petitiontypestages.component";
import {ManageAccountShippingAddressComponent} from "./components/manageaccount-shippingaddress/manageaccount-shippingaddress.component";
import {ManageAccountPreferencesComponent} from "./components/manageaccount-preferences/manageaccount-preferences.component";
import {ImmigrationViewClientDetailsService} from './components/immigrationview-client-details/client-details.service';
import {ImmigrationViewClientDetailsComponent} from './components/immigrationview-client-details/client-details.component';
import {ImmigrationViewAddressinfoComponent} from "./components/immigrationview-address/addressinfo.component";
import {ImmigrationViewDependentsComponent} from "./components/immigrationview-dependents/dependents.component";
import {ImmigrationViewPassportInfoComponent} from './components/immigrationview-passport-info/passport-info.component';
import {ImmigrationViewJobDetailsComponent} from './components/immigrationview-job-details/job-details.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './components/immigrationview-arrival-departure-info/arrival-departure-info.component';
import { ImmigrationViewVisasComponent } from './components/immigrationview-visas/visas.component';
import { ImmigrationViewI797HistoryComponent } from './components/immigrationview-i-797-history/i-797-history.component';
import { ImmigrationViewPetitionsComponent } from './components/immigrationview-petitions/petitions.component';
import {LoginComponent} from "./components/login/login.component";
import {QuestionnaireI129Component} from "./components/questionnaire-i129/questionnaire-i129.component";
import {petitionsclientviewComponent} from "./components/clientview-petitions/clientview-petitions.component";
import {requestclientviewcomponent} from "./components/clientview-request/clientview-request.component";
import {clientviewQuestionnaireComponent} from "./components/clientview-Questionnaries/clientview-Questionnaries.component";
import {QuestionnaireI129ClientComponent} from './components/questionnaire-i129client/questionnaire-i129-client.component';
import {QuestionnaireI129DCComponent} from './components/i129dc/questionnaire-i129dc.component';
import {QuestionnaireI129HComponent} from './components/i129h/questionnaire-i129h.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ManageAccountInvoicesComponent} from './components/manageaccount-invoices/manageaccount-invoices.component';
import {ManageAccountPaymentsComponent} from './components/manageaccount-payments/manageaccount-payments.component';

import {QuestionnaireI129HclientviewComponent} from './components/clientview-i129h/questionnaire-i129h.component';


//superuserview
import {SuperUserViewAccountsComponent} from './components/superuserview/accounts-tab/accounts/accounts.component';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview/accounts-tab/account-details/account-details/account-details.component';
import { SuperuserviewProductcatalogComponent } from './components/superuserview-productcatalog/superuserview-productcatalog.component';
import { AccountsManagers } from './components/superuserview-accountdetails-managers/accountmanagers-component';
import {AccountInvoiceComponent} from './components/superuserview-accountdetails-invoice/invoice-component';
import {accountDetailsPaymentsComponent} from './components/superuserview-accountdetails-payments/accountdetails-payments.component';

import { SuperuserviewAccountdetailsMfdComponent } from "./components/superuserview-accountdetails-mfd/superuserview-accountdetails-mfd.component";
import {MarkforDeletionComponent} from './components/manageaccount-markfordeletion/manageaccount-markfordeletion.component';


import {AccountPreferencesComponent} from './components/superuserview-accountpreferences/accountpreferences.component';

import {SuperUserViewInvoicestabComponent} from './components/superuserview-invoices/invoices.component';

import {SuperUserViewPaymentstabComponent} from './components/superuserview-payments/payments.component';
import {SuperuserviewProductcatalogDiscountsComponent} from './components/superuserview-productcatalog-discounts/superuserview-productcatalog-discounts.component';
import { ManageaccountUserDetailsComponent } from "./components/manageaccount-user-details/manageaccount-user-details.component";

//immigrationview reports
import {petitionsstatusreportscomponent} from './components/immigrationview-petitions-statusreports/petitions-statusreports.component';
import {clientscreatedreportscomponent} from './components/immigrationview-clients-createdreports/clients-createdreports.component';
import {petitionstypesreportscomponent} from './components/immigrationview-petitontypereports/petitiontypereports.component';
import {petitionstagesreportscomponent} from './components/immigrationview-petitionstagesreports/petitionstagesreports.component';
import {petitionstagsreportscomponent} from './components/immigrationview-petitiontagsreports/petitiontagsreports.component';
import {clientstatusreportscomponent} from './components/immigartioniew-clientsstatusreports/clientstatusreports.component';
import {usertotalpetitionscomponent} from './components/immigrationview-userstotalpetreports/userstotalpetitionreports.component';
import {useropenpetitioncomponent} from './components/immigrationview-usersopenpetreports/usersopenreports.component';
import {petitionfinalactioncomponent} from './components/immigrationview-petitionfinalactionreports/petitionfinalaction.component';


//profile
import {profileusercomponent} from './components/immigrationview-profileuser/profileuser.component';
import {profileloginhiscomponent} from './components/immigrationview-profileloginhistory/profileloginhistory.component';
import {profileswitchcomponent} from './components/immigrationview-profileswitch/profileswitch.component';
import {profilechangepwdcomponent} from './components/immigrationview-profilechangepassword/profilechangepassword.component';
import {profiletodolistcomponent} from './components/immigrationview-profiletodolist/profiletodolist.component';
import { ManageaccountChecklistComponent } from "./components/manageaccount-checklist/manageaccount-checklist.component";

//superuser reports
import {statsaccountscomponent} from './components/superuser-statsaccountsreports/statsaccountsreports.component';
import {superpetitionsstatusreportscomponent} from './components/superuser-petitionstatusreports/superpetitionstatusreports.component';
import {superuserH1Breportscomponent} from './components/superuser-petitiontypeh1breports/petitiontypesH1Breports.component';
import {superuserL1Areportscomponent} from './components/superuser-petitiontypeL1Areports/petitionsubtypeL1A.component';
import {superuserpetstagereportscomponent} from './components/superuser-petitionstagereports/superuser-petitionstagereports.component';
import {superuserpettagreportscomponent} from './components/superuser-petitiontagreports/superuser-petitiontagreport.component';
import {superuserpetfinalactionreportscomponent} from './components/superuser-petionfinalactionreports/superuser-petitionfinalaction.component';
import {superuserclientstatusreportscomponent} from './components/superuser-clientstatusreports/superuser-clientstatusreports.component';
import {SuperUserClientsCreatedReportsComponent} from './components/superuser-clientscreatedreports/superuser-clientscreatedreports.component';
import {superusertotalpetitionsreportscomponent} from './components/superuser-usertotalpetitions/superuser-usertotalpetitions.component';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/useropenpetitions.component';

//PDF Pages I-129
import {i129Page1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-1/page-1.component';
import {i129Page2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {i129Page3Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-3/page-3.component';
import {i129Page4Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-4/page-4.component';
import {i129Page5Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-5/page-5.component';
import {i129Page6Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-6/page-6.component';


export const appRoutes: Routes = [
    {
        path: 'i129Page1',
        component: i129Page1Component,
    },
    {
        path: 'i129Page2',
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
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'questionnaire-i129/:questionnaireId',
        component: QuestionnaireI129Component
    },
    {
        path: 'questionnaire-i129clientView/:questionnaireId',
        component: QuestionnaireI129ClientComponent
    },
    {
        path: 'questionnaire-i129dc/:questionnaireId',
        component: QuestionnaireI129DCComponent
    },
    {
        path: 'questionnaire-i129h/:questionnaireId',
        component: QuestionnaireI129HComponent
    },
    {
        path: 'questionnaire-i129hclientView/:questionnaireId',
        component: QuestionnaireI129HclientviewComponent
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
        path: '',
        component: LoginComponent
    },
    {
        path: '**',
        component: LoginComponent
    }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);



