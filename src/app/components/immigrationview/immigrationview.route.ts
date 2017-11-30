import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients-tab/clients/clients.component';
import {ImmigrationViewAddressinfoComponent} from './clients-tab/client-details/address/addressinfo.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import {ImmigrationViewClientDetailsComponent} from './clients-tab/client-details/client-details/client-details.component';

const IMMIGRATION_VIEW_ROUTER: Routes = [
  {
    path: 'tab/clients',
    component: ClientsComponent
  },
  {
    path: 'client/detail/addressinfo',
    component: ImmigrationViewAddressinfoComponent
  },
  {
    path: 'client/detail/arrival-departure-info',
    component: ImmigrationViewArrivalDepartureInfoComponent
  },
  {
    path: 'client/detail/client-details',
    component: ImmigrationViewClientDetailsComponent
  },
];

export const immigrationViewRoute = RouterModule.forChild(IMMIGRATION_VIEW_ROUTER);
