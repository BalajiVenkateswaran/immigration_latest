import {AppService} from '../../../../services/app.service';
import {profileloginhisservice} from './loginhistory.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderService} from "../../../common/header/header.service";

@Component({
  selector: 'app-profileloginhistory',
  templateUrl: './loginhistory.component.html',
  styleUrls: ['./loginhistory.component.sass']
})

export class profileloginhiscomponent implements OnInit {
  public loginHistory: any = {};
  public userInfo: any = {};
  public settings;
  public data;
  constructor(public headerService: HeaderService, private profileLoginhisservice: profileloginhisservice) {

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
  ngOnInit() {
    this.profileLoginhisservice.getLoginHistory(this.headerService.user.userId)
      .subscribe((res) => {
        console.log(res);
        if (res['userLoginHistory']) {
          this.data = res['userLoginHistory'];
          for (var i = 0; i < this.data.length; i++) {
            this.data[i]['accountName'] = this.headerService.user.firstName.concat(" " + this.headerService.user.lastName);
          }
        }
      });

  }
}
