import {NgModule} from '@angular/core';
import {WebsiteFeaturesComponent} from './features/features.component';
import {websiteOtherRoute} from './websiteother.route';
import {WebsiteModule} from '../website.module';
import {WebsiteAboutusComponent} from './aboutus/aboutus.component';
import {WebsiteFaqComponent} from './faqs/faqs.component';
import {WebsiteGetinTouchComponent} from './get-in-touch/get-in-touch.component';
import {WebsiteImmigrationServicesComponent} from './immigration-services/immigration-services.component';
import {WebsitePricingComponent} from './pricing/pricing.component';

@NgModule({
  imports: [
    /*Website Other routes*/
    websiteOtherRoute,
    WebsiteModule
  ],
  declarations: [
    WebsiteFeaturesComponent,
    WebsiteAboutusComponent,
    WebsiteFaqComponent,
    WebsiteGetinTouchComponent,
    WebsiteImmigrationServicesComponent,
    WebsitePricingComponent
  ]
})
export class WebsiteOtherModule {

}
