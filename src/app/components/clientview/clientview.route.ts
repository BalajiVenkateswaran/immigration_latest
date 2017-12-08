import {RouterModule, Routes} from '@angular/router';
import {AddressinfoComponent} from './client-details-tab/addressinfo/addressinfo.component';
import {ArrivalDepartureInfoComponent} from './client-details-tab/arrival-departure-info/arrival-departure-info.component';
import {ClientDetailsComponent} from './client-details-tab/client-details/client-details.component';
import {DependentsComponent} from './client-details-tab/dependents/dependents.component';
import {DocumentExpirationsComponent} from './client-details-tab/document-expirations/document-expirations.component';
import {I797HistoryComponent} from './client-details-tab/i-797-history/i-797-history.component';
import {JobDetailsComponent} from './client-details-tab/job-details/job-details.component';
import {ClientViewPassportInfoComponent} from './client-details-tab/passport-info/passport-info.component';
import {VisasComponent} from './client-details-tab/visas/visas.component';
import {DocumentsComponent} from './documents-tab/documents.component';
import {ClientViewPetitionsComponent} from './petitions-tab/petitions.component';
import {ClientViewQuestionnaireComponent} from './questionnaries-tab/questionnaires/questionnaries.component';
import {ClientViewRequestComponent} from './request-tab/request.component';

const CLIENT_VIEW_CLIENT_DETAILS_ROUTER: Routes = [
  {
    path: 'client/details/addressinfo',
    component: AddressinfoComponent
  },
  {
    path: 'client/details/arrival-departure-info',
    component: ArrivalDepartureInfoComponent
  },
  {
    path: 'client/details',
    component: ClientDetailsComponent
  },
  {
    path: 'client/details/dependents',
    component: DependentsComponent
  },
  {
    path: 'client/details/document-expirations',
    component: DocumentExpirationsComponent
  },
  {
    path: 'client/details/I-797-history',
    component: I797HistoryComponent
  },
  {
    path: 'client/details/job-details',
    component: JobDetailsComponent
  },
  {
    path: 'client/details/passport-info',
    component: ClientViewPassportInfoComponent
  },
  {
    path: 'client/details/visas',
    component: VisasComponent
  }
];


const CLIENT_VIEW_TABS_ROUTER: Routes = [
  {
    path: 'documents/:clientId',
    component: DocumentsComponent
  },
  {
    path: 'petitions',
    component: ClientViewPetitionsComponent
  },
  {
    path: 'questionnaries',
    component: ClientViewQuestionnaireComponent
  },
  {
    path: 'requests',
    component: ClientViewRequestComponent
  },
];
export const clientViewClientDetailsRoute = RouterModule.forChild(CLIENT_VIEW_CLIENT_DETAILS_ROUTER);
export const clientViewTabsRoute = RouterModule.forChild(CLIENT_VIEW_TABS_ROUTER);
