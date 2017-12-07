import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductCatalogDiscountService {

    constructor(private restService: RestService) {

    }
    public getDiscounts() {
        return this.restService.getData('/superuser/discounts');
    }
    public saveDiscountDetails(discounts: any) {
        let req = {
            'discount': discounts
        };
        return this.restService.postData('/superuser/discounts', req);
    }
    public editDiscounts(discounts: any) {
        let req = {
            'discount': discounts
        }
        return this.restService.putData('/superuser/discounts', req);
    }
    public getDiscountDetailsWithQueryparams(queryParams) {
        return this.restService.getData('/superuser/discounts' + queryParams);
    }
}
