import {AppService} from '../../../../services/app.service';
import {ProfileChangePwdService} from './changepassword.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HeaderService} from '../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';

@Component({
    selector: 'ih-profilechangepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.sass'],
  providers: [ProfileChangePwdService]
})

export class ProfileChangePwdComponent implements OnInit {
    passwordRegex: RegExp;
    public profilechange: any = {};
    newpwd: FormControl;
    ngOnInit() {

    }
    constructor(public appService: AppService, private profileChangepwdservice: ProfileChangePwdService, private dialog: MatDialog,
                public headerService: HeaderService) {
        this.passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?#_&+=^,.:;\-])[A-Za-z\d$@$!%*?#_&+=^,.:;\-]{8,}/;
        this.newpwd = new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]);
    }
    changepwd() {
        if (this.profilechange.newpwd === this.profilechange.currentpwd) {
            this.dialog.open(InformationDialogComponent, {
                data: {
                  message: 'New password cannot be same as current password..'
                }
            });
        } else if (this.profilechange.newpwd !== this.profilechange.retypenewpwd) {
            this.dialog.open(InformationDialogComponent, {
                data: {
                  message: 'New Password and Retype New Password should be same'
                }
            });
        } else {
            let req = {
                'emailId': this.headerService.user.emailId,
                'newPassword': this.profilechange.newpwd,
                'password': this.profilechange.currentpwd
            };

            this.profileChangepwdservice.updatePassword(req).subscribe(
                res => {
                    console.log(res);
                    if (res['statusCode'] === 'SUCCESS') {
                        this.dialog.open(InformationDialogComponent, {
                            data: {
                              message: 'Password is successfully updated'
                            }
                        }).afterClosed().subscribe((isConfirmed) => {
                            this.headerService.logOut();
                        });
                    } else {
                        this.dialog.open(InformationDialogComponent, {
                            data: {
                              title: 'Error',
                              message: 'Authentication failed. Please check the password and try it again.'
                            }
                        });
                    }
                });
        }
    }
}
