import { User } from '../../../../models/user';
import { AppService } from '../../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {ManageAccountPaymentsService} from './payments.service'

export interface ConfirmModel {
    title: string;
    message: string;
    getPayments: boolean;
    viewAccountPopup:boolean;
    payment:Object;

}
@Component({
    selector: 'app-manageaccount-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.sass']
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
                    headerName: "Transaction ID",
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
                }
                
                
            ]
        }
    
    }
    getPaymentDetails(){
        this.manageAccountPaymentsService.getPaymentDetails(this.user.accountId).subscribe(
            res=>{
                if(res['statusCode']=='SUCCESS'){
                   this.data=res['payments'];
                  
                }
            }
        )
    }

    ngOnInit() {
        this.getPaymentDetails();
    }
    
    editRecord(event){
        this.dialogService.addDialog(ManageAccountPaymentsComponent, {
            viewAccountPopup: true,
            getPayments: false,
            title: 'View  Details',
            payment: event.data,
        }).subscribe((isConfirmed) => {
           if(isConfirmed){
                   
           }
        });
    }
    cancel() {
        this.close();
    }    
}
