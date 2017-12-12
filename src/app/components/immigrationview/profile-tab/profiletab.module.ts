import {NgModule} from '@angular/core';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {AppSharedModule} from '../../../shared/app.shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProfileChangePwdComponent} from './changepassword/changepassword.component';
import {ProfileSwitchComponent} from './switch/switch.component';
import {ProfileTodoListComponent} from './todolist/todolist.component';
import {SwitchButtonComponent} from './switch/switchButton';
import {ProfileLoginHisComponent} from './loginhistory/loginhistory.component';
import {ProfileUserComponent} from './user/user.component';
import {immigrationViewProfileRoute} from './profiletab.route';

@NgModule({
  imports: [
    /*Angular core modules*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Popup module*/
    BootstrapModalModule,

    AppSharedModule,
    /*Profile tab routes*/
    immigrationViewProfileRoute
  ],
  declarations: [
    /*Profile tab*/
    ProfileChangePwdComponent,
    ProfileLoginHisComponent,
    ProfileSwitchComponent, SwitchButtonComponent,
    ProfileTodoListComponent,
    ProfileUserComponent,
  ]
})
export class ProfileTabModule {}
