import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewClientDetailsService {

    constructor(private restService: RestService) {
    }

    public getClientDetails(clientId: string) {
        return this.restService.getData('/client/details/' + clientId);
    }

     public saveClientDetails(clientDetails: any, client: any, updatedBy: string) {
            let req = {
              'clientDetails' : clientDetails,
              'client' : client,
              'updatedBy' : updatedBy
            };

            return this.restService.postData('/client/details', req);
     }

     public sendClientInvite(clientId: string) {
        return this.restService.getData('/client/sendinvite/' + clientId);
     }
     public getClientInvites(userId: string) {
      return this.restService.getData('/client/invite/' + userId);
  }
}
