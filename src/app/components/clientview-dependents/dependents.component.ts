import { Component, OnInit } from '@angular/core';
import {DependentService} from "./dependents.service";
import {dependent} from "../../models/dependent";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
    selector: 'app-dependents',
    templateUrl: './dependents.component.html',
    styleUrls: ['./dependents.component.sass']
})
export class DependentsComponent implements OnInit {
    public delmessage;
    private dependentList: dependent[];
    public addDependent: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
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

            firstName: {
                title: 'First Name'
            },
            middleName: {
                title: 'Middle Name'
            },
            lastName: {
                title: 'Last Name'
            },
            relation: {
                title: 'Relation'
            },
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    source: LocalDataSource = new LocalDataSource();
    constructor(private dependentService: DependentService, public appService: AppService, private dialogService: DialogService) {
    }



    ngOnInit() {
        this.dependentService.getDependentSummary(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['dependents']);
                this.appService.dependents = res['dependents'];
            });
    }

    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.dependentService.saveDependentsSummary(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['dependentsSummary'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Dependent..!'
                });
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.dependentService.saveDependentsSummary(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['dependentsSummary'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Dependent..!'
                });
                event.confirm.reject();
            }
        });
    }

    onDeleteConfirm(event): void {
        this.delmessage = event.data.firstName
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.dependentService.removeDependentsSummary(event.data['dependentId']).subscribe((res) => {
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
