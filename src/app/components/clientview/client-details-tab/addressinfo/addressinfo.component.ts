import {Component, OnInit} from '@angular/core';
import {addressinfo} from "../../../../models/addressinfo";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../../../models/user";
import {AppService} from "../../../../services/app.service";
import {AddressInfoService} from "./addressinfo.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from "../../../common/header/header.service";

export interface formControl {
  name: string;
  value: FormControl;
}

@Component({
  selector: 'app-addressinfo',
  templateUrl: './addressinfo.component.html',
  styleUrls: ['./addressinfo.component.sass']
})
export class AddressinfoComponent implements OnInit {

  private addressinfoList: any;
  private entityId: string;
  public editUser: FormGroup; // our model driven form
  private fieldsList: addressinfo[];
  private formControlValues: any = {};
  isEdit: boolean[] = [true];
  private message: string;
  private saveEditUser: any;
  public cancelUserEdit: boolean = false;
  public WorkaddressinfoList: any = {address: {}};
  private ResidenceaddressinfoList: any = {address: {}};
  private MailingaddressinfoList: any = {address: {}};
  private ForiegnaddressinfoList: any = {address: {}};
  workedit: any;
  residenceedit: any;
  mailingedit: any;
  foreignedit: any;
  private ClientDetailsforaddress;
  public WorkaddressinfoListspare: any = { address: {} };
  private ResidenceaddressinfoListspare: any = { address: {} };
  private MailingaddressinfoListspare: any = { address: {} };
  private ForiegnaddressinfoListspare: any = { address: {} };
  private workResidingSince: string;
  private resiResidingSince: string;
  private clientAddress: any = {};
  public checked: boolean;
  public phoneAdd: boolean;
  public faxAdd: boolean;
  public copyMailingList: any = [];
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };
  constructor(private formBuilder: FormBuilder, public headerService: HeaderService, public appService: AppService,
              private addressinfoservice: AddressInfoService) {
  }

  ngOnInit() {

    this.addressinfoservice.getClientAddress(this.headerService.user.userId)
      .subscribe((res) => {
        console.log("clientaddress%o", res);
        this.addressinfoList = res['clientAddress'];
        this.addressType();
        this.ClientDetailsforaddress = JSON.parse(JSON.stringify(this.addressinfoList));
      });
    this.workedit = true;
    this.residenceedit = true;
    this.mailingedit = true;
    this.foreignedit = true;
  }

  addressType() {
    for (var key in this.addressinfoList) {
      if (this.addressinfoList[key].addressType == "WORK") {
        this.WorkaddressinfoList = this.addressinfoList[key];
      }
      if (this.addressinfoList[key].addressType == "RESIDENCE") {
        this.ResidenceaddressinfoList = this.addressinfoList[key];
      }
      if (this.addressinfoList[key].addressType == "MAILING") {
        this.MailingaddressinfoList = this.addressinfoList[key];
        this.copyMailingList = JSON.parse(JSON.stringify(this.MailingaddressinfoList));
      }
      if (this.addressinfoList[key].addressType == "FOREIGN") {
        this.ForiegnaddressinfoList = this.addressinfoList[key];
      }
    }
    this.checkedAddress();
  }
  checkedAddress() {
    delete this.ResidenceaddressinfoList['address'].addressId;
    delete this.MailingaddressinfoList['address'].addressId;
    if (JSON.stringify(this.ResidenceaddressinfoList['address']) === JSON.stringify(this.MailingaddressinfoList['address'])) {
      if (this.ResidenceaddressinfoList['telephone'] != undefined && this.MailingaddressinfoList['telephone'] != undefined) {
        if (this.ResidenceaddressinfoList['telephone'] == this.MailingaddressinfoList['telephone']) {
          this.phoneAdd = true;
        }
      }
      if (this.ResidenceaddressinfoList['fax'] != undefined && this.MailingaddressinfoList['fax'] != undefined) {
        if (this.ResidenceaddressinfoList['fax'] == this.MailingaddressinfoList['fax']) {
          this.faxAdd = true;
        }
      }
      if (this.phoneAdd == true && this.faxAdd == true) {
        this.checked = true;
      }
      else {
        this.checked = false;
      }
    }
    else {
      this.checked = false;
    }
  }
  onDateChanged(event: IMyDateModel) {


  }
  adressChange() {
    if (this.checked == true) {
      this.mailingedit = false;
      this.MailingaddressinfoList['address'] = this.ResidenceaddressinfoList['address'];
      this.MailingaddressinfoList['telephone'] = this.ResidenceaddressinfoList['telephone'];
      this.MailingaddressinfoList['fax'] = this.ResidenceaddressinfoList['fax'];
      if (this.copyMailingList.length!=0) {
        this.MailingaddressinfoList['address']['addressId'] = this.copyMailingList['address']['addressId'];
      }
      else {
        this.MailingaddressinfoList['address']['addressId'] = "";
      }
    }
    if (this.checked == false) {
      this.mailingedit = true;
      this.MailingaddressinfoList['address'] = this.copyMailingList['address'];
      this.MailingaddressinfoList['telephone'] = this.copyMailingList['telephone'];
      this.MailingaddressinfoList['fax'] = this.copyMailingList['fax'];
    }
  }
  addressedit(addresstype) {
    this.addressinfoservice.getClientAddress(this.headerService.user.userId)
      .subscribe((res) => {
        console.log("clientaddress%o", res);
        this.addressinfoList = res['clientAddress'];
        this.ClientDetailsforaddress = res['clientAddress'];
      });
    if (addresstype == "WORK") {
      this.workedit = !this.workedit;
      this.workResidingSince = this.WorkaddressinfoList['residingSince'];
    }
    if (addresstype == "RESIDENCE") {
      this.residenceedit = !this.residenceedit;
      this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
    }
    if (addresstype == "MAILING") {
      this.mailingedit = !this.mailingedit;
    }
    if (addresstype == "FOREIGN") {
      this.foreignedit = !this.foreignedit;
    }
  }

  cancelEdit(addresstype) {

    for (var key in this.ClientDetailsforaddress) {
      if (this.ClientDetailsforaddress[key].addressType == "WORK") {
        this.WorkaddressinfoListspare = this.ClientDetailsforaddress[key];
      }
      if (this.ClientDetailsforaddress[key].addressType == "RESIDENCE") {
        this.ResidenceaddressinfoListspare = this.ClientDetailsforaddress[key];
      }
      if (this.ClientDetailsforaddress[key].addressType == "MAILING") {
        this.MailingaddressinfoListspare = this.ClientDetailsforaddress[key];
      }
      if (this.ClientDetailsforaddress[key].addressType == "FOREIGN") {
        this.ForiegnaddressinfoListspare = this.ClientDetailsforaddress[key];
      }
    }

    if (addresstype == "WORK") {
      this.WorkaddressinfoList = this.WorkaddressinfoListspare
      this.workedit = true;
    }
    if (addresstype == "RESIDENCE") {
      this.ResidenceaddressinfoList = this.ResidenceaddressinfoListspare
      this.residenceedit = true;
    }
    if (addresstype == "MAILING") {
      this.MailingaddressinfoList = this.MailingaddressinfoListspare
      this.mailingedit = true;
      this.checkedAddress();
    }
    if (addresstype == "FOREIGN") {
      this.ForiegnaddressinfoList = this.ForiegnaddressinfoListspare
      this.foreignedit = true;
    }
  }


  saveClientAdress(addresstype) {
    if (addresstype == "WORK") {
      this.WorkaddressinfoList['userId'] = this.headerService.user.userId;
      this.WorkaddressinfoList.addressType = addresstype;
      if (this.WorkaddressinfoList['residingSince'] && this.WorkaddressinfoList['residingSince']['formatted']) {
        this.WorkaddressinfoList['residingSince'] = this.WorkaddressinfoList['residingSince']['formatted'];
      }

      this.addressinfoservice.saveClientAddress(this.WorkaddressinfoList)
        .subscribe((res) => {
          this.workedit = true;
          if (res['clientAddress']) {
            this.WorkaddressinfoList = res['clientAddress'];
          }
        });
    }
    if (addresstype == "RESIDENCE") {
      this.ResidenceaddressinfoList['userId'] = this.headerService.user.userId;
      this.ResidenceaddressinfoList.addressType = addresstype;
      if (this.ResidenceaddressinfoList['residingSince'] && this.ResidenceaddressinfoList['residingSince']['formatted']) {
        this.ResidenceaddressinfoList['residingSince'] = this.ResidenceaddressinfoList['residingSince']['formatted'];
      }

      this.addressinfoservice.saveClientAddress(this.ResidenceaddressinfoList)
        .subscribe((res) => {
          this.residenceedit = true;
          if (res['clientAddress']) {
            this.ResidenceaddressinfoList = res['clientAddress'];
          }
        });
    }
    if (addresstype == "MAILING") {
      this.MailingaddressinfoList['userId'] = this.headerService.user.userId;
      this.MailingaddressinfoList.addressType = addresstype;
      this.addressinfoservice.saveClientAddress(this.MailingaddressinfoList)
        .subscribe((res) => {
          this.mailingedit = true;
          if (res['clientAddress']) {
            this.MailingaddressinfoList = res['clientAddress'];
            this.copyMailingList = JSON.parse(JSON.stringify(this.MailingaddressinfoList));
            this.checkedAddress();
          }
        });
    }
    if (addresstype == "FOREIGN") {
      this.ForiegnaddressinfoList['userId'] = this.headerService.user.userId;
      this.ForiegnaddressinfoList.addressType = addresstype;
      this.addressinfoservice.saveClientAddress(this.ForiegnaddressinfoList)
        .subscribe((res) => {
          this.foreignedit = true;
          if (res['clientAddress']) {
            this.ForiegnaddressinfoList = res['clientAddress'];
          }
        });
    }
  }
}
