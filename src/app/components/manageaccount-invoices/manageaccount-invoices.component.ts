import { Component, OnInit } from '@angular/core';
import { client } from "../../models/client";
import { FormGroup, FormControl } from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from "../../services/app.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { MenuComponent } from "../menu/menu.component";
import { ManageAccountInvoiceService } from "./manageaccount-invoices.service";
import { DownloadInvoiceButton } from './DownloadInvoiceButton'
export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    viewPopup: boolean;
    invoice: Object;

}
@Component({
    selector: 'app-manageaccount-invoices',
    templateUrl: './manageaccount-invoices.component.html',
    styleUrls: ['./manageaccount-invoices.component.sass']
})
export class ManageAccountInvoicesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getInvoice: boolean = true;
    public viewPopup: boolean;
    public AccountInvoices: any;
    public DefaultResponse = { "status": "Active" };
    public invoice: any;
    public isEditInvoice: boolean = true;
    public settings;
    public data;
    private user: User;
    public clickSubscription;
    public checked:boolean=false;
    constructor(private appService: AppService, public dialogService: DialogService, private manageAccountInvoiceService: ManageAccountInvoiceService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;

        }
        this.settings = {
            'isDeleteEnable': false,
            'rowHeight': 40,
            'isAddButtonEnable': false,
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
                    field: "invoiceAmount"
                },
                {
                    headerName: "Payment Received",
                    field: "paymentReceived"
                },
                {

                    headerName: "PDF Uploaded",
                    field: "pdfUploaded"
                },
                {

                    headerName: "Download Button",
                    cellRendererFramework: DownloadInvoiceButton
                },

            ]
        }
        this.clickSubscription = DownloadInvoiceButton.onButtonClick.subscribe(res => {
            if (res) {
                if (res.hasOwnProperty('flag')) {
                    this.checked = true;

                }
                else {
                    this.checked = false;
                }
            }
        })

    }


    ngOnInit() {
        this.manageAccountInvoiceService.getAccountInvoice(this.user.accountId)
            .subscribe((res) => {
                console.log("getinoices%o", res);
                if (res['invoices']) {
                    this.data = res['invoices'];
                }


            });
    }
    viewRecord(event) {
        if(!this.checked){
            this.dialogService.addDialog(ManageAccountInvoicesComponent, {
            title: 'View Invoice Details',
            viewPopup: true,
            getInvoice: false,
            invoice: event.data,
        })
    }
    else{
        console.log("Butrtto");
    }
        
    }

    downloadInvoice(rowData) {
        this.manageAccountInvoiceService.downloadInvoice(rowData.Id)
            .subscribe((res) => {

            });
    }
    cancel() {
        this.close();
    }
}
