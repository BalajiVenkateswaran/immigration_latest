import { invoice } from '../../../models/invoice';
import { AppService } from '../../../services/app.service';
import { HeaderService } from '../../common/header/header.service';
import { MenuComponent } from '../../common/menu/menu.component';
import { AccountDetailsCommonService } from '../accounts-tab/account-details/common/account-details-common.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {SuperUserViewInvoicestabService} from "./invoices.service";
import { SortType } from "../../framework/smarttable/types/query-parameters";
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
    public addNewClient: boolean;
    public getClientsData: boolean = true;
    public newclitem: any = {};
    public settings;
    public data;
    constructor(private superuserviewInvoicestabService: SuperUserViewInvoicestabService, private appService: AppService,
       private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,
       private accountDetailsCommonService: AccountDetailsCommonService, private headerService: HeaderService) {
        super(dialogService);
        this.settings = {
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'columnFilter': true,
            'sort': [{
                headingName: "invoiceDate",
                sort: SortType.DESC
            }],
            'columnsettings': [
                {
                    headerName: "Invoice Number",
                    field: "invoiceNumber"
                },
                {
                    headerName: "Account Name",
                    field: "accountName"
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
        this.headerService.showSideBarMenu(null, "invoices");
    }

    clientSave() {
        this.newclitem['accountId'] = this.headerService.user.accountId;
        this.newclitem['orgId'] = this.headerService.selectedOrg['orgId'];
        this.newclitem['createdBy'] = this.headerService.user.userId;
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
      this.headerService.showSideBarMenu('superuser-accounts', "accounts");
      this.appService.moveToPage("accountdetails-invoice");
      this.accountDetailsCommonService.accountId = event.data.accountId;

    }
    dataWithParameters(queryParams) {
        if (queryParams) {
            this.superuserviewInvoicestabService.getInvoicesWithQueryParams(queryParams).subscribe(res=>{
                 this.invoicesList = res.invoices;
                 this.data = this.invoicesList;
            })
        }

    }
}
