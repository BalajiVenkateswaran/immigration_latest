import {RouterModule, Routes} from '@angular/router';
import {ProfileChangePwdComponent} from './changepassword/changepassword.component';
import {ProfileSwitchComponent} from './switch/switch.component';
import {ProfileTodoListComponent} from './todolist/todolist.component';
import {ProfileLoginHisComponent} from './loginhistory/loginhistory.component';
import {ProfileUserComponent} from './user/user.component';

const IMMIGRATION_VIEW_PROFILE_ROUTER: Routes = [
  {
    path: 'changepassword',
    component: ProfileChangePwdComponent
  },
  {
    path: 'loginhistory',
    component: ProfileLoginHisComponent
  },
  {
    path: 'switch',
    component: ProfileSwitchComponent
  },
  {
    path: 'todo',
    component: ProfileTodoListComponent
  },
  {
    path: 'user',
    component: ProfileUserComponent
  },
];
export const immigrationViewProfileRoute = RouterModule.forChild(IMMIGRATION_VIEW_PROFILE_ROUTER);
