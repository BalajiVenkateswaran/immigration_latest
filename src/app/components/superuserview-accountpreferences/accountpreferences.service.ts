import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class SuperuserViewAccountpreferencessService {
 constructor(private restService: RestService) {
    }
 public getproductsAccount(accountid: string) {
     return this.restService.getData("/superuser/account/" + accountid + "/products");
 }
 public getdiscountsAccount(accountid: string) {
     return this.restService.getData("/superuser/account/" + accountid + "/discounts");
 }
 public saveproduct(addproduct: any,accountid:string) {
     var req = {
         "accountId": accountid,
         "products": [addproduct]
     }
     return this.restService.postData("/superuser/accounts/products", req);
 }
 public savediscount(adddiscount: any,accountid:string) {
     var req = {
         "accountId": accountid,
         "discounts": [adddiscount]
     }
     return this.restService.postData("/superuser/accounts/discounts", req);
 }
 }