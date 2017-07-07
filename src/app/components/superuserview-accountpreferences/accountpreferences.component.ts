import { Component, OnInit } from '@angular/core';
import { client } from "../../models/client";
import { FormGroup, FormControl } from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from "../../services/app.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { MenuComponent } from "../menu/menu.component";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { SuperuserViewAccountpreferencessService } from "./accountpreferences.service";
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";


export interface ConfirmModel {
    title: string;
    message: string;
    getacntpref: boolean;
    adddprdctPref: boolean;
    adddiscntPref: boolean;
    editprdct: boolean;
    editdscnt: boolean;
    editRecord:Object;
}

@Component({
    selector: 'app-account-preferences',
    templateUrl: './accountpreferences.component.html',
    styleUrls: ['./accountpreferences.component.sass']
})
export class AccountPreferencesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {


    public DefaultResponse = { "status": "Active" };
    public getacntpref: boolean = true;
    public adddAcntPref: boolean;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public editproduct: any;
    public editdiscount: boolean;
    public adddprdctPref: any;
    public adddiscntPref: any;
    public Products: any = [];
    public Discounts: any = [];
    public addproduct: any = {};
    public productcode: any;
    public productstartDate: string;
    public productendDate: string;
    public adddiscount: any = {};
    public disconutcode: any;
    public discountstartDate: string;
    public discountendDate: string;
    public record:any;

    constructor(private appService: AppService, public dialogService: DialogService, public superuserViewAccountpreferencessService: SuperuserViewAccountpreferencessService,
    private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.editdiscount=false;
    }
    addEditProduct(value) {
        if (value == "edit") {
            var productlable = "Edit";
            this.editproduct = true;
        }
        if (value == "add") {
            var productlable = "Add";
            this.editproduct = false;
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddprdctPref: true,
            getacntpref: false,
            title: productlable + ' Product',
            editprdct: this.editproduct
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }
    addEditDiscount(value,data) {
        if (value == "edit") {
            var productlable = "Edit";
            this.editdiscount = true;
        }
        if (value == "add") {
            var productlable = "Add";
            this.editdiscount = false;
        }
        if(data){
            this.record=data;
            this.disconutcode=data.discountCode;
            this.discountstartDate=data.startDate;
            this.discountendDate=data.endDate
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: productlable + ' Discount',
            editdscnt: this.editdiscount

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }
    productSave() {
        this.addproduct = [new Object()];
        this.addproduct[0]['code'] = this.productcode;
        this.addproduct[0]['startDate'] = this.productstartDate['formatted'];
        this.addproduct[0]['endDate'] = this.productendDate['formatted'];
        this.superuserViewAccountpreferencessService.saveproduct(this.addproduct, this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] = "SUCCESS") {
                this.result = true;
                this.close();

            }
        });

    }
    discountSave() {
        this.adddiscount = [new Object()];
        this.adddiscount[0]['discountCode'] = this.disconutcode;
        this.adddiscount[0]['startDate'] = this.discountstartDate['formatted'];
        this.adddiscount[0]['endDate'] = this.discountendDate['formatted'];
        if(this.record){
            this.superuserViewAccountpreferencessService.savediscount(this.adddiscount, this.accountDetailsCommonService.accountId).subscribe((res) => {
                if (res['statusCode'] = "SUCCESS") {
                    this.result = true;
                    this.result=true;
                    this.close();
                }
            });

        }
    }
    cancel() {
        this.result = false;
        this.close();
    }
    getproducts() {
        this.superuserViewAccountpreferencessService.getproductsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.Products = res['products'];
            }
        });
    }
    getdiscounts() {
        this.superuserViewAccountpreferencessService.getdiscountsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.Discounts = res['discounts'];

            }
        });
    }
    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
}
