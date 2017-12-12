import {AppService} from '../../../services/app.service';
import {Injectable} from '@angular/core';
import {ApplicationRoles} from '../constants/applicationroles.constants';
import {User} from '../../../models/user';
import {MatDialog} from '@angular/material';

@Injectable()
export class HeaderService {
  public static delegatedOrgTypeConstant = 'Delegated';
  private immigrationview: string;
  private _menuSlider: boolean;
  private _organizations: any;
  private _selectedOrg: any;
  private _user: User;
  private _selectedRoleId: string;

  // Tab, SideBar and Subtree variables
  private _sideBarMenu: string;
  private _currentTab: string;
  private _isBurgerMenuVisible: boolean;

  constructor(private appService: AppService, private dialog: MatDialog) {
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

  get user(): User {
    return this._user;
  }

  set user(value: User) {
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

  public isDelegatedOrg(): boolean {
    return this.selectedOrg != null && this.selectedOrg.orgType == HeaderService.delegatedOrgTypeConstant;
  }

  public showSideBarMenu(sideBarName, tab) {
    this._currentTab = tab;
    if (sideBarName == null || sideBarName === undefined) {
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
    this.dialog.closeAll();
    this.destroy();
    // Explict clean up of user object from headerService while logout
    this._user = null;
    this._selectedRoleId = null;

    this.appService.destroy(true);
    this.appService.moveToPage('');
  }


  getLandingPagePath(userRole: string): string {
    if (userRole === ApplicationRoles.IMMIGRATION_MANAGER || userRole === ApplicationRoles.IMMIGRATION_OFFICER) {
      return 'immigrationview/tab/clients';
    } else if (userRole === ApplicationRoles.CLIENT) {
      return 'clientview/petitions';
    } else if (userRole === ApplicationRoles.SUPER_USER) {
      return 'superuserview/tab/accounts';
    }
    return '';
  }
}
