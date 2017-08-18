import { AppService } from '../../../services/app.service';
import { ConfirmComponent } from '../../framework/confirmbox/confirm.component';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ResetPasswordService } from "./reset-password.service";
import { DialogService } from "ng2-bootstrap-modal";

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
  confirmPassword: ConfirmPasswordValidator;
  con = new ConfirmPasswordValidator();
  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, Validators.compose([this.con.matchPassword, this.con.oldSameAsNew]));
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
    matchPassword(control: AbstractControl) {
      if (control.value) {
        let password = control.get('newPassword').value;
        let confirmPassword = control.get('confirmPassword').value;
        let oldPassword = control.get('oldPassword').value;
        if (password != confirmPassword) {
          control.get("confirmPassword").setErrors({ matchPassword: true });
        }


      }
      return null;


    }
    oldSameAsNew(formControl: AbstractControl) {
      if (formControl.value) {
        let oldPassword = formControl.get('oldPassword').value;
        let newPassword = formControl.get('newPassword').value;
        if (oldPassword == newPassword) {
          formControl.get("oldPassword").setErrors({ oldSameAsNew: true });
        }

      }
      return null;
    }
}

