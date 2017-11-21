import { AppService } from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {passportInfoService} from './passport-info.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass']
})
export class ImmigrationViewPassportInfoComponent implements OnInit {

    public passport: any = {};
    isEdit;
    countryofbirth;
    private saveEditUser: any;
    public cancelUserEdit = false;
    private isuanceDate: string;
    private expirationDate: string;
    private dateOfBirth: string;
    public warningMessage= false;
    constructor(public appService: AppService, private passportinfoservice: passportInfoService, public headerService: HeaderService) {
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
                console.log('filesGetmethod%o', res);
                this.passport = res['passport'];
                console.log(this.passport);
                if (this.passport == undefined) {
                  this.passport = {};
                }
                this.isEdit = true
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
        if (this.passport['isuanceDate'] == '' || this.passport['passportNumber'] == '' || this.passport['issuingCountry'] == '' || this.passport['expirationDate'] == '' || this.passport['dateOfBirth'] == '' ||
            this.passport['isuanceDate'] == undefined || this.passport['passportNumber'] == undefined || this.passport['issuingCountry'] == undefined || this.passport['expirationDate'] == undefined || this.passport['dateOfBirth'] == undefined ||
            this.passport['isuanceDate'] == null || this.passport['passportNumber'] == null || this.passport['issuingCountry'] == null || this.passport['expirationDate'] == null || this.passport['dateOfBirth'] == null
            || this.passport['countryOfBirth'] == '' || this.passport['countryOfBirth'] == undefined || this.passport['countryOfBirth'] == null) {
            this.warningMessage = true;
        } else {
            this.warningMessage = false;
             this.passport['clientId'] = this.appService.clientId;
            this.passportinfoservice.savePassport(this.passport, this.headerService.user.userId)
            .subscribe((res) => {
                this.isEdit = true;
                if (res['passport']) {
                    this.passport = res['passport'];
                }
            });
        }


    }
}
