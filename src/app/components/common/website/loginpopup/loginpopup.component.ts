import {User} from '../../../../models/user';
import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginPopupService} from './loginpopup.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ManageAccountUserService} from '../../../immigrationview/manage-account-tab/user/user.service';
import {HeaderComponentService} from '../../header/header.component.service';
import {environment} from '../../../../../environments/environment';
import {ApplicationRoles} from '../../constants/applicationroles.constants';
import {ApplicationViews} from '../../constants/applicationviews.constants';
import {RolesPopupComponent} from '../rolespopup/rolespopup.component';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';
import {ResetPasswordComponent} from '../../reset-password/reset-password.component';

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
  selector: 'ih-login-popup',
  templateUrl: 'loginpopup.component.html',
  providers: [LoginPopupService, ManageAccountUserService],
  entryComponents: [ResetPasswordComponent]
})
export class LoginPopupComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public static uiBuildNumber: string = environment.buildNumber;
  public login: FormGroup; // our model driven form
  public forgotPwd: FormGroup;
  message: string;
  isforgotPwd;
  public getloginpage = true;
  public selectrole: boolean;
  public loginPopupForm: boolean;
  public userRoles: any = [];
  public forgotpwdsubmit = true;
  public submitRequest = {};

  constructor(
    private router: Router,
    public appService: AppService,
    private loginPopupService: LoginPopupService,
    public dialogService: DialogService, public dialog: MatDialog,
    private headerService: HeaderService,
    private headerComponentService: HeaderComponentService,
    private manageAccountUserService: ManageAccountUserService
  ) {
    super(dialogService);
    console.log('Login Component Constructor');
    this.login = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });
    this.forgotPwd = new FormGroup({
      emailId: new FormControl('')
    });

    if (this.headerService.user) { // If user already logged in. Redirect to home page
      console.log('Login Component: Header service user exists');
      this.appService.moveToPage(this.headerService.getLandingPagePath(this.headerService.user.roleName));
    }
  }
  frgtPwd(isValid) {
    this.isforgotPwd = false;
  }

  ngOnInit(): void {
    this.isforgotPwd = true;
  }

  onSubmitClick(model: User, isValid: boolean) {
    if (isValid) {
      this.forgotpwdsubmit = false;
    }

    if (!this.isforgotPwd) {
      this.forgetPassword(model.emailId);
    } else {
      this.loginSubmit(model, isValid);
    }

  }

  forgetPassword(email: string) {
    this.loginPopupService.forgetPassword(email).subscribe((res) => {
      console.log('ForgetPassword Response %o', res);
      if (res['statusCode'] === 'SUCCESS') {
        this.close();
        this.dialog.open(InformationDialogComponent, {
         data: {
           message: 'Password reset information is sent to ' + email
         }
        }).afterClosed().subscribe((isConfirmed) => {
          this.appService.moveToPage('');
        });
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

  loginSubmit(model: User, isValid: boolean) {
    if (isValid) {
      this.loginPopupService.login(model).subscribe((res: any) => {
        console.log('Login User %o', res);
        if (res.uiBuildNumber != null &&  LoginPopupComponent.uiBuildNumber !== res.uiBuildNumber) {
          this.close();
          this.dialog.open(InformationDialogComponent, {
            data: {
              message: 'Page will be reloaded to get the latest updates'
            }
          }).afterClosed().subscribe((isConfirmed) => {
            window.location.reload(true);
          });
          return;
        }
        /*this.loginPopupService.getIPAndLocation().subscribe(res => {
          this.locationObject = res;
        });*/
        if (res.statusCode === 'FAILURE') {
          this.message = res.statusDescription;
        } else {

          // Reset password
          if (res['resetPassword'] !== undefined
            && res['resetPassword'] === true) {
            this.close();
            this.dialog.open(ResetPasswordComponent, {
              data: model
            });
          } else {
            this.close();
            this.appService.userLoginHistoryId = res['userLoginHistoryId'];
            if (res.hasMultipleRoles === true) {
              this.appService.userroleList = res['userAccountRoleList'];
              this.dialogService.addDialog(RolesPopupComponent, {
                selectrole: true,
                getloginpage: false,
                title: 'Please Select User Role',
                userRoles: res['userAccountRoleList']
              }).subscribe((isConfirmed) => {
                if (isConfirmed) {

                }
              });
              this.headerService.user = res.user;

            }
            if (res.hasMultipleRoles === false) {
              this.headerService.user = res.user;
              this.headerService.selectedRoleId = res.userAccountRoleList[0].roleId;
              this.appService.rolemultiple = false;
              this.headerService.organizations = res.organizationList;
              this.headerService.user['roleName'] = res.userAccountRoleList[0].roleName;
              this.headerService.user.accountId = res.userAccountRoleList[0].accountId;
              let moveToPage = '';
              if (res.userAccountRoleList[0].roleName === ApplicationRoles.IMMIGRATION_MANAGER
                || res.userAccountRoleList[0].roleName === ApplicationRoles.IMMIGRATION_OFFICER) {
                this.appService.applicationViewMode = ApplicationViews.IMMIGRATION_VIEW;
                this.headerService.selectedOrg = res.organizationList[0];
                this.headerService.currentTab = 'immigrationview/tab/clients';
                moveToPage = 'immigrationview/tab/clients';
              }
              if (res.userAccountRoleList[0].roleName === ApplicationRoles.CLIENT) {
                this.appService.applicationViewMode = ApplicationViews.CLIENT_VIEW;
                this.appService.clientId = this.headerService.user.userId;
                this.headerService.currentTab = 'clientview/petitions';
                moveToPage = 'clientview/petitions';
              }
              if (res.userAccountRoleList[0].roleName === ApplicationRoles.SUPER_USER) {
                this.appService.applicationViewMode = ApplicationViews.SUPER_USER_VIEW;
                this.headerService.currentTab = 'superuserview/tab/accounts';
                moveToPage = 'superuserview/tab/accounts';
              }
              this.getUsers();

              this.appService.showHeader = true;
              this.appService.showFooter = false;
              this.appService.showMenu = false;
              this.headerComponentService.onHeaderPageLoad(moveToPage);
            }
          }
        }
      });

    } else {
      this.message = 'Unable to login into system. contact admin.';
    }
  }

  getUsers() {
    this.manageAccountUserService.getUsers(this.headerService.user.accountId, '')
      .subscribe((res) => {
        this.appService.usersList = res['users'];
      });
  }

  loginPopup() {
    this.dialogService.addDialog(LoginPopupComponent, {
      selectrole: false,
      getloginpage: false,
      loginPopupForm: true,
      title: 'Login',

    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.close();
      }
    });
  }

  multiRolepopupClose() {
    this.appService.destroy(true);
    this.close();
    this.appService.moveToPage('');
  }
}
