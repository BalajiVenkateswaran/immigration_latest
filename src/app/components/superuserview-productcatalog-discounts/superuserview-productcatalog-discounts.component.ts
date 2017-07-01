import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import {ProductCatalogDiscountService} from './superuserview-productcatalog-discounts.service';
@Component({
  selector: 'app-superuserview-productcatalog-discounts',
  templateUrl: './superuserview-productcatalog-discounts.component.html',
  styleUrls: ['./superuserview-productcatalog-discounts.component.sass']
})
export class SuperuserviewProductcatalogDiscountsComponent implements OnInit {
  private user: User;
  public discounts:any=[];
  constructor(private appService: AppService,public productCatalogDiscountService:ProductCatalogDiscountService) {
     if (this.appService.user) {
            this.user = this.appService.user;

        }
   }
   getPaymentDetails(){
        this.productCatalogDiscountService.getDiscounts(this.user.accountId).subscribe(
            res=>{
                if(res['statusCode']=='SUCCESS'){
                    //this.paymentList=res['payments'];
                    this.discounts=res['discounts'];
                }
            }
        )
  }
  ngOnInit() {
      this.getPaymentDetails();
  }

}
