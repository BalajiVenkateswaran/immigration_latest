import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {AccountManagersService} from './accountmanagers.service';
import {AccountDetailsCommonService} from '../common/account-details-common.service';
import {HeaderService} from '../../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';

export interface ConfirmModel {
  title: string;
  message: string;
  viewUsers: boolean;
  addPopups: boolean;
  addUsers: Object;
}

@Component({
  selector: 'ih-managers-account',
  templateUrl: './accountmanagers.component.html',
  providers: [AccountManagersService]
})
export class AccountsManagersComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public settings;
  public data;
  public addUsers: any = {};
  public addPopups = false;
  public viewUsers = true;
  public beforeEdit: any;
  public editFlag = true;
  public warningMessage = false;
  public paginationData;
  public showWorkAddrSaveButtonProgress = false;
  constructor(public appService: AppService, public managersAccountService: AccountManagersService, public dialogService: DialogService,
    public dialog: MatDialog, private accountDetailsCommonService: AccountDetailsCommonService, public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      isDeleteEnable: false,
      isEditEnable: false,
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
          headerName: 'Role',
          field: 'roleName'
        }
      ]
    };
  }
  ngOnInit() {
    this.getAccountsManagers();
  }
  getAccountsManagers() {
    this.managersAccountService.getUsers(this.accountDetailsCommonService.accountId)
      .subscribe((res) => {
        for (let user of res['users']) {
          user['roleName'] = user['role'];
        }
        this.data = res['users'];
        this.paginationData = res['pageMetadata'];

      });
  }
  addFunction(event) {
    this.dialogService.addDialog(AccountsManagersComponent, {
      addPopups: true,
      viewUsers: false,
      title: 'Add New User',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.managersAccountService.saveNewUser(this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.getAccountsManagers();
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
          }
        });
      }
    });
  }
  accountmanagersSave(email) {
      this.showWorkAddrSaveButtonProgress = true;
    this.addUsers['accountId'] = this.accountDetailsCommonService.accountId;
    if (this.addUsers['firstName'] === '' || this.addUsers['firstName'] == null || this.addUsers['firstName'] === undefined || this.addUsers['lastName'] === ''
      || this.addUsers['lastName'] == null || this.addUsers['lastName'] === undefined || this.addUsers['emailId'] === '' || this.addUsers['emailId'] == null ||
      this.addUsers['emailId'] === undefined || this.addUsers['role'] === '' || this.addUsers['role'] == null || this.addUsers['role'] === undefined) {
      this.warningMessage = true;
    } else if (email != null) {
        this.warningMessage = false;
        this.showWorkAddrSaveButtonProgress = false;
    } else {
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
    this.dialogService.addDialog(AccountsManagersComponent, {
      addPopups: true,
      viewUsers: false,
      title: 'Edit User',
      addUsers: this.editFlag ? this.beforeEdit : this.addUsers
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.managersAccountService.updateUser(this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.getAccountsManagers();
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
          }
        });
      } else {
        this.editFlag = false;
      }
    });
  }

  deleteRecord(event): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
      }
    }).afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.managersAccountService.deleteUser(event.data['userId'], this.accountDetailsCommonService.accountId, this.headerService.user.userId).subscribe((res) => {

            if (res['statusCode'] === 'SUCCESS') {
              this.getAccountsManagers();
            } else {
              this.dialog.open(InformationDialogComponent, {
                data: {
                  title: 'Error',
                  message: res['statusDescription']
                }
              });
            }
          });
        }
      });
  }
}
