import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {ManageAccountUserService} from './user.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {SortType} from '../../../framework/smarttable/types/query-parameters';
import {HeaderService} from '../../../common/header/header.service';
export interface ConfirmModel {
    title: string;
    message: string;
    getUsers: boolean;
    adduser: boolean;
    addUsers: Object;

}
@Component({
    selector: 'app-manageaccount-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})


export class ManageAccountUserComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private message: string;
    private roles: any = {
        'Immigration Officer': '501f6e87-cd6e-11e6-a939-34e6d7382cac',
        'Immigration Manager': 'a724fdd7-cd6e-11e6-a939-34e6d7382cac'
    };
    public getUsers = true;
    public addUsers: any = {};
    public adduser: boolean;
    public warningMessage = false;
    public settings;
    public data;
    public emailId;
    public queryParams: any;
    public paginationData: any;

    constructor(private manageAccountUserService: ManageAccountUserService,
        private appService: AppService, public dialogService: DialogService, private headerService: HeaderService) {
        super(dialogService);
        this.settings = {
          'customPanel': true,
          'isMorefilters':true,

          'sort' : [{
            headingName: 'firstName',
            sort: SortType.ASC
          }],
          'columnsettings': [
              {
                  headerName: 'First Name',
                  field: 'firstName'
              },
              {
                  headerName: 'Last Name',
                  field: 'lastName'
              },
              {
                  headerName: 'Email',
                  field: 'emailId'
              },
              {
                  headerName: 'Phone',
                  field: 'phoneNumber'
              },
              {
                  headerName: 'Role',
                  field: 'role',
                  type: 'dropDown',
                  data: [
                    {
                      display : 'Immigration Officer',
                      value : 'Immigration Officer'
                    },
                    {
                      display : 'Immigration Manager',
                      value : 'Immigration Manager'
                    }
                  ]
              }
          ]
        }
    }
    getManageUsers() {
        this.manageAccountUserService.getUsers(this.headerService.user.accountId, this.queryParams)
            .subscribe((res) => {
                this.data = res['users'];
                this.appService.usersList = res['users'];
                this.paginationData = res['pageMetadata'];
            });
    }
    ngOnInit() {
        this.headerService.showSideBarMenu('manageaccount', 'manageaccount-user');
    }

    addUser() {
        this.dialogService.addDialog(ManageAccountUserComponent, {
            adduser: true,
            getUsers: false,
            title: 'Add New User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

                this.manageAccountUserService.saveNewUser(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getManageUsers();
                    }
                    if (res['statusDescription'] === 'User already exists') {
                        this.dialogService.addDialog(ConfirmComponent, {
                              title: 'Error..!',
                              message: 'User already Exists'
                        })
                    }
                });
            }
        });
    }
    manageUserSave(email, roles) {
        this.addUsers['role'] = this.roles[this.addUsers['role']];
        this.addUsers['accountId'] = this.headerService.user.accountId;
        if ((this.addUsers['firstName'] == '' || this.addUsers['firstName'] == null || this.addUsers['firstName'] == undefined || this.addUsers['lastName'] == '' || this.addUsers['lastName'] == null || this.addUsers['lastName'] == undefined || this.addUsers['emailId'] == '' || this.addUsers['emailId'] == null || this.addUsers['emailId'] == undefined || roles.value == '' || roles.value == null || roles.value == undefined)) {
            this.warningMessage = true;

        } else if (email != null) {
            this.warningMessage = false;
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
    editRecord(event): void {
        this.appService.moveToPageWithParams('user-details', event.data);
        this.appService.currentSBLink = event.data.userId;
    }

    deleteRecord(event): void {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.manageAccountUserService.deleteUser(event.data['userId'], this.headerService.user.accountId, this.headerService.user.userId).subscribe((res) => {
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getManageUsers();
                        }
                    });
                }
            });
    }


    dataWithParameters(queryData) {
      if (queryData != undefined) {
        this.queryParams = queryData;
        this.getManageUsers();
      }

    }
    capitialize(data) {
    if (this.addUsers['firstName']) {
      this.addUsers['firstName'] = data['firstName'].split(' ').map(item => {return item.charAt(0).toUpperCase() + item.slice(1)}).join(' ');
    }
    if (this.addUsers['lastName']) {
      this.addUsers['lastName'] = data['lastName'].split(' ').map(item => {return item.charAt(0).toUpperCase() + item.slice(1)}).join(' ');
    }
  }
}
