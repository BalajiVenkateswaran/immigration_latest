import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../../services/app.service";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../../../../confirmbox/confirm.component';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {AccountManagersService} from './accountmanagers.service';
import {AccountDetailsCommonService} from "../common/account-details-common.service";

export interface ConfirmModel {
  title: string;
  message: string;
  viewUsers: boolean;
  addPopups: boolean;
  addUsers: Object;

}
@Component({
  selector: 'managers-account',
  templateUrl: './accountmanagers.component.html'
})
export class AccountsManagers extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public settings;
  public data;
  public addUsers: any = {};
  public addPopups: boolean = false;
  public viewUsers: boolean = true;
  public beforeEdit: any;
  public editFlag: boolean = true;
  public warningMessage: boolean = false;
  private roles: any = {
    "Immigration Officer": "501f6e87-cd6e-11e6-a939-34e6d7382cac",
    "Immigration Manager": "a724fdd7-cd6e-11e6-a939-34e6d7382cac"
  };
  constructor(public appService: AppService, public managersAccountService: AccountManagersService, public dialogService: DialogService,
    private accountDetailsCommonService: AccountDetailsCommonService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: "First Name",
          field: "firstName"
        },
        {
          headerName: "Last Name",
          field: "lastName"
        },
        {
          headerName: "Email",
          field: "emailId"
        },
        {
          headerName: "Role",
          field: "roleName"
        }
      ]
    }
  }
  ngOnInit() {
    this.getAccountsManagers();
  }
  getAccountsManagers() {
    this.managersAccountService.getUsers(this.accountDetailsCommonService.accountId)
      .subscribe((res) => {
        for (var user of res['users']) {
          user['roleName'] = user['role'];
        }
        this.data = res['users'];
      });
  }
  addFunction(event) {
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
  accountmanagersSave(email) {
    this.addUsers['role'] = this.roles[this.addUsers['role']];
    this.addUsers['accountId'] = this.accountDetailsCommonService.accountId;
    if (this.addUsers['firstName'] == '' || this.addUsers['firstName'] == null || this.addUsers['firstName'] == undefined || this.addUsers['lastName'] == '' || this.addUsers['lastName'] == null || this.addUsers['lastName'] == undefined || this.addUsers['emailId'] == '' || this.addUsers['emailId'] == null || this.addUsers['emailId'] == undefined || this.addUsers['role'] == '' || this.addUsers['role'] == null || this.addUsers['role'] == undefined) {
      this.warningMessage = true;
    }
    else if (email != null) {
      this.warningMessage = false;
    }
    else {
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
    this.editFlag = true;
    if (this.editFlag) {
      this.beforeEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(AccountsManagers, {
      addPopups: true,
      viewUsers: false,
      title: 'Edit User',
      addUsers: this.editFlag ? this.beforeEdit : this.addUsers
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

  deleteRecord(event): void {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.managersAccountService.deleteUser(event.data['userId'], this.accountDetailsCommonService.accountId, this.appService.user.userId).subscribe((res) => {

            if (res['statusCode'] == 'SUCCESS') {
              this.getAccountsManagers();
            }
          });
        }
      });
  }
}
