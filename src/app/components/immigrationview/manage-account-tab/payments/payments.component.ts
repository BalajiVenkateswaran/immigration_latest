import {User} from '../../../../models/user';
import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ManageAccountPaymentsService} from './payments.service'
import {HeaderService} from '../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';

export interface ConfirmModel {
    title: string;
    message: string;
    getPayments: boolean;
    viewAccountPopup: boolean;
    payment: Object;

}
@Component({
    selector: 'app-manageaccount-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.sass'],
  providers: [ManageAccountPaymentsService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ManageAccountPaymentsComponent  extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public payments: any= {};
    public getPayments= true;
    public viewAccountPopup: boolean;
    public settings;
    private data;
    private user: User;
    constructor(private headerService: HeaderService, public manageAccountPaymentsService: ManageAccountPaymentsService, public dialogService: DialogService) {
        super(dialogService);

    this.settings = {
         'isAddButtonEnable': false,
          'isDeleteEnable': false,
            'columnsettings': [
                {
                    headerName: 'Payment ID',
                    field: 'paymentId',
                },
                {
                    headerName: 'Invoice Number',
                    field: 'invoiceNumber',
                },
                {
                    headerName: 'Invoice Date',
                    field: 'invoiceDate',
                },
                {
                    headerName: 'Invoice Amount',
                    field: 'invoiceAmount',
                },
                {
                    headerName: 'Transaction ID',
                    field: 'transactionId',
                },
                {
                    headerName: 'Payment Date',
                    field: 'paymentDate',
                },
                {
                    headerName: 'Payment Amount',
                    field: 'paymentAmount',
                },
                {
                    headerName: 'Payment Status',
                    field: 'paymentStatus',
                }


            ]
        }

    }
    getPaymentDetails() {
        this.manageAccountPaymentsService.getPaymentDetails(this.headerService.user.accountId).subscribe(
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

    editRecord(event) {
        this.dialogService.addDialog(ManageAccountPaymentsComponent, {
            viewAccountPopup: true,
            getPayments: false,
            title: 'View  Details',
            payment: event.data,
        }).subscribe((isConfirmed) => {
           if (isConfirmed) {

           }
        });
    }
    cancel() {
        this.close();
    }
}
