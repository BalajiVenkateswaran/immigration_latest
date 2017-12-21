import {AppService} from '../../../services/app.service';
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {InformationDialogComponent} from '../../framework/popup/information/information.component';
import {LoginPopupComponent} from '../website/loginpopup/loginpopup.component';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ResetPasswordService]
})
export class ResetPasswordComponent {
  passwordRegex: RegExp;
  public oldPasswordValidationFlag= false;
  public confirmPasswordValidFlag= false;

  numberValidationRegExp: RegExp = new RegExp('[0-9]');
  upperCaseValidationRegExp: RegExp = new RegExp('[A-Z]');
  lowerCaseValidationRegExp: RegExp = new RegExp('[a-z]');
  specialCharValidationRegExp: RegExp = new RegExp('[$@$!%*?#_&+=^,.:;\-]');


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
    newPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  constructor(private router: Router, private resetPasswordService: ResetPasswordService, public dialogService: DialogService,
    private appService: AppService, private dialog: MatDialog, public dialogRef: MatDialogRef<ResetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.login.controls.email.setValue(data.emailId);
    this.login.controls.oldPassword.setValue(data.password);
  }

  loginSubmit(login, isValid) {
    console.log('Reset Password %o', login);

    let req = {
      'emailId': login.email,
      'newPassword': login.newPassword,
      'password': login.oldPassword
    };

    this.resetPasswordService.updatePassword(req).subscribe(
      res => {
        if (res['statusCode'] === 'SUCCESS') {
          this.dialog.open(InformationDialogComponent, {
            data: {
              message: 'Password is successfully updated'
            }
          }).afterClosed().subscribe((isConfirmed) => {
              this.cancelClick();
            this.dialogService.addDialog(LoginPopupComponent, {
              selectrole: false,
              getloginpage: false,
              loginPopupForm: true,
              title: 'Login',

            }).subscribe((isConfirmed) => {
              if (isConfirmed) {
                this.dialogService.removeAll();
              }
            });
          });
        } else {
          this.dialog.open(InformationDialogComponent, {
            data: {
              message: 'Authentication failed. Please check the password and try it again.'
            }
          });
        }

      });
  }

  validatePassword() {
    if (this.login.value.oldPassword === this.login.value.newPassword) {
      this.oldPasswordValidationFlag = true;
    } else {
      this.oldPasswordValidationFlag = false;
    }
    if (this.login.value.newPassword !== this.login.value.confirmPassword) {
      this.confirmPasswordValidFlag = true;
    } else {
      this.confirmPasswordValidFlag = false;
    }
  }

  cancelClick() {
    this.dialogRef.close(false);
  }
  getNumberStyle(newPassword) {
    return this.numberValidationRegExp.test(newPassword) ? 'green' : 'red';
  }
  getPasswordLengthStyle(newPassword) {
    return newPassword && newPassword.length > 7 ? 'green' : 'red';
  }
  getUpperCaseStyle(newPassword) {
    return this.upperCaseValidationRegExp.test(newPassword) ? 'green' : 'red';
  }
  getLowerCaseStyle(newPassword) {
    return this.lowerCaseValidationRegExp.test(newPassword) ? 'green' : 'red';
  }
  getSpecialCharStyle(newPassword) {
    return this.specialCharValidationRegExp.test(newPassword) ? 'green' : 'red';
  }

}
