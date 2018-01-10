import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {AccountInvoiceService} from './invoice.service';
import * as FileSaver from 'file-saver';
import {IMyOptions} from 'mydatepicker';
import {AccountDetailsCommonService} from '../common/account-details-common.service';
import {InvoiceDownloadButtonComponent} from './invoicedownloadbutton';
import {InvoiceUploadButtonComponent} from './invoiceuploadbutton';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';
import {IHDateUtil} from '../../../../framework/utils/date.component';

export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    addInvoice: boolean;
    viewPopup: boolean;
    invoice: Object;
}

@Component({
    selector: 'ih-account-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
  providers: [AccountInvoiceService],
  entryComponents: [InvoiceDownloadButtonComponent, InvoiceUploadButtonComponent]
})
export class AccountInvoiceComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getInvoice = true;
    public addInvoice: boolean;
    public accountInvoice = false;
    public AccountInvoices: any;
    public viewRowDetails: any = {};
    public isEditInvoice= true;
    public invoice: any;
    public viewPopup: boolean;
    public settings;
    public data;
    public showWorkAddrSaveButtonProgress = false;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;

    constructor(public dialogService: DialogService, public dialog: MatDialog, public accountInvoiceService: AccountInvoiceService,
      private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
        this.settings = {
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight': 45,
            'context': {
                'componentParent': this
            },
            'columnsettings': [
              {
                  headerName: 'Invoice Number',
                  field: 'invoiceNumber'
              },
              {
                  headerName: 'Invoice Date',
                  field: 'invoiceDate'
              },
              {
                  headerName: 'Invoice Amount',
                  field: 'invoiceAmount'
              },
              {
                  headerName: 'Payment Received',
                  field: 'paymentReceived'
              },
              {
                headerName: 'Bill Start',
                field: 'billStartDate'
              },
              {
                headerName: 'Bill End',
                field: 'billEndDate'
              }
                /*{
                    headerName: 'PDF Uploaded',
                    cellRendererFramework: InvoiceUploadButtonComponent
                },
                {
                    headerName: 'Download Button',
                    cellRendererFramework: InvoiceDownloadButtonComponent
                }*/
            ]
        };
    }
    ngOnInit() {
      console.log(this.accountDetailsCommonService.accountId)
        this.accountInvoiceService.getAccountInvoice(this.accountDetailsCommonService.accountId)
            .subscribe((res) => {
                if (res['invoices']) {
                    this.data = res['invoices'];
                    this.AccountInvoices = res['invoices'];
                }
            });
    }
    editRecord(event) {
        if (event.colDef.headerName !== 'PDF Uploaded' && event.colDef.headerName !== 'Download Button') {
        this.dialogService.addDialog(AccountInvoiceComponent, {
            title: 'View Invoice Details',
            viewPopup: true,
            getInvoice: false,
            addInvoice: false,
            invoice: event.data
        })
        }
    }
    cancel() {
         this.close();
    }
    onDownloadClick(event) {
       this.accountInvoiceService.downloadFile(event.data.invoiceId).subscribe
            (data => this.downloadFiles(data, event.data.fileName),
            error => console.log('Error Downloading....'),
        () => console.log('OK'));
    }

  downloadInvoice(event) {
    this.accountInvoiceService.downloadFile(event.invoiceId).subscribe
    (data => this.downloadFiles(data, event.fileName),
      error => console.log('Error Downloading....'),
    () => console.log('OK'));
  }

    downloadFiles(data: any, fileName) {
        let blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
  popupInvoiceFileUploadClick(event: any, data: any) {
   this.onUploadClick( {'event': event, 'data': data});
  }
    onUploadClick(event) {
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        let x = file.name;
        let fileExists = this.isfileExists(file);
        let y = x.split('.');
        if (fileList.length > 0 && y[1] === 'pdf' && fileExists !== true) {
          let formData: FormData = new FormData();
          formData.append('file', file, file.name);

          this.accountInvoiceService.uploadFile(event.data.invoiceId, formData)
            .subscribe(res => {
               if (res['statusCode'] === 'SUCCESS') {
                 event.data.fileId = res['fileId'];
                 event.data.fileName = file.name;
               }
            });

        } else {
          this.close();
          if (fileExists === true) {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: 'File with same name is already uploaded for an invoice. Please rename the file and upload.'
              }
            });
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: 'Please Upload Only Pdf files'
              }
            });
          }
        }
    }
     isfileExists(file) {
        let upload = false;
        this.AccountInvoices.filter(item => {
            if (file.name === item.fileName) {
                upload = true;
                return false;
            }
            return true;
        })
        return upload;
    }

     saveInvoiceDetails() {
         this.showWorkAddrSaveButtonProgress = true;
      this.accountInvoiceService.saveInvoiceDetails(this.invoice).subscribe(
          res => {
              this.showWorkAddrSaveButtonProgress = false;
          if (res['statusCode'] === 'SUCCESS') {}
          }
         );
      this.close();
    }

    emailInvoice(invoice: any) {
      this.accountInvoiceService.sendInvoiceEmail(invoice['invoiceId']).subscribe(
        res => {
          this.close();
          let message = 'Failed to send email. Please try after some time.';
          if (res['statusCode'] === 'SUCCESS') {
            message = 'Email is sent successfully';
          }
          this.dialog.open(InformationDialogComponent, {
            data: {
              title: 'Error',
              message: message
            }
          });
        }
      );
    }
}
