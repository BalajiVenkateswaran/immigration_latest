import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients-tab/clients/clients.component';
import {ImmigrationViewAddressinfoComponent} from './clients-tab/client-details/address/addressinfo.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import {ImmigrationViewClientDetailsComponent} from './clients-tab/client-details/client-details/client-details.component';
import {DependentDetailsComponent} from './clients-tab/client-details/dependent-details/dependent-details.component';
import {ImmigrationViewDependentsComponent} from './clients-tab/client-details/dependents/dependents.component';
import {ImmigrationviewDocumentExpirationsComponent} from './clients-tab/client-details/document-expirations/document-expirations.component';
import {DocumentManagementComponent} from './petitions-tab/petition-details/document-management/document-management.component';
import {ClientDocumentRepositoryComponent} from './clients-tab/client-details/document-repository/document-repository.component';
import {ImmigrationViewI797HistoryComponent} from './clients-tab/client-details/i-797-history/i-797-history.component';
import {ImmigrationViewJobDetailsComponent} from './clients-tab/client-details/job-details/job-details.component';
import {ImmigrationViewPassportInfoComponent} from './clients-tab/client-details/passport-info/passport-info.component';
import {ImmigrationViewPetitionsComponent} from './clients-tab/client-details/petitions/petitions.component';
import {ImmigrationViewVisasComponent} from './clients-tab/client-details/visas/visas.component';
import {PetitionsComponent} from './petitions-tab/petitions/petitions.component';
import {PetitionDocumentRepositoryComponent} from './petitions-tab/petition-details/document-repository/petition-document-repository.component';
import {NotesComponent} from './petitions-tab/petition-details/notes/notes.component';
import {PetitionDetailsComponent} from './petitions-tab/petition-details/petition-details/petition-details.component';
import {ImmigrationviewQuestionnaireComponent} from './petitions-tab/petition-details/questionnaire/questionnaire.component';
import {I129Page1Component} from './petitions-tab/petition-details/questionnaires/i129/page-1/page-1.component';
import {I129Page2Component} from './petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {I129Page3Component} from './petitions-tab/petition-details/questionnaires/i129/page-3/page-3.component';
import {I129Page4Component} from './petitions-tab/petition-details/questionnaires/i129/page-4/page-4.component';
import {I129Page5Component} from './petitions-tab/petition-details/questionnaires/i129/page-5/page-5.component';
import {I129Page6Component} from './petitions-tab/petition-details/questionnaires/i129/page-6/page-6.component';
import {I129Page7Component} from './petitions-tab/petition-details/questionnaires/i129/page-7/page-7.component';
import {I129Page8Component} from './petitions-tab/petition-details/questionnaires/i129/page-8/page-8.component';
import {I129dcPage1Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-1/page-1.component';
import {I129dcPage2Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-2/page-2.component';
import {I129dcPage3Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-3/page-3.component';
import {I129HPage1Component} from './petitions-tab/petition-details/questionnaires/i129H/page-1/page-1.component';
import {I129HPage2Component} from './petitions-tab/petition-details/questionnaires/i129H/page-2/page-2.component';
import {I129HPage3Component} from './petitions-tab/petition-details/questionnaires/i129H/page-3/page-3.component';
import {I129HPage4Component} from './petitions-tab/petition-details/questionnaires/i129H/page-4/page-4.component';
import {I129HPage5Component} from './petitions-tab/petition-details/questionnaires/i129H/page-5/page-5.component';
import {I129HPage6Component} from './petitions-tab/petition-details/questionnaires/i129H/page-6/page-6.component';
import {I129LPage1Component} from './petitions-tab/petition-details/questionnaires/L1/page-1/page-1.component';
import {I129LPage2Component} from './petitions-tab/petition-details/questionnaires/L1/page-2/page-2.component';
import {I129LPage3Component} from './petitions-tab/petition-details/questionnaires/L1/page-3/page-3.component';
import {I129LPage4Component} from './petitions-tab/petition-details/questionnaires/L1/page-4/page-4.component';
import {OrganizationDocumentRepositoryComponent} from './organization-tab/document-repository/document-repository.component';
import {OrganizationComponent} from './organization-tab/organization/organization.component';
import {ManageaccountChecklistComponent} from './manage-account-tab/checklist/checklist.component';
import {ManageAccountInvoicesComponent} from './manage-account-tab/invoices/invoices.component';
import {MarkforDeletionComponent} from './manage-account-tab/markfordeletion/markfordeletion.component';
import {ManageAccountOrganizationsComponent} from './manage-account-tab/organizations/organizations.component';
import {ManageAccountPaymentsComponent} from './manage-account-tab/payments/payments.component';
import {ManageAccountPetitionTypeStagesComponent} from './manage-account-tab/petitiontypestages/petitiontypestages.component';
import {ManageAccountPreferencesComponent} from './manage-account-tab/preferences/preferences.component';
import {ManageAccountShippingAddressComponent} from './manage-account-tab/shippingaddress/shippingaddress.component';
import {ManageAccountUserComponent} from './manage-account-tab/user/user.component';
import {ManageaccountUserDetailsComponent} from './manage-account-tab/user-details/user-details.component';
import {ClientsCreatedReportsComponent} from './reports-tab/client/created/created.component';
import {ClientStatusReportsComponent} from './reports-tab/client/status/status.component';
import {PetitionFinalActionComponent} from './reports-tab/petition/final-action/final-action.component';
import {PetitionStagesReportsComponent} from './reports-tab/petition/stages/stages.component';
import {PetitionsStatusReportsComponent} from './reports-tab/petition/status/status.component';
import {PetitionsTagsReportsComponent} from './reports-tab/petition/tags/tags.component';
import {PetitionTypeReportComponent} from './reports-tab/petition/type/type.component';
import {UserOpenPetitionComponent} from './reports-tab/user/open-petitions/open-petitions.component';
import {UserTotalPetitionsComponent} from './reports-tab/user/total-petitions/total-petitions.component';

const IMMIGRATION_VIEW_CLIENT_ROUTER: Routes = [
  {
    path: 'tab/clients',
    component: ClientsComponent
  },
  {
    path: 'client/detail/addressinfo',
    component: ImmigrationViewAddressinfoComponent
  },
  {
    path: 'client/detail/arrival-departure-info',
    component: ImmigrationViewArrivalDepartureInfoComponent
  },
  {
    path: 'client/detail/client-details',
    component: ImmigrationViewClientDetailsComponent
  },
  {
    path: 'client/detail/dependentDetails/:dependentId',
    component: DependentDetailsComponent
  },
  {
    path: 'client/detail/dependents',
    component: ImmigrationViewDependentsComponent
  },
  {
    path: 'client/detail/document-expirations',
    component: ImmigrationviewDocumentExpirationsComponent
  },
  {
    path: 'client/detail/document-management',
    component: DocumentManagementComponent
  },
  {
    path: 'client/detail/client-document-repository',
    component: ClientDocumentRepositoryComponent
  },
  {
    path: 'client/detail/I-797-history',
    component:  ImmigrationViewI797HistoryComponent
  },
  {
    path: 'client/detail/job-details',
    component: ImmigrationViewJobDetailsComponent
  },
  {
    path: 'client/detail/passport-info',
    component: ImmigrationViewPassportInfoComponent
  },
  {
    path: 'client/detail/petitions',
    component: ImmigrationViewPetitionsComponent
  },
  {
    path: 'client/detail/visas',
    component: ImmigrationViewVisasComponent
  }
];

const IMMIGRATION_VIEW_PETITION_ROUTER: Routes = [
  {
    path: 'tab/petitions',
    component: PetitionsComponent
  },
  {
    path: 'petition/details/document-repository',
    component: PetitionDocumentRepositoryComponent
  },
  {
    path: 'petition/details/notes',
    component: NotesComponent
  },
  {
    path: 'petition/details/petition-details',
    component: PetitionDetailsComponent
  },
  {
    path: 'petition/details/questionnaire',
    component: ImmigrationviewQuestionnaireComponent
  }

];

const IMMIGRATION_VIEW_QUESTIONNAIRE_ROUTER: Routes = [
  {
    path: 'questionnaire/i129/page/1/:questionnaireId',
    component: I129Page1Component
  },
  {
    path: 'questionnaire/i129/page/2',
    component: I129Page2Component
  },
  {
    path: 'questionnaire/i129/page/3',
    component: I129Page3Component
  },
  {
    path: 'questionnaire/i129/page/4',
    component: I129Page4Component
  },
  {
    path: 'questionnaire/i129/page/5',
    component: I129Page5Component
  },
  {
    path: 'questionnaire/i129/page/6',
    component: I129Page6Component
  },
  {
    path: 'questionnaire/i129/page/7',
    component: I129Page7Component
  },
  {
    path: 'questionnaire/i129/page/8',
    component: I129Page8Component
  },
  {
    path: 'questionnaire/i129dc/page/1/:questionnaireId',
    component: I129dcPage1Component
  },
  {
    path: 'questionnaire/i129dc/page/2',
    component: I129dcPage2Component
  },
  {
    path: 'questionnaire/i129dc/page/3',
    component: I129dcPage3Component
  },
  {
    path: 'questionnaire/i129h/page/1/:questionnaireId',
    component: I129HPage1Component
  },
  {
    path: 'questionnaire/i129h/page/2',
    component: I129HPage2Component
  },
  {
    path: 'questionnaire/i129h/page/3',
    component: I129HPage3Component
  },
  {
    path: 'questionnaire/i129h/page/4',
    component: I129HPage4Component
  },
  {
    path: 'questionnaire/i129h/page/5',
    component: I129HPage5Component
  },
  {
    path: 'questionnaire/i129h/page/6',
    component: I129HPage6Component
  },
  {
    path: 'questionnaire/i129l/page/1/:questionnaireId',
    component: I129LPage1Component
  },
  {
    path: 'questionnaire/i129l/page/2',
    component: I129LPage2Component
  },
  {
    path: 'questionnaire/i129l/page/3',
    component: I129LPage3Component
  },
  {
    path: 'questionnaire/i129l/page/4',
    component: I129LPage4Component
  }
];

const IMMIGRATION_VIEW_ORGANIZATION_ROUTER: Routes = [
  {
    path: 'organization/document-repository',
    component: OrganizationDocumentRepositoryComponent
  },
  {
    path: 'organization/details',
    component: OrganizationComponent
  },
];

const IMMIGRATION_VIEW_MANAGE_ACCOUNT_ROUTER: Routes = [
  {
    path: 'manageaccount/checklist',
    component: ManageaccountChecklistComponent
  },
  {
    path: 'manageaccount/invoices',
    component: ManageAccountInvoicesComponent
  },
  {
    path: 'manageaccount/markfordeletion',
    component: MarkforDeletionComponent
  },
  {
    path: 'manageaccount/organizations',
    component: ManageAccountOrganizationsComponent
  },
  {
    path: 'manageaccount/payments',
    component: ManageAccountPaymentsComponent
  },
  {
    path: 'manageaccount/petitiontypestages',
    component: ManageAccountPetitionTypeStagesComponent
  },
  {
    path: 'manageaccount/preferences',
    component: ManageAccountPreferencesComponent
  },
  {
    path: 'manageaccount/shippingaddress',
    component: ManageAccountShippingAddressComponent
  },
  {
    path: 'manageaccount/user',
    component: ManageAccountUserComponent
  },
  {
    path: 'manageaccount/user-details',
    component: ManageaccountUserDetailsComponent
  }
];

const IMMIGRATION_VIEW_REPORTS_ROUTER: Routes = [
  /*client*/
  {
    path: 'reports/client/created',
    component: ClientsCreatedReportsComponent
  },
  {
    path: 'reports/client/status',
    component: ClientStatusReportsComponent
  },

  /*petition*/
  {
    path: 'reports/petition/finalaction',
    component: PetitionFinalActionComponent
  },
  {
    path: 'reports/petition/stage',
    component: PetitionStagesReportsComponent
  },
  {
    path: 'reports/petition/status',
    component: PetitionsStatusReportsComponent
  },
  {
    path: 'reports/petition/tag',
    component: PetitionsTagsReportsComponent
  },
  {
    path: 'reports/petition/type',
    component: PetitionTypeReportComponent
  },

  /*user*/
  {
    path: 'reports/user/openpetitions',
    component: UserOpenPetitionComponent
  },
  {
    path: 'reports/user/totalpetitions',
    component: UserTotalPetitionsComponent
  },
];


export const immigrationViewClientRoute = RouterModule.forChild(IMMIGRATION_VIEW_CLIENT_ROUTER);
export const immigrationViewPetitionRoute = RouterModule.forChild(IMMIGRATION_VIEW_PETITION_ROUTER);
export const immigrationViewQuestionnaireRoute = RouterModule.forChild(IMMIGRATION_VIEW_QUESTIONNAIRE_ROUTER);
export const immigrationViewOrganizationRoute = RouterModule.forChild(IMMIGRATION_VIEW_ORGANIZATION_ROUTER);
export const immigrationViewManageAccountRoute = RouterModule.forChild(IMMIGRATION_VIEW_MANAGE_ACCOUNT_ROUTER);
export const immigrationViewReportsRoute = RouterModule.forChild(IMMIGRATION_VIEW_REPORTS_ROUTER);
