import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class AccountDetailsPaymentsService {

  constructor(private restService: RestService) {

  }
  public getPaymentDetails(accountId: string) {
    return this.restService.getData('/superuser/account/' + accountId + '/payments');
  }
  public savePaymentDetails(accountId: string, payment: any) {
    let req = {
      'payment': payment
    };
    return this.restService.postData('/superuser/account/' + accountId + '/payments', req);
  }
  public editpaymentss(accountId: string, payment: any) {
    let req = {

      'payment': payment
    };
    return this.restService.postData('/superuser/account/' + accountId + '/payments', req);
  }
}
