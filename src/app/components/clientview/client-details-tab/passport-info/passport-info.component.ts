import {Component, OnInit} from '@angular/core';
import {ClientViewPassportInfoService} from './passport-info.service';
import {AppService} from '../../../../services/app.service';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
import {IHDateUtil} from '../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../framework/utils/deepclone.component';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.sass'],
  providers: [ClientViewPassportInfoService]
})
export class ClientViewPassportInfoComponent implements OnInit {
  public isPassportInfoEdit: boolean;
  public passportDetailsFileList: any = {};
  public isuanceDate: string;
  public expirationDate: string;
  public dateOfBirth: string;
  public countryofbirth;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  private beforeCancelPassport;
  public showPassportInfoSaveButtonProgress = false;
  constructor(private passportInfoService: ClientViewPassportInfoService,
      public appService: AppService, public headerService: HeaderService) {
  }

  ngOnInit() {

      this.passportInfoService.getClientPassportDetails(this.headerService.user.userId)
          .subscribe((res) => {
              console.log('filesGetmethod%o', res);
              this.passportDetailsFileList = res['passport'];
              if (this.passportDetailsFileList === undefined) {
                  this.passportDetailsFileList = {};
              }
              this.mapFromPassportInfo();
              this.isPassportInfoEdit = true
          });
  }

  mapFromPassportInfo() {
    this.isuanceDate = this.passportDetailsFileList.isuanceDate;
    this.expirationDate = this.passportDetailsFileList.expirationDate;
    this.dateOfBirth = this.passportDetailsFileList.dateOfBirth;
  }
  passportInfoEditForm() {
      this.beforeCancelPassport = DeepCloneUtil.deepClone(this.passportDetailsFileList);
      this.isPassportInfoEdit = !this.isPassportInfoEdit;
  }

  cancelPassportInfoEdit() {
      this.passportDetailsFileList = this.beforeCancelPassport;
      this.isPassportInfoEdit = !this.isPassportInfoEdit;
  }

  savePassportformation() {
    this.showPassportInfoSaveButtonProgress = true;
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
      this.isPassportInfoEdit = true;
      this.showPassportInfoSaveButtonProgress = false;
      if (res['passport']) {
        this.passportDetailsFileList = res['passport'];
        this.mapFromPassportInfo();
      }
    });
  }
}
