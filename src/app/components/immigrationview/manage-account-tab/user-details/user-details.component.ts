import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {ManageAccountUserDetailsService} from "./user-details.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
    selector: 'app-manageaccount-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.sass']
})
export class ManageaccountUserDetailsComponent implements OnInit {
    public userList: any = {};
    public orgList: any = {};
    public isUserEdit: boolean = true;
    public beforeCancelUserProfile: any;
    public warningMessage: boolean = false;
    public emailId: string;
    public isAccessEdit: boolean;
    public isAccess: boolean = false;
    public userid: string;
    public orgsList: any = [];
    public orgsAcces: boolean = true;
    public userProfOrgsList: any = [];
    public settings;
    public data;
    constructor(private appService: AppService,
        private route: ActivatedRoute, public manageAccountUserDetailsService: ManageAccountUserDetailsService,
        private headerService: HeaderService) {
        this.orgList = this.headerService.organizations;
        this.settings = {
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'columnsettings': [
                {

                    headerName: "Date",
                    field: "loginDate",
                },
                {

                    headerName: "Time",
                    field: "loginTime",
                },
                {

                    headerName: "IP Address",
                    field: ""
                },
                {

                    headerName: "Location",
                    field: ""
                }

            ]
        }
    }
    getuserdetails() {
        this.route.params.subscribe((res) => {
            this.userid = res['userId'];
            this.manageAccountUserDetailsService.getUserDet(this.userid, this.appService.user.accountId).subscribe((res) => {
                this.userProfOrgsList = res['userOrgsDetail'];
                this.userList = res['userOrgsDetail']['userProfileInfo'];
                this.userList['role'] = res['userOrgsDetail']['userRoleInfo']['roleName'];
                this.userList['roleId'] = res['userOrgsDetail']['userRoleInfo']['roleId'];
                this.userList['accountId'] = this.appService.user.accountId;
                this.orgsList = res['userOrgsDetail']['organizationsInfo'];
                if (this.userList.role == "Immigration Officer") {
                    this.isAccessEdit = true;
                }
                if (this.userList.role == "Immigration Manager") {
                    this.isAccessEdit = false;
                    this.isAccess = false;
                }
                this.getUserLoginHistory();
            });
        })
    }
    getUserLoginHistory() {
        this.manageAccountUserDetailsService.getLoginHistory(this.userid).subscribe(res => {
            this.data = res['userLoginHistory'];
        })
    }
    ngOnInit() {
        this.getuserdetails();
    }
    editProfileForm() {
        this.beforeCancelUserProfile = (<any>Object).assign({}, this.userList);
        this.isUserEdit = !this.isUserEdit;

    }
    cancelProfileEdit() {
        this.userList = this.beforeCancelUserProfile;
        this.warningMessage = false;
        this.isUserEdit = !this.isUserEdit;
    }
    editOrgsAccess() {
        this.isAccess = !this.isAccess;
        this.isAccessEdit = !this.isAccessEdit;
        this.orgsAcces = false;
    }
    cancelOrgsAccess() {
        this.isAccess = !this.isAccess;
        this.isAccessEdit = !this.isAccessEdit;
        this.orgsAcces = true;

    }
    saveUserProfOrgs() {
        this.manageAccountUserDetailsService.updateUser(this.userProfOrgsList).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.getuserdetails();
            }

        });
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
            this.userProfOrgsList['userProfileInfo'] = this.userList;
            this.saveUserProfOrgs();
        }
    }
    saveOrgsAccess() {
        this.isAccessEdit = true;
        this.isAccess = false;
        this.orgsAcces = true;
        this.userProfOrgsList['organizationsInfo'] = this.orgsList;
        this.saveUserProfOrgs();
    }
}
