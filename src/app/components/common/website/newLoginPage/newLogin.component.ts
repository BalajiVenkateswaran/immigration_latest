import {User} from '../../../../models/user';
import {AppService} from '../../../../services/app.service';
import {ConfirmComponent} from '../../../framework/confirmbox/confirm.component';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {newLoginService} from './newLogin.service';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {ManageAccountUserService} from '../../../immigrationview/manage-account-tab/user/user.service';
import {HeaderComponentService} from '../../header/header.component.service';
import { environment } from '../../../../../environments/environment';
import {ApplicationRoles} from '../../constants/applicationroles.constants';
import {ApplicationViews} from '../../constants/applicationviews.constants';

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
  selector: 'ih-imm-login',
  templateUrl: 'newLogin.component.html',
  styleUrls: ['./newLogin.scss']
})
export class newLoginComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public static uiBuildNumber: string = environment.buildNumber; // "17.09.07";

  [x: string]: any;

  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };
  public login: FormGroup;// our model driven form
  public forgotPwd: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  message: string;
  isForgotPwd;
  private frgtEmail;
  public getloginpage = true;
  public selectrole: boolean;
  public loginPopupForm: boolean;
  public userRoles: any = [];
  public forgotpwdsubmit = true;
  // Build number format: yy.mm.2 digit build number

  constructor(
    private router: Router,
    private appService: AppService,
    private newloginservice: newLoginService,
    public dialogService: DialogService,
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
    this.forgotPwd=new FormGroup({
      emailId: new FormControl('')
    });

    if (this.headerService.user) { // If user already logged in. Redirect to home page
      console.log('Login Component: Header service user exists');
      this.appService.moveToPage(this.headerService.getLandingPagePath(this.headerService.user.roleName));
    }
    this.newloginservice.getIPAndLocation().subscribe(res => {
      this.locationObject = res;
      console.log(this.locationObject);
    })

  }
  frgtPwd(isValid) {
    this.isForgotPwd = false;
  }

  ngOnInit(): void {
    this.appService.showMenu = false;
    this.appService.showHeader = false;
    this.appService.showFooter = false;
    this.appService.expandMenu = false;
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
    this.appService.currentPage = 'login';
    this.isForgotPwd = true;
  }

  onSubmitClick(model: User, isValid: boolean) {
    if (isValid) {
      this.forgotpwdsubmit = false;
    }

    if (!this.isForgotPwd) {
      this.forgetPassword(model.emailId);
    } else {
      this.loginSubmit(model, isValid);
    }

  }

  forgetPassword(email: string) {
    this.newloginservice.forgetPassword(email).subscribe((res) => {
      console.log('ForgetPassword Response %o', res);
      if (res['statusCode'] === 'SUCCESS') {
        this.close();
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Information',
          message: 'Password reset information is sent to ' + email
        }).subscribe((isConfirmed) => {
          this.appService.moveToPage('login');
        });
      } else {
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Information',
          message: res['statusDescription']
        });
      }
    });
  }

  loginSubmit(model: User, isValid: boolean) {
    if (isValid) {
      this.newloginservice.login(model).subscribe((res: any) => {
        console.log('Login User %o', res);
        if (res.uiBuildNumber != null && newLoginComponent.uiBuildNumber !== res.uiBuildNumber) {
          this.close();
          this.dialogService.addDialog(ConfirmComponent, {
            title: 'Information',
            message: 'Page will be reloaded to get the latest updates'
          }).subscribe((isConfirmed) => {
            window.location.reload(true);
          });

        }
        if (res.statusCode === 'FAILURE') {
          this.message = res.statusDescription;
        } else {

          // Reset password
          if (res['resetPassword'] !== undefined
            && res['resetPassword'] === true) {
            this.close();
            this.appService.moveToPage('reset-password');
          } else {
            this.close();
            this.appService.userLoginHistoryId = res['userLoginHistoryId'];
            if (res.hasMultipleRoles === true) {
              this.appService.userroleList = res['userAccountRoleList'];
              this.dialogService.addDialog(newLoginComponent, {
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
                this.headerService.currentTab = 'clients';
                moveToPage = 'clients';
              }
              if (res.userAccountRoleList[0].roleName === ApplicationRoles.CLIENT) {
                this.appService.applicationViewMode = ApplicationViews.CLIENT_VIEW;
                this.appService.clientId = this.headerService.user.userId;
                this.headerService.currentTab = 'clientview-petitions';
                moveToPage = 'clientview-petitions';
              }
              if (res.userAccountRoleList[0].roleName === ApplicationRoles.SUPER_USER) {
                this.appService.applicationViewMode = ApplicationViews.SUPER_USER_VIEW;
                this.headerService.currentTab = 'superuser-accounts';
                moveToPage = 'superuser-accounts';
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

  selectedRole(userdet) {
    this.headerService.user.accountId = userdet.accountId;
    this.headerService.selectedRoleId = userdet.roleId;
    this.appService.rolemultiple = true;
    this.result = true;
    this.headerService.user['roleName'] = userdet.roleName;
    let moveToPage = '';
    if (userdet.roleName === 'Client') {
      this.appService.applicationViewMode = ApplicationViews.CLIENT_VIEW;
      this.appService.clientId = this.headerService.user.userId;
      this.headerService.currentTab = 'clientview-petitions';
      moveToPage = 'clientview-petitions';
    }
    if (userdet.roleName === 'Immigration Manager' || userdet.roleName === 'Immigration Officer') {
      this.appService.applicationViewMode = ApplicationViews.IMMIGRATION_VIEW;
      this.headerService.currentTab = 'clients';
      moveToPage = 'clients';
    }
    if (userdet.roleName === ApplicationRoles.SUPER_USER) {
      this.appService.applicationViewMode = ApplicationViews.SUPER_USER_VIEW;
      this.headerService.currentTab = 'superuser-accounts';
      moveToPage = 'superuser-accounts';
    }

    this.appService.showHeader = true;
    this.appService.showFooter = false;
    this.appService.showMenu = false;

    this.headerComponentService.onHeaderPageLoad(moveToPage);

    this.newloginservice.updateLoginHistory(this.appService.userLoginHistoryId, userdet.roleId).subscribe((res: any) => { });
    this.getUsers();
    this.close();
  }
  getUsers() {
    this.manageAccountUserService.getUsers(this.headerService.user.accountId, '')
      .subscribe((res) => {
        this.appService.usersList = res['users'];
      });
  }
  /**
   *
   */
  getRoleName(user) {
    return user.accountName == null ? user.roleName : user.roleName + ' in ' + user.accountName;
  }
  loginPopup() {
    this.dialogService.addDialog(newLoginComponent, {
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
    this.appService.destroy();
    this.close();
    this.appService.moveToPage('login');

  }


  clicktogotop() {
      window.scrollTo(1000, 500);
  }
}
