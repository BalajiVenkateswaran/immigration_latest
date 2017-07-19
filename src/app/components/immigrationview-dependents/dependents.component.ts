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
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
export interface ConfirmModel {
    title: string;
    message: string;
    addDependnts: boolean;
    getDependents: boolean;
   
}
@Component({
    selector: 'app-dependents',
    templateUrl: './dependents.component.html',
    styleUrls: ['./dependents.component.sass']
})
export class ImmigrationViewDependentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private dependentList: dependent[];
    public addDependent: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private deleteDependents: any;
    private dependent: any;
    public addDependents: any = {};
    public getDependents: boolean=true;
    public addedData: any = {};
    public addDependnts: any;
    public warningMessage: boolean = false;
    public settings;
    public data;
    //settings = {
    //    add: {
    //        addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //        createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmCreate: true
    //    },
    //    edit: {
    //        editButtonContent: '<i class="fa fa-eye" aria-hidden="true"></i>',
    //        saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmSave: true
    //    },
    //    delete: {
    //        deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
    //        confirmDelete: true
    //    },
    //    columns: {

    //        firstName: {
    //                title: 'First Name'
    //        },
    //        middleName: {
    //            title: 'Middle Name'
    //        },
    //        lastName: {
    //            title: 'Last Name'
    //        },
    //        relation: {
    //            title: 'Relation'
    //        },
    //    },
    //    pager: {
    //        display: true,
    //        perPage: 10
    //    },
    //    mode:'external'
    //    //actions: {
    //    //    edit: false
    //    //}

    //};
    constructor(private ImmigrationViewDependentService: ImmigrationViewDependentService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);if (this.appService.user) {
            this.user = this.appService.user;   
        }
        this.settings = {
            'columnsettings': [
                {

                    headerName: "First Name",
                    field: "firstName",
                },
                {

                    headerName: "Middle Name",
                    field: "middleName",
                },
                {

                    headerName: "Last Name",
                    field: "lastName"
                },
                {
                    headerName: "Approved on",
                    field: "relation"
                },
               

            ]
        }
    }
   // source: LocalDataSource = new LocalDataSource();
    getDepData() {
        this.ImmigrationViewDependentService.getDependentSummery(this.appService.clientId)
            .subscribe((res) => {
                //this.source.load(res['dependents']);
                this.data = res['dependents'];

                this.appService.dependents = res['dependents'];
            });
    }
    ngOnInit() {
        this.getDepData();   
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    addFunction() {
        this.dialogService.addDialog(ImmigrationViewDependentsComponent, {
            addDependnts: true,
            getDependents: false,
            title: 'Add Dependent',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {       
                this.addDependents = this.appService.addDependents;
                this.ImmigrationViewDependentService.saveDependentsSummary(this.addDependents).subscribe((res) => {
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getDepData();
                        }
                    });
                }
            });
    }
    dependentSave() {
        this.addDependents['clientId'] = this.appService.clientId;
        if (this.addDependents['firstName'] == '' || this.addDependents['firstName'] == null || this.addDependents['firstName'] == undefined || this.addDependents['lastName'] == '' || this.addDependents['lastName'] == null || this.addDependents['lastName'] == undefined || this.addDependents['relation'] == '' || this.addDependents['relation'] == null || this.addDependents['relation'] == undefined) {
            this.warningMessage = true;
        } else {
            this.warningMessage = false;
            this.appService.addDependents = this.addDependents;
            this.result = true;
            this.close();
        }
        
    }
    cancel() {
        this.result = false;
        this.close();
    }

    editRecord(event): void {    
        this.appService.moveToPageWithParams('dependentDetails', event.data.dependentId); 
        this.appService.currentSBLink = event.data.firstName;
    }

    //onCreateConfirm(event): void {
    //    event.newData['clientId'] = this.appService.clientId;
    //    this.ImmigrationViewDependentService.saveDependentsSummary(event.newData).subscribe((res) => {
    //        this.message = res['statusCode'];
    //        if (this.message == 'SUCCESS') {
    //            event.newData = res['dependentsSummary'];
    //            event.confirm.resolve(event.newData);
    //        } else {
    //            this.dialogService.addDialog(ConfirmComponent, {
    //                title: 'Error..!',
    //                message: 'Unable to Add Dependent..!'
    //            });
    //            event.confirm.reject();
    //        }
    //    });
    //}

    //onEditConfirm(event): void {
    //    event.newData['clientId'] = this.appService.clientId;
    //    this.ImmigrationViewDependentService.saveDependentsSummary(event.newData).subscribe((res) => {
    //        this.message = res['statusCode'];
    //        if (this.message == 'SUCCESS') {
    //            event.newData = res['dependentsSummary'];
    //            event.confirm.resolve(event.newData);
    //        } else {
    //            this.dialogService.addDialog(ConfirmComponent, {
    //                title: 'Error..!',
    //                message: 'Unable to Edit Dependent..!'
    //            });
    //            event.confirm.reject();
    //        }
    //    });
    //}

    deleteRecord(dependents) {
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
                            //dependents.confirm.resolve();
                            this.getDepData();  
                        }
                        //else {
                        //    dependents.confirm.reject();
                        //}
                    });
                }
            });
    }

}
