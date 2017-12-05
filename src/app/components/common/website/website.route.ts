import {RouterModule, Routes} from '@angular/router';
import {WebsiteComponent} from './website/website.component';

const WEBSITE_ROUTER: Routes = [
  {
    path: '',
    component: WebsiteComponent
  },
  {
    path: 'login',
    component: WebsiteComponent
  }
]

export const websiteRoute = RouterModule.forChild(WEBSITE_ROUTER);
