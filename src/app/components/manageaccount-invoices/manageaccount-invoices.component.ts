import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";
import { User } from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ManageAccountInvoiceService } from "./manageaccount-invoices.service";
import { DownloadInvoiceButton } from './DownloadInvoiceButton'
import * as FileSaver from 'file-saver';
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
            'context':{
              'componentParent': this  
            },
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
        if(event.colDef.headerName!='Download Button'){
                this.dialogService.addDialog(ManageAccountInvoicesComponent, {
                title: 'View Invoice Details',
                viewPopup: true,
                getInvoice: false,
                invoice: event.data,
            })
        }
    
        
    }

    onDownloadClick(event){
        console.log(event.data);
        this.manageAccountInvoiceService.downloadFile(event.data.invoiceId).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");

    }
    cancel() {
        this.close();
    }
    downloadFiles(data: any, fileName) {
        var blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
}
