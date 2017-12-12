import {AppService} from '../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../framework/popup/information/information.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {
  passwordRegex: RegExp;
  public oldPasswordValidationFlag= false;
  public confirmPasswordValidFlag= false;
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
  constructor(private router: Router, private resetPasswordService: ResetPasswordService,
    private appService: AppService, private dialog: MatDialog) {
    console.log(this.login);

    }

  ngOnInit() {
    this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
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
              this.appService.moveToPage('login');
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


}

