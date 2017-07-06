import {Component, OnInit} from '@angular/core';
import {passportinfo} from "../../models/passportinfo";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {passportInfoService} from "./passport-info.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass']
})
export class ImmigrationViewPassportInfoComponent implements OnInit {

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
    public warningMessage:boolean=false;
    constructor(public appService: AppService, private passportinfoservice: passportInfoService) {
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
        this.passportinfoservice.getFile(this.appService.clientId)
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
        this.warningMessage = false;
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
        if(this.passport['isuanceDate']==''||this.passport['passportNumber']=='' ||this.passport['issuingCountry']==''||this.passport['expirationDate']==''||this.passport['dateOfBirth']==''){
            this.warningMessage=true;
        }
        else{
            this.warningMessage=false;
             this.passport['clientId'] = this.appService.clientId;
            this.passportinfoservice.savePassport(this.passport)
            .subscribe((res) => {
                this.isEdit = true;
                if (res['passport']) {
                    this.passport = res['passport'];
                }
            });
        }
       

    }
}
