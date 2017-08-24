import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {Demorequestdetailsservice} from "./demorequestdetails.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
@Component({
    selector: 'misc-demorequest',
    templateUrl: './demorequestdetails.component.html',
   
})


export class demorequestdetailsComponent implements OnInit {
    public data;
    public settings;
    ngOnInit() {
        this.appService.showSideBarMenu("superuser-misc", "superuser-misc");
    }
    constructor(private demorequestdetailsservice: Demorequestdetailsservice,
        private appService: AppService, public dialogService: DialogService) {
        this.settings = {
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "firstName",
                },
                {

                    headerName: "Email",
                    field: "lastName",

                },
                {

                    headerName: "Phone",
                    field: "emailId",
                },
                {
                    headerName: "Date",
                    field: "phone",

                },
                {

                    headerName: "Referral",
                    field: "roleName",

                },
                {

                    headerName: "Comments",
                    field: "roleName",

                },
                {

                    headerName: "Status",
                    field: "roleName",

                },
            ]
        }
    }
   
    }

