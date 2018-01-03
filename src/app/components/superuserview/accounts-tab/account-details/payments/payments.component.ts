import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../../services/app.service";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {AccountDetailsPaymentsService} from "./payments.service";
import {AccountDetailsCommonService} from "../common/account-details-common.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {IHDateUtil} from '../../../../framework/utils/date.component';

export interface ConfirmModel {
  title: string;
  message: string;
  addPopups: boolean;
  getPayments: boolean;
  viewAccountPopup: boolean;
  paymentDate: string;
  payment: Object;


}
@Component({
  selector: 'app-manageaccount-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [AccountDetailsPaymentsService]
})
export class AccountDetailsPaymentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  public getPayments: boolean = true;
  public addPopups: boolean;
  public viewAccountPopup: boolean;
  public payment: any;
  public paymentList: any;
  public payments: any = {};
  public isEditpayments: boolean = true;
  public settings;
  public data;
  public editFlag: boolean = true;
  public beforeEdit: any;
  public warningMessage: boolean = false;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  constructor(private appService: AppService, public accountsPaymentService: AccountDetailsPaymentsService, public dialogService: DialogService,
    private accountDetailsCommonService: AccountDetailsCommonService) {
    super(dialogService);
    this.settings = {
      'isDeleteEnable': false,
      'columnsettings': [
        {

          headerName: "Payment ID",
          field: "paymentId",
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

          headerName: "Transaction Id",
          field: "transactionId",

        },
        {

          headerName: "Payment Date",
          field: "paymentDate",

        },
        {

          headerName: "Payment Amount",
          field: "paymentAmount",

        },
        {

          headerName: "Payment Status",
          field: "paymentStatus",

        },

      ]
    }
  }

  getPaymentDetails() {
    this.accountsPaymentService.getPaymentDetails(this.accountDetailsCommonService.accountId).subscribe(
      res => {
        if (res['statusCode'] == 'SUCCESS') {
          this.data = res['payments'];
        }
      }
    )
  }
  ngOnInit() {
    this.getPaymentDetails();
  }
  addPayments(event) {
    this.dialogService.addDialog(AccountDetailsPaymentsComponent, {
      addPopups: true,
      getPayments: false,
      viewAccountPopup: false,
      title: 'Add Payment',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        if (this.appService.addUsers['paymentDate'] && this.appService.addUsers['paymentDate']['formatted']) {
          this.appService.addUsers['paymentDate'] = this.appService.addUsers['paymentDate']['formatted'];
        }
        this.accountsPaymentService.savePaymentDetails(this.accountDetailsCommonService.accountId, this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.getPaymentDetails();
          }
        });
      }
    });
  }
  savePayments() {
    if ((this.payments['invoiceNumber'] === '' || this.payments['invoiceNumber'] == null || this.payments['invoiceNumber'] === undefined
        || this.payments['transactionId'] === '' || this.payments['transactionId'] == null || this.payments['transactionId'] === undefined
        || this.payments['paymentDate'] === '' || this.payments['paymentDate'] == null || this.payments['paymentDate'] === undefined
        || this.payments['paymentAmount'] === '' || this.payments['paymentAmount'] == null || this.payments['paymentAmount'] === undefined
        || this.payments['paymentStatus'] === '' || this.payments['paymentStatus'] == null || this.payments['paymentStatus'] === undefined)) {
      this.warningMessage = true;
    } else {
      this.warningMessage = false;
      this.appService.addUsers = this.payments;
      this.result = true;
      this.close();
    }
  }
  cancel() {
    this.result = false;
    this.close();
  }
  editPayments(event) {
    this.editFlag = true;
    if (this.editFlag) {
      this.beforeEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(AccountDetailsPaymentsComponent, {
      viewAccountPopup: true,
      getPayments: false,
      addPopups: false,
      title: 'View  Details',
      payment: this.editFlag ? this.beforeEdit : event.data,
      paymentDate: event.data.paymentDate
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        if (this.appService.addUsers['paymentDate'] && this.appService.addUsers['paymentDate']['formatted']) {
          this.appService.addUsers['paymentDate'] = this.appService.addUsers['paymentDate']['formatted'];
        }
        this.accountsPaymentService.editpaymentss(this.accountDetailsCommonService.accountId, this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getPaymentDetails();
          }
        });
      }
    });
  }
  editpaymentsInfo() {
    this.isEditpayments = !this.isEditpayments;
  }
  cancelpaymentsInfo() {
    this.isEditpayments = !this.isEditpayments;
  }
  savepaymentsInfo() {
    this.isEditpayments = !this.isEditpayments;
    this.appService.addUsers = this.payment;
    this.result = true;
    this.close();
  }
}
