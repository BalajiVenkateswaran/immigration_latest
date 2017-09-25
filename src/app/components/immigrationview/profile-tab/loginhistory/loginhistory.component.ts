import {AppService} from '../../../../services/app.service';
import {profileloginhisservice} from './loginhistory.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderService} from "../../../common/header/header.service";
import {SortType} from "../../../framework/smarttable/types/query-parameters";

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
  public paginationData;
  public queryParameters;
  constructor(public headerService: HeaderService, private profileLoginhisservice: profileloginhisservice) {

    this.settings = {
      "isAddButtonEnable": false,
      "isDeleteEnable": false,
      'customPanel': true,
      'sort' : [{
        headingName: "loginDate",
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: "Date",
          field: "loginDate"
        },
        {
          headerName: "Time",
          field: "loginTime"
        },
        {
          headerName: "IP Address",
          field: "ipAddress"
        },
        {
          headerName: "Location",
          field: "location"
        },
        {
          headerName: "Role",
          field: "role"
        },
        {
          headerName: "Account",
          field: "accountName"
        }
      ]
    };
  }
  ngOnInit() {


  }


  dataWithParameters(queryData) {
    if(queryData){
      this.queryParameters=queryData
    }

    if (this.headerService.user && this.headerService.user.userId && queryData) {
      this.profileLoginhisservice.getLoginHistory(this.headerService.user.userId, queryData)
        .subscribe((res) => {
          console.log(res);
          if (res['userLoginHistory']) {
            this.data = res['userLoginHistory'];
            for (var i = 0; i < this.data.length; i++) {
              this.data[i]['accountName'] = this.headerService.user.firstName.concat(" " + this.headerService.user.lastName);
            }
          }
          this.paginationData = res['pageMetadata'];
        });
    }
  }
}
