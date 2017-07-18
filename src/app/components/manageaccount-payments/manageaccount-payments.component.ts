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
import {ManageAccountPaymentsService} from './manageaccount-payments.service'

export interface ConfirmModel {
    title: string;
    message: string;
    getPayments: boolean;
    viewAccountPopup:boolean;
    payment:Object;

}
@Component({
    selector: 'app-manageaccount-payments',
    templateUrl: './manageaccount-payments.component.html',
    styleUrls: ['./manageaccount-payments.component.sass']
})
export class ManageAccountPaymentsComponent  extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public invoiceDetailsForm: boolean = false;
    public DefaultResponse = { "status": "Active" };
    public paymentList:any;
    public payments:any={};
    public getPayments:boolean=true;
    public viewAccountPopup:boolean;
    public isEditpayments:boolean=true;
    public settings;   
    private data;
    // settings = {
    //     add: {
    //         addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //         createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmCreate: true
    //     },
    //     edit: {
    //         editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
    //         saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmSave: true
    //     },
    //     actions: {
    //         delete: false,
    //         add: false,
    //         edit: false
    //     },
    //     columns: {
    //         invoiceNumber: {
    //             title: 'Invoice Number'
    //         },
    //         invoiceDate: {
    //             title: 'Invoice Date'
    //         },
    //         invoiceAmount: {
    //             title: 'Invoice Amount'
    //         },
    //         paymentReceived: {
    //             title: 'Payment Received'
    //         },
    //         pdfUploaded: {
    //             title: 'PDF uploaded',
    //         },
    //         downloadButton: {
    //             title: 'Download Button',
    //         },
    //         viewDetails: {
    //             title: 'View Details',
    //         }
    //     },
    //     pager: {
    //         display: true,
    //         perPage: 10
    //     }
    // };
    //source: LocalDataSource = new LocalDataSource();
    private user: User;
    constructor(private appService: AppService,public manageAccountPaymentsService:ManageAccountPaymentsService,public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;
        }

    this.settings={
         "isAddButtonEnable":false,
          "isDeleteEnable":false,
            'columnsettings': [
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
                    headerName: "Payment Received",
                    field: "paymentReceived",
                },
                {
                    headerName: "PDF uploaded",
                    field: "pdfUploaded",
                },
                {
                    headerName: "Download Button",
                    field: "downloadButton",
                },
                // {
                //     headerName: "View Details",
                //     field: "viewDetails",
                // },
                
            ]
        }
    
    }
    getPaymentDetails(){
        this.manageAccountPaymentsService.getPaymentDetails(this.user.accountId).subscribe(
            res=>{
                if(res['statusCode']=='SUCCESS'){
                    //this.paymentList=res['payments'];
                   //this.data=payments;
                   this.data=res['payments'];
                   /* this.appService.paymentId=res['payments']['paymentId']*/
                }
            }
        )
    }

    ngOnInit() {
        this.getPaymentDetails();
    }
    
    
    viewDetails(data,index){
        this.dialogService.addDialog(ManageAccountPaymentsComponent, {
            viewAccountPopup: true,
            getPayments: false,
            title: 'View  Details',
            payment:data,
        }).subscribe((isConfirmed) => {
           if(isConfirmed){
                  
            
           }
           else{

               //this.editFlag = false;
           }
        });
    }
    editRecord(){
        this.isEditpayments = !this.isEditpayments;
    }
    //cancelpaymentsInfo(){
    //    this.isEditpayments = !this.isEditpayments;
    //}
    cancel() {
        this.close();

    }
    savepaymentsInfo(){
     this.isEditpayments = !this.isEditpayments;
     //this.appService.addUsers = this.payment;
     this.result = true;
     this.close();
    }    
}
