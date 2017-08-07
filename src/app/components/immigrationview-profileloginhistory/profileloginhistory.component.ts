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
    public settings;
    public data;
    ngOnInit() {
        this.profileLoginhisservice.getLoginHistory(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
                if (res['userLoginHistory']) {
                    this.data = res['userLoginHistory'];
                    for (var i = 0; i < this.data.length; i++) {
                        this.data[i]['accountName'] = this.appService.user.firstName.concat(" "+this.appService.user.lastName); 
                    }
                }
            });
       
    }
    constructor(public appService: AppService, private profileLoginhisservice: profileloginhisservice) {

        this.settings = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'columnsettings': [
                {

                    headerName: "Date",
                    field: "loginDate",
                },
                {

                    headerName: "Time",
                    field: "loginTime",

                },
                {

                    headerName: "IP Address",
                    field: "ipAddress",
                },
                {

                    headerName: "Location",
                    field: "location",

                },
                {

                    headerName: "Role",
                    field: "roleId",
                },
                {

                    headerName: "Account",
                    field: "accountName",

                }
            ]
        }
    }
}