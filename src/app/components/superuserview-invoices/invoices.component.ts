import { Component, OnInit } from '@angular/core';
import {invoice} from "../../models/invoice";
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
import {SuperUserViewInvoicestabService} from "./invoices.service";

export interface ConfirmModel {
    title: string;
    message: string;
    addNewClient: boolean;
    getClientsData: boolean;

}


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class SuperUserViewInvoicestabComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private invoicesList: invoice[];
    private message: string;
    private user: User;
    public addNewClient: boolean;
    public getClientsData: boolean = true;
    public newclitem: any = {};
    public settings;
    public data;
    constructor(private superuserviewInvoicestabService: SuperUserViewInvoicestabService, private appService: AppService, private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent) {
        super(dialogService);
        this.settings={
            'isDeleteEnable':false,
            'isAddButtonEnable':false,
            'columnsettings': [
                {

                    headerName: "Invoice Number",
                    field: "invoiceNumber",
                },
                {

                    headerName: "Account Name",
                    field: "accountName",
                },
                {

                    headerName: "Account Number",
                    field: "accountNumber"
                },
                {
                    headerName: "Invoice Date",
                    field: "invoiceDate"
                },
                {

                    headerName: "Invoice Amount",
                    field: "invoiceAmount"
                },
                {

                    headerName: "Payment Status",
                    field: "paymentStatus"
                },
                {

                    headerName: "PDF Generated",
                    field: "pdfGenerated"
                }
                
            ]
        }
    }
   
      ngOnInit() {
      this.appService.showSideBarMenu(null, "invoices");
      this.superuserviewInvoicestabService.getInvoices(this.appService.orgId)
        .subscribe((res: any) => {
            this.invoicesList = res.invoices;
            this.data=this.invoicesList;
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

  moveToInvoiceTab(event): void{
      this.menuComponent.highlightSBLink('Account Details Invoices');
      this.appService.showSideBarMenu('superuser-accounts', "invoices");
      this.appService.moveToPage("accountdetails-invoice");
      this.appService.clientId = event.data.clientId;

  }

}
