import { RestService } from '../../../../services/rest.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductCatalogProductService {

    constructor(private restService: RestService) {

    }
    public getProductDetails() {
        return this.restService.getData('/superuser/products');
    }
    public saveProductDetails(products: any) {
        let req = {
            'product': products
        };
        return this.restService.putData('/superuser/products', req);
    }
    public editProducts(products) {
        let req = {
            'product': products
        }
        return this.restService.putData('/superuser/products', req)
    }
    public getProductDetailsWithQueryparams(queryParams) {
        return this.restService.getData('/superuser/products' + queryParams);
    }
}
