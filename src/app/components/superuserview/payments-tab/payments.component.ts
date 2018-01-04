import {AppService} from '../../../services/app.service';
import {HeaderService} from '../../common/header/header.service';
import {MenuComponent} from '../../common/menu/menu.component';
import {AccountDetailsCommonService} from '../accounts-tab/account-details/common/account-details-common.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {SuperUserViewPaymentstabService} from './payments.service';
import { SortType } from '../../framework/smarttable/types/query-parameters';

export interface ConfirmModel {
  title: string;
  message: string;
  addNewClient: boolean;
  getClientsData: boolean;
}

@Component({
  selector: 'ih-payments',
  templateUrl: './payments.component.html',
  providers: [SuperUserViewPaymentstabService]
})
export class SuperUserViewPaymentstabComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  private message: string;
  private data;
  private deleteclients: any;
  private clientName: any;
  public addNewClient: boolean;
  public getClientsData = true;
  public newclitem: any = {};
  public DefaultResponse = {'status': 'Active'};
  public settings;
  public paginationData;
  public statusTypes: any = [];
  constructor(private superuserviewPaymentstabService: SuperUserViewPaymentstabService, private appService: AppService,
    private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent,
    private accountDetailsCommonService: AccountDetailsCommonService, private headerService: HeaderService) {
    super(dialogService);
    this.statusTypes = [
      {
        'display': 'Success',
        'value': 'Success'
      },
      {
        'display': 'Failure',
        'value': 'Failure'
      }
    ];

    this.settings = {
      'isDeleteEnable': false,
      'isAddButtonEnable': false,
      'columnFilter': true,
      'isMorefilters': true,
      'sort': [{
        headingName: 'paymentDate',
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: 'Payment Id',
          field: 'paymentId',
          type: 'text'
        },
        {
          headerName: 'Account Name',
          field: 'accountName',
          type: 'text'
        },
        {
          headerName: 'Account Number',
          field: 'accountNumber',
          type: 'text'
        },
        {
          headerName: 'Invoice Number',
          field: 'invoiceNumber',
          type: 'text'
        },
        {
          headerName: 'Invoice Date',
          field: 'invoiceDate',
          type: 'datePicker',
          filter: false
        },
        {
          headerName: 'Invoice Amount',
          field: 'invoiceAmount',
          type: 'text',
          filter: false
        },
        {
          headerName: 'Payment Status',
          field: 'paymentStatus',
          type: 'dropDown',
          data: this.statusTypes,
          filter: false
        },
        {
          headerName: 'Payment Date',
          field: 'paymentDate',
          type: 'datePicker',
          filter: false
        }
      ]
    }
  }

  ngOnInit() {
    this.headerService.showSideBarMenu(null, 'superuserview/tab/payments');
  }

  clientSave() {
    this.newclitem['accountId'] = this.headerService.user.accountId;
    this.newclitem['orgId'] = this.headerService.selectedOrg['orgId'];
    this.newclitem['createdBy'] = this.headerService.user.userId;
    if (this.newclitem['status'] === '' || null || undefined) {
      this.newclitem['status'] = 'Active';
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
    console.log(event)
    this.menuComponent.highlightSBLink('Payments');
    this.appService.moveToPage('superuserview/account/payments');
    this.accountDetailsCommonService.accountId = event.data.accountId;
    this.headerService.showSideBarMenu('superuserview/tab/accounts', 'superuserview/tab/accounts');

  }
  dataWithParameters(queryParams) {
    if (queryParams) {
        this.superuserviewPaymentstabService.getPaymentsWithQueryParams(queryParams).subscribe(res => {
        this.data = res.payments;
        this.paginationData = res['pageMetadata'];
      })
    }

  }

}
