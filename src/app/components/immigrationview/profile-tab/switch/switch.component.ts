import { AppService } from '../../../../services/app.service';
import { SmartTableFramework } from '../../../framework/smarttable/smarttable.component';
import { HeaderService } from '../../../common/header/header.service';
import { profileswitchservice } from './switch.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { switchButton } from './switchButton';

@Component({
    selector: 'app-profileloginhistory',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})

export class profileswitchcomponent implements OnInit,AfterViewInit {
    public settings;
    public data;
    public user: any;
    @ViewChild(SmartTableFramework) smarttable: SmartTableFramework;
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.data = this.appService.userroleList;
        this.user = this.headerService.user;
    }
    constructor(public appService: AppService, private profileSwitchservice: profileswitchservice, public headerService: HeaderService) {

        this.settings = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'rowHeight': 40,
            'context': {
                            'componentParent': this
                        },
            'columnsettings': [
                {
                    headerName: "Role Name",
                    field: "roleName"
                },
                {
                    headerName: "Account Name",
                    field: "accountName"
                },
                {
                    headerName: "Switch",
                    cellRendererFramework: switchButton
                }
            ]
        }
    }
}
