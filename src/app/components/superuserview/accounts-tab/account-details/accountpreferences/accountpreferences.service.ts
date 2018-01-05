import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class SuperuserViewAccountPreferencesService {
  constructor(private restService: RestService) {
  }
  public getproductsAccount(accountid: string) {
    return this.restService.getData('/superuser/account/' + accountid + '/products');
  }
  public getdiscountsAccount(accountid: string) {
    return this.restService.getData('/superuser/account/' + accountid + '/discounts');
  }
  public saveProduct(addproduct: any) {
    let req = {
      'product': addproduct
    }
    console.log(req);
    return this.restService.postData('/superuser/account/products', req);
  }
  public savediscount(adddiscount: any) {
    let req = {
      'discount': adddiscount
    }
    return this.restService.postData('/superuser/account/discounts', req);
  }

  public getAllActiveProductCodes() {
    return this.restService.getData('/superuser/product/active/codes');
  }

  public getAllActiveDiscountCodes() {
    return this.restService.getData('/superuser/discount/active/code');
  }
}
