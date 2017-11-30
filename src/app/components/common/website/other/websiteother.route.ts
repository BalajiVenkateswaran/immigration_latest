import {RouterModule, Routes} from '@angular/router';
import {WebsiteFeaturesComponent} from './features/features.component';
import {WebsiteAboutusComponent} from './aboutus/aboutus.component';
import {WebsiteFaqComponent} from './faqs/faqs.component';
import {WebsiteGetinTouchComponent} from './get-in-touch/get-in-touch.component';
import {WebsiteImmigrationServicesComponent} from './immigration-services/immigration-services.component';
import {WebsitePricingComponent} from './pricing/pricing.component';
const WEBSITE_OTHER_ROUTER: Routes = [
  {
    path: 'features',
    component: WebsiteFeaturesComponent
  },
  {
    path: 'aboutus',
    component: WebsiteAboutusComponent
  },
  {
    path: 'faqs',
    component: WebsiteFaqComponent
  },
  {
    path: 'getintouch',
    component: WebsiteGetinTouchComponent
  },
  {
    path: 'immigration-services',
    component: WebsiteImmigrationServicesComponent
  },
  {
    path: 'pricing',
    component: WebsitePricingComponent
  }

]

export const websiteOtherRoute = RouterModule.forChild(WEBSITE_OTHER_ROUTER);
