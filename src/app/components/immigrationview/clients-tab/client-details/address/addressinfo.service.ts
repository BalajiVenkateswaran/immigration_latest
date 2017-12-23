import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';

@Injectable()
export class AddressInfoservice {

  constructor(private restService: RestService, private headerService: HeaderService) {
  }

  public getClientAddress(userId: string) {
    return this.restService.getData('/immigration/client/details/address/' + userId);
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
