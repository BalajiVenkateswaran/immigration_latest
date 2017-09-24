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
  private _user : any;
  private _selectedRoleId : string;

  //Tab, SideBar and Subtree variables
  private _sideBarMenu: string;
  private _currentTab: string;
  private _isBurgerMenuVisible: boolean;

  constructor(private appService: AppService) {
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

  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  get selectedRoleId(): string {
    return this._selectedRoleId;
  }

  set selectedRoleId(value: string) {
    this._selectedRoleId = value;
  }

  get sideBarMenu(): string {
    return this._sideBarMenu;
  }

  set sideBarMenu(value: string) {
    this._sideBarMenu = value;
  }

  get currentTab(): string {
    return this._currentTab;
  }

  set currentTab(value: string) {
    this._currentTab = value;
  }

  get isBurgerMenuVisible(): boolean {
    return this._isBurgerMenuVisible;
  }

  set isBurgerMenuVisible(value: boolean) {
    this._isBurgerMenuVisible = value;
  }

  public isDelegatedOrg() : boolean {
    return this.selectedOrg != null && this.selectedOrg.orgType == HeaderService.delegatedOrgTypeConstant;
  }

  public showSideBarMenu(sideBarName, tab) {
    this._currentTab = tab;
    if (sideBarName == null || sideBarName == undefined) {
      this.appService.showMenu = false;
      this.appService.expandMenu = false;
      this._sideBarMenu = null;
      this._menuSlider = true;
      this._isBurgerMenuVisible = false;
    } else {
      this.appService.showMenu = true;
      this.appService.expandMenu = true;
      this._sideBarMenu = sideBarName;
      this._menuSlider = false;
      this._isBurgerMenuVisible = true;
    }
  }


  public destroy() {
    this.immigrationview = null;
    this._menuSlider = null;
    this._organizations = null;
    this._selectedOrg = null;
    this._sideBarMenu = null;
    this._currentTab = null;
    this._isBurgerMenuVisible = null;
  }

  logOut() {
    this.destroy();
    //Explict clean up of user object from headerService while logout
    this._user = null;
    this._selectedRoleId = null;

    this.appService.destroy();
    this.appService.moveToPage('');
  }
}
