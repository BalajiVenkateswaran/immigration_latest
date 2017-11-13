import { AppService } from '../../../../services/app.service';
import { SmartTableFrameworkComponent } from '../../../framework/smarttable/smarttable.component';
import { HeaderService } from '../../../common/header/header.service';
import { profileswitchservice } from './switch.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwitchButtonComponent } from './switchButton';
import {HeaderComponentService} from "../../../common/header/header.component.service";

@Component({
    selector: 'ih-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})

export class profileswitchcomponent implements OnInit,AfterViewInit {
    public settings;
    public data;
    public user: any;
    @ViewChild(SmartTableFrameworkComponent) smarttable: SmartTableFrameworkComponent;
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.data = this.appService.userroleList;
        this.user = this.headerService.user;
    }
    constructor(public appService: AppService, private profileSwitchservice: profileswitchservice, public headerService: HeaderService, public headerComponentService: HeaderComponentService) {

        this.settings = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'rowHeight': 60,
            'context': {
                            'componentParent': this
                        },
            'columnsettings': [
                {
                    headerName: "Role Name",
                    field: "roleName",
                  type:'text',
                },
                {
                    headerName: "Account Name",
                    field: "accountName",
                   type:'text'
                },
                {
                    headerName: "Switch",
                    cellRendererFramework: SwitchButtonComponent,
                  type:'text'
                }
            ]
        }
    }
}
