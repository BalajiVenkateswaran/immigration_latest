import {AppService} from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import {ProfileUserService} from './user.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ih-profileuser',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [ProfileUserService]
})
export class ProfileUserComponent implements OnInit {
  public userInfo: any = {};
  public defaultorg: any;
  public isUserEdit = true;
  public warningMessage: boolean;
  public beforeCancelUserInfo: any = {};
  public isUserorgEdit = true;
  public orgdisable = true;
  public beforeCancelorgid: any;
  public selectedorg: any = {};
  public showdefaultorg = true;
  constructor(public appService: AppService, private profileUserservice: ProfileUserService, public headerService: HeaderService) {}
  ngOnInit() {
    if (this.headerService.organizations === undefined) {
      this.showdefaultorg = false;
    }
    this.headerService.showSideBarMenu('immiview-profuser', 'profile/user');
    this.profileUserservice.getUserInfo(this.headerService.user.userId)
      .subscribe((res) => {
        if (res['user']) {
          this.userInfo = res['user'];
        }
      });
    this.profileUserservice.getDefaultOrg(this.headerService.user.accountId, this.headerService.user.userId)
      .subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
          if (res['userDefaultOrg'] != null && res['userDefaultOrg'] !== undefined) {
            this.defaultorg = res['userDefaultOrg']['orgId'];
          }
        }
      });
  }

  editDefaultorg() {
    this.beforeCancelorgid = this.defaultorg;
    this.orgdisable = false;
    this.isUserorgEdit = !this.isUserorgEdit;
  }
  cancelDefaultorg() {
    this.defaultorg = this.beforeCancelorgid;
    this.orgdisable = true;
    this.isUserorgEdit = !this.isUserorgEdit;

  }
  selDefaultOrg(selorg) {
    this.selectedorg = selorg;
  }
  saveDefaultorg() {
    let data = {'accountId': this.selectedorg.accountId, 'creationDate': this.selectedorg.creationDate, 'lastUpdate': this.selectedorg.lastUpdate,
      'orgId': this.selectedorg.orgId, 'userId': this.headerService.user.userId};
    this.profileUserservice.setDefaultOrg(data)
      .subscribe((res) => {
        this.orgdisable = true;
        this.isUserorgEdit = true;
      });
  }
  editProfileForm() {
    this.beforeCancelUserInfo = (<any>Object).assign({}, this.userInfo);
    this.isUserEdit = !this.isUserEdit;

  }
  cancelProfileEdit() {
    this.userInfo = this.beforeCancelUserInfo;
    this.isUserEdit = !this.isUserEdit;
    this.warningMessage = false;
  }
  saveUserProfile() {
    if (this.userInfo['firstName'] === '' || this.userInfo['firstName'] == null || this.userInfo['firstName'] === undefined
      || this.userInfo['lastName'] === '' || this.userInfo['lastName'] == null || this.userInfo['lastName'] === undefined
      || this.userInfo['emailId'] === '' || this.userInfo['emailId'] == null || this.userInfo['emailId'] === undefined) {
      this.warningMessage = true;
    } else {
      this.warningMessage = false;
      this.isUserEdit = true;
      this.userInfo['accountId'] = this.headerService.user.userId;
      this.userInfo['role'] = this.headerService.user.roleName;
      this.userInfo['userId'] = this.headerService.user.userId;
      this.profileUserservice.updateUser(this.userInfo).subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
          console.log(res);
        }
      });
    }
  }
}
