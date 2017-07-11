import { Component, OnInit } from '@angular/core';
import {ManageAccountOrganizationsService} from "./manageaccount-organizations.service";
import {manageaccountorganization} from "../../models/manageaccountorganization";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import { ConfirmorgComponent } from '../confirmbox/confirmorg.component';
//import {HeaderComponent} from "../header/header.component";


export interface ConfirmModel {
    title: string;
    message: string;
    showAddOrgpopup: boolean;
    getOrgsData: boolean;
    editorg: boolean;
    neworgitem: Object;
}

@Component({
    selector: 'app-manageaccount-organizations',
    templateUrl: './manageaccount-organizations.component.html',
    styleUrls: ['./manageaccount-organizations.component.sass']
})
export class ManageAccountOrganizationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

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
            orgName: {
                title: 'Org Name',
                editable: true
            },
            displayName: {
              title : 'Display Name'
            },
            orgStatus: {
                title: 'Status',
                editor: {
                     type:'list',
                    config: {
                        list: [
                            {
                                value: "Active",
                                title: "Active"
                            },
                            {
                                value: "Inactive",
                                title: "Inactive"
                            }
                        ]
                    }
                }
            },
            email: {
                title: 'Email',
            },
            orgType: {
                title: 'Type',
            }
        },
        actions: {
            delete: false
        },
        pager: {
            display: true,
            perPage: 10
        },
        mode: 'external'
    };
    public delmessage;
    private manageaccountorganizationList: manageaccountorganization[];
    public addOrganization: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private selectedOrg: any = {};
    public showAddOrgpopup: boolean;
    public getOrgsData: boolean = true;
    public neworgitem: any = {};
    private orgNamelist;
    public editiorgsFlag: boolean = true;
    public beforeorgsEdit: any;
    public warningMessage: boolean = false;

    constructor(private manageaccountorganizationService: ManageAccountOrganizationsService,
        private appService: AppService, public dialogService: DialogService, private menuComponent: MenuComponent) {
        super(dialogService);

        this.addOrganization = new FormGroup({
            orgId: new FormControl(''),
            orgName: new FormControl(''),
            orgStatus: new FormControl(''),
            email: new FormControl('')

        });

        if (this.appService.user) {
            this.user = this.appService.user;

        }

    }
    source: LocalDataSource = new LocalDataSource();
    getorganizationData() {
        this.manageaccountorganizationService.getManageAccountOrganizations(this.appService.user.accountId).subscribe((res: any) => {
            this.source.load(res['orgs']);
        });
    }
    ngOnInit() {
        this.manageaccountorganizationService
            .getManageAccountOrganizations(this.appService.user.accountId)
            .subscribe((res: any) => {
                console.log("PetitionsComponent|ngOnInit|res:%o", res);
                this.source.load(res.orgs);
            });
  }
    addNewOrganization() {
        this.dialogService.addDialog(ManageAccountOrganizationsComponent, {
            showAddOrgpopup: true,
            getOrgsData: false,
            title: 'Add Organization',
            editorg: false,

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.manageaccountorganizationService.saveNewOrganization(this.appService.neworgitem).subscribe((res) => {
                    this.message = res['statusCode'];
                    if (this.message == 'SUCCESS') {
                        this.getorganizationData();
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
    OrganizationSave() {
        if (this.neworgitem['orgName'] == undefined || this.neworgitem['displayName'] == undefined || this.neworgitem['orgStatus'] == undefined || this.neworgitem['email'] == undefined || this.neworgitem['orgType'] == undefined || 
            this.neworgitem['orgName'] == "" || this.neworgitem['displayName'] == "" || this.neworgitem['orgStatus'] == "" || this.neworgitem['email'] == "" || this.neworgitem['orgType'] == "" ||
            this.neworgitem['orgName'] == null || this.neworgitem['displayName'] == null || this.neworgitem['orgStatus'] == null || this.neworgitem['email'] == null || this.neworgitem['orgType'] == null) {
            this.warningMessage = true;
        } else {
            this.warningMessage = false;
            this.neworgitem['accountId'] = this.appService.user.accountId;
            this.appService.neworgitem = this.neworgitem;
            this.result = true;
            this.close();
        }
    }
    cancel() {
        this.result = false;
        this.close();
    }



  //onCreateConfirm(event) : void {
  //    console.log("User table onCreateConfirm event: %o",event.newData);
  //    event.newData['accountId'] = this.appService.user.accountId;
  //    this.manageaccountorganizationService.saveNewOrganization(event.newData).subscribe((res) => {
  //          this.message = res['statusCode'];
  //          event.newData = res['org'];
  //          if (this.message == "SUCCESS") {
  //              event.confirm.resolve(event.newData);
  //          } else {
  //              this.dialogService.addDialog(ConfirmComponent, {
  //                  title: 'Error..!',
  //                  message: 'Unable to Add Organization..!'
  //              });
  //              event.confirm.reject();
  //          }



  //    });
  //  }

    onEditConfirm(event): void {
        this.editiorgsFlag = true;
        if (this.editiorgsFlag) {
            this.beforeorgsEdit = (<any>Object).assign({}, event.data);
        }
        console.log("User table onEditConfirm event: %o",event.newData);
       this.neworgitem['orgName'] = event.data['orgName'];
       this.neworgitem['userId'] = this.appService.user.userId;
        this.dialogService.addDialog(ManageAccountOrganizationsComponent, {
            showAddOrgpopup: true,
            getOrgsData: false,
            title: 'Edit Organization',
            editorg: true,
            neworgitem: this.editiorgsFlag ? this.beforeorgsEdit : this.neworgitem,

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.manageaccountorganizationService.updateOrganization(this.appService.neworgitem).subscribe((res) => {
                    this.message = res['statusCode'];
                    if (this.message === "SUCCESS") {

                        this.getorganizationData();

                    } else {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Error..!',
                            message: 'Unable to Edit Organization..!'
                        });
                    }
                });
          }
        });
      }

    onDeleteConfirm(event) : void {
        console.log("User table onDeleteConfirm event: %o", event.data);
        this.delmessage = event.data.orgName
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage+'?'
        })
            .subscribe((isConfirmed) => {

                if (isConfirmed) {
                    this.manageaccountorganizationService.deleteOrganization(event.data['orgId'], this.appService.user.userId).subscribe((res) => {
                          this.message = res['statusCode'];
                           if (this.message == 'SUCCESS') {
                        this.getorganizationData();
                      
                           } 
                    });

                }
            });


      }

    addOrganizationSubmit(model: manageaccountorganization, isValid: boolean) {
        console.log('formdata|account: %o|isValid:%o', model, isValid);
        if (isValid) {
            this.manageaccountorganizationService.saveNewOrganization(model).subscribe((status) => { this.message = status[0] });
        } else {
            this.message = "Filled etails are not correct! please correct...";
        }

    }
    onUserRowClick(event, Orgname): void {
        this.appService.getorgName(event.data);
        this.menuComponent.highlightSBLink('Org Details');
        this.appService.moveToPage("organization");
        this.appService.orgId = event.data.orgId;
        console.log(event.data.orgName);
        this.appService.selectedOrg = event.data.orgName;
   // this.headerComponent.orgChange(event.data.orgId, event.data.orgName);
        //todo this.appService.getorgName(Orgname);
        //this.changeOrgName(Orgname);
    }
}
