import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ProductCatalogDiscountService {

    constructor(private restService: RestService) {

    }
    public getDiscounts(accountId: string) {
        return this.restService.getData("/superuser/account/" + accountId+"/discounts");
    }
    public savePaymentDetails(accountId:string,discounts: any) {
        var req = {
            "discounts": discounts
        };
        return this.restService.postData("/superuser/account/"+accountId+"/discounts", req);
    }
}
