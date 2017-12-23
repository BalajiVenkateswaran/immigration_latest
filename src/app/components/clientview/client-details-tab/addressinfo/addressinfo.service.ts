import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {HeaderService} from '../../../common/header/header.service';

@Injectable()
export class AddressInfoService {

  constructor(private restService: RestService, private headerService: HeaderService) {
  }

  public getClientAddress(userId: string) {
    console.log('addressinfo|getClientAddress|userId:%o', userId);
    return this.restService.getData('/client/details/address/' + userId);
  }
  public saveClientAddress(clientAddress: any, checked?: boolean) {
    let req = {
      'clientAddress': clientAddress,
      'updatedByUser': this.headerService.user.userId
    };
    if (checked) {
      req['copyResidenceAddress'] = checked;
    }
    return this.restService.postData('/client/details/address', req);
  }
}
