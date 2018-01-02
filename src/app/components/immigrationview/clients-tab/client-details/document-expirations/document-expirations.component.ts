import {DocumentExpiration} from '../../../../../models/documentExpiration';
import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {ImmigrationviewDocumentExpirationsService} from './document-expirations.service';
import {FormGroup, FormControl} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';
import {ImmigrationClientCommonService} from '../common/immigration-client.service';
import {IHDateUtil} from '../../../../framework/utils/date.component';


export interface ConfirmModel {
  title: string;
  message: string;
  getDocExpirations: boolean;
  addDocExpiration: boolean;
  addNewDocExp: Object;
  validFrom: string;
  validTo: string;
}
@Component({
  selector: 'app-document-expirations',
  templateUrl: './document-expirations.component.html',
  styleUrls: ['./document-expirations.component.sass'],
  providers: [ImmigrationviewDocumentExpirationsService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ImmigrationviewDocumentExpirationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private documentExpirationList: DocumentExpiration[];
  public addDocumentExpairation: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public delmessage;
  public getDocExpirations = true;
  public addDocExpiration: boolean;
  public addNewDocExp: any = {};
  public settings;
  public data;
  public editFlag = true;
  public beforeEdit: any;
  public showWorkAddrSaveButtonProgress = false;
  private myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  constructor(private immigrationviewDocumentExpirationsService: ImmigrationviewDocumentExpirationsService, private immigrationClientCommonService: ImmigrationClientCommonService,
    public appService: AppService, public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: 'Document Type',
          field: 'documentType'
        },
        {
          headerName: 'Valid From',
          field: 'validFrom'
        },
        {
          headerName: 'Valid To',
          field: 'validTo'
        },
        {
          headerName: 'Status',
          field: 'status'
        }
        ]
    };
    this.addDocumentExpairation = new FormGroup({
      documentType: new FormControl(''),
      validFrom: new FormControl(''),
      validTo: new FormControl(''),
      status: new FormControl('')
    });

  }
  getDocumentsExpirations() {
    this.immigrationviewDocumentExpirationsService.getDocumentExpiration(this.appService.clientId)
      .subscribe((res) => {
        this.data = res['documentExpiration'];
      });
  }
  ngOnInit() {
    this.getDocumentsExpirations();
  }
  addNewDocExps(event) {
    this.dialogService.addDialog(ImmigrationviewDocumentExpirationsComponent, {
      addDocExpiration: true,
      getDocExpirations: false,
      title: 'Add Document Expiration'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.appService.addNewDocExp['userId'] = this.immigrationClientCommonService.userId;
        this.immigrationviewDocumentExpirationsService.saveDocumentExpairation(this.appService.addNewDocExp, this.headerService.user.userId).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.getDocumentsExpirations();
          }

        });
      }
    });
  }
  docExpSave() {
      if (!this.addNewDocExp['status']) {
      this.addNewDocExp['status'] = 'Active';
    }
    this.addNewDocExp['validFrom'] = this.addNewDocExp['validFrom']['formatted'];
    this.addNewDocExp['validTo'] = this.addNewDocExp['validTo']['formatted'];
    this.appService.addNewDocExp = this.addNewDocExp;
    this.result = true;
    this.showWorkAddrSaveButtonProgress = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }
  editDocuments(event): void {
    this.editFlag = true;
    if (this.editFlag) {
      this.beforeEdit = (<any>Object).assign({}, event.data);
    }

    this.dialogService.addDialog(ImmigrationviewDocumentExpirationsComponent, {
      addDocExpiration: true,
      getDocExpirations: false,
      title: 'Edit Document Expiration',
      addNewDocExp: this.editFlag ? this.beforeEdit : this.addNewDocExp,
      validFrom: event.data.validFrom,
      validTo: event.data.validTo,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.immigrationviewDocumentExpirationsService.saveDocumentExpairation(this.appService.addNewDocExp, this.headerService.user.userId).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
                this.getDocumentsExpirations();
                this.showWorkAddrSaveButtonProgress = false;
          }

        });
      } else {
        this.editFlag = false;
      }
    });
  }

  deleteDocuments(event): void {
    this.delmessage = event.data.documentType;
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Delete ' + this.delmessage + '?'
      }
    }).afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.immigrationviewDocumentExpirationsService.deleteDocumentExpiration(event.data['clientDocumentExpirationId']).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
              this.getDocumentsExpirations();
            }
          });
        }
      });

  }

}
