import {ApplicationRef, NgModule} from '@angular/core';
import {WebsiteComponent} from './website/website.component';
import {websiteRoute} from './website.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {WebsiteHeaderComponent} from './header/websiteheader.component';
import {LoginPopupComponent} from './loginpopup/loginpopup.component';
import {WebsiteFooterComponent} from './footer/websitefooter.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {MatButtonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {RolesPopupComponent} from './rolespopup/rolespopup.component';

@NgModule({
  imports: [
    /*Material dialog modules*/
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,
    /*Website routes*/
    websiteRoute],
  exports: [
    WebsiteHeaderComponent,
    WebsiteFooterComponent,
    ResetPasswordComponent
  ],
  entryComponents: [
    RolesPopupComponent,
    LoginPopupComponent,
    ResetPasswordComponent
  ],
  declarations: [
    RolesPopupComponent,
    LoginPopupComponent,
    WebsiteHeaderComponent,
    WebsiteFooterComponent,
    WebsiteComponent,
    ResetPasswordComponent
  ]
})
export class WebsiteModule {
}
