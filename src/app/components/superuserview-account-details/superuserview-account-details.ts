import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {SuperuserViewAccountDetailsService} from "./superuserview-account-details.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {MenuComponent} from "../menu/menu.component";
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

@Component({
    selector: 'app-account-details',
    templateUrl: './superuserview-account-details.html',
    styleUrls: ['./superuserview-account-details.sass']
})
export class SuperuserViewAccountDetailsComponent implements OnInit {
    errormsg: boolean = false;
    public accountDetails: any = {};
    isEdit;
    isEditstorage;
    public cancelUserEdit: boolean = false;
    public createdOn: any;
    constructor(public appService: AppService, private superuserviewAccountDetailsService: SuperuserViewAccountDetailsService,
    private menuComponent:MenuComponent, private accountDetailsCommonService: AccountDetailsCommonService) {
    }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelAccountdetails;
    ngOnInit() {
        this.appService.showSideBarMenu("superuser-accounts", null);
        this.storagenable();
        this.getAcountDetails();
        this.menuComponent.highlightSBLink('Account Details');
    }
    getAcountDetails() {

        this.superuserviewAccountDetailsService.getAccountdetails(this.accountDetailsCommonService.accountId)
            .subscribe((res) => {
                console.log("filesGetmethod%o", res);
                this.accountDetails = res;
                console.log(this.accountDetails);
                this.isEdit = true
                this.isEditstorage = true;
            });
    }
    onDateChanged(event: IMyDateModel) {


    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    storagenable() {
        if (this.accountDetails.status == "PreAct") {
            this.isEditstorage = false;
        }
        else {
            this.isEditstorage = true;
        }
    }
    statuschange() {
        this.storagenable();
    }
    //is edit function for read only
    editForm() {
        this.beforeCancelAccountdetails = (<any>Object).assign({}, this.accountDetails);
        this.isEdit = !this.isEdit;
        this.cancelUserEdit = true;
        this.storagenable();
        this.createdOn = this.accountDetails.createdOn;

    }
    //cancel button function
    cancelEdit(event, i) {
        this.accountDetails = this.beforeCancelAccountdetails;
        if (this.accountDetails['createdOn'] && this.accountDetails['createdOn']['formatted']) {
            this.accountDetails['createdOn'] = this.accountDetails['createdOn']['formatted'];
        }
     if (this.cancelUserEdit == true) {
            this.ngOnInit();
            this.isEdit[i] = !this.isEdit[i];
            this.isEditstorage = !this.isEditstorage;
        }
    }
    saveAccountDetails() {

        if (this.accountDetails['createdOn'] && this.accountDetails['createdOn']['formatted']) {
            this.accountDetails['createdOn'] = this.accountDetails['createdOn']['formatted'];
        }
        if (this.accountDetails['accountName'] == '' || this.accountDetails['accountName'] == null || this.accountDetails['accountName'] == undefined
            || this.accountDetails['accountNumber'] == '' || this.accountDetails['accountNumber'] == null || this.accountDetails['accountNumber'] == undefined
            || this.accountDetails['firstName'] == '' || this.accountDetails['firstName'] == null || this.accountDetails['firstName'] == undefined
            || this.accountDetails['lastName'] == '' || this.accountDetails['lastName'] == null || this.accountDetails['lastName'] == undefined
            || this.accountDetails['email'] == '' || this.accountDetails['email'] == null || this.accountDetails['email'] == undefined
            || this.accountDetails['phone'] == '' || this.accountDetails['phone'] == null || this.accountDetails['phone'] == undefined
            || this.accountDetails['storageType'] == '' || this.accountDetails['storageType'] == null || this.accountDetails['storageType'] == undefined
            || /*this.accountDetails['markForDeletion'] == '' ||*/ this.accountDetails['markForDeletion'] == null || this.accountDetails['markForDeletion'] == undefined
            || this.accountDetails['status'] == '' || this.accountDetails['status'] == null || this.accountDetails['status'] == undefined) {
            this.errormsg = true;
        } else {
            this.errormsg = false;
            this.accountDetails['accountId'] = this.accountDetailsCommonService.accountId;
            this.superuserviewAccountDetailsService.saveAccountdetails(this.accountDetails)
                .subscribe((res) => {
                    this.isEditstorage = true;
                    this.getAcountDetails();
                });
        }

    }
}
