import { Component, OnInit } from '@angular/core';
import {superUserviewAccountService} from "./accounts.component.service";
import {client} from "../../models/client";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

export interface ConfirmModel {
    title: string;
    message: string;
    addAccounts: boolean;
    getAccountsData: boolean;
}

@Component({
    selector: 'app-clients',
    templateUrl: './accounts.component.html'
})
export class superuserViewAccountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private outlet: any = {
        breadcrumbs: null,
        header: 'header',
        message: null,
        carousel: null,
        menu: 'menu',
        footer: null
    };
    errormsg: boolean = false;
    public accountList=[];
    public addClient: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public data;
    public settings;
    private user: User;
    private deleteclients: any;
    private clientName: any;
    public addAccounts: boolean;
    public getAccountsData: boolean = true;
    public accountDetails: any = {};

    public DefaultResponse = { "status": "Active" };
    public accountsList:any;

    //settings = {
    //    actions:false,
    //    columns: {
    //        accountName: {
    //            title: 'Account Name'
    //        },
    //        accountNumber: {
    //            title: 'Account Number'
    //        },
    //        firstName: {
    //            title: 'First Name'
    //        },
    //        lastName: {
    //            title: 'Last Name',
    //        },
    //        email:{
    //            title: 'Email',
    //        },
    //        phone:{
    //            title: 'Phone',
    //        },
    //        status: {
    //            title: 'Status',
    //        },
    //        clients : {
    //            title: 'Clients',
    //        },
    //        petitions: {
    //            title: 'Petitions',
    //        },
    //        createdOn:{
    //            title: 'Created On',
    //        },
    //        lastPaymentStatus:{
    //            title: 'Last Payment Status',
    //        },
    //        storageType: {
    //            title: 'Storage Type',
    //        }

    //    },
    //    pager: {
    //        display: true,
    //        perPage: 10
    //    }
    //};
    source: LocalDataSource = new LocalDataSource();
    constructor(private clientService: superUserviewAccountService, private appService: AppService,
      private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,
      private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.settings = {
            'isDeleteEnable': false,
            'columnsettings': [
                {

                    headerName: "Account Name",
                    field: "accountName",
                },
                {

                    headerName: "Account Number",
                    field: "accountNumber",

                },
                {

                    headerName: "First Name",
                    field: "firstName",
                },
                {
                    headerName: "Last Name",
                    field: "lastName",

                },
                {

                    headerName: "Email",
                    field: "email",

                },
                {

                    headerName: "Phone",
                    field: "phone",

                },
                {

                    headerName: "Status",
                    field: "status",

                },
                {

                    headerName: "Clients",
                    field: "clients",

                },
                {

                    headerName: "Petitions",
                    field: "petitions",

                },
                {

                    headerName: "Created On",
                    field: "createdOn",

                },
                {

                    headerName: "Last Payment Status",
                    field: "lastPaymentStatus",

                },
                {

                    headerName: "Storage Type",
                    field: "storageType",

                },

            ]
        }
    }

    getAccountDetail() {
        this.appService.showSideBarMenu(null, "accounts");
        this.clientService.getAccountDetails().subscribe((res) => {
            if(res['statusCode']=='SUCCESS'){
                console.log(res['accountInfoList']);
               // this.source.load(res['accountInfoList']);
                this.data = res['accountInfoList'];
            }
        });
    }

    ngOnInit() {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
        this.getAccountDetail();
    }
    addFunction(event) {
        this.dialogService.addDialog(superuserViewAccountsComponent, {
            addAccounts: true,
            getAccountsData: false,
            title: 'Add New Account',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.clientService.createAccount(this.appService.newclitem).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getAccountDetail();
                    }

                });
            }
        });
    }
    accountSave() {
        if (this.accountDetails['status'] == "" || this.accountDetails['status'] == undefined) {
            this.accountDetails['status'] = "Active";
        }
        if (this.accountDetails['accountName'] == '' || this.accountDetails['accountName'] == null || this.accountDetails['accountName'] == undefined
            || this.accountDetails['firstName'] == '' || this.accountDetails['firstName'] == null || this.accountDetails['firstName'] == undefined
            || this.accountDetails['lastName'] == '' || this.accountDetails['lastName'] == null || this.accountDetails['lastName'] == undefined
            || this.accountDetails['email'] == '' || this.accountDetails['email'] == null || this.accountDetails['email'] == undefined
            || this.accountDetails['phone'] == '' || this.accountDetails['phone'] == null || this.accountDetails['phone'] == undefined
            || this.accountDetails['objectStore'] == '' || this.accountDetails['objectStore'] == null || this.accountDetails['objectStore'] == undefined) {
            this.errormsg = true;
        } else {
            this.appService.newclitem = this.accountDetails;
            this.result = true;
            this.close();
        }
        
    }
    cancel() {
        this.result = false;
        this.close();
    }

    editRecord(event): void {
        this.menuComponent.highlightSBLink('accounts');
        this.appService.moveToPage("account-details");

        //Destroy account details Common service and assign accountId
        this.accountDetailsCommonService.destroy();
        this.accountDetailsCommonService.accountId = event.data.accountId;
    }

}
