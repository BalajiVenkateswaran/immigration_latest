import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superuserprofileuserservice} from "./superuserprofileuserdet.service";


@Component({
    selector: 'app-superuserprofileuser',
    templateUrl: './superuserprofileuserdet.component.html',
    styleUrls: ['./superuserprofileuserdet.component.sass']
})

export class superuserprofileusercomponent implements OnInit {
    public superuserInfo: any = {};
  //  public orgsList: any = [];
  //  public defaultorg: any;
    public isUserEdit: boolean = true;
    public warningMessage: boolean;
    public beforeCancelUserInfo: any = {};
   // public isUserorgEdit: boolean = true;
  //  public orgdisable: boolean;
  //  public beforeCancelorgid: any;
  //  public selectedorg: any = {};
    ngOnInit() {
        //this.orgsList = this.appService.organizations;
        this.appService.showSideBarMenu("superuser-profuser", "superuser-profuser");
        this.superUserprofileuserservice.getUserInfo(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
                if (res['user']) {
                    this.superuserInfo = res['user'];
                }
            });
        //this.superUserprofileuserservice.getDefaultOrg(this.appService.user.userId)
        //    .subscribe((res) => {
        //        console.log(res);
        //        if (res['statusCode'] == "SUCCESS") {
        //            this.defaultorg = res['userDefaultOrg']['orgId'];
        //        }
        //    });
    }
    constructor(public appService: AppService, private superUserprofileuserservice: superuserprofileuserservice) { }

    //editDefaultorg() {
    //    this.beforeCancelorgid = this.defaultorg;
    //    this.orgdisable = false;
    //    this.isUserorgEdit = !this.isUserorgEdit;
    //}
    //cancelDefaultorg() {
    //    this.defaultorg = this.beforeCancelorgid;
    //    this.orgdisable = true;
    //    this.isUserorgEdit = !this.isUserorgEdit;

    //}
    //selDefaultOrg(selorg) {
    //    this.selectedorg = selorg;
    //}
    //saveDefaultorg() {
    //    var data = { "accountId": this.selectedorg.accountId, "creationDate": this.selectedorg.creationDate, "lastUpdate": this.selectedorg.lastUpdate, "orgId": this.selectedorg.orgId, "userId": this.appService.user.userId };
    //    this.profileUserservice.setDefaultOrg(data)
    //        .subscribe((res) => {
    //            console.log(res);
    //            this.orgdisable = true;
    //            this.isUserorgEdit = true;
    //        });
    //}
    editProfileForm() {
        this.beforeCancelUserInfo = (<any>Object).assign({}, this.superuserInfo);
        this.isUserEdit = !this.isUserEdit;

    }
    cancelProfileEdit() {
        this.superuserInfo = this.beforeCancelUserInfo;
        this.isUserEdit = !this.isUserEdit;
        this.warningMessage = false;
    }
    saveUserProfile() {
        if (this.superuserInfo['firstName'] == '' || this.superuserInfo['firstName'] == null || this.superuserInfo['firstName'] == undefined
            || this.superuserInfo['lastName'] == '' || this.superuserInfo['lastName'] == null || this.superuserInfo['lastName'] == undefined
            || this.superuserInfo['emailId'] == '' || this.superuserInfo['emailId'] == null || this.superuserInfo['emailId'] == undefined) {
            this.warningMessage = true;
        }
        else {
            this.warningMessage = false;
            this.isUserEdit = true;
            this.superuserInfo['accountId'] = this.appService.user.userId;
            this.superuserInfo['role'] = this.appService.user.roleName;
            this.superuserInfo['userId'] = this.appService.user.userId;
            this.superUserprofileuserservice.updateUser(this.superuserInfo).subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                    console.log(res);
                }
            });
        }
    }
}