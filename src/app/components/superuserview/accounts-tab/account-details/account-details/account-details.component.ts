import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import {SuperuserViewAccountDetailsService} from './account-details.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {MenuComponent} from '../../../../common/menu/menu.component';
import {AccountDetailsCommonService} from '../common/account-details-common.service';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
  selector: 'ih-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.sass'],
  providers: [SuperuserViewAccountDetailsService]
})
export class SuperuserViewAccountDetailsComponent implements OnInit {
  errormsg = false;
  public accountDetails: any = {};
  isEdit;
  isEditstorage;
  public cancelUserEdit = false;
  public createdOn: any;
  public MFDdisable: boolean;
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };

  private beforeCancelAccountdetails;
  constructor(public appService: AppService, private superuserviewAccountDetailsService: SuperuserViewAccountDetailsService,
              private menuComponent: MenuComponent, public accountDetailsCommonService: AccountDetailsCommonService,
              public dialogService: DialogService, public headerService: HeaderService) {
  }
  ngOnInit() {
    this.headerService.showSideBarMenu('superuserview/tab/accounts', 'superuserview/tab/accounts');
    this.storagenable();
    this.getAcountDetails();
    this.menuComponent.highlightSBLink('Account Details');
  }
  getAcountDetails() {
    this.superuserviewAccountDetailsService.getAccountdetails(this.accountDetailsCommonService.accountId)
      .subscribe((res) => {
        console.log('filesGetmethod%o', res);
        this.accountDetails = res;
        this.accountDetailsCommonService.accountName = res['accountName'];
        console.log(this.accountDetails);
        this.isEdit = true
        this.isEditstorage = true;
      });
  }
  onDateChanged(event: IMyDateModel) {
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }

  accountStatus() {
    if (this.accountDetails['status'] == 'PreAct') {
      return [{name: 'Pre-Act', value: 'PreAct'},
      {name: 'Active', value: 'Active'}];
    } else {
      return [{name: 'Active', value: 'Active'},
      {name: 'Inactive', value: 'Inactive'}];
    }
  }

  storagenable() {
    if (this.accountDetails.status === 'PreAct') {
      this.isEditstorage = false;
    } else {
      this.isEditstorage = true;
    }
  }
  statuschange() {
    this.storagenable();
  }
  // is edit function for read only
  editForm() {
    this.beforeCancelAccountdetails = (<any>Object).assign({}, this.accountDetails);
    this.isEdit = !this.isEdit;
    this.cancelUserEdit = true;
    this.storagenable();
    this.createdOn = this.accountDetails.createdOn;
    if (this.accountDetails['status'] === 'Active') {
        this.MFDdisable = true;
    } else {
        this.MFDdisable = false;

    }
  }
  // cancel button function
  cancelEdit(event, i) {
    this.accountDetails = this.beforeCancelAccountdetails;
    if (this.accountDetails['createdOn'] && this.accountDetails['createdOn']['formatted']) {
      this.accountDetails['createdOn'] = this.accountDetails['createdOn']['formatted'];
    }
    if (this.cancelUserEdit === true) {
      this.ngOnInit();
      this.isEdit[i] = !this.isEdit[i];
      this.isEditstorage = !this.isEditstorage;
    }
  }
  saveAccountDetails() {


    if (this.accountDetails['createdOn'] && this.accountDetails['createdOn']['formatted']) {
      this.accountDetails['createdOn'] = this.accountDetails['createdOn']['formatted'];
    }
    if (this.accountDetails['accountName'] === '' || this.accountDetails['accountName'] == null || this.accountDetails['accountName'] === undefined
      || this.accountDetails['accountNumber'] === '' || this.accountDetails['accountNumber'] == null || this.accountDetails['accountNumber'] === undefined
      || this.accountDetails['firstName'] === '' || this.accountDetails['firstName'] == null || this.accountDetails['firstName'] === undefined
      || this.accountDetails['lastName'] === '' || this.accountDetails['lastName'] == null || this.accountDetails['lastName'] === undefined
      || this.accountDetails['email'] === '' || this.accountDetails['email'] == null || this.accountDetails['email'] === undefined
      || this.accountDetails['phone'] === '' || this.accountDetails['phone'] == null || this.accountDetails['phone'] === undefined
      || this.accountDetails['storageType'] === '' || this.accountDetails['storageType'] == null || this.accountDetails['storageType'] === undefined
      || this.accountDetails['markForDeletion'] == null || this.accountDetails['markForDeletion'] === undefined
      // || this.accountDetails['notes'] == '' || this.accountDetails['notes'] == null || this.accountDetails['notes'] == undefined
      || this.accountDetails['status'] === '' || this.accountDetails['status'] == null || this.accountDetails['status'] === undefined) {
      this.errormsg = true;
    } else {
      this.errormsg = false;
      this.accountDetails['accountId'] = this.accountDetailsCommonService.accountId;
      this.accountDetails['mfdBy'] = this.headerService.user.userId;
      this.superuserviewAccountDetailsService.saveAccountdetails(this.accountDetails)
        .subscribe((res) => {
          this.isEditstorage = true;
          console.log(this.accountDetails)
          this.getAcountDetails();
          if (res['statusCode'] !== 'SUCCESS') {
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error',
              message: res['statusDescription']
            });
          }
        });
    }

  }
}
