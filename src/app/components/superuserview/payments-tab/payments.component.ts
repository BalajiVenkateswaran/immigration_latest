import {AppService} from '../../../services/app.service';
import {HeaderService} from '../../header/header.service';
import {MenuComponent} from '../../menu/menu.component';
import {AccountDetailsCommonService} from '../accounts-tab/account-details/common/account-details-common.service';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {SuperUserViewPaymentstabService} from "./payments.service";

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
  private deleteclients: any;
  private clientName: any;
  public addNewClient: boolean;
  public getClientsData: boolean = true;
  public newclitem: any = {};
  public DefaultResponse = {"status": "Active"};
  public settings;
  constructor(private superuserviewPaymentstabService: SuperUserViewPaymentstabService, private appService: AppService,
    private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,
    private accountDetailsCommonService: AccountDetailsCommonService, private headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'isDeleteEnable': false,
      'isAddButtonEnable': false,
      'columnFilter': true,
      'columnsettings': [
        {
          headerName: "Payment Id",
          field: "paymentId"
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
          headerName: "Invoice Number",
          field: "invoiceNumber"
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
          headerName: "Payment Date",
          field: "paymentDate"
        }
      ]
    }
  }

  ngOnInit() {
    this.appService.showSideBarMenu(null, "payments");
    this.superuserviewPaymentstabService.getPayments().subscribe((res: any) => {
      this.data = res.payments;
    });
  }

  clientSave() {
    this.newclitem['accountId'] = this.appService.user.accountId;
    this.newclitem['orgId'] = this.headerService.selectedOrg['orgId'];
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

  editRecord(event): void {
    this.menuComponent.highlightSBLink('Payments');
    this.appService.moveToPage("accountdetails-payments");
    this.accountDetailsCommonService.accountId = event.data.accountId;
    this.appService.showSideBarMenu("superuser-accounts", "accounts");

  }
  filterData(filterQueries) {
    this.superuserviewPaymentstabService.getClientsFilteredData(this.accountDetailsCommonService.accountId, filterQueries).subscribe(res => {
      this.data = res['payments'];
    })
  }

}
