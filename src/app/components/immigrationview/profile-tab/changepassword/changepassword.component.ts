import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { profilechangepwdservice } from './changepassword.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from "ng2-bootstrap-modal";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import {HeaderService} from "../../../common/header/header.service";

@Component({
    selector: 'app-profilchangepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.sass']
})

export class profilechangepwdcomponent implements OnInit {
    passwordRegex: RegExp;
    public profilechange: any = {};
    newpwd: FormControl;
    ngOnInit() {

    }
    constructor(public appService: AppService, private profileChangepwdservice: profilechangepwdservice, private dialogService: DialogService,
                public headerService: HeaderService) {
        this.passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?#_&+=^,.:;\-])[A-Za-z\d$@$!%*?#_&+=^,.:;\-]{8,}/;
        this.newpwd = new FormControl('', [Validators.required,Validators.pattern(this.passwordRegex)]);
    }
    changepwd() {
        if (this.profilechange.newpwd == this.profilechange.currentpwd) {
            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Information',
                message: 'New password cannot be same as current password..'
            });
        }
        else if(this.profilechange.newpwd!=this.profilechange.retypenewpwd){
            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Information',
                message: 'New Password and Retype New Password should be same'
            });
        }
        else {
            var req = {
                "emailId": this.headerService.user.emailId,
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
