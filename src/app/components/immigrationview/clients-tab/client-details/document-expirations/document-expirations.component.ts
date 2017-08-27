import {documentExpiration} from '../../../../../models/documentExpiration';
import {AppService} from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {ImmigrationviewDocumentExpirationsService} from "./document-expirations.service";
import {FormGroup, FormControl} from "@angular/forms";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
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
  styleUrls: ['./document-expirations.component.sass']
})
export class ImmigrationviewDocumentExpirationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private documentExpirationList: documentExpiration[];
  public addDocumentExpairation: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public delmessage;
  public getDocExpirations: boolean = true;
  public addDocExpiration: boolean;
  public addNewDocExp: any = {};
  public settings;
  public data;
  public editFlag: boolean = true;
  public beforeEdit: any;
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };
  constructor(private ImmigrationviewDocumentExpirationsService: ImmigrationviewDocumentExpirationsService,
    public appService: AppService, public dialogService: DialogService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: "Document Type",
          field: "documentType",
        },
        {
          headerName: "Valid From",
          field: "validFrom",
        },
        {
          headerName: "Valid To",
          field: "validTo",
        },
        {
          headerName: "Status",
          field: "status",
        }
      ]
    }
    this.addDocumentExpairation = new FormGroup({
      documentType: new FormControl(''),
      validFrom: new FormControl(''),
      validTo: new FormControl(''),
      status: new FormControl('')
    });

  }
  getDocumentsExpirations() {
    this.ImmigrationviewDocumentExpirationsService.getDocumentExpiration(this.appService.clientId)
      .subscribe((res) => {
        this.data = res['documentExpiration'];
      });
  }
  ngOnInit() {
    this.getDocumentsExpirations();
  }
  addDocuments() {
    this.dialogService.addDialog(ImmigrationviewDocumentExpirationsComponent, {
      addDocExpiration: true,
      getDocExpirations: false,
      title: 'Add Document Expiration'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.addNewDocExp['clientDocumentExpirationId'] = this.addNewDocExp['clientId'];
        this.ImmigrationviewDocumentExpirationsService.saveDocumentExpairation(this.appService.addNewDocExp,this.appService.user.userId).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getDocumentsExpirations();
          }

        });
      }
    });
  }
  docExpSave() {
    if (this.addNewDocExp['status'] == '' || null || undefined) {
      this.addNewDocExp['status'] == "Active";
    }
    this.addNewDocExp['clientId'] = this.appService.clientId;
    this.addNewDocExp['validFrom'] = this.addNewDocExp['validFrom']['formatted'];
    this.addNewDocExp['validTo'] = this.addNewDocExp['validTo']['formatted'];
    this.appService.addNewDocExp = this.addNewDocExp;
    this.result = true;
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
        this.ImmigrationviewDocumentExpirationsService.saveDocumentExpairation(this.appService.addNewDocExp, this.appService.user.userId).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getDocumentsExpirations();
          }

        });
      } else {
        this.editFlag = false;
      }
    });
  }

  deleteDocuments(event): void {
    this.delmessage = event.data.documentType;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.ImmigrationviewDocumentExpirationsService.deleteDocumentExpiration(event.data['clientDocumentExpirationId']).subscribe((res) => {
            if (res['statusCode'] == 'SUCCESS') {
              this.getDocumentsExpirations();
            }
          });
        }
      })

  }

}
