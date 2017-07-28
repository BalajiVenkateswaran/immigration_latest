import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {profileuserservice} from "./profileuser.service";


@Component({
    selector: 'app-profileuser',
    templateUrl: './profileuser.component.html',
    styleUrls: ['./profileuser.component.sass']
})

export class profileusercomponent implements OnInit {
    public userInfo: any = {};
    ngOnInit() {
        this.appService.showSideBarMenu("immiview-profuser", "immiview-profileuser");
        this.profileUserservice.getUserInfo(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
                if (res['user']) {
                    this.userInfo = res['user'];
                }               
            });
        this.profileUserservice.getDefaultOrg(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
               
            });
    }
    constructor(public appService: AppService, private profileUserservice: profileuserservice) { }
}