import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {clientviewrequest} from "../../models/clientviewrequest";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ClientRequestService} from "./clientview-request.service";

@Component({
    selector: 'app-clientview-request.component',
    templateUrl: './clientview-request.component.html',
    styleUrls: ['./clientview-request.component.sass']
})

export class requestclientviewcomponent implements OnInit{
    clientRequests: any ;
    private statusNull: any;
    private statusAcc: any;
    private statusDec: any;
    private updateStatus: any = {};
    constructor(public appService: AppService, private clientviewrequestservice: ClientRequestService) {
    }

    statusClick(Status,clientRequest) {
        this.updateStatus['clientInviteId'] = clientRequest.clientInviteId;
        this.updateStatus['status'] = Status;
        this.clientviewrequestservice.updateClientInviteStatus(this.updateStatus).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                clientRequest.status = Status;
            }
        });
      }
    ngOnInit() {
        this.clientviewrequestservice.getClientInvites(this.appService.user.userId)
            .subscribe((res) => {
                this.clientRequests = res['clientInvite'];
                for (var i = 0; i < this.clientRequests.length; i++) {
                    if (this.clientRequests[i].status == null) {
                        this.statusNull = true;
                    }
                    if (this.clientRequests[i].status == "Accept" ) {
                        this.statusAcc = true;
                    }
                    if (this.clientRequests[i].status == "Decline") {
                        this.statusDec = true;
                    }
                }

        });
    }
}
