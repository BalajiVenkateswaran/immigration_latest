import { Component, OnInit } from '@angular/core';
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
import {AccountDetailsPaymentsService} from './accountdetails-payments.service';
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

export interface ConfirmModel {
    title: string;
    message: string;
    addPopups: boolean;
    getPayments: boolean;
    viewAccountPopup:boolean;
    payment:Object;

}
@Component({
    selector: 'app-manageaccount-payments',
    templateUrl: './accountdetails-payments.component.html',
    styleUrls: ['./accountdetails-payments.component.sass']
})
export class accountDetailsPaymentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public getPayments:boolean=true;
    public addPopups:boolean;
    public viewAccountPopup:boolean;
    public payment:any;
    public DefaultResponse = { "status": "Active" };
    public paymentList:any;
    public payments:any={};
    public isEditpayments: boolean = true;
    public settings;
    public data;
    //settings = {
    //    add: {
    //        addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //        createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmCreate: true
    //    },
    //    edit: {
    //        editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
    //        saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmSave: true
    //    },
    //    actions: {
    //        delete: false,
    //        add: false,
    //        edit: false
    //    },
    //    columns: {
    //        invoiceNumber: {
    //            title: 'Invoice Number'
    //        },
    //        invoiceDate: {
    //            title: 'Invoice Date'
    //        },
    //        invoiceAmount: {
    //            title: 'Invoice Amount'
    //        },
    //        paymentReceived: {
    //            title: 'Payment Received'
    //        },
    //        pdfUploaded: {
    //            title: 'PDF uploaded',
    //        },
    //        downloadButton: {
    //            title: 'Download Button',
    //        },
    //        viewDetails: {
    //            title: 'View Details',
    //        }
    //    },
    //    pager: {
    //        display: true,
    //        perPage: 10
    //    }
    //};
    constructor(private appService: AppService,public accountsPaymentService:AccountDetailsPaymentsService,public dialogService: DialogService,
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

    getPaymentDetails(){
        this.accountsPaymentService.getPaymentDetails(this.accountDetailsCommonService.accountId).subscribe(
            res=>{
                if(res['statusCode']=='SUCCESS'){
                    //this.paymentList = res['payments'];
                    this.data = res['payments'];
                }
            }
        )
    }
    ngOnInit() {
        this.getPaymentDetails();
    }
    addFunction() {
        this.dialogService.addDialog(accountDetailsPaymentsComponent, {
            addPopups: true,
            getPayments: false,
            viewAccountPopup: false,
            title: 'Add New User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.accountsPaymentService.savePaymentDetails(this.accountDetailsCommonService.accountId,this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getPaymentDetails();
                    }
                });
            }
        });
    }
    savePayments() {
        this.appService.addUsers = this.payments;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
    editRecord(event){
        this.dialogService.addDialog(accountDetailsPaymentsComponent, {
            viewAccountPopup: true,
            getPayments: false,
            addPopups:false,
            title: 'View  Details',
            payment:event.data,
        }).subscribe((isConfirmed) => {
           if(isConfirmed){
                  this.accountsPaymentService.editpaymentss(this.accountDetailsCommonService.accountId,this.appService.addUsers).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
                      this.getPaymentDetails();
                  }
              });
           }
           else{

               //this.editFlag = false;
           }
        });
    }
    editpaymentsInfo(){
      this.isEditpayments = !this.isEditpayments;
    }
    cancelpaymentsInfo(){
      this.isEditpayments = !this.isEditpayments;
    }
    savepaymentsInfo(){
     this.isEditpayments = !this.isEditpayments;
     this.appService.addUsers = this.payment;
     this.result = true;
     this.close();
    }
}
