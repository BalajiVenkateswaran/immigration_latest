﻿import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { SuperuserViewAccountpreferencessService } from "./accountpreferences.service";
import { AccountDetailsCommonService } from "../common/account-details-common.service";

export interface ConfirmModel {
    title: string;
    message: string;
    getacntpref: boolean;
    adddprdctPref: boolean;
    adddiscntPref: boolean;
    editprdct: boolean;
    editdscnt: boolean;
    addproduct: Object;
    discounts: Object
    startDate: string;
    endDate: string;
}

@Component({
    selector: 'app-account-preferences',
    templateUrl: './accountpreferences.component.html',
    styleUrls: ['./accountpreferences.component.sass']
})
export class AccountPreferencesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {


    public getacntpref: boolean = true;
    public adddAcntPref: boolean;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public warningMessage: boolean = false;
    public editdiscount: boolean;
    public adddprdctPref: any;
    public adddiscntPref: any;
    public addproduct: any = {};
    public adddiscount: any = {};
    public settings;
    public data;
    public editFlag: boolean;
    public beforeEdit: any = {};
    public discountSettings;
    public discountData;
    public productInfo = [];
    public discounts: any = {};
    public discountInfo: any = [];
    public editProductFlag: boolean = true;
    public beforeProductEdit;
    public editDiscountFlag: boolean = true;
    public beforeDiscountEdit;
    constructor(private appService: AppService, public dialogService: DialogService, public superuserViewAccountpreferencessService: SuperuserViewAccountpreferencessService,
        private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.editdiscount = false;
        this.settings = {
            'isDeleteEnable': false,
            'columnsettings': [
                {
                    headerName: "Name",
                    field: "name"
                },
                {
                    headerName: "Code",
                    field: "code"
                },
                {
                    headerName: "Description",
                    field: "description"
                },
                {
                    headerName: "Start Date",
                    field: "startDate"
                },
                {
                    headerName: "End Date",
                    field: "endDate"
                },
                {
                    headerName: "Max Users",
                    field: "maxUsers"
                },
                {
                    headerName: "Max Clients",
                    field: "maxClientsPerMonth"
                },
                {
                    headerName: "Max Petitions",
                    field: "maxPetitionsPerMonth"
                },
                {
                    headerName: "Max S3 Storage",
                    field: "maxS3Storage"
                },
                {
                    headerName: "Cost",
                    field: "cost"
                }
            ]
        }
        this.discountSettings = {
            'isDeleteEnable': false,
            'columnsettings': [
                {
                    headerName: "Name",
                    field: "discountName"
                },
                {
                    headerName: "Code",
                    field: "discountCode"
                },
                {
                    headerName: "Description",
                    field: "description"
                },
                {
                    headerName: "Start Date",
                    field: "startDate"
                },
                {
                    headerName: "End Date",
                    field: "endDate"
                },
                {
                    headerName: "Cost",
                    field: "cost"
                },
                {
                    headerName: "Percentage",
                    field: "percentage"
                }
            ]
        }
    }
    getproducts() {
        this.superuserViewAccountpreferencessService.getproductsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.data = res['products'];

            }
        });
    }
    getdiscounts() {
        this.superuserViewAccountpreferencessService.getdiscountsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.discountData = res['discounts'];
            }
        });
    }
    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
    addProducts(value) {
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddprdctPref: true,
            getacntpref: false,
            title: 'Add Product',
            editprdct: false
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.superuserViewAccountpreferencessService.saveproduct(this.accountDetailsCommonService.addProducts, this.accountDetailsCommonService.accountId).subscribe((res) => {
                    if (res['statusCode'] = "SUCCESS") {
                        this.getproducts();
                        this.close();
                    }
                });
            }
        });
    }

    editProducts(event) {
        this.editProductFlag = true;
        if (this.editProductFlag) {
            this.beforeProductEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddprdctPref: true,
            getacntpref: false,
            title: 'Edit Product',
            editprdct: true,
            addproduct: this.editProductFlag ? this.beforeProductEdit : event.data,
            startDate: event.data.startDate,
            endDate: event.data.endDate
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                if (this.editProductFlag) {

                }
                this.accountDetailsCommonService.addProducts[0].productId = event.data.productId;
                this.superuserViewAccountpreferencessService.saveproduct(this.accountDetailsCommonService.addProducts, this.accountDetailsCommonService.accountId).subscribe((res) => {
                    if (res['statusCode'] = "SUCCESS") {
                        this.getproducts();
                        this.close();

                    }
                });
            }
        });
    }
    addDiscounts(event) {
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: 'Add Discount',
            editdscnt: false
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.superuserViewAccountpreferencessService.savediscount(this.accountDetailsCommonService.addDiscounts, this.accountDetailsCommonService.accountId).subscribe((res) => {
                    if (res['statusCode'] = "SUCCESS") {
                        this.getdiscounts();
                        this.close();
                    }
                });
            }
        });
    }

    editDiscounts(event) {
        this.editDiscountFlag = true;
        if (this.editDiscountFlag) {
            this.beforeDiscountEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: 'Edit Discount',
            editdscnt: true,
            discounts: this.editDiscountFlag ? this.beforeDiscountEdit : event.data,
            startDate: event.data.startDate,
            endDate: event.data.endDate,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.accountDetailsCommonService.addDiscounts[0].discountId = event.data.discountId;
                this.superuserViewAccountpreferencessService.savediscount(this.accountDetailsCommonService.addDiscounts, this.accountDetailsCommonService.accountId).subscribe((res) => {
                    if (res['statusCode'] = "SUCCESS") {
                        this.getdiscounts();
                        this.close();
                    }
                });
            }
        });
    }
    productSave() {


        if ((this.addproduct['code'] == '' || this.addproduct['code'] == null || this.addproduct['code'] == undefined || this.addproduct['startDate'] == '' || this.addproduct['startDate'] == null || this.addproduct['startDate'] == undefined || this.addproduct['endDate'] == '' || this.addproduct['endDate'] == null || this.addproduct['endDate'] == undefined)) {
            this.warningMessage = true;

        }
        else {
            this.warningMessage = false;
            this.addproduct['code'] = this.addproduct['code'];
            this.addproduct['startDate'] = this.addproduct['startDate']['formatted'];
            this.addproduct['endDate'] = this.addproduct['endDate']['formatted'];
            this.productInfo.push(this.addproduct);
            this.accountDetailsCommonService.addProducts = this.productInfo;
            this.result = true;
            this.close();
        }

    }
    discountSave() {
        if ((this.discounts['code'] == '' || this.discounts['code'] == null || this.discounts['code'] == undefined || this.discounts['startDate'] == '' || this.addproduct['startDate'] == null || this.discounts['startDate'] == undefined || this.discounts['endDate'] == '' || this.discounts['endDate'] == null || this.discounts['endDate'] == undefined)) {
            this.warningMessage = true;

        }
        this.discounts['code'] = this.discounts.discountCode;
        this.discounts['startDate'] = this.discounts.startDate['formatted'];
        this.discounts['endDate'] = this.discounts.endDate['formatted'];
        this.discountInfo.push(this.discounts);
        this.accountDetailsCommonService.addDiscounts = this.discountInfo;
        this.result = true;
        this.close();



    }
    cancel() {
        this.result = false;
        this.close();
    }

}
