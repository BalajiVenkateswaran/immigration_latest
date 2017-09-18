import {Component, OnInit} from "@angular/core";
import {SuperUserviewAccountService} from "./accounts.service";
import {AppService} from "../../../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../../../common/menu/menu.component";
import {AccountDetailsCommonService} from "../account-details/common/account-details-common.service";
import {ReportsCommonService} from "../../reports-tab/common/reports-common.service";

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
export class SuperUserViewAccountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: null
  };
  public warningMessage: boolean = false;
  public accountList = [];
  private message: string;
  public data;
  public settings;
  public paginationData;
  public queryParameters;
  public getAccountsData: boolean = true;
  private user: User;
  public accountDetails: any = {};


  public DefaultResponse = {"status": "Active"};
  public accountsList: any;
  constructor(private superUserAccountService: SuperUserviewAccountService, private appService: AppService,
              private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,
              private accountDetailsCommonService: AccountDetailsCommonService, public reportscommonService: ReportsCommonService) {
    super(dialogService);
    this.settings = {
      'isDeleteEnable': false,
      'columnFilter': true,
      'customPanel': true,
      'defaultFilter': [{
        headingName: "status",
        headerName: "Status",
        filterValue: "Active"
      }],
      'columnsettings': [
        {
          headerName: "Account Name",
          field: "accountName"
        },
        {
          headerName: "Account Number",
          field: "accountNumber"
        },
        {
          headerName: "First Name",
          field: "firstName"
        },
        {
          headerName: "Last Name",
          field: "lastName"
        },
        {
          headerName: "Email",
          field: "email"
        },
        {
          headerName: "Phone",
          field: "phone"
        },
        {
          headerName: "Status",
          field: "status"
        },
        {
            headerName: "Orgs",
            field: "organizatinCount"
        },
        {
          headerName: "Clients",
          field: "clientCount"
        },
        {
          headerName: "Petitions",
          field: "petitionCount"
        },
        {
          headerName: "Created On",
          field: "creationOn"
        },
        {
          headerName: "Last Payment Status",
          field: "lastPaymentStatus"
        },
        {
          headerName: "Storage Type",
          field: "storageType"
        }
      ]
    };
  }

  ngOnInit() {
    if (this.appService.user) {
      this.user = this.appService.user;
    }
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
    this.appService.showSideBarMenu(null, "accounts");
    //this.getAccountDetail(this.queryParameters);
  }

  getAccountDetail(queryData) {
    this.superUserAccountService.getAccountDetails(queryData).subscribe((res) => {
      if (res['statusCode'] == 'SUCCESS') {
        this.reportscommonService.totalAccounts = res['accountInfoList'];
        console.log(res['accountInfoList']);
        this.data = res['accountInfoList'];
        this.paginationData = res['pageMetadata'];
      }
    });
  }

  addFunction(event) {
    this.dialogService.addDialog(SuperUserViewAccountsComponent, {
      addAccounts: true,
      getAccountsData: false,
      title: 'Add New Account',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.superUserAccountService.createAccount(this.appService.newclitem).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getAccountDetail(this.queryParameters);
          }
        });
      }
    });
  }

  accountSave(email) {
    if (this.accountDetails['status'] == "" || this.accountDetails['status'] == undefined) {
      this.accountDetails['status'] = "Active";
    }
    if (this.accountDetails['accountName'] == '' || this.accountDetails['accountName'] == null || this.accountDetails['accountName'] == undefined
      || this.accountDetails['firstName'] == '' || this.accountDetails['firstName'] == null || this.accountDetails['firstName'] == undefined
      || this.accountDetails['lastName'] == '' || this.accountDetails['lastName'] == null || this.accountDetails['lastName'] == undefined
      || this.accountDetails['email'] == '' || this.accountDetails['email'] == null || this.accountDetails['email'] == undefined
      || this.accountDetails['phone'] == '' || this.accountDetails['phone'] == null || this.accountDetails['phone'] == undefined
      || this.accountDetails['objectStore'] == '' || this.accountDetails['objectStore'] == null || this.accountDetails['objectStore'] == undefined) {
      this.warningMessage = true;
    } else if (email != null) {
      this.warningMessage;
    }
    else {
      this.warningMessage = false;
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

  dataWithParameters(queryData) {
    if(queryData){
      this.queryParameters=queryData
    }
    this.getAccountDetail(queryData);
  }
}
