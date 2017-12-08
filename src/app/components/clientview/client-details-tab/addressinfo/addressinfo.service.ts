import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';

@Injectable()
export class AddressInfoService {

  constructor(private restService: RestService) {
  }

  public getClientAddress(userId: string) {
    console.log('addressinfo|getClientAddress|userId:%o', userId);
    return this.restService.getData('/clientview/address/' + userId);
  }
  public saveClientAddress(clientAddress: any) {
    console.log('immigrationview-address|saveClientAddress|clientAddress:%o', clientAddress);
    let req = {
      'clientAddress': clientAddress
    };

    return this.restService.postData('/clientview/address', req);
  }
}
