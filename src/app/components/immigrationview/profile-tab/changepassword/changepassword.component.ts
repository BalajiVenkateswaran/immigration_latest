import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { profilechangepwdservice } from './changepassword.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'app-profilchangepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.sass']
})

export class profilechangepwdcomponent implements OnInit {
    public profilechange: any = {};
    ngOnInit() {
       
    }
    constructor(public appService: AppService, private profileChangepwdservice: profilechangepwdservice, private dialogService: DialogService) { }
    changepwd() {
        if (this.profilechange.newpwd == this.profilechange.currentpwd) {
            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Information',
                message: 'New password not same as current password..'
            });
        }
        else {
            var req = {
                "emailId": this.appService.user.emailId,
                "newPassword": this.profilechange.newpwd,
                "password": this.profilechange.currentpwd
            };

            this.profileChangepwdservice.updatePassword(req).subscribe(
                res => {
                    console.log(res);
                    if (res['statusCode'] === 'SUCCESS') {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Information',
                            message: 'Password is successfully updated'
                        })
                            .subscribe((isConfirmed) => {
                                this.appService.destroy();
                                this.appService.moveToPage('');
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
}