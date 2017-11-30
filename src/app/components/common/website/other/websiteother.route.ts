import {RouterModule, Routes} from '@angular/router';
import {WebsiteFeaturesComponent} from './features/features.component';
const WEBSITE_OTHER_ROUTER: Routes = [
  {
    path: 'features',
    component: WebsiteFeaturesComponent
  }
]

export const websiteOtherRoute = RouterModule.forChild(WEBSITE_OTHER_ROUTER);
