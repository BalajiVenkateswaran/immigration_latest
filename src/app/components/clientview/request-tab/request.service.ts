import {Injectable} from '@angular/core';
import {RestService} from '../../../services/rest.service';

@Injectable()
export class ClientRequestService {

  constructor(private restService: RestService) {

  }

  public getClientInvites(userId: string) {
      return this.restService.getData('/client/invite/' + userId);
  }

  public updateClientInviteStatus(updateStatus: any) {
      let req = {
          'updateStatus': updateStatus
      };
      return this.restService.postData('/client/invite/updateStatus', updateStatus);
  }
}
