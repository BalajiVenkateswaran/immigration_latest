import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from "../../services/app.service";
import {FormGroup, FormControl} from "@angular/forms";
import {ResetPasswordService} from "./reset-password.service";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from '../confirmbox/confirm.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    private outlet: any = {
      breadcrumbs: null,
      header: null,
      message: null,
      carousel: null,
      menu: null,
      footer: null
    };
    login = new FormGroup({
       email: new FormControl(),
       oldPassword: new FormControl(),
       newPassword: new FormControl(),
       confirmPassword: new FormControl()
    });
    constructor(private router: Router, private resetPasswordService: ResetPasswordService,
       private appService: AppService, private dialogService: DialogService) {

    }

  ngOnInit() {
    this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
  }

  loginSubmit(login, isValid){
    console.log("Reset Password %o", login);

    var req = {
                "emailId": login.email,
                "newPassword": login.newPassword,
                "password": login.oldPassword
              };

    this.resetPasswordService.updatePassword(req).subscribe(
      res => {
        if(res['statusCode'] === 'SUCCESS'){
          this.dialogService.addDialog(ConfirmComponent, {
              title: 'Information',
              message: 'Password is successfully updated'
          })
          .subscribe((isConfirmed) => {
             this.appService.moveToPage('login');
          });
        } else {
          this.dialogService.addDialog(ConfirmComponent, {
              title: 'Information',
              message: 'Authentication failed. Please check the password and try it again.'
          });
        }

    });
  }

}
