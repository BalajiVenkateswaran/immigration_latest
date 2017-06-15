import { Component, OnInit } from '@angular/core';
import {ImmigrationViewDependentService} from "./dependents.service";
import {dependent} from "../../models/dependent";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
    selector: 'app-dependents',
    templateUrl: './dependents.component.html',
    styleUrls: ['./dependents.component.sass']
})
export class ImmigrationViewDependentsComponent implements OnInit {

    private dependentList: dependent[];
    public addDependent: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private deleteDependents: any;
    private dependent: any;
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
    constructor(private ImmigrationViewDependentService: ImmigrationViewDependentService, public appService: AppService, private dialogService: DialogService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
    source: LocalDataSource = new LocalDataSource();

    ngOnInit() {

        this.ImmigrationViewDependentService.getDependentSummery(this.appService.clientId)
            .subscribe((res) => {
               this.source.load(res['dependents']);
               this.appService.dependents = res['dependents'];
            });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.clientId;
        this.ImmigrationViewDependentService.saveDependentsSummary(event.newData).subscribe((res) => {
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
        event.newData['clientId'] = this.appService.clientId;
        this.ImmigrationViewDependentService.saveDependentsSummary(event.newData).subscribe((res) => {
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

    onDeleteConfirm(dependents) {
        this.dependent = dependents.data.firstName;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.dependent+' ?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.ImmigrationViewDependentService.removeDependentsSummary(dependents.data['dependentId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            dependents.confirm.resolve();
                        } else {
                            dependents.confirm.reject();
                        }
                    });
                }
            });
    }

}
