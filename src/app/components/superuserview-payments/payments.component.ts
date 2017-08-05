import { Component, OnInit } from '@angular/core';
import {payment} from "../../models/payment";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import {SuperUserViewPaymentstabService} from "./payments.service";
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

export interface ConfirmModel {
    title: string;
    message: string;
    addNewClient: boolean;
    getClientsData: boolean;

}


@Component({
    selector: 'app-payments',
  templateUrl: './payments.component.html'
})
export class SuperUserViewPaymentstabComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    
    private message: string;
    private data;
    private user: User;
    private deleteclients: any;
    private clientName: any;
    public addNewClient: boolean;
    public getClientsData: boolean = true;
    public newclitem: any = {};
    public DefaultResponse = {"status": "Active" };
    public settings;
    constructor(private superuserviewPaymentstabService: SuperUserViewPaymentstabService, private appService: AppService, private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService); 
        this.settings = {
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'columnFilter':true,
            'columnsettings': [
                {

                    headerName: "Payment Id",
                    field: "paymentId",
                },
                {

                    headerName: "Account Name",
                    field: "accountName",
                },
                {

                    headerName: "Account Number",
                    field: "accountNumber",

                },
                {
                    headerName: "Invoice Number",
                    field: "invoiceNumber",
                },
                {
                    headerName: "Invoice Date",
                    field: "invoiceDate",
                },
                {
                    headerName: "Invoice Amount",
                    field: "invoiceAmount",
                },
                {
                    headerName: "Payment Status",
                    field: "paymentStatus",
                },
                {
                    headerName: "Payment Date",
                    field: "paymentDate",
                }
            ]
        }
    }

      ngOnInit() {
    this.appService.showSideBarMenu(null, "payments");
    this.superuserviewPaymentstabService.getPayments().subscribe((res: any) => {
        this.data = res.payments;
        });
    if (this.appService.user) {
        this.user = this.appService.user;
    }
  }
    
    clientSave() {
        this.newclitem['accountId'] = this.appService.user.accountId;
        this.newclitem['orgId'] = this.appService.orgId;
        this.newclitem['createdBy'] = this.appService.user.userId;
        if (this.newclitem['status'] == '' || null || undefined) {
            this.newclitem['status'] = "Active";
        }
        this.appService.newclitem = this.newclitem;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }

    editRecord(event): void{
      this.menuComponent.highlightSBLink('Payments');
      this.appService.moveToPage("accountdetails-payments");
      this.accountDetailsCommonService.accountId = event.data.accountId;
      this.appService.showSideBarMenu("superuser-accounts","accounts");
      
  }

}
