import {AppService} from '../../../../services/app.service';
import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {HeaderService} from '../../../common/header/header.service';
import {ApplicationViews} from '../../../common/constants/applicationviews.constants';
import {ApplicationRoles} from '../../../common/constants/applicationroles.constants';

@Component({
    template: `
    <div>
     <button class="iportal-btnIMclient" id="{{this.getId()}}" [ngClass]="{'myclass':switchdisable,'iportal-btnIMclient btnhov':!switchdisable}" [disabled]="switchdisable" (click)="onSwitchClick(this.params)">Switch</button>
    </div>
   `

})
export class SwitchButtonComponent implements ICellRendererAngularComp {
    public params: any;
 public switchdisable: boolean;
  constructor(public appService: AppService, public headerService: HeaderService) {
  }
  agInit(params: any): void {
        this.params = params;
        if (this.params.data.roleName === this.headerService.user.roleName &&
            this.params.data.accountId === this.headerService.user.accountId) {
            this.switchdisable = true;
        }
    }
    refresh(): boolean {
      return false;
    }

    getId(): string {
      if (this.params.data.accountId) {
        return this.params.data.accountId;
      } else {
        return this.params.data.roleName;
      }
    }

    onSwitchClick(params) {
        this.appService.destroy(false);
        this.headerService.user = params.context.componentParent.user;
        this.headerService.user.accountId = params.data.accountId;
        this.headerService.selectedRoleId = params.data.roleId;
        this.appService.rolemultiple = true;
        this.headerService.user['roleName'] = params.data.roleName;
        let moveToPage = this.headerService.getLandingPagePath(params.data.roleName);

        if (params.data.roleName === ApplicationRoles.CLIENT) {
            this.appService.applicationViewMode = ApplicationViews.CLIENT_VIEW;
            this.appService.clientId = params.context.componentParent.user.userId;
        }
        if (params.data.roleName === ApplicationRoles.IMMIGRATION_MANAGER || params.data.roleName === ApplicationRoles.IMMIGRATION_OFFICER) {
          this.appService.applicationViewMode = ApplicationViews.IMMIGRATION_VIEW;
        }

        if (params.data.roleName === ApplicationRoles.SUPER_USER) {
          this.appService.applicationViewMode = ApplicationViews.SUPER_USER_VIEW;
        }
        this.headerService.currentTab = moveToPage;
        params.context.componentParent.headerComponentService.onHeaderPageLoad(moveToPage);
    }
}
