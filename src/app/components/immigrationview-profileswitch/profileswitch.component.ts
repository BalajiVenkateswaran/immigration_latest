import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {profileswitchservice} from "./profileswitch.service";


@Component({
    selector: 'app-profileloginhistory',
    templateUrl: './profileswitch.component.html',
    styleUrls: ['./profileswitch.component.sass']
})

export class profileswitchcomponent implements OnInit {
    public settings;
    public data;
    ngOnInit() {
        this.data = this.appService.userroleList;
    }
    constructor(public appService: AppService, private profileSwitchservice: profileswitchservice) {

        this.settings = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'columnsettings': [
                {

                    headerName: "Role Name",
                    field: "roleName",
                },
                {

                    headerName: "Account Name",
                    field: "accountName",

                },
                {

                    headerName: "Switch",
                    field: "accountName",
                },
            ]
        }
    }
}