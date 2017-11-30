import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients-tab/clients/clients.component';

const IMMIGRATION_VIEW_ROUTER: Routes = [
  {
    path: 'tab/clients',
    component: ClientsComponent
  },
];

export const immigrationViewRoute = RouterModule.forChild(IMMIGRATION_VIEW_ROUTER);
