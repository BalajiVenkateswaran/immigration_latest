import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {ManageAccountUserService} from "../manageaccount-user/manageaccount-user.service";
import {AppService} from "../../services/app.service";
import {loginService} from "./login.service";
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    message: string;
    getloginpage: boolean;
    selectrole: boolean;
    userRoles: any;
}
@Component({
  selector: 'imm-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends DialogComponent< ConfirmModel, boolean > implements  OnInit {

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
  public userRoles: any = [];
  constructor(
    private router: Router,
    private ManageAccountUserService: ManageAccountUserService,
    private appService: AppService,
    private loginservice: loginService,
    public dialogService: DialogService
  ) {
      super(dialogService);
    this.login = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });

    if(this.appService.user) {
        this.appService.moveToPage("petitions");
    }

  }
  frgtPwd() {
      this.forgotPwd = false;
  }

  ngOnInit(): void {
      this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
      this.appService.currentPage = 'login';
      this.forgotPwd = true;
  }

  onSubmitClick(model: User, isValid: boolean) {
    if(!this.forgotPwd){
      this.forgetPassword(model.emailId);
    } else {
      this.loginSubmit(model, isValid);
    }
  }

  forgetPassword(email: string) {
      this.loginservice.forgetPassword(email).subscribe((res) => {
          console.log("ForgetPassword Response %o", res);
          if(res['statusCode'] == 'SUCCESS'){
            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Information',
                message: 'Password is reset information is sent to '+email
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
        this.ManageAccountUserService.login(model).subscribe((res: any) => {
            console.log("Login User %o", res);
            if (res.statusCode == "FAILURE") {
                this.message = res.statusDescription;
            } else {
                if (res.hasMultipleRoles == true) {

                    this.dialogService.addDialog(LoginComponent, {
                        selectrole: true,
                        getloginpage: false,
                        title: 'Please Select User Role',
                        userRoles: res['userAccountRoleList'],
                    }).subscribe((isConfirmed) => {
                        if (isConfirmed) {


                        }
                        });
                    this.appService.user = res.user;

                }
                if (res.hasMultipleRoles == false) {
                    this.appService.user = res.user;
                    this.appService.organizations = res.organizationList;
                    this.appService.user['roleName'] = res.userAccountRoleList[0].roleName;
                    this.appService.user.accountId=res.userAccountRoleList[0].accountId;
                //Reset password
                if (res['resetPassword'] != undefined
                    && res['resetPassword'] == true) {
                    this.appService.moveToPage('reset-password');
                } else {
                    if (res.userAccountRoleList[0].roleName == "IMMIGRATION MANAGER"
                        || res.userAccountRoleList[0].roleName == "IMMIGRATION OFFICER") {
                        this.appService.applicationViewMode = "Immigration";
                        this.appService.orgId = res.organizationList[0].orgId;
                        this.appService.currentTab = 'petitions';
                        this.appService.moveToPage("petitions");
                    }
                    if (res.userAccountRoleList[0].roleName == "CLIENT") {
                        this.appService.applicationViewMode = "Client";
                        this.appService.clientId = this.appService.user.userId;
                        this.appService.currentTab = 'clientview-petitions';
                        this.appService.moveToPage("clientview-petitions");
                    }
                    if (res.userAccountRoleList[0].roleName == "SUPER USER") {
                        this.appService.applicationViewMode = "Superuser";
                        this.appService.currentTab = 'superuser-accounts';
                        this.appService.moveToPage("superuser-accounts");
                    }
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
      this.appService.user.accountId=userdet.accountId;
      this.appService.selroleId = userdet.roleId;
      this.appService.rolemultiple = true;
      this.result = true;
      this.appService.user['roleName'] = userdet.roleName;
      if (userdet.roleName == "CLIENT") {
          this.appService.applicationViewMode = "Client";
          this.appService.clientId = this.appService.user.userId;
          this.appService.currentTab = 'clientview-petitions';
          this.appService.moveToPage("clientview-petitions");
      }
      if (userdet.roleName == "IMMIGRATION MANAGER" || userdet.roleName == "IMMIGRATION OFFICER") {
          this.appService.applicationViewMode = "Immigration";
          this.appService.currentTab = 'petitions';
          this.appService.moveToPage("petitions");
      }
      if (userdet.roleName == "SUPER USER") {
          this.appService.applicationViewMode = "Superuser";
          this.appService.currentTab = 'superuser-accounts';
          this.appService.moveToPage("superuser-accounts");
      }
      this.close();
  }
}
