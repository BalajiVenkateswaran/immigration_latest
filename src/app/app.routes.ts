import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HeaderComponent} from './components/common/header/header.component';
import {MenuComponent} from './components/common/menu/menu.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';

import {I129Page2Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129/page-2/page-2.component';

import {I129HPage1Component} from './components/immigrationview/petitions-tab/petition-details/questionnaires/i129H/page-1/page-1.component';


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
      path: 'profile',
      loadChildren: 'app/components/immigrationview/profile-tab/profiletab.module#ProfileTabModule'
  },
  {
      path: 'superuserview',
      loadChildren: 'app/components/superuserview/superuserview.module#SuperUserViewModule'
  },
  {
      path: 'clientview',
      loadChildren: 'app/components/clientview/clientview.module#ClientViewModule'
  },
  {
      path: '**',
      loadChildren: 'app/components/common/website/website.module#WebsiteModule'
  }

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);



