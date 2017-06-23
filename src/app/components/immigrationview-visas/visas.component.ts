import { Component, OnInit } from '@angular/core';
import {ImmigrationViewVisasService} from "./visas.service";
import {visa} from "../../models/visa";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";


export interface ConfirmModel {
    title: string;
    message: string;
    showAddVisapopup: boolean;
    getVisasData: boolean;

}


@Component({
  selector: 'app-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.sass']
})
export class ImmigrationViewVisasComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private delmessage;
    public addVisa: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data
    private user: User;
    public showAddVisapopup: boolean;
    public getVisasData: boolean = true;
    public newvisaitem: any = {};

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
    constructor(private immigrationviewVisasService: ImmigrationViewVisasService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
    }
    source: LocalDataSource = new LocalDataSource();
    getVisaaData() {
        this.immigrationviewVisasService.getClientVisas(this.appService.clientId).subscribe((res) => {
            this.source.load(res['visas']);
         });
    }

    ngOnInit() {
        this.immigrationviewVisasService.getClientVisas(this.appService.clientId)
            .subscribe((res) => {
                this.source.load(res['visas']);
            });
    }

    addNewVisa() {
        this.dialogService.addDialog(ImmigrationViewVisasComponent, {
            showAddVisapopup: true,
            getVisasData: false,
            title: 'Add Visa',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.immigrationviewVisasService.saveClientVisas(this.appService.newvisaitem).subscribe((res) => {
                   this.message = res['statusCode'];
                    if (this.message == 'SUCCESS') {
                        this.getVisaaData();
                    } else {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Error..!',
                            message: 'Unable to Add Visa.'
                        });
                    }

                });
            }
        });
    }
    visaSave() {
        this.newvisaitem['clientId'] = this.appService.clientId;
        this.appService.newvisaitem = this.newvisaitem;
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
    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.clientId;
        this.immigrationviewVisasService.saveClientVisas(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['visa'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Visa.'
                });
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        event.newData['clientId'] = this.appService.clientId;
        this.immigrationviewVisasService.saveClientVisas(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['visa'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Visa.'
                });
                event.confirm.resolve(event.data);
            }
        });
    }

    onDeleteConfirm(immviewVisa) {
        this.delmessage=immviewVisa.data.visaNumber
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage+'?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.immigrationviewVisasService.deleteClientVisa(immviewVisa.data['visaId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            immviewVisa.confirm.resolve();
                        } else {
                            immviewVisa.confirm.reject();
                        }
                    });
                }
            });
    }

}
