import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {usertotalpetitionservice} from "./userstotalpetitionreports.service";


@Component({
    selector: 'app-usertotalpetitions',
    templateUrl: './userstotalpetitionreports.component.html',
    styleUrls: ['./userstotalpetitionreports.component.sass']
})

export class usertotalpetitionscomponent implements OnInit {
    ngOnInit() {

        this.userTotalpetitionservice.getuserstotpetitions(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
            });
    }
    constructor(public appService: AppService, private userTotalpetitionservice: usertotalpetitionservice) {
    }
}