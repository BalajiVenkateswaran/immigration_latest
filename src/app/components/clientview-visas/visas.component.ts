import { Component, OnInit } from '@angular/core';
import {VisasService} from "./visas.service";
import {visa} from "../../models/visa";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
  selector: 'app-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.sass']
})
export class VisasComponent implements OnInit {

    public addVisa: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data

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
            country: {
                title: 'Country'

            },
            petitionNumber: {
                title: 'Petition Number'
            },
            visaNumber: {
                title: 'Visa Number'
            },
            visaType: {
                title: 'Visa Type'
            },
            issuedOn: {
                title: 'Issued On'
            },
            expiresOn: {
                 title: 'Expires On'
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };

    source: LocalDataSource = new LocalDataSource();
    constructor(private visasService: VisasService, public appService: AppService, private dialogService: DialogService) {

        this.addVisa = new FormGroup({
            country: new FormControl(''),
            petitionNumber: new FormControl(''),
            visaNumber: new FormControl(''),
            visaType: new FormControl(''),
            issuedOn: new FormControl(''),
            expiresOn: new FormControl('')
        });
    }



    ngOnInit() {

        this.visasService.getClientVisas(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['visas']);
            });

    }

    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.visasService.saveClientVisas(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['visa'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Visa..!'
                });
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.visasService.saveClientVisas(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['visa'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Visa..!'
                });
                event.confirm.resolve(event.data);
            }
        });
    }
    public delmesage;
    onDeleteConfirm(event): void {
        this.delmesage=event.data.country
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete  ' + this.delmesage+' ?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.visasService.deleteClientVisa(event.data['visaId']).subscribe((res) => {
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
