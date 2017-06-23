import { Component, OnInit } from '@angular/core';
import {ImmigrationviewDocumentExpirationsService} from "./document-expirations.service";
import {documentExpiration} from "../../models/documentExpiration";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface ConfirmModel {
    title: string;
    message: string;
    getDocExpirations: boolean;
    addDocExpiration: boolean;
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
    private user: User;
    public delmessage;
    public getDocExpirations: boolean = true;
    public addDocExpiration: boolean;
    public addNewDocExp: any = {};
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    settings = {
        add: {
            addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
            saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmDelete: true
        },
        columns: {

            documentType: {
                title: 'Document Type'
            },
            validFrom: {
                title: 'Valid From'
            },
            validTo: {
                title: 'Valid To'
            },
            status: {
                title: 'Status'
            },
        },
        pager: {
            display: true,
            perPage: 10
        }

    };

 
    constructor(private ImmigrationviewDocumentExpirationsService: ImmigrationviewDocumentExpirationsService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.addDocumentExpairation = new FormGroup({
            documentType: new FormControl(''),
            validFrom: new FormControl(''),
            validTo: new FormControl(''),
            status: new FormControl('')
        });

    }
    source: LocalDataSource = new LocalDataSource();
    getDocumentsExpirations() {
        this.ImmigrationviewDocumentExpirationsService.getDocumentExpiration(this.appService.clientId)
            .subscribe((res) => {
                this.source.load(res['documentExpiration']);
            });
    }
    ngOnInit() {
        this.getDocumentsExpirations();
    }
    addNewDocExps() {
        this.dialogService.addDialog(ImmigrationviewDocumentExpirationsComponent, {
            addDocExpiration: true,
            getDocExpirations:false,
            title: 'Add Document Expiration'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.ImmigrationviewDocumentExpirationsService.saveDocumentExpairation(this.appService.addNewDocExp).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getDocumentsExpirations();
                    }

                });
            }
        });
    }
    docExpSave() {
        this.addNewDocExp['clientId'] = this.appService.clientId;
        this.addNewDocExp['clientDocumentExpirationId'] = this.addNewDocExp['clientId'];
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
    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.clientId;
        event.newData['clientDocumentExpirationId'] = event.newData['clientId'];
        this.ImmigrationviewDocumentExpirationsService.saveDocumentExpairation(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['documentExpirations'];
             event.confirm.resolve(event.newData);}
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Document Expiration.'
                });
                event.confirm.reject();
            }

        });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    onEditConfirm(event): void {
        this.ImmigrationviewDocumentExpirationsService.saveDocumentExpairation(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
           if (this.message === "SUCCESS") {
               event.newData = res['documentExpirations'];
               event.confirm.resolve(event.newData);
           }
           else {
               this.dialogService.addDialog(ConfirmComponent, {
                   title: 'Error..!',
                   message: 'Unable to Edit Document Expiration.'
               });
                event.confirm.reject();
            }
       });
    }

    onDeleteConfirm(event): void {
        this.delmessage = event.data.documentType;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.ImmigrationviewDocumentExpirationsService.deleteDocumentExpiration(event.data['clientDocumentExpirationId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            event.confirm.resolve();
                        } else {
                            event.confirm.reject();
                        }
                    });
                }
            })

    }

}
