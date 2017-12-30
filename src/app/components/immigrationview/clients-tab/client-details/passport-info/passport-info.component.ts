import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {PassportInfoService} from './passport-info.service';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {ImmigrationClientCommonService} from '../common/immigration-client.service';
import {IHDateUtil} from '../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../framework/utils/deepclone.component';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass'],
  providers: [PassportInfoService]
})
export class ImmigrationViewPassportInfoComponent implements OnInit {

    public passport: any = {};
    isEdit;
    countryofbirth;
    public isuanceDate: string;
    public expirationDate: string;
    public dateOfBirth: string;
    public warningMessage= false;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public beforeCancelPassport;
  public saveButtonProgress = false;
    constructor(public appService: AppService, private passportinfoservice: PassportInfoService, public headerService: HeaderService,
                private immigrationClientCommonService: ImmigrationClientCommonService) {
    }

    ngOnInit() {
        this.passportinfoservice.getClientPassportDetails(this.appService.clientId)
            .subscribe((res) => {
                console.log('filesGetmethod%o', res);
                this.passport = res['passport'];
                console.log(this.passport);
                if (this.passport === undefined) {
                  this.passport = {};
                }
                this.mapFromPassportInfo();
                this.isEdit = true
            });
    }

    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    mapFromPassportInfo() {
      this.isuanceDate = this.passport.isuanceDate;
      this.expirationDate = this.passport.expirationDate;
      this.dateOfBirth = this.passport.dateOfBirth;
    }

    // is edit function for read only
    editForm() {
        this.beforeCancelPassport = DeepCloneUtil.deepClone(this.passport);
        this.isEdit = !this.isEdit;
    }
    // cancel button function
    cancelEdit() {
        this.warningMessage = false;
        this.passport = this.beforeCancelPassport;
        this.isEdit = !this.isEdit;
    }
    saveClientPassport() {
        if (this.passport['isuanceDate'] === '' || this.passport['passportNumber'] === '' || this.passport['issuingCountry'] === '' || this.passport['expirationDate'] === '' || this.passport['dateOfBirth'] === '' ||
            this.passport['isuanceDate'] === undefined || this.passport['passportNumber'] === undefined || this.passport['issuingCountry'] === undefined || this.passport['expirationDate'] === undefined
            || this.passport['dateOfBirth'] === undefined || this.passport['isuanceDate'] == null || this.passport['passportNumber'] == null || this.passport['issuingCountry'] == null || this.passport['expirationDate'] == null
            || this.passport['dateOfBirth'] == null || this.passport['countryOfBirth'] === '' || this.passport['countryOfBirth'] === undefined || this.passport['countryOfBirth'] == null) {
            this.warningMessage = true;
        } else {
          this.saveButtonProgress = true;
            this.warningMessage = false;
             this.passport['userId'] = this.immigrationClientCommonService.userId;
            if (this.passport['isuanceDate'] && this.passport['isuanceDate']['formatted']) {
              this.passport['isuanceDate'] = this.passport['isuanceDate']['formatted'];
            }
            if (this.passport['expirationDate'] && this.passport['expirationDate']['formatted']) {
              this.passport['expirationDate'] = this.passport['expirationDate']['formatted'];
            }
            if (this.passport['dateOfBirth'] && this.passport['dateOfBirth']['formatted']) {
              this.passport['dateOfBirth'] = this.passport['dateOfBirth']['formatted'];
            }
            this.passportinfoservice.savePassport(this.headerService.user.accountId, this.passport, this.headerService.user.userId)
            .subscribe((res) => {
                this.isEdit = true;
                this.saveButtonProgress = false;
                if (res['passport']) {
                    this.passport = res['passport'];
                    this.mapFromPassportInfo();
                }
            });
        }


    }
}
