import { AppService } from '../../../services/app.service';
import { RestService } from '../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class HeaderService {
  public static delegatedOrgTypeConstant : string = "Delegated";
  private immigrationview: string;
  private _menuSlider: boolean;
  private _organizations: any;
  private _selectedOrg: any;

  constructor(private appService: AppService, private restService: RestService) {
  }
  get Immigrant(): string {
    return this.immigrationview;
  }

  set Immigrant(immigrantview: string) {
    this.immigrationview = immigrantview;
  }

  get menuSlider(): boolean {
    return this._menuSlider;
  }

  set menuSlider(menuSlider: boolean) {
    this._menuSlider = menuSlider;
  }

  get organizations(): any {
    return this._organizations;
  }

  set organizations(organizations: any) {
    this._organizations = organizations;
  }

  get selectedOrg(): any {
    return this._selectedOrg;
  }

  set selectedOrg(selectedOrg: any) {
    this._selectedOrg = selectedOrg;
  }

  public isDelegatedOrg() : boolean {
    return this.selectedOrg != null && this.selectedOrg.orgType == HeaderService.delegatedOrgTypeConstant;
  }
  
  public getUserOrgs(accountid: string, userid: string, roleid: string) {
    return this.restService.getData("/org/account/" + accountid + "/user/" + userid + "/role/" + roleid);
  }

  public onHeaderPageLoad() {
    this.destroy();
    if (this.appService.rolemultiple == true) {
      this.getUserOrgs(this.appService.selacntId, this.appService.user.userId, this.appService.selroleId).subscribe((res: any) => {
        this.organizations = res.orgs;
        if (this.organizations && this.organizations.length != 0) {
          this.selectedOrg = this.organizations[0];
        }
        else {
          this.selectedOrg = {'displayName' : ''};
        }
      });
    }
    else {
      if (this.organizations && this.organizations.length != 0) {
        this.selectedOrg = this.organizations[0];
      }
      else {
        this.selectedOrg = {'displayName' : ''};
      }
    }
  }

  private destroy() {
    this.immigrationview = null;
    this._menuSlider = null;
    this._organizations = null;
  }
}
