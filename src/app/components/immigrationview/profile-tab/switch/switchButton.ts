import { AppService } from '../../../../services/app.service';
import { profileswitchservice } from './switch.service';
import { Component, OnDestroy} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import {HeaderService} from "../../../common/header/header.service";

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
  constructor(private profileSwitchservice: profileswitchservice, public appService: AppService, public headerService: HeaderService) {
  }
  agInit(params: any): void {
        this.params = params;
        if (this.params.data.roleName == this.headerService.user.roleName &&
            this.params.data.accountId == this.headerService.user.accountId) {
            this.switchdisable = true;
        }
    }
  refresh(): boolean {
      return false;
    }
    onSwitchClick(params) {
        this.appService.destroy();
        this.headerService.user = params.context.componentParent.user;
        this.headerService.user.accountId=params.data.accountId;
        this.headerService.selectedRoleId = params.data.roleId;
        this.appService.rolemultiple = true;
        this.headerService.user['roleName'] = params.data.roleName;
        params.context.componentParent.headerService.onHeaderPageLoad();
        if (params.data.roleName == "Client") {
            this.appService.applicationViewMode = "Client";
            this.appService.clientId = params.context.componentParent.user.userId;
            this.headerService.currentTab = 'clientview-petitions';
            this.appService.moveToPage("clientview-petitions");
        }
        if (params.data.roleName == "Immigration Manager" || params.data.roleName == "Immigration Officer") {
            this.appService.applicationViewMode = "Immigration";
            this.headerService.currentTab = 'petitions';
            this.appService.moveToPage("petitions");

        }
        if (params.data.roleName == "Super User") {
            this.appService.applicationViewMode = "Superuser";
            this.headerService.currentTab = 'superuser-accounts';
            this.appService.moveToPage("superuser-accounts");
        }
    }
}
