import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients-tab/clients/clients.component';
import {ImmigrationViewAddressinfoComponent} from './clients-tab/client-details/address/addressinfo.component';
import {ImmigrationViewArrivalDepartureInfoComponent} from './clients-tab/client-details/arrival-departure-info/arrival-departure-info.component';
import {ImmigrationViewClientDetailsComponent} from './clients-tab/client-details/client-details/client-details.component';
import {DependentDetailsComponent} from './clients-tab/client-details/dependent-details/dependent-details.component';
import {ImmigrationViewDependentsComponent} from './clients-tab/client-details/dependents/dependents.component';
import {ImmigrationviewDocumentExpirationsComponent} from './clients-tab/client-details/document-expirations/document-expirations.component';
import {DocumentManagementComponent} from './clients-tab/client-details/document-management/document-management.component';
import {ClientDocumentRepositoryComponent} from './clients-tab/client-details/document-repository/document-repository.component';
import {ImmigrationViewI797HistoryComponent} from './clients-tab/client-details/i-797-history/i-797-history.component';
import {ImmigrationViewJobDetailsComponent} from './clients-tab/client-details/job-details/job-details.component';
import {ImmigrationViewPassportInfoComponent} from './clients-tab/client-details/passport-info/passport-info.component';
import {ImmigrationViewPetitionsComponent} from './clients-tab/client-details/petitions/petitions.component';
import {ImmigrationViewVisasComponent} from './clients-tab/client-details/visas/visas.component';

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
  {
    path: 'client/detail/dependentDetails/:dependentId',
    component: DependentDetailsComponent
  },
  {
    path: 'client/detail/dependents',
    component: ImmigrationViewDependentsComponent
  },
  {
    path: 'client/detail/document-expirations',
    component: ImmigrationviewDocumentExpirationsComponent
  },
  {
    path: 'client/detail/document-management',
    component: DocumentManagementComponent
  },
  {
    path: 'client/detail/client-document-repository',
    component: ClientDocumentRepositoryComponent
  },
  {
    path: 'client/detail/I-797-history',
    component:  ImmigrationViewI797HistoryComponent
  },
  {
    path: 'client/detail/job-details',
    component: ImmigrationViewJobDetailsComponent
  },
  {
    path: 'client/detail/passport-info',
    component: ImmigrationViewPassportInfoComponent
  },
  {
    path: 'client/detail/petitions',
    component: ImmigrationViewPetitionsComponent
  },
  {
    path: 'client/detail/visas',
    component: ImmigrationViewVisasComponent
  },

];

export const immigrationViewRoute = RouterModule.forChild(IMMIGRATION_VIEW_ROUTER);
