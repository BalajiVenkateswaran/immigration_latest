import { AppService } from '../../../services/app.service';
import { RestService } from '../../../services/rest.service';
import {Injectable} from "@angular/core";
import {HeaderService} from "./header.service";

@Injectable()
export class HeaderComponentService {

  private _usageSummaryDetails: any = {};

  get usageSummaryDetails(): any {
    return this._usageSummaryDetails;
  }

  set usageSummaryDetails(value: any) {
    this._usageSummaryDetails = value;
  }

  constructor(private restService: RestService, private headerService: HeaderService) {
  }

  public getUserOrgs(accountid: string, userid: string, roleid: string) {
    return this.restService.getData("/org/account/" + accountid + "/user/" + userid + "/role/" + roleid);
  }

  public onHeaderPageLoad(){
    this.invokeHeaderPageLoad(true);
  }

  public invokeHeaderPageLoad(isDestroy: boolean) {
    if(isDestroy){
        this.headerService.destroy();
    }
    this.getUserOrgs(this.headerService.user.accountId, this.headerService.user.userId, this.headerService.selectedRoleId).subscribe((res: any) => {
      this.headerService.organizations = res.orgs;
      if (this.headerService.organizations && this.headerService.organizations.length != 0) {
        this.headerService.selectedOrg = this.headerService.organizations[0];
      }
      else {
        this.headerService.selectedOrg = {'displayName' : ''};
      }
    });

  }

  getUsageSummaryDetails(accountId : String){
    return this.restService.getData("/immigration/account/getProductUsageSummary/"+accountId);
  }
}
