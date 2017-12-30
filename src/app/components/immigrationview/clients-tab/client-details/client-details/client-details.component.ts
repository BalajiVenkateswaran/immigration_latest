import {ImmigrationViewClientPersonalInfo} from '../../../../../models/ImmigrationViewClientPersonalInfo';
import {ImmigrationViewClientProfile} from '../../../../../models/immigrationviewclientprofile';
import {User} from '../../../../../models/user';
import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ImmigrationViewClientDetailsService} from './client-details.service';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {DialogService} from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../../common/header/header.service';
import {ImmigrationClientCommonService} from '../common/immigration-client.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {IHDateUtil} from '../../../../framework/utils/date.component';

@Component({
    selector: 'ih-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss'],
    providers: [ImmigrationViewClientDetailsService]
})
export class ImmigrationViewClientDetailsComponent implements OnInit {
  ssnRegex: RegExp;
  clientDetails: any = {};
  public client: any = {};
  public clientProfile: ImmigrationViewClientProfile = new ImmigrationViewClientProfile();
  public clientPersonalInfo: ImmigrationViewClientPersonalInfo = new ImmigrationViewClientPersonalInfo();
  phoneNumber: FormControl;
  ssn: FormControl;
  public phoneRegex;
  // Profile section variables
  isProfileEdit;
  isPersonalInfoEdit;
  public status: any[];
  public gender: any[];
  public user: User;
  public dateOfBirth: string;
  public creationDate: string;
  public warningMessage = false;
  public user1;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public beforeCancelProfile;
  public beforeCancelPersonal;
  public disableSendInvite: boolean;
  public showProfileSaveButtonProgress = false;
  public showPersonalInfoSaveButtonProgress = false;

