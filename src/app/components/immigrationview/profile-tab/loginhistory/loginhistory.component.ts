import {ProfileLoginHisService} from './loginhistory.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../common/header/header.service';
import {SortType} from '../../../framework/smarttable/types/query-parameters';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';
import {ApplicationRoles} from '../../../common/constants/applicationroles.constants';

@Component({
  selector: 'app-profileloginhistory',
  templateUrl: './loginhistory.component.html',
  styleUrls: ['./loginhistory.component.sass'],
  providers: [ProfileLoginHisService],
  entryComponents: [SmartTableFrameworkComponent]
})

export class ProfileLoginHisComponent implements OnInit {
  public loginHistory: any = {};
  public userInfo: any = {};
  public settings;
  public data;
  public paginationData;
  public queryParameters;
  constructor(public headerService: HeaderService, private profileLoginhisservice: ProfileLoginHisService) {

    this.settings = {
      'isAddButtonEnable': false,
      'isDeleteEnable': false,
      'customPanel': true,
      'sort' : [{
        headingName: 'loginDate',
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: 'Date',
          field: 'loginDate'
        },
        {
          headerName: 'Time',
          field: 'loginTime'
        },
        {
          headerName: 'IP Address',
          field: 'ipAddress'
        },
        {
          headerName: 'Location',
          field: 'location'
        },
        {
          headerName: 'Role',
          field: 'role'
        },
        {
          headerName: 'Account',
          field: 'accountName'
        }
      ]
    };
  }
  ngOnInit() {}

  dataWithParameters(queryData) {
    if (queryData) {
      this.queryParameters = queryData
    }

    if (this.headerService.user && this.headerService.user.userId && queryData) {
      this.profileLoginhisservice.getLoginHistory(this.headerService.user.userId, queryData)
        .subscribe((res) => {
          console.log(res);
          if (res['userLoginHistory']) {
            this.data = res['userLoginHistory'];
            for (let i = 0; i < this.data.length; i++) {
              this.data[i]['accountName'] = this.headerService.user.firstName.concat(' ' + this.headerService.user.lastName);
              let roleName = this.data[i]['role'];
              if (roleName === ApplicationRoles.CLIENT) {
                roleName = 'Benificiary';
              } else if (roleName === ApplicationRoles.IMMIGRATION_MANAGER) {
                roleName = 'Immigration Admin';
              } else {
                roleName = roleName;
              }
              this.data[i]['role'] = roleName;
            }
          }
          this.paginationData = res['pageMetadata'];
        });
    }
  }
}
