import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {profileloginhisservice} from "./profileloginhistory.service";


@Component({
    selector: 'app-profileloginhistory',
    templateUrl: './profileloginhistory.component.html',
    styleUrls: ['./profileloginhistory.component.sass']
})

export class profileloginhiscomponent implements OnInit {
    public loginHistory: any = {};
    public userInfo: any = {};
    ngOnInit() {
        this.profileLoginhisservice.getLoginHistory(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
                if (res['userLoginHistory']) {
                    this.loginHistory = res['userLoginHistory'];
                }
            });
       
    }
    constructor(public appService: AppService, private profileLoginhisservice: profileloginhisservice) { }
}