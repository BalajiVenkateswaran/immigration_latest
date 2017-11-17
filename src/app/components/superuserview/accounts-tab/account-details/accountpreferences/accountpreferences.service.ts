import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class SuperuserViewAccountpreferencessService {
  constructor(private restService: RestService) {
  }
  public getproductsAccount(accountid: string) {
    return this.restService.getData('/superuser/account/' + accountid + '/products');
  }
  public getdiscountsAccount(accountid: string) {
    return this.restService.getData('/superuser/account/' + accountid + '/discounts');
  }
  public saveproduct(addproduct: any[], accountid: string) {

    let req = {
      'accountId': accountid,
      'products': addproduct
    }
    console.log(req);
    return this.restService.postData('/superuser/account/products', req);
  }
  public savediscount(adddiscount: any, accountid: string) {
    let req = {
      'accountId': accountid,
      'discounts': adddiscount
    }
    return this.restService.postData('/superuser/account/discounts', req);
  }
}
