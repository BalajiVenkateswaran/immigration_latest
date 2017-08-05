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
import { AccountDetailsCommonService } from "../superuserview/accounts-tab/account-details/common/account-details-common.service";


export interface ConfirmModel {
    title: string;
    message: string;
    getacntpref: boolean;
    adddprdctPref: boolean;
    adddiscntPref: boolean;
    editprdct: boolean;
    editdscnt: boolean;
    editRecord: Object;
    code: string;
    startDate: string;
    endDate: string;
    disconutcode: string;
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

    public editdiscount: boolean;
    public adddprdctPref: any;
    public adddiscntPref: any;
    public Products: any = [];
    public Discounts: any = [];
    public addproduct: any = {};
    public code: any;
    public productstartDate: string;
    public productendDate: string;
    public adddiscount: any = {};
    public disconutcode: any;
    public discountstartDate: string;
    public discountendDate: string;
    public record: any;
    public settings;
    public data;
    public editFlag: boolean;
    public beforeEdit: any = {};
    public product: any = {};
    public discountsettings;
    public discountdata;
    public productInfo = [];
    public productData;
    constructor(private appService: AppService, public dialogService: DialogService, public superuserViewAccountpreferencessService: SuperuserViewAccountpreferencessService,
        private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.editdiscount = false;
        this.settings = {
            'isDeleteEnable': false,
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "name",
                },
                {

                    headerName: "Code",
                    field: "code",

                },
                {

                    headerName: "Description",
                    field: "description",
                },
                {
                    headerName: "Start Date",
                    field: "startDate",

                },
                {

                    headerName: "End Date",
                    field: "endDate",

                },
                {

                    headerName: "Max Users",
                    field: "maxUsers",

                },
                {

                    headerName: "Max Clients",
                    field: "maxClientsPerMonth",

                },
                {

                    headerName: "Max Petitions",
                    field: "maxPetitionsPerMonth",

                },
                {

                    headerName: "Max S3 Storage",
                    field: "maxS3Storage",

                },
                {

                    headerName: "Cost",
                    field: "cost",

                },

            ]
        }
        this.discountsettings = {
            'isDeleteEnable': false,
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "discountName",
                },
                {

                    headerName: "Code",
                    field: "discountCode",

                },
                {

                    headerName: "Description",
                    field: "description",
                },
                {
                    headerName: "Start Date",
                    field: "startDate",

                },
                {

                    headerName: "End Date",
                    field: "endDate",

                },
                {

                    headerName: "Cost",
                    field: "cost",

                },
                {

                    headerName: "Percentage",
                    field: "percentage",

                }
            ]
        }
    }
    addFunction(value) {
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

    editRecord(event) {
        this.productData = event;
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddprdctPref: true,
            getacntpref: false,
            title: 'Edit Product',
            editprdct: true,
            code: event.data.code,
            startDate: event.data.startDate,
            endDate: event.data.endDate,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
            this.accountDetailsCommonService.addProducts[0].productId=event.data.productId;
            this.superuserViewAccountpreferencessService.saveproduct(this.accountDetailsCommonService.addProducts, this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] = "SUCCESS") {
               this.getproducts();
               this.close();

            }
        });
            }
        });
    }
    adddiscountFunction(event) {
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: 'Add Discount',
            editdscnt: false
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }

    editdiscountRecord(event) {
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: 'Edit Discount',
            editdscnt: true,
            disconutcode: event.data.code,
            startDate: event.data.startDate,
            endDate: event.data.endDate,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }
    productSave() {
        this.addproduct['code'] = this.addproduct['code'];
        this.addproduct['startDate'] = this.addproduct['startDate']['formatted'];
        this.addproduct['endDate'] = this.addproduct['endDate']['formatted'];
        this.productInfo.push(this.addproduct);
        this.accountDetailsCommonService.addProducts=this.productInfo;
        this.result=true;
        this.close();
      
    }
    discountSave() {
        this.adddiscount = [new Object()];
        this.adddiscount[0]['discountCode'] = this.disconutcode;
        this.adddiscount[0]['startDate'] = this.discountstartDate['formatted'];
        this.adddiscount[0]['endDate'] = this.discountendDate['formatted'];
        this.superuserViewAccountpreferencessService.savediscount(this.adddiscount, this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] = "SUCCESS") {
                this.result = true;
                this.close();
            }
        });


    }
    cancel() {
        this.result = false;
        this.close();
    }
    getproducts() {
        this.superuserViewAccountpreferencessService.getproductsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                //  this.Products = res['products'];
                this.data = res['products'];

            }
        });
    }
    getdiscounts() {
        this.superuserViewAccountpreferencessService.getdiscountsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                //this.Discounts = res['discounts'];
                this.discountdata = res['discounts'];
            }
        });
    }
    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
}
