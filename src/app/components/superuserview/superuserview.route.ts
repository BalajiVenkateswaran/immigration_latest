import {RouterModule, Routes} from '@angular/router';
import {SuperUserViewAccountsComponent} from './accounts-tab/accounts/accounts.component';
import {SuperuserViewAccountDetailsComponent} from './accounts-tab/account-details/account-details/account-details.component';
import {AccountsManagersComponent} from './accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountPreferencesComponent} from './accounts-tab/account-details/accountpreferences/accountpreferences.component';
import {AccountInvoiceComponent} from './accounts-tab/account-details/invoice/invoice.component';
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

const SUPERUSER_VIEW_ACCOUNTS_ROUTER: Routes = [
  {
    path: 'tab/accounts',
    component: SuperUserViewAccountsComponent
  },
  {
    path: 'account/details',
    component: SuperuserViewAccountDetailsComponent
  },
  {
    path: 'account/managers',
    component: AccountsManagersComponent
  },
  {
    path: 'account/preference',
    component: AccountPreferencesComponent
  },
  {
    path: 'account/invoice',
    component: AccountInvoiceComponent
  },
  {
    path: 'account/mfd',
    component: SuperuserviewAccountdetailsMfdComponent
  },
  {
    path: 'account/payments',
    component: AccountDetailsPaymentsComponent
  }

];
const SUPERUSER_VIEW_INVOICE_ROUTER: Routes = [
  {
    path: 'tab/invoices',
    component: SuperUserViewInvoicestabComponent
  }
];
const SUPERUSER_VIEW_MISC_ROUTER: Routes = [
  {
    path: 'misc/demorequest',
    component: DemoRequestDetailsComponent
  },
  {
    path: 'misc/superusers',
    component: MiscSuperUsersComponent
  }
];
const SUPERUSER_VIEW_PAYMENTS_ROUTER: Routes = [
  {
    path: 'tab/payments',
    component: SuperUserViewPaymentstabComponent
  }
];
const SUPERUSER_VIEW_PRODUCT_CATALOG_ROUTER: Routes = [
  {
    path: 'productcatalog/discounts',
    component: SuperuserviewProductcatalogDiscountsComponent
  },
  {
    path: 'productcatalog',
    component: SuperuserviewProductcatalogComponent
  }
];
const SUPERUSER_VIEW_REPORTS_ROUTER: Routes = [

  {
    path: 'reports/clients/created',
    component: SuperUserClientsCreatedReportsComponent
  },
  {
    path: 'reports/clients/status',
    component: SuperUserClientStatusReportsComponent
  },
  {
    path: 'reports/payments/monthly',
    component: SuperUserMonthlyReportsComponent
  },
  {
    path: 'reports/petitions/finalaction',
    component: SuperUserPetitionFinalActionReportsComponent
  },
  {
    path: 'reports/petition/types',
    component: SuperUserH1BReportsComponent
  },
  {
    path: 'reports/petition/stage',
    component: SuperUserPetitionStageReportsComponent
  },
  {
    path: 'reports/petition/status',
    component: SuperUserPetitionsStatusReportsComponent
  },
  {
    path: 'reports/petition/tag',
    component: SuperUserPetitionTagReportsComponent
  },
  {
    path: 'reports/stats/accounts',
    component: StatsAccountsComponent
  },
  {
    path: 'reports/stats/clients',
    component: SuperUserStatsClientsReportsComponent
  },
  {
    path: 'reports/stats/orgs',
    component: SuperUserStatsOrgsReportsComponent
  },
  {
    path: 'reports/stats/petitions',
    component: SuperUserStatsPetitionReportsComponent
  },
  {
    path: 'reports/users/petitions/open',
    component: SuperUserOpenPetitionComponent
  },
  {
    path: 'reports/users/petitions/total',
    component: SuperUserTotalPetitionsReportsComponent
  },
];
export const superuserViewAccountsRoute = RouterModule.forChild(SUPERUSER_VIEW_ACCOUNTS_ROUTER);
export const superuserViewInvoiceRoute = RouterModule.forChild(SUPERUSER_VIEW_INVOICE_ROUTER);
export const superuserViewMiscRoute = RouterModule.forChild(SUPERUSER_VIEW_MISC_ROUTER);
export const superuserViewPaymentsRoute = RouterModule.forChild(SUPERUSER_VIEW_PAYMENTS_ROUTER);
export const superuserViewProductCatalogRoute = RouterModule.forChild(SUPERUSER_VIEW_PRODUCT_CATALOG_ROUTER);
export const superuserViewReportsRoute = RouterModule.forChild(SUPERUSER_VIEW_REPORTS_ROUTER);
