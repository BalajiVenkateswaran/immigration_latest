import {Component, OnInit} from '@angular/core';
import {addressinfo} from "../../../../models/addressinfo";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../../../models/user";
import {AppService} from "../../../../services/app.service";
import {AddressInfoService} from "./addressinfo.service";
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
  private user: User;
  public WorkaddressinfoList: any = {address: {}};
  private ResidenceaddressinfoList: any = {address: {}};
  private MailingaddressinfoList: any = {address: {}};
  private ForiegnaddressinfoList: any = {address: {}};
  workedit: any;
  residenceedit: any;
  mailingedit: any;
  foreignedit: any;
  private clientAddress: any = {};

  constructor(private formBuilder: FormBuilder, public appService: AppService,
     private addressinfoservice: AddressInfoService) {
    if (this.appService.user) {
      this.user = appService.user;
    }
  }

  ngOnInit() {

    this.addressinfoservice.getClientAddress(this.appService.user.userId)
      .subscribe((res) => {
        console.log("clientaddress%o", res);
        this.addressinfoList = res['clientAddress'];
        this.addressType();
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
      }
      if (this.addressinfoList[key].addressType == "FOREIGN") {
        this.ForiegnaddressinfoList = this.addressinfoList[key];
      }
    }
  }

  addressedit(addresstype) {
    this.addressinfoservice.getClientAddress(this.appService.user.userId)
      .subscribe((res) => {
        console.log("clientaddress%o", res);
        this.addressinfoList = res['clientAddress'];
      });
    if (addresstype == "WORK") {
      this.workedit = !this.workedit;
    }
    if (addresstype == "RESIDENCE") {
      this.residenceedit = !this.residenceedit;
    }
    if (addresstype == "MAILING") {
      this.mailingedit = !this.mailingedit;
    }
    if (addresstype == "FOREIGN") {
      this.foreignedit = !this.foreignedit;
    }
  }

  cancelEdit(addresstype) {
    var workaddressinfoListspare = {address: {}};
    var residenceaddressinfoListspare = {address: {}};
    var mailingaddressinfoListspare = {address: {}};
    var foriegnaddressinfoListspare = {address: {}};


    for (var key in this.addressinfoList) {
      if (this.addressinfoList[key].addressType == "WORK") {
        workaddressinfoListspare = this.addressinfoList[key];
      }
      if (this.addressinfoList[key].addressType == "RESIDENCE") {
        residenceaddressinfoListspare = this.addressinfoList[key];
      }
      if (this.addressinfoList[key].addressType == "MAILING") {
        mailingaddressinfoListspare = this.addressinfoList[key];
      }
      if (this.addressinfoList[key].addressType == "FOREIGN") {
        foriegnaddressinfoListspare = this.addressinfoList[key];
      }
    }

    if (addresstype == "WORK") {
      this.WorkaddressinfoList = workaddressinfoListspare
      this.workedit = true;
    }
    if (addresstype == "RESIDENCE") {
      this.ResidenceaddressinfoList = residenceaddressinfoListspare
      this.residenceedit = true;
    }
    if (addresstype == "MAILING") {
      this.MailingaddressinfoList = mailingaddressinfoListspare
      this.mailingedit = true;
    }
    if (addresstype == "FOREIGN") {
      this.ForiegnaddressinfoList = foriegnaddressinfoListspare
      this.foreignedit = true;
    }
  }


  saveClientAdress(addresstype) {
    if (addresstype == "WORK") {
      this.WorkaddressinfoList['userId'] = this.appService.user.userId;
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
      this.ResidenceaddressinfoList['userId'] = this.appService.user.userId;
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
      this.MailingaddressinfoList['userId'] = this.appService.user.userId;
      this.MailingaddressinfoList.addressType = addresstype;
      this.addressinfoservice.saveClientAddress(this.MailingaddressinfoList)
        .subscribe((res) => {
          this.mailingedit = true;
          if (res['clientAddress']) {
            this.MailingaddressinfoList = res['clientAddress'];
          }
        });
    }
    if (addresstype == "FOREIGN") {
      this.ForiegnaddressinfoList['userId'] = this.appService.user.userId;
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
