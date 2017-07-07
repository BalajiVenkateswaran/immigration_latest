import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {SuperuserViewAccountDetailsService} from "./superuserview-account-details.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {MenuComponent} from "../menu/menu.component";
@Component({
    selector: 'app-account-details',
    templateUrl: './superuserview-account-details.html',
    styleUrls: ['./superuserview-account-details.sass']
})
export class SuperuserViewAccountDetailsComponent implements OnInit {

    public accountDetails: any = {};
    isEdit;
    isEditstorage;
    public cancelUserEdit: boolean = false;
    private user: User;
    public createdOn: any;
    constructor(public appService: AppService, private superuserviewAccountDetailsService: SuperuserViewAccountDetailsService,
    private menuComponent:MenuComponent) {
        if (this.appService.user) {
            this.user = appService.user;
        }
    }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelAccountdetails;
    ngOnInit() {
        this.appService.showSideBarMenu("superuser-accounts", null);
        //this.appService.showSideBarMenu("accounts", "accounts");
        this.storagenable();
        this.getAcountDetails();
        this.menuComponent.highlightSBLink('Account Details');
    }
    getAcountDetails() {

        this.superuserviewAccountDetailsService.getAccountdetails(this.user.accountId)
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

        this.accountDetails['accountId'] = this.user.accountId;
        this.superuserviewAccountDetailsService.saveAccountdetails(this.accountDetails)
            .subscribe((res) => {
                this.isEditstorage = true;
                this.getAcountDetails();

            });

    }
}
