import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import { ProfileSwitchService } from './switch.service';
import { Component, OnInit} from '@angular/core';
import { SwitchButtonComponent } from './switchButton';
import {HeaderComponentService} from '../../../common/header/header.component.service';

@Component({
    selector: 'ih-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})

export class ProfileSwitchComponent implements OnInit {
    public settings;
    public data;
    public user: any;
    ngOnInit() {
    }
    constructor(public appService: AppService, private profileSwitchservice: ProfileSwitchService, public headerService: HeaderService, public headerComponentService: HeaderComponentService) {

        this.settings = {
            'isAddButtonEnable': false,
            'isDeleteEnable': false,
            'rowHeight': 60,
            'context': {
                            'componentParent': this
                        },
            'columnsettings': [
                {
                    headerName: 'Role Name',
                    field: 'roleName',
                  type: 'text',
                },
                {
                    headerName: 'Account Name',
                    field: 'accountName',
                   type: 'text'
                },
                {
                    headerName: 'Switch',
                    cellRendererFramework: SwitchButtonComponent,
                  type: 'text'
                }
            ]
        }
    }
  dataWithParameters(queryData) {
    this.data = this.appService.userroleList;
    this.user = this.headerService.user;
  }
}
