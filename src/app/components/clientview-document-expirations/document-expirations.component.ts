import { Component, OnInit } from '@angular/core';
import {DocumentExpirationsService} from "./document-expirations.service";
import {documentExpiration} from "../../models/documentExpiration";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
    selector: 'app-document-expirations',
  templateUrl: './document-expirations.component.html',
  styleUrls: ['./document-expirations.component.sass']
})
export class DocumentExpirationsComponent implements OnInit {
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
                title: 'Valid Form'
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
    public delmessage;
    public addDocumentExpiration: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    source: LocalDataSource = new LocalDataSource();
    constructor(private documentExpirationsService: DocumentExpirationsService, public appService: AppService, private dialogService: DialogService) {

        this.addDocumentExpiration = new FormGroup({
            documentType: new FormControl(''),
            validFrom: new FormControl(''),
            validTo: new FormControl(''),
            status: new FormControl('')
        });
    }

    ngOnInit() {
        this.documentExpirationsService.getDocumentExpiration(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['documentExpiration']);
                console.log(this.source);
            });
  }

    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        event.newData['clientDocumentExpirationId'] = event.newData['clientId'];
        this.documentExpirationsService.saveDocumentExpairation(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['documentExpirations'];
                event.confirm.resolve(event.newData);
            }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Document Repository..!'
                });
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        this.documentExpirationsService.saveDocumentExpairation(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message === "SUCCESS") {
                event.newData = res['documentExpirations'];
                event.confirm.resolve(event.newData);
            }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Document Repository..!'
                });
                event.confirm.reject();
            }
        });
    }

    onDeleteConfirm(event): void {
        this.delmessage = event.data.documentType
        //TODO - call delete backend
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    console.log("User table onDeleteConfirm event: %o", event.data);
                    this.documentExpirationsService.deleteDocumentExpiration(event.data['clientDocumentExpirationId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            event.confirm.resolve();
                        } else {
                            event.confirm.reject();
                        }
                    });
                }
            });
    }
}
