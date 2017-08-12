import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class ProductCatalogProductService {

    constructor(private restService: RestService) {

    }
    public getProductDetails() {
        return this.restService.getData("/superuser/products");
    }
    public saveProductDetails(products: any) {
        var req = {
            "product": products
        };
        return this.restService.postData("/superuser/products", req);
    }
    public editProducts(products){
        var req={
            "product":products
        }
        return this.restService.postData("/superuser/products",req)
    }
}
