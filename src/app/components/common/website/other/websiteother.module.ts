import {NgModule} from '@angular/core';
import {WebsiteFeaturesComponent} from './features/features.component';
import {websiteOtherRoute} from './websiteother.route';
import {WebsiteModule} from '../website.module';

@NgModule({
  imports: [
    /*Website Other routes*/
    websiteOtherRoute,
    WebsiteModule
  ],
  declarations: [ WebsiteFeaturesComponent]
})
export class WebsiteOtherModule {

}
