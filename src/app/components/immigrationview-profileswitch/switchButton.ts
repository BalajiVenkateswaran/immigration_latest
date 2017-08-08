import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { profileswitchservice } from "./profileswitch.service";
import { AppService } from "../../services/app.service";

@Component({
    template: `
    <div>
     <button class="iportal-btn" [ngClass]="{'myclass':switchdisable,'iportal-btn':!switchdisable}" [disabled]="switchdisable" (click)="onSwitchClick(this.params)">Switch</button>
    </div>
   `

})
export class switchButton implements ICellRendererAngularComp {
    public params: any;
 public switchdisable: boolean;
    agInit(params: any): void {
        this.params = params;
        if (this.params.data.roleName == this.appService.user.roleName &&
            this.params.data.accountId == this.appService.user.accountId) {
            this.switchdisable = true;
        }
    }
    constructor(private profileSwitchservice: profileswitchservice, public appService: AppService) {
    }
    onSwitchClick(params) {
        this.appService.destroy();
        this.appService.selacntId = params.data.accountId;
        this.appService.user = params.context.componentParent.user;
        this.appService.user.accountId=params.data.accountId;
        this.appService.selroleId = params.data.roleId;
        this.appService.rolemultiple = true;
        this.appService.user['roleName'] = params.data.roleName;
        params.context.componentParent.headerService.onHeaderPageLoad();
        if (params.data.roleName == "Client") {
            this.appService.applicationViewMode = "Client";
            this.appService.clientId = params.context.componentParent.user.userId;//this.appService.user.userId;
            this.appService.currentTab = 'clientview-petitions';
            this.appService.moveToPage("clientview-petitions");
        }
        if (params.data.roleName == "Immigration Manager" || params.data.roleName == "Immigration Officer") {
            this.appService.applicationViewMode = "Immigration";
            this.appService.currentTab = 'petitions';
            this.appService.moveToPage("petitions");

        }
        if (params.data.roleName == "Super User") {
            this.appService.applicationViewMode = "Superuser";
            this.appService.currentTab = 'superuser-accounts';
            this.appService.moveToPage("superuser-accounts");
        }
    }
}
