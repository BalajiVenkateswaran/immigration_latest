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
import { DialogService } from "ng2-bootstrap-modal";
@Component({
    selector: 'app-manageaccount-organizations',
    templateUrl: './manageaccount-organizations.component.html',
    styleUrls: ['./manageaccount-organizations.component.sass']
})
export class ManageAccountOrganizationsComponent implements OnInit {
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
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    public delmessage;
    private manageaccountorganizationList: manageaccountorganization[];
    public addOrganization: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    source: LocalDataSource = new LocalDataSource();
    constructor(private manageaccountorganizationService: ManageAccountOrganizationsService,
        private appService: AppService, private dialogService: DialogService) {

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

    ngOnInit() {
        this.manageaccountorganizationService
            .getManageAccountOrganizations(this.appService.user.accountId)
            .subscribe((res: any) => {
                console.log("PetitionsComponent|ngOnInit|res:%o", res);
                this.source.load(res.orgs);
            });
  }

  onCreateConfirm(event) : void {
      console.log("User table onCreateConfirm event: %o",event.newData);
      event.newData['accountId'] = this.appService.user.accountId;
      this.manageaccountorganizationService.saveNewOrganization(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            event.newData = res['org'];
            if (this.message == "SUCCESS") {
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Organization..!'
                });
                event.confirm.reject();
            }



      });
    }

    onEditConfirm(event) : void {
        console.log("User table onEditConfirm event: %o",event.newData);
        event.newData['orgName'] = event.data['orgName'];
        event.newData['userId'] = this.appService.user.userId;
        this.manageaccountorganizationService.updateOrganization(event.newData).subscribe((res) => {
              this.message = res['statusCode'];
              if(this.message === "SUCCESS"){
                event.newData = res['org'];
                event.confirm.resolve(event.newData);
              } else {
                  this.dialogService.addDialog(ConfirmComponent, {
                      title: 'Error..!',
                      message: 'Unable to Edit Organization..!'
                  });
                event.confirm.resolve(event.data);
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
                            event.confirm.resolve();
                           } else {
                            event.confirm.reject();
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
}
