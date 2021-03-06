﻿import {AppService} from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import {profileuserservice} from './user.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from "../../../common/login/login.component";


@Component({
  selector: 'app-profileuser',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})

export class profileusercomponent implements OnInit {
  public userInfo: any = {};
  public defaultorg: any;
  public isUserEdit: boolean = true;
  public warningMessage: boolean;
  public beforeCancelUserInfo: any = {};
  public isUserorgEdit: boolean = true;
  public orgdisable: boolean;
  public beforeCancelorgid: any;
  public selectedorg: any = {};
  public showdefaultorg: boolean = true;
  public uiBuildNumber = LoginComponent.uiBuildNumber;
  ngOnInit() {
    if (this.headerService.organizations == undefined) {
      this.showdefaultorg = false;
    }
    this.appService.showSideBarMenu("immiview-profuser", "immiview-profileuser");
    this.profileUserservice.getUserInfo(this.appService.user.userId)
      .subscribe((res) => {
        console.log(res);
        if (res['user']) {
          this.userInfo = res['user'];
        }
      });
    this.profileUserservice.getDefaultOrg(this.appService.user.accountId, this.appService.user.userId)
      .subscribe((res) => {
        console.log(res);
        if (res['statusCode'] == "SUCCESS") {
          this.defaultorg = res['userDefaultOrg']['orgId'];
        }
      });
  }
  constructor(public appService: AppService, private profileUserservice: profileuserservice, public headerService: HeaderService) {}

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
    var data = {"accountId": this.selectedorg.accountId, "creationDate": this.selectedorg.creationDate, "lastUpdate": this.selectedorg.lastUpdate, "orgId": this.selectedorg.orgId, "userId": this.appService.user.userId};
    this.profileUserservice.setDefaultOrg(data)
      .subscribe((res) => {
        console.log(res);
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
    if (this.userInfo['firstName'] == '' || this.userInfo['firstName'] == null || this.userInfo['firstName'] == undefined
      || this.userInfo['lastName'] == '' || this.userInfo['lastName'] == null || this.userInfo['lastName'] == undefined
      || this.userInfo['emailId'] == '' || this.userInfo['emailId'] == null || this.userInfo['emailId'] == undefined) {
      this.warningMessage = true;
    }
    else {
      this.warningMessage = false;
      this.isUserEdit = true;
      this.userInfo['accountId'] = this.appService.user.userId;
      this.userInfo['role'] = this.appService.user.roleName;
      this.userInfo['userId'] = this.appService.user.userId;
      this.profileUserservice.updateUser(this.userInfo).subscribe((res) => {
        if (res['statusCode'] == "SUCCESS") {
          console.log(res);
        }
      });
    }
  }
}
