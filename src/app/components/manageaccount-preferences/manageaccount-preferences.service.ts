import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ManageAccountpreferencessService {
 constructor(private restService: RestService) {
    }
 public getproductsAccount(accountid: string) {
     return this.restService.getData("/immigration/account/" + accountid + "/products");
 }
 public getdiscountsAccount(accountid: string) {
     return this.restService.getData("/immigration/account/" + accountid + "/discounts");
 }
 public saveproduct(addproduct: any,accountid:string) {
     
     var req = {
         "accountId": accountid,
         "products": addproduct
     }
     console.log(req);
     return this.restService.postData("/immigration/accounts/products", req);
 }
 public savediscount(adddiscount: any,accountid:string) {
     var req = {
         "accountId": accountid,
         "discounts": [adddiscount]
     }
     return this.restService.postData("/immigration/accounts/discounts", req);
 }
 }