import { viewAddressInfo } from './models/viewAddressInfo';
import { SmartTableFramework } from './components/smarttableframework/SmartTableFramework';
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

import {ReportsComponent} from "./components/reports/reports.component";
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

//import { dependentsDep1Component } from './components/dependents1/dependents-dep1.component';
//import { dependentsDep2Component } from './components/dependents2/dependents-dep2.component';
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
import {superuserViewAccountsComponent} from './components/superuserview-accounts/accounts.component';
import {SuperuserViewAccountDetailsComponent} from './components/superuserview-account-details/superuserview-account-details';
import { SuperuserviewProductcatalogComponent } from './components/superuserview-productcatalog/superuserview-productcatalog.component';
import { AccountsManagers } from './components/superuserview-accountdetails-managers/accountmanagers-component';
import {AccountInvoiceComponent} from './components/superuserview-accountdetails-invoice/invoice-component';
import {accountDetailsPaymentsComponent} from './components/superuserview-accountdetails-payments/accountdetails-payments.component';


import {MarkforDeletionComponent} from './components/manageaccount-markfordeletion/manageaccount-markfordeletion.component';


import {AccountPreferencesComponent} from './components/superuserview-accountpreferences/accountpreferences.component';

import {SuperUserViewInvoicestabComponent} from './components/superuserview-invoices/invoices.component';

import {SuperUserViewPaymentstabComponent} from './components/superuserview-payments/payments.component';
import {SuperuserviewProductcatalogDiscountsComponent} from './components/superuserview-productcatalog-discounts/superuserview-productcatalog-discounts.component';
import { ImmigrationViewReportsComponent } from "./components/immigration-view-reports/immigration-view-reports.component";
import { ManageaccountUserDetailsComponent } from "./components/manageaccount-user-details/manageaccount-user-details.component";



export const appRoutes: Routes = [
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
        path: 'reports',
        component: ReportsComponent
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
        path: 'clientview-documents',
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
        //component: SmartTableFramework
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
        path:'immigrationview-reports',
        component:ImmigrationViewReportsComponent
    },
    {
        path:'user-details',
        component:ManageaccountUserDetailsComponent
    },
    //superuserview
    {
        path: 'superuser-accounts',
        component: superuserViewAccountsComponent
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



