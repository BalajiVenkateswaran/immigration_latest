import {NgModule} from '@angular/core';
import {ClientsComponent} from './clients-tab/clients/clients.component';
import {immigrationViewClientRoute, immigrationViewManageAccountRoute, immigrationViewOrganizationRoute, immigrationViewPetitionRoute, immigrationViewQuestionnaireRoute, immigrationViewReportsRoute} from './immigrationview.route';
import {StatusButtonComponent} from './clients-tab/clients/statusButton';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {AppSharedModule} from '../../shared/app.shared.module';
import {ImmigrationViewAddressinfoComponent} from './clients-tab/client-details/address/addressinfo.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import {ImmigrationViewClientDetailsComponent} from './clients-tab/client-details/client-details/client-details.component';
import {DependentDetailsComponent} from './clients-tab/client-details/dependent-details/dependent-details.component';
import {ImmigrationViewDependentsComponent} from './clients-tab/client-details/dependents/dependents.component';
import {ImmigrationviewDocumentExpirationsComponent} from './clients-tab/client-details/document-expirations/document-expirations.component';
import {DocumentManagementComponent} from './petitions-tab/petition-details/document-management/document-management.component';
import {ClientDocumentRepositoryComponent} from './clients-tab/client-details/document-repository/document-repository.component';
import {ImmigrationViewI797HistoryComponent} from './clients-tab/client-details/i-797-history/i-797-history.component';
import {ImmigrationViewPassportInfoComponent} from './clients-tab/client-details/passport-info/passport-info.component';
import {ImmigrationViewPetitionsComponent} from './clients-tab/client-details/petitions/petitions.component';
import {ImmigrationViewVisasComponent} from './clients-tab/client-details/visas/visas.component';
import {ImmigrationViewJobDetailsComponent} from './clients-tab/client-details/job-details/job-details.component';
import {PetitionsComponent} from './petitions-tab/petitions/petitions.component';
import {PetitionDocumentRepositoryComponent} from './petitions-tab/petition-details/document-repository/petition-document-repository.component';
import {NotesComponent} from './petitions-tab/petition-details/notes/notes.component';
import {PetitionDetailsComponent} from './petitions-tab/petition-details/petition-details/petition-details.component';
import {ImmigrationviewQuestionnaireComponent} from './petitions-tab/petition-details/questionnaire/questionnaire.component';
import {I129Page1Component} from './petitions-tab/petition-details/questionnaires/i129/page-1/page-1.component';
import {I129Page3Component} from './petitions-tab/petition-details/questionnaires/i129/page-3/page-3.component';
import {I129Page4Component} from './petitions-tab/petition-details/questionnaires/i129/page-4/page-4.component';
import {I129Page5Component} from './petitions-tab/petition-details/questionnaires/i129/page-5/page-5.component';
import {I129Page6Component} from './petitions-tab/petition-details/questionnaires/i129/page-6/page-6.component';
import {I129Page7Component} from './petitions-tab/petition-details/questionnaires/i129/page-7/page-7.component';
import {I129Page8Component} from './petitions-tab/petition-details/questionnaires/i129/page-8/page-8.component';
import {I129dcPage1Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-1/page-1.component';
import {I129dcPage2Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-2/page-2.component';
import {I129dcPage3Component} from './petitions-tab/petition-details/questionnaires/i129DC/page-3/page-3.component';
import {I129HPage2Component} from './petitions-tab/petition-details/questionnaires/i129H/page-2/page-2.component';
import {I129HPage3Component} from './petitions-tab/petition-details/questionnaires/i129H/page-3/page-3.component';
import {I129HPage4Component} from './petitions-tab/petition-details/questionnaires/i129H/page-4/page-4.component';
import {I129HPage5Component} from './petitions-tab/petition-details/questionnaires/i129H/page-5/page-5.component';
import {I129HPage6Component} from './petitions-tab/petition-details/questionnaires/i129H/page-6/page-6.component';
import {I129LPage1Component} from './petitions-tab/petition-details/questionnaires/L1/page-1/page-1.component';
import {I129LPage2Component} from './petitions-tab/petition-details/questionnaires/L1/page-2/page-2.component';
import {I129LPage3Component} from './petitions-tab/petition-details/questionnaires/L1/page-3/page-3.component';
import {I129LPage4Component} from './petitions-tab/petition-details/questionnaires/L1/page-4/page-4.component';
import {DownloadButton} from './petitions-tab/petition-details/questionnaire/DownloadButton';
import {GenerateFormButton} from './petitions-tab/petition-details/questionnaire/GenerateFormButton';
import {SendToClientQuestionnaire} from './petitions-tab/petition-details/questionnaire/SendToClientQuestionnaire';
import {OrganizationDocumentRepositoryComponent} from './organization-tab/document-repository/document-repository.component';
import {OrganizationComponent} from './organization-tab/organization/organization.component';
import {ManageaccountChecklistComponent} from './manage-account-tab/checklist/checklist.component';
import {CheckListDownloadButtonComponent} from './manage-account-tab/checklist/downloadButton';
import {CheckListUploadButtonComponent} from './manage-account-tab/checklist/uploadButton';
import {ManageAccountInvoicesComponent} from './manage-account-tab/invoices/invoices.component';
import {MarkforDeletionComponent} from './manage-account-tab/markfordeletion/markfordeletion.component';
import {DownloadInvoiceButtonComponent} from './manage-account-tab/invoices/DownloadInvoiceButton';
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

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,

    AppSharedModule,
    /*Immigration view routes*/
    immigrationViewClientRoute,
    immigrationViewPetitionRoute,
    immigrationViewQuestionnaireRoute,
    immigrationViewOrganizationRoute,
    immigrationViewManageAccountRoute,
    immigrationViewReportsRoute
  ],
  declarations: [
    /*Immigration view components*/
    StatusButtonComponent,
    ClientsComponent,
    /*Client detail components*/
    ImmigrationViewAddressinfoComponent,
    ImmigrationViewArrivalDepartureInfoComponent,
    ImmigrationViewClientDetailsComponent,
    DependentDetailsComponent,
    ImmigrationViewDependentsComponent,
    ImmigrationviewDocumentExpirationsComponent,
    DocumentManagementComponent,
    ClientDocumentRepositoryComponent,
    ImmigrationViewI797HistoryComponent,
    ImmigrationViewPassportInfoComponent,
    ImmigrationViewPetitionsComponent, /*AddPetitionDialogComponent,*/
    ImmigrationViewVisasComponent,
    ImmigrationViewJobDetailsComponent,

    PetitionsComponent,
    /*Petition detail components*/
    PetitionDocumentRepositoryComponent,
    NotesComponent,
    PetitionDetailsComponent,
    ImmigrationviewQuestionnaireComponent, SendToClientQuestionnaire, DownloadButton, GenerateFormButton,


    /*Questionnaire pages*/
    I129Page1Component,
    // I129Page2Component,
    I129Page3Component,
    I129Page4Component,
    I129Page5Component,
    I129Page6Component,
    I129Page7Component,
    I129Page8Component,
    I129dcPage1Component,
    I129dcPage2Component,
    I129dcPage3Component,
    // I129HPage1Component,
    I129HPage2Component,
    I129HPage3Component,
    I129HPage4Component,
    I129HPage5Component,
    I129HPage6Component,
    I129LPage1Component,
    I129LPage2Component,
    I129LPage3Component,
    I129LPage4Component,

    /*Organization details*/
    OrganizationDocumentRepositoryComponent,
    OrganizationComponent,


    /*manage account*/
    ManageaccountChecklistComponent, CheckListDownloadButtonComponent, CheckListUploadButtonComponent,
    ManageAccountInvoicesComponent, DownloadInvoiceButtonComponent,
    MarkforDeletionComponent,
    ManageAccountOrganizationsComponent,
    ManageAccountPaymentsComponent,
    ManageAccountPetitionTypeStagesComponent,
    ManageAccountPreferencesComponent,
    ManageAccountShippingAddressComponent,
    ManageAccountUserComponent,
    ManageaccountUserDetailsComponent,

    /*reports - START*/
    /*client*/
    ClientsCreatedReportsComponent,
    ClientStatusReportsComponent,

    /*petition*/
    PetitionFinalActionComponent,
    PetitionStagesReportsComponent,
    PetitionsStatusReportsComponent,
    PetitionsTagsReportsComponent,
    PetitionTypeReportComponent,

    /*user*/
    UserOpenPetitionComponent,
    UserTotalPetitionsComponent,

    /*reports - END*/
  ]
})
export class ImmigrationViewModule {}
