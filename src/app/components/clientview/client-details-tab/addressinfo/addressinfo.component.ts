import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {AddressInfoService} from './addressinfo.service';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
import {IHDateUtil} from '../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../framework/utils/deepclone.component';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-addressinfo',
  templateUrl: './addressinfo.component.html',
  styleUrls: ['./addressinfo.component.sass'],
  providers: [AddressInfoService]
})
export class AddressinfoComponent implements OnInit {

  public addressinfoList: any;
  public entityId: string;
  public message: string;
  public WorkaddressinfoList: any = {address: {}};
  public ResidenceaddressinfoList: any = {address: {}};
  public MailingaddressinfoList: any = {address: {}};
  public ForiegnaddressinfoList: any = {address: {}};
  public beforeWorkaddressinfoList;
  public beforeResidenceaddressinfoList;
  public beforeMailingaddressinfoList;
  public beforeForiegnaddressinfoList;
  workedit: any;
  residenceedit: any;
  mailingedit: any;
  foreignedit: any;
  public ClientDetailsforaddress;
  public workResidingSince: string;
  public resiResidingSince: string;
  public clientAddress: any = {};
  public checked: boolean;
  private beforeChecked;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public showWorkSaveButtonProgress = false;
  public showResidenceSaveButtonProgress = false;
  public showMailingSaveButtonProgress = false;
  public showForeignSaveButtonProgress = false;
  constructor(private dialog: MatDialog, public headerService: HeaderService, public appService: AppService,
              private addressinfoservice: AddressInfoService) {
  }

  ngOnInit() {
    this.addressinfoservice.getClientAddress(this.headerService.user.userId)
      .subscribe((res) => {
        console.log('clientaddress%o', res);
        this.addressinfoList = res['clientAddress'];
        this.addressType();
        this.ClientDetailsforaddress = JSON.parse(JSON.stringify(this.addressinfoList));
        this.checked = res['copyResidenceAddress'];
      });
    this.workedit = true;
    this.residenceedit = true;
    this.mailingedit = true;
    this.foreignedit = true;
  }

  addressType() {
    for (let key in this.addressinfoList) {
      if (this.addressinfoList[key].addressType === 'WORK') {
        this.WorkaddressinfoList = this.addressinfoList[key];
        if (this.WorkaddressinfoList && !this.WorkaddressinfoList.address) {
          this.WorkaddressinfoList.address = {};
        }
        this.workResidingSince = this.WorkaddressinfoList['residingSince'];
      }
      if (this.addressinfoList[key].addressType === 'RESIDENCE') {
        this.ResidenceaddressinfoList = this.addressinfoList[key];
        if (this.ResidenceaddressinfoList && !this.ResidenceaddressinfoList.address) {
          this.ResidenceaddressinfoList.address = {};
        }
        this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
      }
      if (this.addressinfoList[key].addressType === 'MAILING') {
        this.MailingaddressinfoList = this.addressinfoList[key];
        if (this.MailingaddressinfoList && !this.MailingaddressinfoList.address) {
          this.MailingaddressinfoList.address = {};
        }
      }
      if (this.addressinfoList[key].addressType === 'FOREIGN') {
        this.ForiegnaddressinfoList = this.addressinfoList[key];
        if (this.ForiegnaddressinfoList && !this.ForiegnaddressinfoList.address) {
          this.ForiegnaddressinfoList.address = {};
        }
      }
    }
  }

  addressedit(addresstype) {
    if (addresstype === 'WORK') {
      this.workedit = !this.workedit;
      this.beforeWorkaddressinfoList = DeepCloneUtil.deepClone(this.WorkaddressinfoList);
    }
    if (addresstype === 'RESIDENCE') {
      this.residenceedit = !this.residenceedit;
      this.beforeResidenceaddressinfoList = DeepCloneUtil.deepClone(this.ResidenceaddressinfoList);
      this.beforeChecked = DeepCloneUtil.deepClone(this.checked);
    }
    if (addresstype === 'MAILING') {
      this.mailingedit = !this.mailingedit;
      this.beforeMailingaddressinfoList = DeepCloneUtil.deepClone(this.MailingaddressinfoList);
    }
    if (addresstype === 'FOREIGN') {
      this.foreignedit = !this.foreignedit;
      this.beforeForiegnaddressinfoList = DeepCloneUtil.deepClone(this.ForiegnaddressinfoList);
    }
  }

