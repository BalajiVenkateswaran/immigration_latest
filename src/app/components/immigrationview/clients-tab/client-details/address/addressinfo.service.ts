import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AddressInfoservice {

  constructor(private restService: RestService) {
  }

  public getClientAddress(clientId: string) {
    return this.restService.getData('/client/address/' + clientId);
  }
  public saveClientAddress(clientAddress: any, clientId: string, userId: string) {
    let req = {
      'clientAddress': clientAddress,
      'clientId': clientId,
      'updatedByUser': userId
    };

    return this.restService.postData('/client/address', req);

  }
}
