import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {ManageAccountUserService} from "../manageaccount-user/manageaccount-user.service";
import {AppService} from "../../services/app.service";
import {loginService} from "./login.service";
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'imm-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements  OnInit {

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

  constructor(
    private router: Router,
    private ManageAccountUserService: ManageAccountUserService,
    private appService: AppService,
    private loginservice: loginService,
    private dialogService: DialogService
  ) {
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
        if(res.statusCode=="FAILURE") {
          this.message = res.statusDescription;
        } else {
          this.appService.user = res.authenticatedUser;

          //Reset password
          if(this.appService.user != undefined && this.appService.user['resetPassword'] != undefined
          && this.appService.user['resetPassword'] == true){
            this.appService.moveToPage('reset-password');
          } else {
            if (this.appService.user.roleName == "IMMIGRATION MANAGER"
            || this.appService.user.roleName == "IMMIGRATION OFFICER") {
                this.appService.applicationViewMode = "Immigration";
                this.appService.orgId = this.appService.user.organizations[0].orgId;
                this.appService.currentTab = 'petitions';
                this.appService.moveToPage("petitions");
            }
            if (this.appService.user.roleName == "CLIENT") {
                this.appService.applicationViewMode = "Client";
                this.appService.clientId = this.appService.user.userId;
                this.appService.currentTab = 'clientview-petitions';
                this.appService.moveToPage("clientview-petitions");
            }
          }
        }
      });

    } else {
      this.message = "Unable to login into system. contact admin.";
    }

  }




}
