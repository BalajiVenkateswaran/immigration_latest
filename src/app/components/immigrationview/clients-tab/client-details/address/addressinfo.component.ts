import {AppService} from '../../../../../services/app.service';
import {AddressInfoservice} from './addressinfo.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {IHDateUtil} from '../../../../framework/utils/date.component';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
  selector: 'ih-immigrationview-addressinfo',
  templateUrl: './addressinfo.component.html',
  styleUrls: ['./addressinfo.component.sass'],
  providers: [AddressInfoservice]
})
export class ImmigrationViewAddressinfoComponent implements OnInit {

  public addressinfoList: any;
  public entityId: string;
    public editUser: FormGroup; // our model driven form
  public formControlValues: any = {};
    isEdit: boolean[] = [true];
  public message: string;
  public saveEditUser: any;
    public cancelUserEdit = false;
    public WorkaddressinfoList: any = { address: {}};
  public ResidenceaddressinfoList: any = {address: {}};
  public MailingaddressinfoList: any = {address: {}};
  public ForiegnaddressinfoList: any = {address: {}};
    workedit: any;
    residenceedit: any;
    mailingedit: any;
    foreignedit: any;
  public ClientDetailsforaddress;
    public WorkaddressinfoListspare: any = { address: {} };
  public ResidenceaddressinfoListspare: any = { address: {} };
  public MailingaddressinfoListspare: any = { address: {} };
  public ForiegnaddressinfoListspare: any = { address: {} };
  public workResidingSince: string;
  public resiResidingSince: string;
    public checked: boolean;
    public copyMailingList: any = [];
    public phoneAdd: boolean;
    public faxAdd: boolean;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    constructor(private formBuilder: FormBuilder, public appService: AppService, private addressinfoservice: AddressInfoservice,
                public headerService: HeaderService) {
        this.addressinfoservice.getClientAddress(this.appService.clientId)
            .subscribe((res) => {
                console.log('clientaddress%o', res);
                this.addressinfoList = res['clientAddress'];
                this.addressType();
                this.ClientDetailsforaddress = JSON.parse(JSON.stringify(this.addressinfoList));

            });
    }
    ngOnInit() {

        this.workedit = true;
        this.residenceedit = true;
        this.mailingedit = true;
        this.foreignedit = true;
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    addressType() {
        for (let key in this.addressinfoList) {
            if (this.addressinfoList[key].addressType === 'WORK') {
                this.WorkaddressinfoList = this.addressinfoList[key];
                this.workResidingSince = this.WorkaddressinfoList['residingSince'];
            }
            if (this.addressinfoList[key].addressType === 'RESIDENCE') {
                this.ResidenceaddressinfoList = this.addressinfoList[key];
                this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
            }
            if (this.addressinfoList[key].addressType === 'MAILING') {
                this.MailingaddressinfoList = this.addressinfoList[key];
                this.copyMailingList = JSON.parse(JSON.stringify(this.MailingaddressinfoList));
            }
            if (this.addressinfoList[key].addressType === 'FOREIGN') {
                this.ForiegnaddressinfoList = this.addressinfoList[key];
            }

        }
        this.checkedAddress();
    }
    checkedAddress() {
        delete this.ResidenceaddressinfoList['address'].addressId;
        delete this.MailingaddressinfoList['address'].addressId;
        if (JSON.stringify(this.ResidenceaddressinfoList['address']) === JSON.stringify(this.MailingaddressinfoList['address'])) {
            if (this.ResidenceaddressinfoList['telephone'] !== undefined && this.MailingaddressinfoList['telephone'] !== undefined) {
                if (this.ResidenceaddressinfoList['telephone'] === this.MailingaddressinfoList['telephone']) {
                    this.phoneAdd = true;
                }
            }
            if (this.ResidenceaddressinfoList['fax'] !== undefined && this.MailingaddressinfoList['fax'] !== undefined) {
                if (this.ResidenceaddressinfoList['fax'] === this.MailingaddressinfoList['fax']) {
                    this.faxAdd = true;
                }
            }
            if (this.phoneAdd === true && this.faxAdd === true) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        } else {
            this.checked = false;
        }
    }
       adressChange() {
           if (this.checked === true) {
               this.mailingedit = false;
               this.MailingaddressinfoList['address'] = this.ResidenceaddressinfoList['address'];
               this.MailingaddressinfoList['telephone'] = this.ResidenceaddressinfoList['telephone'];
               this.MailingaddressinfoList['fax'] = this.ResidenceaddressinfoList['fax'];
               if (this.copyMailingList.length !== 0) {
                   this.MailingaddressinfoList['address']['addressId'] = this.copyMailingList['address']['addressId'];
               } else {
                   this.MailingaddressinfoList['address']['addressId'] = '';
               }
           }
           if (this.checked === false) {
               this.mailingedit = true;
               this.MailingaddressinfoList['address'] = this.copyMailingList['address'];
               this.MailingaddressinfoList['telephone'] = this.copyMailingList['telephone'];
               this.MailingaddressinfoList['fax'] = this.copyMailingList['fax'];
           }
       }
    addressedit(addresstype) {

        this.addressinfoservice.getClientAddress(this.appService.clientId)
           .subscribe((res) => {
               console.log('clientaddress%o', res);
               this.addressinfoList = res['clientAddress'];
               this.ClientDetailsforaddress = res['clientAddress'];
            });
        if (addresstype === 'WORK') {
            this.workedit = !this.workedit;
            this.workResidingSince = this.WorkaddressinfoList['residingSince'];
        }
        if (addresstype === 'RESIDENCE') {
            this.residenceedit = !this.residenceedit;
            this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
        }
        if (addresstype === 'MAILING') {
            this.mailingedit = !this.mailingedit;
        }
        if (addresstype === 'FOREIGN') {
            this.foreignedit = !this.foreignedit;
        }
    }

    cancelEdit(addresstype) {
        //this.addressinfoList = this.ClientDetailsforaddress;

        for (let key in this.ClientDetailsforaddress) {
            if (this.ClientDetailsforaddress[key].addressType === 'WORK') {
                this.WorkaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType === 'RESIDENCE') {
                this.ResidenceaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType === 'MAILING') {
                this.MailingaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType === 'FOREIGN') {
                this.ForiegnaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
        }
        if (addresstype === 'WORK') {
            this.WorkaddressinfoList = this.WorkaddressinfoListspare
            this.workedit = true;
        }
        if (addresstype === 'RESIDENCE') {
            this.ResidenceaddressinfoList = this.ResidenceaddressinfoListspare
            this.residenceedit = true;
        }
        if (addresstype === 'MAILING') {
            this.MailingaddressinfoList = this.MailingaddressinfoListspare
            this.mailingedit = true;
            this.checkedAddress();
        }
        if (addresstype === 'FOREIGN') {
            this.ForiegnaddressinfoList = this.ForiegnaddressinfoListspare
            this.foreignedit = true;
        }
    }

    saveClientAdress(addresstype) {

        if (addresstype === 'WORK') {
            this.WorkaddressinfoList.addressType = addresstype;
            if (this.WorkaddressinfoList['residingSince'] && this.WorkaddressinfoList['residingSince']['formatted']) {
                        this.WorkaddressinfoList['residingSince'] = this.WorkaddressinfoList['residingSince']['formatted'];
                    }

            this.addressinfoservice.saveClientAddress(this.WorkaddressinfoList, this.appService.clientId, this.headerService.user.userId)
                .subscribe((res) => {
                    this.workedit = true;
                    if (res['clientAddress']) {
                        this.WorkaddressinfoList = res['clientAddress'];
                    }
                });
        }
        if (addresstype === 'RESIDENCE') {
            this.ResidenceaddressinfoList.addressType = addresstype;
               if (this.ResidenceaddressinfoList['residingSince'] && this.ResidenceaddressinfoList['residingSince']['formatted']) {
                                    this.ResidenceaddressinfoList['residingSince'] = this.ResidenceaddressinfoList['residingSince']['formatted'];
                                }

            this.addressinfoservice.saveClientAddress(this.ResidenceaddressinfoList, this.appService.clientId, this.headerService.user.userId)
                .subscribe((res) => {
                    this.residenceedit = true;
                    if (res['clientAddress']) {
                        this.ResidenceaddressinfoList = res['clientAddress'];
                    }
                });
        }
        if (addresstype === 'MAILING') {
            this.MailingaddressinfoList.addressType = addresstype;
            this.addressinfoservice.saveClientAddress(this.MailingaddressinfoList, this.appService.clientId, this.headerService.user.userId)
                .subscribe((res) => {
                    this.mailingedit = true;
                    if (res['clientAddress']) {
                        this.MailingaddressinfoList = res['clientAddress'];
                        this.copyMailingList = JSON.parse(JSON.stringify(this.MailingaddressinfoList));
                        this.checkedAddress();
                    }
                });
        }
        if (addresstype === 'FOREIGN') {
            this.ForiegnaddressinfoList.addressType = addresstype;
            this.addressinfoservice.saveClientAddress(this.ForiegnaddressinfoList, this.appService.clientId, this.headerService.user.userId)
            .subscribe((res) => {
                this.foreignedit = true;
                if (res['clientAddress']) {
                    this.ForiegnaddressinfoList = res['clientAddress'];
                }
            });
        }
    }
}
