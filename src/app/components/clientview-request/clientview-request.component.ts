import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { clientviewrequest } from "../../models/clientviewrequest";
import { FormGroup, FormControl } from "@angular/forms";
import { AppService } from "../../services/app.service";
import { ClientRequestService } from "./clientview-request.service";
import { RequestButton } from './RequestButton';

@Component({
    selector: 'app-clientview-request.component',
    templateUrl: './clientview-request.component.html',
    styleUrls: ['./clientview-request.component.sass']
})

export class requestclientviewcomponent implements OnInit {
    clientRequests: any;
    private statusNull: any;
    private statusAcc: any;
    private statusDec: any;
    private updateStatus: any = {};
    public settings: any;
    public data: any;
    public requestSubscription;
    public declineSubscription;
    public checked: boolean = false;
    public status;
    constructor(public appService: AppService,private clientviewrequestservice: ClientRequestService) {
        this.settings = {
            'isDeleteEnable': false,
            'pagination': false,
            'isAddButtonEnable': false,
            'rowHeight': 45,//configuring the row height
            'columnsettings': [
                {

                    headerName: "SL No",
                    field: "id",
                    width: 10, //configuring the column width of grid manually
                },
                {

                    headerName: "Request Type",
                    field: "requestType",
                    width: 20, //configuring the column width of grid manually
                },
                {

                    headerName: "Message",
                    field: "message",
                    width: 80, //configuring the column width of grid manually

                },
                {
                    headerName: "Request",
                    cellRendererFramework: RequestButton,
                    width: 30, //configuring the column width of grid manually

                }
            ]
        }
    }
    ngOnDestroy() {
    }
    statusClick(clientRequest) {
        if (this.checked) {
           
        }

    }
    ngOnInit() {
        let columnArray = [];
        columnArray.push(this.settings);
        this.appService.showSideBarMenu(null, "clientview-Requests");
        this.clientviewrequestservice.getClientInvites(this.appService.user.userId)
            .subscribe((res) => {
                this.clientRequests = res['clientInvite'];
                this.appService.clientInivtes=res['clientInvite'];
                for (var i = 0; i < this.clientRequests.length; i++) {
                    this.clientRequests[i]['id'] = i + 1;
                    if (this.clientRequests[i].status == null) {
                        this.statusNull = true;
                    }
                    if (this.clientRequests[i].status == "Accept") {
                        this.statusAcc = true;
                    }
                    if (this.clientRequests[i].status == "Decline") {
                        this.statusDec = true;
                    }
                }
                this.data = this.clientRequests;
            });
    }

}
