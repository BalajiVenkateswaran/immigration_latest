import { Component, OnInit } from '@angular/core';
import {ClientViewPassportInfoService} from './passport-info.service';
import {passportinfo} from '../../../../models/passportinfo';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass']
})
export class ClientViewPassportInfoComponent implements OnInit {

    private passportinfoList: any;
    public editUser: FormGroup; // our model driven form
    private fieldsList: passportinfo[];
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    private message: string;
    public isPassportInfoEdit: boolean;
    private passportDetailsFileList: any = {};
    private isuanceDate: string;
    private expirationDate: string;
    private dateOfBirth: string;
    countryofbirth;

    constructor(private passportInfoService: ClientViewPassportInfoService,
        private formBuilder: FormBuilder, public appService: AppService, public headerService: HeaderService) {
    }
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelPassport;
    ngOnInit() {

        this.passportInfoService.getClientPassportDetails(this.headerService.user.userId)
            .subscribe((res) => {
                console.log('filesGetmethod%o', res);
                this.passportDetailsFileList = res['passport'];
                if (this.passportDetailsFileList === undefined) {
                    this.passportDetailsFileList = {};
                }
                this.isPassportInfoEdit = true
            });
    }

    onDateChanged(event: IMyDateModel) {
    }
    editForm(event, i) {
        this.isEdit[i] = !this.isEdit[i];
    }
    cancelEdit(event, i) {
        this.isEdit[i] = !this.isEdit[i];
        this.ngOnInit();
    }

    passportInfoEditForm() {
        this.beforeCancelPassport = (<any>Object).assign({}, this.passportDetailsFileList);
        this.isPassportInfoEdit = !this.isPassportInfoEdit;
        this.isuanceDate = this.passportDetailsFileList.isuanceDate;
        this.expirationDate = this.passportDetailsFileList.expirationDate;
        this.dateOfBirth = this.passportDetailsFileList.dateOfBirth;

    }

    cancelPassportInfoEdit() {
        this.passportDetailsFileList = this.beforeCancelPassport;
        this.isPassportInfoEdit = !this.isPassportInfoEdit;

        if (this.passportDetailsFileList['isuanceDate'] && this.passportDetailsFileList['isuanceDate']['formatted']) {
            this.passportDetailsFileList['isuanceDate'] = this.passportDetailsFileList['isuanceDate']['formatted'];
        }
        if (this.passportDetailsFileList['expirationDate'] && this.passportDetailsFileList['expirationDate']['formatted']) {
            this.passportDetailsFileList['expirationDate'] = this.passportDetailsFileList['expirationDate']['formatted'];
        }
        if (this.passportDetailsFileList['dateOfBirth'] && this.passportDetailsFileList['dateOfBirth']['formatted']) {
            this.passportDetailsFileList['dateOfBirth'] = this.passportDetailsFileList['dateOfBirth']['formatted'];
        }
    }


    savePassportformation() {

        if (this.passportDetailsFileList['isuanceDate'] && this.passportDetailsFileList['isuanceDate']['formatted']) {
            this.passportDetailsFileList['isuanceDate'] = this.passportDetailsFileList['isuanceDate']['formatted'];
        }
        if (this.passportDetailsFileList['expirationDate'] && this.passportDetailsFileList['expirationDate']['formatted']) {
            this.passportDetailsFileList['expirationDate'] = this.passportDetailsFileList['expirationDate']['formatted'];
        }
        if (this.passportDetailsFileList['dateOfBirth'] && this.passportDetailsFileList['dateOfBirth']['formatted']) {
            this.passportDetailsFileList['dateOfBirth'] = this.passportDetailsFileList['dateOfBirth']['formatted'];
        }
        this.passportDetailsFileList['userId'] =  this.headerService.user.userId;
        this.passportInfoService.savePassportDetails(this.passportDetailsFileList, this.headerService.user.userId)
            .subscribe((res) => {
                console.log(res);
                this.isPassportInfoEdit = true;
                if (res['passport']) {
                    this.passportDetailsFileList = res['passport'];
                    console.log(this.passportDetailsFileList);

                }
            });


    }

}