  constructor(public appService: AppService, public headerService: HeaderService, private clientDetailsService: ImmigrationViewClientDetailsService,
              private dialog: MatDialog, private immigrationClientCommonService: ImmigrationClientCommonService) {
      if (this.headerService.user) {
          this.user = this.headerService.user;
      }
      this.phoneRegex = /^[\+]?[0-9]*[\-]?[(]?[0-9]{3}[)]?[-]?[0-9]{3}[-]?[0-9]{4,6}$/;
      this.ssnRegex = /^(?=.*[0-9])[-0-9]+$/;
      this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]);
      this.ssn = new FormControl('', Validators.pattern(this.ssnRegex));
      this.getClientDetails();
  }

  ngOnInit() {
    this.headerService.showSideBarMenu('immigrationview-client', 'clients');
    this.appService.dependents = [];
    this.status = [
        { value: 'Active', name: 'Active' },
        { value: 'Inactive', name: 'Inactive' }
    ];
    this.gender = [
        { value: '0', name: 'Male' },
        { value: '1', name: 'Female' }
    ];
  }
  getClientDetails() {
      this.clientDetailsService.getClientDetails(this.appService.clientId)
          .subscribe((res) => {
              if (res['clientDetails']) {

                  this.clientDetails = res['clientDetails'];
                  this.user1 = res['clientDetails']['userId'];
                  this.appService.clientfirstName = res['clientDetails']['firstName'];
                  this.appService.clientlastName = res['clientDetails']['lastName'];

                  this.mapToClientProfile();
                  this.mapToClientPersonalInfo();
                  this.dateOfBirth = this.clientDetails['dateOfBirth'];
                  this.appService.firstName = this.clientDetails['firstName'];
                  this.appService.lastName = this.clientDetails['lastName'];
              }
              if (res['client']) {
                  this.client = res['client'];
                  this.clientProfile.deletedByUserOn = this.client['deletedByUserOn'];
                  this.clientProfile.lastUpdatedByUserOn = this.client['lastUpdatedByUserOn'];
                  this.clientProfile.createdByUserOn = this.client['createdByUserOn'];
                  this.clientProfile.markForDeletion = this.client['markForDeletion'];
              }

              if (res['enableSendInvite'] !== undefined) {
                  this.disableSendInvite = !res['enableSendInvite'];
              }

              this.isProfileEdit = true;
              this.isPersonalInfoEdit = true;
          });
  }

  highlightSBLink(link) {
      this.appService.currentSBLink = link;
  }

  // is edit function for read only
  editProfileForm() {
      this.beforeCancelProfile = (<any>Object).assign({}, this.clientProfile);
      this.isProfileEdit = !this.isProfileEdit;
      this.clientProfile.deletedByUserOn = this.clientProfile.deletedByUserOn;
      this.clientProfile.lastUpdatedByUserOn = this.clientProfile.lastUpdatedByUserOn;
      this.clientProfile.createdByUserOn = this.clientProfile.createdByUserOn;
      this.clientProfile.markForDeletion = this.clientProfile.markForDeletion;
  }


  // cancel button function
  cancelProfileEdit() {
      this.clientProfile = this.beforeCancelProfile;
      this.isProfileEdit = !this.isProfileEdit;
      if (this.clientProfile['creationDate'] && this.clientProfile['creationDate']['formatted']) {
          this.clientProfile['creationDate'] = this.clientProfile['creationDate']['formatted'];
      }
  }

  // is edit function for read only
  editPersonalInfoForm() {
      this.beforeCancelPersonal = (<any>Object).assign({}, this.clientPersonalInfo);
      this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
  }

  // cancel button function
  cancelPersonalInfoEdit() {
      this.clientPersonalInfo = this.beforeCancelPersonal;
      this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
      if (this.clientPersonalInfo['dateOfBirth'] && this.clientPersonalInfo['dateOfBirth']['formatted']) {
          this.clientPersonalInfo['dateOfBirth'] = this.clientDetails['dateOfBirth']['formatted'];
      }

  }
  // send Invite Button function
    sendInvite(event) {
        let targetEvent = event;
        targetEvent.preventDefault();
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: 'Send Invite',
              message: 'An email will be sent to' + this.appService.firstName + ' ' + this.appService.lastName
              + ' ' + 'asking to accept the invitation to join' + ' ' + this.headerService.selectedOrg.displayName
              + '.' + '   ' + ' Are you sure you want to send the email invite again ?'
            }
        }).afterClosed().subscribe((isConfirmed) => {
          if (isConfirmed) {

            this.clientDetailsService.sendClientInvite(this.appService.clientId)
              .subscribe((res) => {
                event.stopPropagation();
                targetEvent.preventDefault();
              });
          } else {

          }
        })
    }

  // Save Client Details
  saveClientProfile() {
      this.mapFromClientProfile();
      if (this.clientDetails['fileNumber'] === '' || this.client['clientStatus'] === '' || this.clientProfile['email'] === '' || this.clientProfile['firstName'] === ''
        || this.clientProfile['lastName'] === '' || this.clientProfile['phoneNumber'] === '') {
          this.warningMessage = true;
      } else if (this.phoneNumber.errors != null) {
          this.warningMessage = false;
      } else {
        this.showProfileSaveButtonProgress = true;
        this.warningMessage = false;
        this.clientDetailsService.saveClientDetails(this.clientDetails, this.client, this.user.userId, this.headerService.user.accountId)
        .subscribe((res) => {
            this.isProfileEdit = true;
            this.showProfileSaveButtonProgress = false;
          if (res['statusCode'] === 'SUCCESS') {
            if (res['clientDetails']) {
              this.clientDetails = res['clientDetails'];
              this.mapToClientProfile();
              this.appService.firstName = this.clientDetails['firstName'];
              this.appService.lastName = this.clientDetails['lastName'];
            }
            if (res['client']) {
              this.client = res['client'];
              this.clientProfile.deletedByUserOn = this.client['deletedByUserOn'];
              this.clientProfile.lastUpdatedByUserOn = this.client['lastUpdatedByUserOn'];
              this.clientProfile.createdByUserOn = this.client['createdByUserOn'];
              this.clientProfile.markForDeletion = this.client['markForDeletion'];
            }
          } else if (res['statusCode'] === 'FAILURE') {
                this.dialog.open(InformationDialogComponent, {
                    data: {
                      title: 'Error',
                      message: 'Beneficiary has Active Petitions Associated'
                    }
                });
            }
        });
      }
  }

    // Save Client Details
    saveClientPersonalInfo() {
        if (this.ssn.errors != null) {
            this.warningMessage = false;
        } else {
            this.showPersonalInfoSaveButtonProgress = true;
            this.mapFromClientPersonalInfo();
            if (this.clientPersonalInfo['dateOfBirth'] && this.clientPersonalInfo['dateOfBirth']['formatted']) {
                this.clientDetails['dateOfBirth'] = this.clientDetails['dateOfBirth']['formatted'];
            }
            this.clientDetailsService.saveClientDetails(this.clientDetails, this.client, this.user.userId, this.headerService.user.accountId)
                .subscribe((res) => {
                    this.isPersonalInfoEdit = true;
                    this.showPersonalInfoSaveButtonProgress = false;
                    if (res['clientDetails']) {
                        this.clientDetails = res['clientDetails'];
                        this.mapToClientPersonalInfo();
                    }
                    if (res['client']) {
                        this.client = res['client'];
                        this.clientProfile.deletedByUserOn = this.client['deletedByUserOn'];
                        this.clientProfile.lastUpdatedByUserOn = this.client['lastUpdatedByUserOn'];
                        this.clientProfile.createdByUserOn = this.client['createdByUserOn'];
                        this.clientProfile.markForDeletion = this.client['markForDeletion'];
                    }
                });
        }

    }

    isProfileSaveButtonDisabled(): boolean {
      return this.phoneNumber.errors != null || this.showProfileSaveButtonProgress;
    }
    getProfileSaveButtonClass(): string {
      if (this.showProfileSaveButtonProgress) {
        return 'loader editbtn tbl-head-btn iportal-btnIMclient';
      } else if (this.phoneNumber.errors == null) {
        return 'editbtn tbl-head-btn iportal-btnIMclient';
      } else {
        return 'editbtn tbl-head-btn iportal-btnIMclient';
      }
    }

    mapToClientProfile() {
        this.clientProfile.fileNumber = this.clientDetails['fileNumber'];
        this.clientProfile.status = this.clientDetails['status'];
        this.clientProfile.creationDate = this.clientDetails['creationDate'];
        this.clientProfile.employeeId = this.clientDetails['employeeId'];
        this.clientProfile.email = this.clientDetails['email'];
        this.clientProfile.firstName = this.clientDetails['firstName'];
        this.clientProfile.middleName = this.clientDetails['middleName'];
        this.clientProfile.lastName = this.clientDetails['lastName'];
        this.clientProfile.phoneNumber = this.clientDetails['phoneNumber'];
    }

    mapFromClientProfile() {
        this.clientDetails['fileNumber'] = this.clientProfile.fileNumber;
        this.clientDetails['status'] = this.clientProfile.status;
        this.clientDetails['creationDate'] = this.clientProfile.creationDate;
        this.clientDetails['employeeId'] = this.clientProfile.employeeId;
        this.clientDetails['email'] = this.clientProfile.email;
        this.clientDetails['firstName'] = this.clientProfile.firstName;
        this.clientDetails['middleName'] = this.clientProfile.middleName;
        this.clientDetails['lastName'] = this.clientProfile.lastName;
        this.clientDetails['phoneNumber'] = this.clientProfile.phoneNumber;
        this.client['markForDeletion'] = this.clientProfile.markForDeletion;
    }
    mapToClientPersonalInfo() {
        this.clientPersonalInfo.gender = this.clientDetails['gender'];
        this.clientPersonalInfo.dateOfBirth = this.clientDetails['dateOfBirth'];
        this.clientPersonalInfo.ssn = this.clientDetails['ssn'];
        this.clientPersonalInfo.aleinRegistrationNumber = this.clientDetails['aleinRegistrationNumber'];
        this.clientPersonalInfo.countryOfBirth = this.clientDetails['countryOfBirth'];
        this.clientPersonalInfo.stateOfBirth = this.clientDetails['stateOfBirth'];
        this.clientPersonalInfo.citizenship = this.clientDetails['citizenship'];
        this.clientPersonalInfo.facebook = this.clientDetails['facebook'];
        this.clientPersonalInfo.linkedin = this.clientDetails['linkedin'];
        this.clientPersonalInfo.twitter = this.clientDetails['twitter'];
    }
    mapFromClientPersonalInfo() {
        this.clientDetails['gender'] = this.clientPersonalInfo.gender;
        this.clientDetails['dateOfBirth'] = this.clientPersonalInfo.dateOfBirth;
        this.clientDetails['ssn'] = this.clientPersonalInfo.ssn;
        this.clientDetails['aleinRegistrationNumber'] = this.clientPersonalInfo.aleinRegistrationNumber;
        this.clientDetails['countryOfBirth'] = this.clientPersonalInfo.countryOfBirth;
        this.clientDetails['stateOfBirth'] = this.clientPersonalInfo.stateOfBirth;
        this.clientDetails['citizenship'] = this.clientPersonalInfo.citizenship;
        this.clientDetails['facebook'] = this.clientPersonalInfo.facebook;
        this.clientDetails['linkedin'] = this.clientPersonalInfo.linkedin;
        this.clientDetails['twitter'] = this.clientPersonalInfo.twitter;
    }
}
