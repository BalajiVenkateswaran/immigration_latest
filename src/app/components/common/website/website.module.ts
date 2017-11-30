import {NgModule} from '@angular/core';
import {WebsiteComponent} from './website/website.component';
import {websiteRoute} from './website.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {WebsiteHeaderComponent} from './header/websiteheader.component';
import {LoginPopupComponent} from './loginpopup/loginpopup.component';
import {RolesPopupComponent} from './rolespopup/rolespopup.component';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,
    /*Website routes*/
    websiteRoute],
  exports: [
    WebsiteHeaderComponent
  ],
  entryComponents: [
    RolesPopupComponent,
    LoginPopupComponent
  ],
  declarations: [
    RolesPopupComponent,
    LoginPopupComponent,
    WebsiteHeaderComponent,
    WebsiteComponent ]
})
export class WebsiteModule {
}
