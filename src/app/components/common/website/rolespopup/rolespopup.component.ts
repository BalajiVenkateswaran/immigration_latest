import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ManageAccountUserService} from '../../../immigrationview/manage-account-tab/user/user.service';
import {HeaderComponentService} from '../../header/header.component.service';
import {ApplicationRoles} from '../../constants/applicationroles.constants';
import {ApplicationViews} from '../../constants/applicationviews.constants';
import {Demorequestdetailsservice} from '../../../superuserview/misc-tab/demorequestdetails/demorequestdetails.service';
import {RolesPopupService} from './rolespopup.service';

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
  selector: 'ih-roles-popup',
  templateUrl: 'rolespopup.component.html',
  providers: [RolesPopupService, ManageAccountUserService]
})
export class RolesPopupComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  title: string;
  message: string;
  public getloginpage = true;
  public selectrole: boolean;
  public loginPopupForm: boolean;
  public userRoles: any = [];

  constructor(
    private router: Router,
    public appService: AppService,
    private rolesPopupService: RolesPopupService,
    public dialogService: DialogService,
    private headerService: HeaderService,
    private headerComponentService: HeaderComponentService,
    private manageAccountUserService: ManageAccountUserService,
    private demoRequestDetailsService: Demorequestdetailsservice
  ) {
    super(dialogService);
  }
  ngOnInit(): void {
  }

  selectedRole(userdet) {
    this.headerService.user.accountId = userdet.accountId;
    this.headerService.selectedRoleId = userdet.roleId;
    this.appService.rolemultiple = true;
    this.result = true;
    this.headerService.user['roleName'] = userdet.roleName;
    let moveToPage = '';
    if (userdet.roleName === 'Client') {
      this.appService.applicationViewMode = ApplicationViews.CLIENT_VIEW;
      this.appService.clientId = this.headerService.user.userId;
      this.headerService.currentTab = 'clientview-petitions';
      moveToPage = 'clientview-petitions';
    }
    if (userdet.roleName === 'Immigration Manager' || userdet.roleName === 'Immigration Officer') {
      this.appService.applicationViewMode = ApplicationViews.IMMIGRATION_VIEW;
      this.headerService.currentTab = 'immigrationview/tab/clients';
      moveToPage = 'immigrationview/tab/clients';
    }
    if (userdet.roleName === ApplicationRoles.SUPER_USER) {
      this.appService.applicationViewMode = ApplicationViews.SUPER_USER_VIEW;
      this.headerService.currentTab = 'superuser-accounts';
      moveToPage = 'superuser-accounts';
    }

    this.appService.showHeader = true;
    this.appService.showFooter = false;
    this.appService.showMenu = false;

    this.headerComponentService.onHeaderPageLoad(moveToPage);

    this.rolesPopupService.updateLoginHistory(this.appService.userLoginHistoryId, userdet.roleId).subscribe((res: any) => { });
    this.getUsers();
    this.close();
  }

  getUsers() {
    this.manageAccountUserService.getUsers(this.headerService.user.accountId, '')
      .subscribe((res) => {
        this.appService.usersList = res['users'];
      });
  }
  /**
   *
   */
  getRoleName(user) {
    return user.accountName == null ? user.roleName : user.roleName + ' in ' + user.accountName;
  }

  multiRolepopupClose() {
    this.appService.destroy(true);
    this.close();
    this.appService.moveToPage('login');
  }
}
