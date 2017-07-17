import { Component, OnInit } from '@angular/core';
import {DependentService} from "./dependents.service";
import {dependent} from "../../models/dependent";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";


export interface ConfirmModel {
    title: string;
    message: string;
    showAddCVdependentpopup: boolean;
    getCVDependentData: boolean;
    newCVdependentitem: Object;

}

@Component({
    selector: 'app-dependents',
    templateUrl: './dependents.component.html',
    styleUrls: ['./dependents.component.sass']
})




export class DependentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public delmessage;
    private dependentList: dependent[];
    public addDependent: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public settings;
    public data;
    public showAddCVdependentpopup: boolean;
    public getCVDependentData: boolean = true;
    public newCVdependentitem: any = {};
    public editFlag: boolean = true;
    public beforeEdit: any;
    public warningMessage: boolean = false;
    //settings = {
    //    mode: 'external',
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
    //            title: 'First Name'
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
    //    }
    //};
    constructor(private dependentService: DependentService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
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
                    field: "lastName",
                 
                },
                {
                    headerName: "Relation",
                    field: "relation",
                 
                },
                

            ]
        }
    }

    //source: LocalDataSource = new LocalDataSource();
    getCVDpntData() {
        this.dependentService.getDependentSummary(this.appService.user.userId).subscribe((res) => {
            this.data = res['dependents'];
           // this.source.load(res['dependents']);
            this.appService.dependents = res['dependents'];
        });
    }

    ngOnInit() {
       /* this.dependentService.getDependentSummary(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['dependents']);
               
            });*/
        this.getCVDpntData();
    }

    addFunction() {
        this.dialogService.addDialog(DependentsComponent, {
            showAddCVdependentpopup: true,
            getCVDependentData: false,
            title: 'Add Dependent',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.dependentService.saveDependentsSummary(this.appService.newCVdependentitem).subscribe((res) => {
                    this.message = res['statusCode'];
                    if (this.message == 'SUCCESS') {
                        this.getCVDpntData();
                    } else {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Error..!',
                            message: 'Unable to Add Dependent.'
                        });
                    }

                });
            }
        });
    }
    dependentSave() {
        this.newCVdependentitem['clientId'] = this.appService.clientId;
        if (this.newCVdependentitem['firstName'] == '' || this.newCVdependentitem['firstName'] == null || this.newCVdependentitem['firstName'] == undefined || this.newCVdependentitem['lastName'] == '' || this.newCVdependentitem['lastName'] == null || this.newCVdependentitem['lastName'] == undefined || this.newCVdependentitem['relation'] == '' || this.newCVdependentitem['relation'] == null || this.newCVdependentitem['relation'] == undefined) {
            this.warningMessage = true;
        } else {
            this.appService.newCVdependentitem = this.newCVdependentitem;
            this.result = true;
            this.close();
        }

        
    }
    cancel() {
        this.result = false;
        this.close();
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

    //onEditConfirm(event): void {
    //    this.editFlag = true;
    //    if (this.editFlag) {
    //        this.beforeEdit = (<any>Object).assign({}, event.data);
    //    }

    //    this.dialogService.addDialog(DependentsComponent, {
    //        showAddCVdependentpopup: true,
    //        getCVDependentData: false,
    //        title: 'Edit Dependent',
    //        newCVdependentitem: this.editFlag ? this.beforeEdit : this.newCVdependentitem,
            
    //    }).subscribe((isConfirmed) => {
    //        if (isConfirmed) {
    //            this.dependentService.saveDependentsSummary(this.appService.newCVdependentitem).subscribe((res) => {
    //                if (res['statusCode'] == 'SUCCESS') {
    //                    this.getCVDpntData();
    //                }

    //            });
    //        } else {
    //            this.editFlag = false;
    //        }
    //    });
    //}
    editRecord(event): void {
          this.appService.moveToPageWithParams('dependentDetails', event.data.dependentId); 
        this.appService.currentSBLink = event.data.firstName;
    }
    deleteRecord(event): void {
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
                            //event.confirm.resolve();
                            this.getCVDpntData();
                        } else {
                            event.confirm.reject();
                        }
                    });
                }
            });
    }


}
