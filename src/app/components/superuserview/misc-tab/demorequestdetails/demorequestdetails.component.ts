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

        this.demorequestdetailsservice.getDemoRequests()
            .subscribe((res: any) => {
                this.data = res.demoRequests;
            });
    }
    constructor(private demorequestdetailsservice: Demorequestdetailsservice,
        private appService: AppService, public dialogService: DialogService) {
        this.settings = {
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "name",
                },
                {

                    headerName: "Email",
                    field: "email",

                },
                {

                    headerName: "Phone",
                    field: "phone",
                },
                {
                    headerName: "Date",
                    field: "demoRequestDate",

                },
                {

                    headerName: "Referral",
                    field: "referral",

                },
                {

                    headerName: "Comments",
                    field: "comments",

                },
                {

                    headerName: "Status",
                    field: "status",

                },
            ]
        }
    }
   
    }

