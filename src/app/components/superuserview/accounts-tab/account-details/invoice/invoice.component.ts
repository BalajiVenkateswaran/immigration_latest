import { Component, OnInit } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {AccountInvoiceService} from './invoice.service';
import * as FileSaver from 'file-saver';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {AccountDetailsCommonService} from "../common/account-details-common.service";
import { InvoicedownloadButton } from './invoicedownloadbutton';
import {InvoiceUploadButton} from './invoiceuploadbutton';

export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    addInvoice: boolean;
    viewPopup:boolean;
    invoice: Object;
}

@Component({
    selector: 'account-invoice',
    templateUrl: './invoice.component.html'
})
export class AccountInvoiceComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getInvoice: boolean = true;
    public addInvoice: boolean;
    public accountInvoice: boolean = false;
    public AccountInvoices: any;
    public viewRowDetails: any = {};
    public isEditInvoice:boolean=true;
    public invoice: any;
    public viewPopup: boolean;
    public settings;
    public data;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };

    constructor(public dialogService: DialogService, public accountInvoiceService: AccountInvoiceService,
      private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.settings = {
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight':45,
            'context':{
                'componentParent':this
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
                    field: "invoiceAmount",
                },
                {
                    headerName: "Payment Received",
                    field: "paymentRecieved",
                },
                {
                    headerName: "PDF Uploaded",
                    cellRendererFramework: InvoiceUploadButton
                },
                {
                    headerName: "Download Button",
                    cellRendererFramework: InvoicedownloadButton
                }
            ]
        };
    }
    ngOnInit() {
        this.accountInvoiceService.getAccountInvoice(this.accountDetailsCommonService.accountId)
            .subscribe((res) => {
                console.log("getinoices%o", res);
                if (res['invoices']) {
                    this.data = res['invoices'];
                    this.AccountInvoices = res['invoices'];
                }
                console.log(this.AccountInvoices);
            });
    }
    editRecord(event) {
        if(event.colDef.headerName!='PDF Uploaded' && event.colDef.headerName!='Download Button')
        this.dialogService.addDialog(AccountInvoiceComponent, {
            title: 'View Invoice Details',
            viewPopup: true,
            getInvoice: false,
            addInvoice:false,
            invoice:event.data
        })
    }
    cancel(){
         this.close();
    }
    onDownloadClick(event){
       this.accountInvoiceService.downloadFile(event.data.invoiceId).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");
    }
    downloadFiles(data: any, fileName) {
        var blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
    onUploadClick(event){
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        var x = file.name;
        let fileExists = this.isfileExists(file);
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf" && fileExists != true) {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);

            this.accountInvoiceService.uploadFile(event.data.invoiceId, formData)
                .subscribe(
                res => {
                   console.log(res);
                }
                );

        }
        else {
            if (fileExists == true) {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Filename is already exists.'
                });
            }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Please Upload Only Pdf files'
                });
            }
        }
    }
     isfileExists(file) {
        let upload: boolean = false;
        this.AccountInvoices.filter(item => {
            if (file.name == item.fileName) {
                upload = true;
                return false;
            }
            return true;
        })
        return upload;
    }
}
