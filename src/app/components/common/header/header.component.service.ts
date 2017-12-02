import { AppService } from '../../../services/app.service';
import { RestService } from '../../../services/rest.service';
import {Injectable} from '@angular/core';
import {HeaderService} from './header.service';
import {ApplicationViews} from '../constants/applicationviews.constants';

@Injectable()
export class HeaderComponentService {

  private _usageSummaryDetails: any = {};

  get usageSummaryDetails(): any {
    return this._usageSummaryDetails;
  }

  set usageSummaryDetails(value: any) {
    this._usageSummaryDetails = value;
  }

  constructor(private restService: RestService, private headerService: HeaderService, private appService: AppService) {
  }

  public getUserOrgs(accountid: string, userid: string, roleid: string) {
    return this.restService.getData('/org/account/' + accountid + '/user/' + userid + '/role/' + roleid);
  }

  public onHeaderPageLoad(moveToPage: string) {
    this.invokeHeaderPageLoad(true, moveToPage);
  }

  public invokeHeaderPageLoad(isDestroy: boolean, moveToPage: string) {
    if (isDestroy) {
        this.headerService.destroy();
    }

    if (this.appService.applicationViewMode === ApplicationViews.IMMIGRATION_VIEW) {
      this.getUserOrgs(this.headerService.user.accountId, this.headerService.user.userId, this.headerService.selectedRoleId).subscribe((res: any) => {
        this.headerService.organizations = res.orgs;
        if (this.headerService.organizations && this.headerService.organizations.length !== 0) {
          this.headerService.selectedOrg = this.headerService.organizations[0];
        } else {
          this.headerService.selectedOrg = {'displayName' : ''};
        }
        this.appService.moveToPage(moveToPage);
      });
    } else {
      this.appService.moveToPage(moveToPage);
    }

  }

  getUsageSummaryDetails(accountId: String) {
    return this.restService.getData('/immigration/account/getProductUsageSummary/' + accountId);
  }
}
