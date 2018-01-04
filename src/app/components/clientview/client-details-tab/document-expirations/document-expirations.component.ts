import {Component, OnInit} from '@angular/core';
import {DocumentExpirationsService} from './document-expirations.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
import {ConfirmationDialogComponent} from '../../../framework/popup/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';
import {IHDateUtil} from '../../../framework/utils/date.component';

export interface ConfirmModel {
    title: string;
    message: string;
    getClientDocExp: boolean;
    addClientDocExp: boolean;
    addClientNewDocExp: Object;
    validFrom: string;
    validTo: string;
}
@Component({
    selector: 'app-document-expirations',
  templateUrl: './document-expirations.component.html',
  styleUrls: ['./document-expirations.component.sass'],
  providers: [DocumentExpirationsService]
})
export class DocumentExpirationsComponent extends DialogComponent< ConfirmModel, boolean > implements OnInit {
    public settings;
    public data;
    public delmessage;
    public addDocumentExpiration: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public getClientDocExp = true;
    public addClientDocExp: boolean;
    public addClientNewDocExp: any = {};
    public editFlag = true;
    public beforeEdit: any;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    constructor(private documentExpirationsService: DocumentExpirationsService, public appService: AppService, public dialogService: DialogService,
                public dialog: MatDialog, public headerService: HeaderService) {
        super(dialogService);
        this.addDocumentExpiration = new FormGroup({
            documentType: new FormControl(''),
            validFrom: new FormControl(''),
            validTo: new FormControl(''),
            status: new FormControl('')
        });
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
    }
    getClientDocumentExp() {
        this.documentExpirationsService.getDocumentExpiration(this.headerService.user.userId)
            .subscribe((res) => {
                this.data = res['documentExpiration'];
            });
    }
    ngOnInit() {
        this.getClientDocumentExp();
  }
    addFunction() {
        this.dialogService.addDialog(DocumentExpirationsComponent, {
            addClientDocExp: true,
            getClientDocExp: false,
            title: 'Add Document Expiration',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.appService.addClientNewDocExp['userId'] = this.headerService.user.userId;
                this.documentExpirationsService.saveDocumentExpairation(this.appService.addClientNewDocExp, this.headerService.user.userId).subscribe((res) => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getClientDocumentExp();
                    }
                });
            }
        });
    }
    clientDocExpSave() {
        if (!this.addClientNewDocExp['status']) {
          this.addClientNewDocExp['status'] = 'Active';
        }
        if (this.addClientNewDocExp['validFrom'] && this.addClientNewDocExp['validFrom']['formatted']) {
            this.addClientNewDocExp['validFrom'] = this.addClientNewDocExp['validFrom']['formatted'];
        }
        if (this.addClientNewDocExp['validTo'] && this.addClientNewDocExp['validTo']['formatted']) {
            this.addClientNewDocExp['validTo'] = this.addClientNewDocExp['validTo']['formatted'];
        }
        this.appService.addClientNewDocExp = this.addClientNewDocExp;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
    editRecord(event): void {
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(DocumentExpirationsComponent, {
            addClientDocExp: true,
            getClientDocExp: false,
            title: 'Edit Document Expiration',
            addClientNewDocExp: this.editFlag ? this.beforeEdit : this.addClientNewDocExp,
            validFrom: event.data.validFrom,
            validTo: event.data.validTo,

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.documentExpirationsService.saveDocumentExpairation(this.appService.addClientNewDocExp, this.headerService.user.userId).subscribe((res) => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getClientDocumentExp();
                    }
                });
            } else {
                this.editFlag = false;
            }
        });
    }

    deleteRecord(event): void {
        this.delmessage = event.data.documentType
        // TODO - call delete backend
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
              message: 'Are you sure you want to Delete ' + this.delmessage + '?'
            }
        }).afterClosed()
          .subscribe((isConfirmed) => {
              if (isConfirmed) {
                  console.log('User table onDeleteConfirm event: %o', event.data);
                  this.documentExpirationsService.deleteDocumentExpiration(event.data['clientDocumentExpirationId']).subscribe((res) => {
                      if (res['statusCode'] === 'SUCCESS') {
                          this.getClientDocumentExp();
                      }
                  });
              }
          });
    }
}
