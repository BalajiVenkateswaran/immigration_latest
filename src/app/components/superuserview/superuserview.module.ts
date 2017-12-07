
import {NgModule} from '@angular/core';
import {superuserViewAccountsRoute, superuserViewInvoiceRoute, superuserViewMiscRoute, superuserViewPaymentsRoute, superuserViewProductCatalogRoute, superuserViewReportsRoute} from './superuserview.route';
import {SuperUserViewAccountsComponent} from './accounts-tab/accounts/accounts.component';
import {AppSharedModule} from '../../shared/app.shared.module';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReportsCommonService} from './reports-tab/common/reports-common.service';
import {AccountDetailsCommonService} from './accounts-tab/account-details/common/account-details-common.service';
import {SuperuserViewAccountDetailsComponent} from './accounts-tab/account-details/account-details/account-details.component';
import {AccountsManagersComponent} from './accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountPreferencesComponent} from './accounts-tab/account-details/accountpreferences/accountpreferences.component';
import {AccountInvoiceComponent} from './accounts-tab/account-details/invoice/invoice.component';
import {InvoiceDownloadButtonComponent} from './accounts-tab/account-details/invoice/invoicedownloadbutton';
import {InvoiceUploadButtonComponent} from './accounts-tab/account-details/invoice/invoiceuploadbutton';
import {SuperuserviewAccountdetailsMfdComponent} from './accounts-tab/account-details/mfd/mfd.component';
import {AccountDetailsPaymentsComponent} from './accounts-tab/account-details/payments/payments.component';
import {SuperUserViewInvoicestabComponent} from './invoices-tab/invoices.component';
import {SuperUserViewPaymentstabComponent} from './payments-tab/payments.component';
import {SuperuserviewProductcatalogComponent} from './product-catalog-tab/products/product-catalog.component';
import {DemoRequestDetailsComponent} from './misc-tab/demorequestdetails/demorequestdetails.component';
import {MiscSuperUsersComponent} from './misc-tab/superusers/miscsuperusers.component';
import {SuperuserviewProductcatalogDiscountsComponent} from './product-catalog-tab/discounts/discounts.component';
import {StatsAccountsComponent} from './reports-tab/stats/accounts/accounts.component';
import {SuperUserPetitionsStatusReportsComponent} from './reports-tab/petitions/status/status.component';
import {SuperUserH1BReportsComponent} from './reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.component';
import {SuperUserPetitionStageReportsComponent} from './reports-tab/petitions/stage/stage.component';
import {SuperUserPetitionTagReportsComponent} from './reports-tab/petitions/tag/tag.component';
import {SuperUserPetitionFinalActionReportsComponent} from './reports-tab/petitions/final-action/final-action.component';
import {SuperUserClientStatusReportsComponent} from './reports-tab/clients/status/status.component';
import {SuperUserClientsCreatedReportsComponent} from './reports-tab/clients/created/created.component';
import {SuperUserTotalPetitionsReportsComponent} from './reports-tab/users/totalpetitions/totalpetitions.component';
import {SuperUserOpenPetitionComponent} from './reports-tab/users/openpetitions/openpetitions.component';
import {SuperUserStatsOrgsReportsComponent} from './reports-tab/stats/orgs/orgs.component';
import {SuperUserStatsClientsReportsComponent} from './reports-tab/stats/clients/clients.component';
import {SuperUserStatsPetitionReportsComponent} from './reports-tab/stats/petitions/petitions.component';
import {SuperUserMonthlyReportsComponent} from './reports-tab/payments/monthly/monthly.component';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,

    AppSharedModule,



    /*Super User view routes*/
    superuserViewAccountsRoute,
    superuserViewInvoiceRoute,
    superuserViewMiscRoute,
    superuserViewPaymentsRoute,
    superuserViewProductCatalogRoute,
    superuserViewReportsRoute

  ],
  declarations: [
    /*Accounts Tab*/
    SuperUserViewAccountsComponent,

    /*Account Details*/
    SuperuserViewAccountDetailsComponent,
    AccountsManagersComponent,
    AccountPreferencesComponent,
    AccountInvoiceComponent, InvoiceDownloadButtonComponent, InvoiceUploadButtonComponent,
    SuperuserviewAccountdetailsMfdComponent,
    AccountDetailsPaymentsComponent,

    /*Invoice tab*/
    SuperUserViewInvoicestabComponent,

    /*Misc tab*/
    DemoRequestDetailsComponent,
    MiscSuperUsersComponent,
    /*payments tab*/
    SuperUserViewPaymentstabComponent,
    /*product catalog tab*/
    SuperuserviewProductcatalogDiscountsComponent,
    SuperuserviewProductcatalogComponent,
    /*reports tab*/

    SuperUserClientsCreatedReportsComponent,
    SuperUserClientStatusReportsComponent,
    SuperUserMonthlyReportsComponent,
    SuperUserPetitionFinalActionReportsComponent,
    SuperUserH1BReportsComponent,
    SuperUserPetitionStageReportsComponent,
    SuperUserPetitionsStatusReportsComponent,
    StatsAccountsComponent,
    SuperUserStatsClientsReportsComponent,
    SuperUserStatsOrgsReportsComponent,
    SuperUserPetitionTagReportsComponent,
    SuperUserStatsPetitionReportsComponent,
    SuperUserOpenPetitionComponent,
    SuperUserTotalPetitionsReportsComponent,

  ],
  providers: [
    ReportsCommonService,
    AccountDetailsCommonService
  ]
})
export class SuperUserViewModule {}
