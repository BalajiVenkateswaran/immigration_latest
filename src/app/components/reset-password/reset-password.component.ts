import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../../services/app.service";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ResetPasswordService } from "./reset-password.service";
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
    email: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$")]),
    confirmPassword: new FormControl('', [Validators.required])
  }, Validators.compose([ConfirmPasswordValidator.matchPassword,ConfirmPasswordValidator.oldSameAsNew]));
  constructor(private router: Router, private resetPasswordService: ResetPasswordService,
    private appService: AppService, private dialogService: DialogService) {
    console.log(this.login);
  }

  ngOnInit() {
    this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
  }

  loginSubmit(login, isValid) {
    console.log("Reset Password %o", login);

    var req = {
      "emailId": login.email,
      "newPassword": login.newPassword,
      "password": login.oldPassword
    };

    this.resetPasswordService.updatePassword(req).subscribe(
      res => {
        if (res['statusCode'] === 'SUCCESS') {
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
export class ConfirmPasswordValidator {
  static matchPassword(control: AbstractControl) {
    if (control.value) {
      let password = control.get('newPassword').value;
      let confirmPassword = control.get('confirmPassword').value;
      if (password != confirmPassword) {
        control.get("confirmPassword").setErrors({ matchPassword: true });
      }
      else {
        control.get("confirmPassword").setErrors({ matchPassword: false });
        return null;
      }
    }



  }
  static oldSameAsNew(formControl: AbstractControl) {
    if (formControl.value) {
      let oldPassword = formControl.get('oldPassword').value;
      let newPassword = formControl.get('newPassword').value;
      if (oldPassword != newPassword) {
        formControl.get("newPassword").setErrors({ oldSameAsNew: true });
      }
      else {
        formControl.get("newPassword").setErrors({ oldSameAsNew: false });
        return null;
      }
    }
  }
}
