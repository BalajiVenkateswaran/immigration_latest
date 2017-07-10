import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";
import { User } from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ProductCatalogDiscountService } from './superuserview-productcatalog-discounts.service';
export interface ConfirmModel {
    title: string;
    message: string;
    viewDetails: boolean;
    addDiscountPopup: boolean;
    viewDiscountPopup: boolean;
    addDiscount: Object;
    discount: Object;
}
@Component({
    selector: 'app-superuserview-productcatalog-discounts',
    templateUrl: './superuserview-productcatalog-discounts.component.html',
    styleUrls: ['./superuserview-productcatalog-discounts.component.sass']
})
export class SuperuserviewProductcatalogDiscountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private user: User;
    public discounts: any = [];
    public addDiscount: any = {};
    public discount: any = {};
    public viewDetails: boolean = true;
    public addDiscountPopup: boolean;
    public viewDiscountPopup: boolean;
    public isEditDiscount: boolean = true;
    public editFlag: boolean = true;
    public beforeEdit: any;
    public warningMessage: boolean = false;
    constructor(private appService: AppService, public productCatalogDiscountService: ProductCatalogDiscountService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;

        }
    }
    getDiscountDetails() {
        this.productCatalogDiscountService.getDiscounts(this.user.accountId).subscribe(
            res => {
                if (res['statusCode'] == 'SUCCESS') {
                    //this.paymentList=res['payments'];
                    this.discounts = res['discountCatalogs'];
                }
            }
        )
    }
    ngOnInit() {
        this.getDiscountDetails();
    }
    addDiscounts() {
        //this.addDiscount=null;
        this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            addDiscountPopup: true,
            viewDetails: false,
            viewDiscountPopup: false,
            title: 'Add Discounts',
            addDiscount: this.addDiscount,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogDiscountService.saveDiscountDetails(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getDiscountDetails();
                        this.addDiscount = {};
                    }

                });
            }
            else {
                this.addDiscount = {};
            }
        });
    }
    saveDiscounts() {
        if (this.addDiscount['discountCode'] == '' || this.addDiscount['discountCode'] == null || this.addDiscount['discountCode'] == undefined || this.addDiscount['discountName'] == '' || this.addDiscount['discountName'] == null || this.addDiscount['discountName'] == undefined) {
            this.warningMessage = true;
        }
        else {
            this.warningMessage = false;
            this.appService.addUsers = this.addDiscount;
            this.result = true;
            this.close();


        }
        /* this.addUsers['accountId'] = this.appService.user.accountId;*/

    }
    cancel() {
        this.addDiscount = {};
        this.result = false;
        this.close();
    }

    //view 
    viewDiscountDetails(record, index) {
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, record);
        }
        this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            viewDiscountPopup: true,
            viewDetails: false,
            addDiscountPopup: false,
            title: 'View  Details',
            discount: this.editFlag ? this.beforeEdit : record,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogDiscountService.editDiscounts(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getDiscountDetails();
                    }
                });
            }
            else {

                this.editFlag = false;
            }
        });
    }
    editDiscountInfo() {
        this.isEditDiscount = !this.isEditDiscount;
    }
    cancelDiscountInfo() {
        this.isEditDiscount = !this.isEditDiscount;


    }
    saveDiscountInfo() {
        this.isEditDiscount = !this.isEditDiscount;
        this.appService.addUsers = this.discount;
        this.result = true;
        this.close();
    }


}
