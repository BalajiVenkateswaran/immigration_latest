import {User} from '../../../../models/user';
import {AppService} from '../../../../services/app.service';
import {ConfirmComponent} from '../../../framework/confirmbox/confirm.component';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {loginService} from "./login.service";
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {ManageAccountUserService} from "../../../immigrationview/manage-account-tab/user/user.service";

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
  selector: 'imm-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };
  public login: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  message: string;
  forgotPwd;
  private frgtEmail;
  public getloginpage: boolean = true;
  public selectrole: boolean;
  public loginPopupForm: boolean;
  public userRoles: any = [];
  public forgotpwdsubmit: boolean = true;
  //Build number format: yy.mm.2 digit build number
  public static uiBuildNumber : string = "17.09.06";
  constructor(
    private router: Router,
    private appService: AppService,
    private loginservice: loginService,
    public dialogService: DialogService,
    private headerService: HeaderService,
    private manageAccountUserService: ManageAccountUserService
  ) {
    super(dialogService);
    this.login = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });

    if (this.appService.user) {
      this.appService.moveToPage("petitions");
    }

  }
  frgtPwd(isValid) {
    this.forgotPwd = false;
  }

  ngOnInit(): void {
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
    this.appService.currentPage = 'login';
    this.forgotPwd = true;
  }

  onSubmitClick(model: User, isValid: boolean) {
    if (isValid) {
      this.forgotpwdsubmit = false;
    }

    if (!this.forgotPwd) {
      this.forgetPassword(model.emailId);
    } else {
      this.loginSubmit(model, isValid);
    }

  }

  forgetPassword(email: string) {
    this.loginservice.forgetPassword(email).subscribe((res) => {
      console.log("ForgetPassword Response %o", res);
      if (res['statusCode'] == 'SUCCESS') {
        this.close();
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Information',
          message: 'Password reset information is sent to ' + email
        })
          .subscribe((isConfirmed) => {
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
      this.loginservice.login(model).subscribe((res: any) => {
        console.log("Login User %o", res);
        //if(res.uiBuildNumber != null && LoginComponent.uiBuildNumber != res.uiBuildNumber){
        //  this.close();
        //  this.dialogService.addDialog(ConfirmComponent, {
        //    title: 'Information',
        //    message: 'Page will be reloaded to get the latest updates'
        //  }).subscribe((isConfirmed) => {
        //      window.location.reload(true);
        //  });

        //}
            if (res.statusCode == "FAILURE") {
          this.message = res.statusDescription;
        } else {

          //Reset password
          if (res['resetPassword'] != undefined
            && res['resetPassword'] == true) {
            this.close();
            this.appService.moveToPage('reset-password');
          } else {
            this.close();
            this.appService.userLoginHistoryId = res['userLoginHistoryId'];
            if (res.hasMultipleRoles == true) {
              this.appService.userroleList = res['userAccountRoleList'];
              this.dialogService.addDialog(LoginComponent, {
                selectrole: true,
                getloginpage: false,
                title: 'Please Select User Role',
                userRoles: res['userAccountRoleList']
              }).subscribe((isConfirmed) => {
                if (isConfirmed) {

                }
              });
              this.appService.user = res.user;

            }
            if (res.hasMultipleRoles == false) {
              this.appService.user = res.user;
              this.appService.selroleId = res.userAccountRoleList[0].roleId;
              this.appService.rolemultiple = false;
              this.headerService.organizations = res.organizationList;
              this.appService.user['roleName'] = res.userAccountRoleList[0].roleName;
              this.appService.user.accountId = res.userAccountRoleList[0].accountId;
              this.appService.selacntId = res.userAccountRoleList[0].accountId;

              if (res.userAccountRoleList[0].roleName == "Immigration Manager"
                || res.userAccountRoleList[0].roleName == "Immigration Officer") {
                this.appService.applicationViewMode = "Immigration";
                this.headerService.selectedOrg = res.organizationList[0];
                this.appService.currentTab = 'petitions';
                this.appService.moveToPage("petitions");
              }
              if (res.userAccountRoleList[0].roleName == "Client") {
                this.appService.applicationViewMode = "Client";
                this.appService.clientId = this.appService.user.userId;
                this.appService.currentTab = 'clientview-petitions';
                this.appService.moveToPage("clientview-petitions");
              }
              if (res.userAccountRoleList[0].roleName == "Super User") {
                this.appService.applicationViewMode = "Superuser";
                this.appService.currentTab = 'superuser-accounts';
                this.appService.moveToPage("superuser-accounts");
              }
              this.getUsers();
            }

          }
        }
      });

    } else {
      this.message = "Unable to login into system. contact admin.";
    }
  }

  selectedRole(userdet) {

    this.appService.selacntId = userdet.accountId;
    this.appService.user.accountId = userdet.accountId;
    this.appService.selroleId = userdet.roleId;
    this.appService.rolemultiple = true;
    this.result = true;
    this.appService.user['roleName'] = userdet.roleName;
    if (userdet.roleName == "Client") {
      this.appService.applicationViewMode = "Client";
      this.appService.clientId = this.appService.user.userId;
      this.appService.currentTab = 'clientview-petitions';
      this.appService.moveToPage("clientview-petitions");
    }
    if (userdet.roleName == "Immigration Manager" || userdet.roleName == "Immigration Officer") {
      this.appService.applicationViewMode = "Immigration";
      this.appService.currentTab = 'petitions';
      this.appService.moveToPage("petitions");

    }
    if (userdet.roleName == "Super User") {
      this.appService.applicationViewMode = "Superuser";
      this.appService.currentTab = 'superuser-accounts';
      this.appService.moveToPage("superuser-accounts");
    }

    this.loginservice.updateLoginHistory(this.appService.userLoginHistoryId, userdet.roleId).subscribe((res: any) => { });
    this.getUsers();
    this.close();
  }
  getUsers() {
      this.manageAccountUserService.getUsers(this.appService.user.accountId, '')
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
    this.dialogService.addDialog(LoginComponent, {
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
}
