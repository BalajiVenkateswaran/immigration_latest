import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ProductCatalogDiscountService {

    constructor(private restService: RestService) {

    }
    public getDiscounts(accountId: string) {
        return this.restService.getData("/superuser/discounts");
    }
    public saveDiscountDetails(discounts: any) {
        var req = {
            "discount": discounts
        };
        return this.restService.postData("/superuser/discounts", req);
    }
    public editDiscounts(discounts:any){
        var req={
            "discount":discounts
        }
        return this.restService.putData("/superuser/discounts",req);
    }
}
