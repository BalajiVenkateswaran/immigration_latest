import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ProductCatalogDiscountService} from './superuserview-productcatalog-discounts.service';
export interface ConfirmModel {
    title: string;
    message: string;
    viewDetails: boolean;
    addDiscountPopup: boolean;
    viewDiscountPopup:boolean;
    addDiscount: Object;
    discount:Object;
}
@Component({
  selector: 'app-superuserview-productcatalog-discounts',
  templateUrl: './superuserview-productcatalog-discounts.component.html',
  styleUrls: ['./superuserview-productcatalog-discounts.component.sass']
})
export class SuperuserviewProductcatalogDiscountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private user: User;
  public discounts:any=[];
  public addDiscount:any={};
  public discount:any={};
  public viewDetails:boolean=true;
  public addDiscountPopup:boolean;
  public viewDiscountPopup:boolean;
  constructor(private appService: AppService,public productCatalogDiscountService:ProductCatalogDiscountService,public dialogService: DialogService) {
     super(dialogService);
     if (this.appService.user) {
            this.user = this.appService.user;

        }
   }
   getDiscountDetails(){
        this.productCatalogDiscountService.getDiscounts(this.user.accountId).subscribe(
            res=>{
                if(res['statusCode']=='SUCCESS'){
                    //this.paymentList=res['payments'];
                    this.discounts=res['discountCatalogs'];
                }
            }
        )
  }
  ngOnInit() {
      this.getDiscountDetails();
  }
   addProducts(){
      this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            addDiscountPopup: true,
            viewDetails: false,
            viewDiscountPopup: false,
            title: 'Add Discounts',
            addDiscount:this.addDiscount,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogDiscountService.saveDiscountDetails(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getDiscountDetails();
                    }
                });
            }
        });
  }
  saveDiscounts(){
       /* this.addUsers['accountId'] = this.appService.user.accountId;*/
        this.appService.addUsers = this.addDiscount;
        this.result = true;
        this.close();
  }
  cancel(){
       this.result = false;
       this.close();
  }

  //view 
  viewDiscountDetails(record,index){
      this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            viewDiscountPopup: true,
            viewDetails: false,
            addDiscountPopup:false,
            title: 'View  Details',
            discount:record,
        })
  }
  

}
