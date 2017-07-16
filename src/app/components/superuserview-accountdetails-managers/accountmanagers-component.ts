import {User} from "../../models/user";
import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {AccountManagersService} from './accountmanagers.service';
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

export interface ConfirmModel {
    title: string;
    message: string;
    viewUsers: boolean;
    addPopups: boolean;
    addUsers: Object;

}
@Component({
    selector:'managers-account',
    templateUrl:'./accountmanagers-component.html'
})
export class AccountsManagers extends DialogComponent<ConfirmModel, boolean> implements OnInit{
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
            lastName: {
                title: 'Last Name'
            },
            emailId: {
                title: 'Email'
            },
             roleName: {
                title: 'Role',
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            {
                                value: "Immigration Officer",
                                title: "Immigration Officer"
                            },
                            {
                                value: "Immigration Manager",
                                title: "Immigration Manager"
                            }
                        ]
                    }
                }
            }

        },
        pager: {
            display: true,
            perPage: 10
        },
        mode:'external'
    };
    public addUsers: any = {};
    public addPopups: boolean = false;
    public viewUsers:boolean=true;
    public beforeEdit: any;
    public editFlag: boolean = true;
    source: LocalDataSource = new LocalDataSource();
    public warningMessage:boolean=false;
     private roles: any = {
        "Immigration Officer": "501f6e87-cd6e-11e6-a939-34e6d7382cac",
        "Immigration Manager": "a724fdd7-cd6e-11e6-a939-34e6d7382cac"
    };
    constructor(public appService:AppService,public managersAccountService:AccountManagersService,public dialogService: DialogService,
    private accountDetailsCommonService: AccountDetailsCommonService){
         super(dialogService);

    }
    ngOnInit(){
        this.getAccountsManagers();
    }
    getAccountsManagers() {

        this.managersAccountService.getUsers(this.accountDetailsCommonService.accountId)
            .subscribe((res) => {
                for (var user of res['users']) {
                    user['roleName'] = user['role'];
                }
                this.source.load(res['users']);
            });
    }
    addNewUser() {
        this.dialogService.addDialog(AccountsManagers, {
            addPopups: true,
            viewUsers: false,
            title: 'Add New User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.managersAccountService.saveNewUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getAccountsManagers();
                    }
                });
            }
        });
    }
    accountmanagersSave(){
        this.addUsers['role'] = this.roles[this.addUsers['role']];
        this.addUsers['accountId'] = this.accountDetailsCommonService.accountId;
        if (this.addUsers['firstName'] == '' || this.addUsers['firstName'] == null || this.addUsers['firstName'] == undefined || this.addUsers['lastName'] == '' || this.addUsers['lastName'] == null || this.addUsers['lastName'] == undefined || this.addUsers['emailId'] == '' || this.addUsers['emailId'] == null || this.addUsers['emailId'] == undefined || this.addUsers['role'] == '' || this.addUsers['role'] == null || this.addUsers['role'] == undefined) {
          this.warningMessage=true;
        }
        else{
            this.appService.addUsers = this.addUsers;
            this.result = true;
            this.close();
        }

    }
    cancel(){
        this.result = false;
        this.close();
    }
    onEditConfirm(event): void {
        //console.log("User table onEditConfirm event: %o",event.newData);
        //event.newData['role'] = this.roles[event.newData['roleName']];
        //this.manageAccountUserService.updateUser(event.newData).subscribe((res) => {
        //      this.message = res['statusCode'];
        //      if(this.message === "SUCCESS"){
        //        event.confirm.resolve(event.newData);
        //      } else {
        //          this.dialogService.addDialog(ConfirmComponent, {
        //              title: 'Error..!',
        //              message: 'Unable to Edit User..!'
        //          });
        //        event.confirm.resolve(event.data);
        //      }
        //});
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(AccountsManagers, {
            addPopups: true,
            viewUsers: false,
            title: 'Edit User',
            addUsers: this.editFlag ? this.beforeEdit : this.addUsers,


        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.managersAccountService.updateUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getAccountsManagers();
                    }
                });
            }
            else {
                this.editFlag = false;
            }
        });
    }

    onDeleteConfirm(event): void {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.managersAccountService.deleteUser(event.data['userId'], this.accountDetailsCommonService.accountId).subscribe((res) => {
                        //this.message = res['statusCode'];
                        //if (this.message == 'SUCCESS') {
                        //    event.confirm.resolve();
                        //} else {
                        //    event.confirm.reject();
                        //}
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getAccountsManagers();
                        }
                    });
                }
            });
    }
}
