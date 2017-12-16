import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../../common/header/header.service';
import {Component, OnInit} from '@angular/core';
import {SwitchButtonComponent} from './switchButton';
import {HeaderComponentService} from '../../../common/header/header.component.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';
import {DeepCloneUtil} from '../../../framework/utils/deepclone.component';
import {ApplicationRoles} from '../../../common/constants/applicationroles.constants';

@Component({
    selector: 'ih-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    entryComponents: [SmartTableFrameworkComponent, SwitchButtonComponent]
})

export class ProfileSwitchComponent implements OnInit {
    public settings;
    public data;
    public user: any;
    ngOnInit() {
    }
    constructor(public appService: AppService, public headerService: HeaderService, public headerComponentService: HeaderComponentService) {

        this.settings = {
            'isAddButtonEnable': false,
            'isDeleteEnable': false,
            'rowHeight': 45,
            'context': {
                            'componentParent': this
                        },
            'columnsettings': [
                {
                    headerName: 'Role Name',
                    field: 'displayRoleName'
                },
                {
                    headerName: 'Account Name',
                    field: 'accountName'
                },
                {
                    headerName: 'Switch',
                    cellRendererFramework: SwitchButtonComponent
                }
            ]
        }
    }

    dataWithParameters(queryData) {
      let userRoleList = this.appService.userroleList;
      for (let userRole of userRoleList) {
        userRole['displayRoleName'] = userRole.roleName === ApplicationRoles.CLIENT ? 'Beneficiary' : userRole.roleName;
      }
      this.data = userRoleList;
      this.user = this.headerService.user;
    }
}
