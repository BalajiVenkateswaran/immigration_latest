import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewClientDetailsService {

    constructor(private restService: RestService) {
    }

    public getClientDetails(clientId: string) {
        return this.restService.getData('/immigration/client/' + clientId + '/details');
    }

     public saveClientDetails(clientDetails: any, client: any, updatedBy: string, accountId: string) {
        let req = {
          'clientDetails' : clientDetails,
          'client' : client,
          'updatedBy' : updatedBy
        };

        return this.restService.postData('/immigration/account/' + accountId + '/client/' + client['clientId'] + '/details', req);
     }

     public sendClientInvite(clientId: string) {
        return this.restService.getData('/client/sendinvite/' + clientId);
     }
     public getClientInvites(userId: string) {
      return this.restService.getData('/client/invite/' + userId);
  }
}
