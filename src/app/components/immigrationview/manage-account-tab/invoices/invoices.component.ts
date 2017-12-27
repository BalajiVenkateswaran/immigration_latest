import {User} from '../../../../models/user';
import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ManageAccountInvoiceService} from './invoices.service';
import {DownloadInvoiceButtonComponent} from './DownloadInvoiceButton'
import * as FileSaver from 'file-saver';
import {HeaderService} from '../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';

export interface ConfirmModel {
  title: string;
  message: string;
  getInvoice: boolean;
  viewPopup: boolean;
  invoice: Object;
}
@Component({
  selector: 'app-manageaccount-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass'],
  providers: [ManageAccountInvoiceService],
  entryComponents: [SmartTableFrameworkComponent, DownloadInvoiceButtonComponent]
})
export class ManageAccountInvoicesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public getInvoice = true;
  public viewPopup: boolean;
  public invoice: any;
  public settings;
  public data;
  public paginationData;
  private user: User;
  constructor(private headerService: HeaderService, public dialogService: DialogService, private manageAccountInvoiceService: ManageAccountInvoiceService) {
    super(dialogService);
    this.settings = {
      'isDeleteEnable': false,
      'rowHeight': 40,
      'isAddButtonEnable': false,
      'context': {
        'componentParent': this
      },
      'columnsettings': [
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
          field: 'invoiceAmount'
        },
        {
          headerName: 'Payment Received',
          field: 'paymentReceived'
        },
        {
          headerName: 'PDF Uploaded',
          field: 'fileName'
        },
        {
          headerName: 'Download Button',
          cellRendererFramework: DownloadInvoiceButtonComponent
        }
      ]
    }

  }
  ngOnInit() {
    this.manageAccountInvoiceService.getAccountInvoice(this.headerService.user.accountId)
      .subscribe((res) => {
        console.log('getinoices%o', res);
        if (res['invoices']) {
          this.data = res['invoices'];
          this.paginationData = res['pageMetadata'];
        }


      });
  }
  viewRecord(event) {
    if (event.colDef.headerName != 'Download Button') {
      this.dialogService.addDialog(ManageAccountInvoicesComponent, {
        title: 'View Invoice Details',
        viewPopup: true,
        getInvoice: false,
        invoice: event.data,
      })
    }
  }

  onDownloadClick(event) {
    this.manageAccountInvoiceService.downloadFile(event.data.invoiceId).subscribe
      (data => this.downloadFiles(data, event.data.fileName),
      error => console.log('Error Downloading....'),
    () => console.log('OK'));

  }
  cancel() {
    this.close();
  }
  downloadFiles(data: any, fileName) {
    let blob = new Blob([data], {
      type: 'application/pdf'
    });
    FileSaver.saveAs(blob, fileName);
  }
}
