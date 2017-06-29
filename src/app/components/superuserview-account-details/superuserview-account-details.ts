import {Component, OnInit} from '@angular/core';
import {passportinfo} from "../../models/passportinfo";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {SuperuserViewAccountDetailsService} from "./superuserview-account-details.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';

@Component({
    selector: 'app-account-details',
    templateUrl: './superuserview-account-details.html',
    styleUrls: ['./superuserview-account-details.sass']
})
export class SuperuserViewAccountDetailsComponent implements OnInit {

    private passport: any = {};
    private fieldsList: passportinfo[];
    isEdit;
    countryofbirth;
    private saveEditUser: any;
    public cancelUserEdit: boolean = false;
    private user: User;
    private isuanceDate: string;
    private expirationDate: string;
    private dateOfBirth: string;
    constructor(public appService: AppService, private superuserviewAccountDetailsService: SuperuserViewAccountDetailsService) {
        if (this.appService.user) {
            this.user = appService.user;
        }
    }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelPassport;
    ngOnInit() {
        this.appService.showSideBarMenu("accounts", "accounts");
        this.superuserviewAccountDetailsService.getFile(this.appService.clientId)
            .subscribe((res) => {
                console.log("filesGetmethod%o", res);
                this.passport = res['passport'];
                console.log(this.passport);
                if(this.passport == undefined){
                  this.passport = {};
                }
                this.isEdit=true
            });
    }

    onDateChanged(event: IMyDateModel) {


    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    //is edit function for read only
    editForm() {
        this.beforeCancelPassport = (<any>Object).assign({}, this.passport);
        this.isEdit = !this.isEdit;
        this.cancelUserEdit = true;
        this.isuanceDate = this.passport.isuanceDate;
        this.expirationDate = this.passport.expirationDate;
        this.dateOfBirth = this.passport.dateOfBirth;
    }
    //cancel button function
    cancelEdit(event, i) {
        this.passport = this.beforeCancelPassport;
        if (this.passport['isuanceDate'] && this.passport['isuanceDate']['formatted']) {
            this.passport['isuanceDate'] = this.passport['isuanceDate']['formatted'];
        }
        if (this.passport['expirationDate'] && this.passport['expirationDate']['formatted']) {
            this.passport['expirationDate'] = this.passport['expirationDate']['formatted'];
        }
        if (this.passport['dateOfBirth'] && this.passport['dateOfBirth']['formatted']) {
            this.passport['dateOfBirth'] = this.passport['dateOfBirth']['formatted'];
        }
     if (this.cancelUserEdit == true) {
            this.ngOnInit();
            this.isEdit[i] = !this.isEdit[i];
        }
    }
    saveClientPassport() {

        if (this.passport['isuanceDate'] && this.passport['isuanceDate']['formatted']) {
            this.passport['isuanceDate'] = this.passport['isuanceDate']['formatted'];
        }
        if (this.passport['expirationDate'] && this.passport['expirationDate']['formatted']) {
            this.passport['expirationDate'] = this.passport['expirationDate']['formatted'];
        }
        if (this.passport['dateOfBirth'] && this.passport['dateOfBirth']['formatted']) {
            this.passport['dateOfBirth'] = this.passport['dateOfBirth']['formatted'];
        }
        this.passport['clientId'] = this.appService.clientId;
        this.superuserviewAccountDetailsService.savePassport(this.passport)
            .subscribe((res) => {
                this.isEdit = true;
                if (res['passport']) {
                    this.passport = res['passport'];
                }
            });

    }
}
