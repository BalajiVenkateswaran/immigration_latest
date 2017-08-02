import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import { RestService } from "../../services/rest.service";
import { profileswitchservice } from "./profileswitch.service";
import { SmartTableFramework } from '../smarttableframework/SmartTableFramework';
import { switchButton } from './switchButton';

@Component({
    selector: 'app-profileloginhistory',
    templateUrl: './profileswitch.component.html',
    styleUrls: ['./profileswitch.component.scss']
})

export class profileswitchcomponent implements OnInit,AfterViewInit {
    public settings;
    public data;
    @ViewChild(SmartTableFramework) smarttable: SmartTableFramework;
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.data = this.appService.userroleList;
    }
    constructor(public appService: AppService, private profileSwitchservice: profileswitchservice) {

        this.settings = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'rowHeight': 40,
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
                    cellRendererFramework: switchButton,
                   
                },
            ]
        }
    }
}