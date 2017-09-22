import { Component, OnInit } from '@angular/core';
import {PassportInfoService} from "./passport-info.service";
import {passportinfo} from "../../../../models/passportinfo";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {AppService} from "../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from "../../../common/header/header.service";

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass']
})
export class PassportInfoComponent implements OnInit {

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

    constructor(private PassportInfoService: PassportInfoService,
        private formBuilder: FormBuilder, public appService: AppService, public headerService: HeaderService) {
    }
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelPassport;
    ngOnInit() {

        this.PassportInfoService.getFile(this.headerService.user.userId)
            .subscribe((res) => {
                console.log("filesGetmethod%o", res);
                this.passportDetailsFileList = res['passport'];
                if (this.passportDetailsFileList == undefined) {
                    this.passportDetailsFileList = {};
                }
                this.isPassportInfoEdit = true
            });
    }
    editUserSubmit(model: passportinfo, isValid: boolean, index: number, sectionName: string) {
        console.log('formdata|account: %o|isValid:%o', model, isValid);
        if (isValid) {
            let sectionIndex = -1;
            let dataIndex = 0;
            this.passportinfoList.map((forms) => {
                if (forms.name === sectionName) {
                    forms.data[0].data.map((val) => {
                        this.passportinfoList[index].data[0].data[dataIndex].value = model[val.name];
                        dataIndex += 1;
                    });
                    dataIndex = 0;
                }
                sectionIndex += 1;
            });
            //model is key value pair and this.passportinfoList holds the data in the form it got from server
            //console.log('form data: %o | data in the receieved form: %o', model, this.passportinfoList);
            // service is not available

            this.PassportInfoService.saveEditUser(this.passportinfoList).subscribe((status) => {
                this.message = status[0]
                this.isEdit[index] = !this.isEdit[index];
            });
        } else {
            this.message = "Filled etails are not correct! please correct...";
        }

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
        this.passportDetailsFileList['clientId'] =  this.headerService.user.userId;
        this.PassportInfoService.savePassportDetails(this.passportDetailsFileList)
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
