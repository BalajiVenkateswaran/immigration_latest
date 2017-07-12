import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {ManageAccountUserDetailsService} from "./manageaccount-user-details.service";

import {User} from "../../models/user";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-manageaccount-user-details',
  templateUrl: './manageaccount-user-details.component.html',
  styleUrls: ['./manageaccount-user-details.component.sass']
})
export class ManageaccountUserDetailsComponent implements OnInit {
  private user: User;
  public userList: any = {};
  public orgList:any={};
  public isUserEdit: boolean = true;
  public beforeCancelUserProfile: any;
  public warningMessage: boolean = false;
  public emailId: string;
  public isAccessEdit: boolean;
  public isAccess: boolean = false;
  public userid: string;
  constructor( private appService: AppService,
      private route: ActivatedRoute, public manageAccountUserDetailsService: ManageAccountUserDetailsService) {
           if (this.appService.user) {
            this.user = this.appService.user;
            this.orgList=this.appService.organizations;
        }
  }

  ngOnInit() {
    
      this.route.params.subscribe((res) => {
          this.userid = res['userId'];
          this.manageAccountUserDetailsService.getUserDet(this.userid, this.user.accountId).subscribe((res) => {
              this.userList = res['userOrgsDetail']['userProfileInfo'];
              this.userList['role'] = res['userOrgsDetail']['userRoleInfo']['roleName'];
         // this.userList = res;
              if (this.userList.role == "IMMIGRATION OFFICER") {
                  this.isAccessEdit = true;
              }
              if (this.userList.role == "IMMIGRATION MANAGER") {
                  this.isAccessEdit = false;
                  this.isAccess = false;
              }
       });
      })
  
  }
  editProfileForm() {
      this.beforeCancelUserProfile = (<any>Object).assign({}, this.userList);
      this.isUserEdit = !this.isUserEdit;
    
  }
  cancelProfileEdit() {
      this.userList = this.beforeCancelUserProfile;
      this.isUserEdit = !this.isUserEdit;
  }
  editOrgsAccess() {
      this.isAccess = !this.isAccess;
      this.isAccessEdit = !this.isAccessEdit;
  }
  cancelOrgsAccess() {
      this.isAccess = !this.isAccess;
      this.isAccessEdit = !this.isAccessEdit;
  }
  saveUserProfile() {
      if (this.userList['firstName'] == '' || this.userList['firstName'] == null || this.userList['firstName'] == undefined
          || this.userList['lastName'] == '' || this.userList['lastName'] == null || this.userList['lastName'] == undefined
          || this.userList['role'] == '' || this.userList['role'] == null || this.userList['role'] == undefined
          || this.userList['emailId'] == '' || this.userList['emailId'] == null || this.userList['emailId'] == undefined) {
          this.warningMessage = true;
      }
      else {
          this.warningMessage = false;
          this.isUserEdit = true;
      }
  }
}
