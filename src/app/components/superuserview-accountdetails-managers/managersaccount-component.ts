import {User} from "../../models/user";
import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ManagersAccountService} from './managersaccount.service';
export interface ConfirmModel {
    title: string;
    message: string;
    getUsers: boolean;
    adduser: boolean;
    addUsers: Object;

}
@Component({
    selector:'managers-account',
    templateUrl:'./managersaccount-component.html'
})
export class ManagersAccounts extends DialogComponent<ConfirmModel, boolean> implements OnInit{
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
            phone:{
                title:'Phone'
            },
             roleName: {
                title: 'Role',
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            {
                                value: "IMMIGRATION OFFICER",
                                title: "IMMIGRATION OFFICER"
                            },
                            {
                                value: "IMMIGRATION MANAGER",
                                title: "IMMIGRATION MANAGER"
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
    private user: User;
    public addUsers: any = {};
    public getUsers: boolean = true;
    public adduser: boolean;
    source: LocalDataSource = new LocalDataSource();
    constructor(public appService:AppService,public managersAccountService:ManagersAccountService,public dialogService: DialogService){
         super(dialogService);
         if (this.appService.user) {
            this.user = this.appService.user;

        }
    }
    ngOnInit(){
        this.getManageersAccounts();
        this.appService.showSideBarMenu("superuserview", "superuserview-managersaccount");
    }
    getManageersAccounts() {

        this.managersAccountService.getUsers(this.appService.user.accountId)
            .subscribe((res) => {
                for (var user of res['users']) {
                    user['roleName'] = user['role'];
                }
                this.source.load(res['users']);
            });
    }
    addNewUser() {
        this.dialogService.addDialog(ManagersAccounts, {
            adduser: true,
            getUsers: false,
            title: 'Add New User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.managersAccountService.saveNewUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getManageersAccounts();
                    }
                });
            }
        });
    }
}