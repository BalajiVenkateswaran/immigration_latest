import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HeaderComponent} from './components/common/header/header.component';
import {MenuComponent} from './components/common/menu/menu.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {AddressinfoComponent} from './components/clientview/client-details-tab/addressinfo/addressinfo.component';
import {ArrivalDespartureInfoComponent} from './components/clientview/client-details-tab/arrival-departure-info/arrival-desparture-info.component';
import {ClientDetailsComponent} from './components/clientview/client-details-tab/client-details/client-details.component';
import {DependentsComponent} from './components/clientview/client-details-tab/dependents/dependents.component';
import {DocumentExpirationsComponent} from './components/clientview/client-details-tab/document-expirations/document-expirations.component';
import {I797HistoryComponent} from './components/clientview/client-details-tab/i-797-history/i-797-history.component';
import {JobDetailsComponent} from './components/clientview/client-details-tab/job-details/job-details.component';
import {ClientViewPassportInfoComponent} from './components/clientview/client-details-tab/passport-info/passport-info.component';
import {VisasComponent} from './components/clientview/client-details-tab/visas/visas.component';
import {DocumentsComponent} from './components/clientview/documents-tab/documents.component';

import {petitionsclientviewComponent} from './components/clientview/petitions-tab/petitions.component';
import {clientviewQuestionnaireComponent} from './components/clientview/questionnaries-tab/questionnaires/questionnaries.component';
import {requestclientviewcomponent} from './components/clientview/request-tab/request.component';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';
// superuserview
import {SuperuserViewAccountDetailsComponent} from './components/superuserview/accounts-tab/account-details/account-details/account-details.component';
import {SuperuserviewProductcatalogComponent} from './components/superuserview/product-catalog-tab/products/product-catalog.component';
import {AccountsManagersComponent} from './components/superuserview/accounts-tab/account-details/account-managers/accountmanagers.component';
import {AccountInvoiceComponent} from './components/superuserview/accounts-tab/account-details/invoice/invoice.component';
import {AccountDetailsPaymentsComponent} from './components/superuserview/accounts-tab/account-details/payments/payments.component';

import {SuperuserviewAccountdetailsMfdComponent} from './components/superuserview/accounts-tab/account-details/mfd/mfd.component';
import {AccountPreferencesComponent} from './components/superuserview/accounts-tab/account-details/accountpreferences/accountpreferences.component';
// immigrationview reports
// profile
// superuser reports
import {StatsAccountsComponent} from './components/superuserview/reports-tab/stats/accounts/accounts.component';
import {SuperUserPetitionsStatusReportsComponent} from './components/superuserview/reports-tab/petitions/status/status.component';
import {SuperUserPetitionFinalActionReportsComponent} from './components/superuserview/reports-tab/petitions/final-action/final-action.component';
import {SuperUserClientsCreatedReportsComponent} from './components/superuserview/reports-tab/clients/created/created.component';
import {SuperUserTotalPetitionsReportsComponent} from './components/superuserview/reports-tab/users/totalpetitions/totalpetitions.component';
import {SuperUserOpenPetitionComponent} from './components/superuserview/reports-tab/users/openpetitions/openpetitions.component';
import {SuperUserStatsOrgsReportsComponent} from './components/superuserview/reports-tab/stats/orgs/orgs.component';
// PDF Pages I-129
import {I129Page2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';
import {SuperUserPetitionStageReportsComponent} from './components/superuserview/reports-tab/petitions/stage/stage.component';
import {SuperUserH1BReportsComponent} from './components/superuserview/reports-tab/petitions/petitiontypeh1b/petitiontypesH1B.component';
import {SuperUserPetitionTagReportsComponent} from './components/superuserview/reports-tab/petitions/tag/tag.component';
import {SuperUserStatsClientsReportsComponent} from './components/superuserview/reports-tab/stats/clients/clients.component';
import {SuperUserStatsPetitionReportsComponent} from './components/superuserview/reports-tab/stats/petitions/petitions.component';
import {SuperUserMonthlyReportsComponent} from './components/superuserview/reports-tab/payments/monthly/monthly.component';

import {I129HPage1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-1/page-1.component';
import {SuperuserviewProductcatalogDiscountsComponent} from './components/superuserview/product-catalog-tab/discounts/discounts.component';
import {SuperUserClientStatusReportsComponent} from './components/superuserview/reports-tab/clients/status/status.component';
import {SuperUserViewInvoicestabComponent} from './components/superuserview/invoices-tab/invoices.component';
import {SuperUserViewPaymentstabComponent} from './components/superuserview/payments-tab/payments.component';

import {DemoRequestDetailsComponent} from './components/superuserview/misc-tab/demorequestdetails/demorequestdetails.component';
import {MiscSuperUsersComponent} from './components/superuserview/misc-tab/superusers/miscsuperusers.component';


// Website Components

export const appRoutes: Routes = [
  {
    path: 'clientview-i129Page2/:questionnaireId',
    component: I129Page2Component,
  },
    {
        path: 'clientview-i129hPage1/:questionnaireId',
        component: I129HPage1Component
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
        path: 'clientview-client-details',
        component: ClientDetailsComponent
    },
    {
        path: 'clientview-Questionnaries',
        component: clientviewQuestionnaireComponent
    },

    {
        path: 'clientview-addressinfo',
        component: AddressinfoComponent
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
        component: ClientViewPassportInfoComponent
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
        path: 'clientview-petitions',
        component: petitionsclientviewComponent
    },


    {
        path: 'clientview-Requests',
        component: requestclientviewcomponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },



  /**
   * Custom module routes
   */

  {
      path: '',
      loadChildren: 'app/components/common/website/website.module#WebsiteModule'
  },
  {
      path: 'website/other',
      loadChildren: 'app/components/common/website/other/websiteother.module#WebsiteOtherModule'
  },
  {
      path: 'immigrationview',
      loadChildren: 'app/components/immigrationview/immigrationview.module#ImmigrationViewModule'
  },
  {
      path: 'superuserview',
      loadChildren: 'app/components/superuserview/superuserview.module#SuperUserViewModule'
  },
  {
      path: '**',
      loadChildren: 'app/components/common/website/website.module#WebsiteModule'
  }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);



