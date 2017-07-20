import {Component, OnInit} from '@angular/core';
import {ManageAccountUserService} from "./manageaccount-user.service";
import {User} from "../../models/user";
import {FormGroup, FormControl} from "@angular/forms";
//import {Http} from "@angular/http";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
export interface ConfirmModel {
    title: string;
    message: string;
    getUsers: boolean;
    adduser: boolean;
    addUsers: Object;

}
@Component({
    selector: 'app-manageaccount-user',
    templateUrl: './manageaccount-user.component.html',
    styleUrls: ['./manageaccount-user.component.sass']
    //template: '<ng2-smart-table [settings]="settings"></ng2-smart-table>'
})


export class ManageAccountUserComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private manageaccountuserList: User[] = [];
    public addUser: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private roles: any = {
        "Immigration Officer": "501f6e87-cd6e-11e6-a939-34e6d7382cac",
        "Immigration Manager": "a724fdd7-cd6e-11e6-a939-34e6d7382cac"
    };
    public getUsers: boolean = true;
    public addUsers: any = {};
    public adduser: boolean;
    public beforeEdit: any;
    public editFlag: boolean = true;
    public warningMessage: boolean = false;
    public settings;
    public data;
    //roles : LocalDataSource = new LocalDataSource();

    // settings = {
    //     add: {
    //         addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //         createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmCreate: true
    //     },
    //     edit: {
    //         editButtonContent: '<i class="fa fa-eye" aria-hidden="true"></i>',
    //         saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmSave: true
    //     },
    //     delete: {
    //         deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
    //         confirmDelete: true
    //     },
    //     columns: {
    //         firstName: {
    //             title: 'First Name'
    //         },
    //         lastName: {
    //             title: 'Last Name'
    //         },
    //         emailId: {
    //             title: 'Email'
    //         },
    //         phone: {
    //             title: 'Phone'
    //         },
    //         roleName: {
    //             title: 'Role',
    //             editor: {
    //                 type: 'list',
    //                 config: {
    //                     list: [
    //                         {
    //                             value: "Immigration Officer",
    //                             title: "Immigration Officer"
    //                         },
    //                         {
    //                             value: "Immigration Manager",
    //                             title: "Immigration Manager"
    //                         }
    //                     ]
    //                 }
    //             }
    //         }

    //     },
    //     pager: {
    //         display: true,
    //         perPage: 10
    //     },
    //     mode:'external'
    // };

  //  source: LocalDataSource = new LocalDataSource();

    constructor(private manageAccountUserService: ManageAccountUserService,
        private appService: AppService, public dialogService: DialogService) {
        super(dialogService);

        this.addUser = new FormGroup({
            accountId: new FormControl(''),
            emailId: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            roleId: new FormControl(''),
            title: new FormControl('')

        });

        if (this.appService.user) {
            this.user = this.appService.user;

        }
        this.settings = {
            'paginationPageSize':2,
            'columnsettings': [
                {

                    headerName: "First Name",
                    field: "firstName",
                },
                {

                    headerName: "Last Name",
                    field: "lastName",
              
                },
                {

                    headerName: "Email",
                    field: "emailId",
                },
                {
                    headerName: "Phone",
                    field: "phone",
                    width:50
               
                },
                {

                    headerName: "Role",
                    field: "roleName",
                
                },
              
                
            ]
        }
    }
    getManageUsers() {
        this.manageAccountUserService.getUsers(this.appService.user.accountId)
            .subscribe((res) => {
                for (var user of res['users']) {
                    user['roleName'] = user['role'];
                }
                                this.data=res['users'];
               // this.source.load(res['users']);
                this.appService.usersList=res['users'];
            });
    }
    ngOnInit() {
        this.appService.showSideBarMenu("manageaccount", "manageaccount-user");
        this.getManageUsers();
        //this.roles = new ServerDataSource(this.http, { endPoint: 'http://ec2-34-192-10-166.compute-1.amazonaws.com:8080/immigrationPortal/user/roles', dataKey: 'users' });
    }

    addFunction() {
        this.dialogService.addDialog(ManageAccountUserComponent, {
            adduser: true,
            getUsers: false,
            title: 'Add New User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.manageAccountUserService.saveNewUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getManageUsers();
                    }
                });
            }
        });
    }
    manageUserSave() {
        this.addUsers['role'] = this.roles[this.addUsers['role']];
        this.addUsers['accountId'] = this.appService.user.accountId;
        if (this.addUsers['firstName'] == '' || this.addUsers['firstName'] == null || this.addUsers['firstName'] == undefined || this.addUsers['lastName'] == '' || this.addUsers['lastName'] == null || this.addUsers['lastName'] == undefined || this.addUsers['emailId'] == '' || this.addUsers['emailId'] == null || this.addUsers['emailId'] == undefined) {
            this.warningMessage = true;
        } else {
            this.warningMessage = false;
            this.appService.addUsers = this.addUsers;
            this.result = true;
            this.close();
        }

    }
    cancel() {
        this.result = false;
        this.close();
    }
    onCreateConfirm(event): void {
        console.log("User table onCreateConfirm event: %o", event.newData);
        event.newData['role'] = this.roles[event.newData['roleName']];
        event.newData['accountId'] = this.appService.user.accountId;
        this.manageAccountUserService.saveNewUser(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            event.newData['userId'] = res['userId'];
            if (this.message == "SUCCESS") {
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add User..!'
                });
                event.confirm.reject();
            }
        });
    }

    editRecord(event): void {
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
        /*this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(ManageAccountUserComponent, {
            adduser: true,
            getUsers: false,
            title: 'Edit User',
            addUsers: this.editFlag ? this.beforeEdit : this.addUsers,


        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.manageAccountUserService.updateUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getManageUsers();
                    }
                });
            }
            else {
                this.editFlag = false;
            }
        });*/
        this.appService.moveToPageWithParams('user-details', event.data);
        this.appService.currentSBLink = event.data.firstName;
    }

    deleteRecord(event): void {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.manageAccountUserService.deleteUser(event.data['userId'], this.appService.user.accountId).subscribe((res) => {
                        //this.message = res['statusCode'];
                        //if (this.message == 'SUCCESS') {
                        //    event.confirm.resolve();
                        //} else {
                        //    event.confirm.reject();
                        //}
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getManageUsers();
                        }
                    });
                }
            });
    }
    userDetails(event){
        this.appService.moveToPageWithParams('user-details', event.data);
        this.appService.currentSBLink = event.data.firstName;
    }

}
