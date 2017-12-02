import { client } from '../../../../models/client';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';
import {HeaderService} from '../../../common/header/header.service';

@Injectable()
export class ClientsService {


  constructor(private restService: RestService) {
  }



  public getClients (queryParams, orgId: string) {
    console.log('PetitionsService|getPetitions|orgId:%o', orgId);
    return this.restService.getData('/clients/immigration/' + orgId + queryParams);
  }

  public saveNewClient(clientData: client) {
      return this.restService.postData('/client', clientData);
  }

  public removeclient(clientId: string, immigrationOfficerId: string) {
      return this.restService.deleteData('/client/' + clientId + '/immigrationOfficerId/' + immigrationOfficerId);
  }
  public getClientsWithQueryParams(orgId: string, queryData) {
    return this.restService.getData('/clients/immigration/' + orgId + queryData);
  }
}
