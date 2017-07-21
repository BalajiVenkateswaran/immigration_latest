import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { clientviewrequest } from "../../models/clientviewrequest";
import { FormGroup, FormControl } from "@angular/forms";
import { AppService } from "../../services/app.service";
import { ClientRequestService } from "./clientview-request.service";
import { RequestButton } from './RequestButton';
import { DeclineButton } from './DeclineButton';
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
    constructor(public appService: AppService, private clientviewrequestservice: ClientRequestService) {
        this.settings = {
            'isDeleteEnable': false,
            'pagination': false,
            'isAddButtonEnable': false,
            'columnsettings': [
                {

                    headerName: "SL No",
                    field: "id",
                },
                {

                    headerName: "Request Type",
                    field: "requestType",
                },
                {

                    headerName: "Message",
                    field: "message"
                },
                {
                    headerName: "Request",
                    cellRendererFramework: RequestButton
                },
                {
                    headerName: "Decline",
                    cellRendererFramework: DeclineButton
                },


            ]
        }
        this.requestSubscription = RequestButton.onRequestClicked.subscribe(res => {
            if (res) {
                if (res.hasOwnProperty('requested')) {
                    this.checked = true;
                  
                }
                else {
                    this.checked = false;
                    
                }
            }
        })
        this.declineSubscription = DeclineButton.onDeclineClicked.subscribe(res => {
            if (res) {
                if (!res.hasOwnProperty('requested')) {
                    this.checked = true;
                }
                else {
                    this.checked = false;
                }
            }

        })

    }

    statusClick(Status, clientRequest) {
        if (this.checked) {
            this.updateStatus['clientInviteId'] = clientRequest.clientInviteId;
            this.updateStatus['status'] = Status;
            this.clientviewrequestservice.updateClientInviteStatus(this.updateStatus).subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                    clientRequest.status = Status;
                }
            });
        }

    }
    ngOnInit() {
        this.appService.showSideBarMenu(null, "clientview-Requests");
        this.clientviewrequestservice.getClientInvites(this.appService.user.userId)
            .subscribe((res) => {
                this.clientRequests = res['clientInvite'];
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
                /* this.clientRequests.map(item=>{
                     return item.id=0;
                 }).map(item=>{
                     return item.id+=1;
                 })*/
                this.data = this.clientRequests;

            });
    }
}