  cancelEdit(addresstype) {
    if (addresstype === 'WORK') {
      this.WorkaddressinfoList = this.beforeWorkaddressinfoList;
      this.workedit = !this.workedit;
    }
    if (addresstype === 'RESIDENCE') {
      this.ResidenceaddressinfoList = this.beforeResidenceaddressinfoList;
      this.residenceedit = !this.residenceedit;
      this.checked = this.beforeChecked
    }
    if (addresstype === 'MAILING') {
      this.MailingaddressinfoList = this.beforeMailingaddressinfoList;
      this.mailingedit = !this.mailingedit;
    }
    if (addresstype === 'FOREIGN') {
      this.ForiegnaddressinfoList = this.beforeForiegnaddressinfoList;
      this.foreignedit = !this.foreignedit;
    }
  }


  saveClientAdress(addresstype) {
    if (addresstype === 'WORK') {
      this.showWorkSaveButtonProgress = true;
      this.WorkaddressinfoList['userId'] = this.headerService.user.userId;
      this.WorkaddressinfoList.addressType = addresstype;
      if (this.WorkaddressinfoList['residingSince'] && this.WorkaddressinfoList['residingSince']['formatted']) {
        this.WorkaddressinfoList['residingSince'] = this.WorkaddressinfoList['residingSince']['formatted'];
      }

      this.addressinfoservice.saveClientAddress(this.WorkaddressinfoList)
        .subscribe((res) => {
          this.workedit = true;
          this.showWorkSaveButtonProgress = false;
          if (res['clientAddress']) {
            this.WorkaddressinfoList = res['clientAddress'];
            this.workResidingSince = this.WorkaddressinfoList['residingSince'];
          }
        });
    }
    if (addresstype === 'RESIDENCE') {
      this.showResidenceSaveButtonProgress = true;
      this.ResidenceaddressinfoList['userId'] = this.headerService.user.userId;
      this.ResidenceaddressinfoList.addressType = addresstype;
      if (this.ResidenceaddressinfoList['residingSince'] && this.ResidenceaddressinfoList['residingSince']['formatted']) {
        this.ResidenceaddressinfoList['residingSince'] = this.ResidenceaddressinfoList['residingSince']['formatted'];
      }

      this.addressinfoservice.saveClientAddress(this.ResidenceaddressinfoList, this.checked)
        .subscribe((res) => {
          this.residenceedit = true;
          this.showResidenceSaveButtonProgress = false;
          if (res['clientAddress']) {
            this.ResidenceaddressinfoList = res['clientAddress'];
            this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
          }
        });
    }
    if (addresstype === 'MAILING') {
      if (this.residenceedit) {
        this.showMailingSaveButtonProgress = true;
        this.MailingaddressinfoList['userId'] = this.headerService.user.userId;
        this.MailingaddressinfoList.addressType = addresstype;
        this.addressinfoservice.saveClientAddress(this.MailingaddressinfoList)
          .subscribe((res) => {
            this.mailingedit = true;
            this.showMailingSaveButtonProgress = false;
            if (res['clientAddress']) {
              this.MailingaddressinfoList = res['clientAddress'];
            }
          });
      } else {
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: 'Please save residence address before saving mailing address'
          }
        });
      }
    }
    if (addresstype === 'FOREIGN') {
      this.showForeignSaveButtonProgress = true;
      this.ForiegnaddressinfoList['userId'] = this.headerService.user.userId;
      this.ForiegnaddressinfoList.addressType = addresstype;
      this.addressinfoservice.saveClientAddress(this.ForiegnaddressinfoList)
        .subscribe((res) => {
          this.foreignedit = true;
          this.showForeignSaveButtonProgress = false;
          if (res['clientAddress']) {
            this.ForiegnaddressinfoList = res['clientAddress'];
          }
        });
    }
  }
}
