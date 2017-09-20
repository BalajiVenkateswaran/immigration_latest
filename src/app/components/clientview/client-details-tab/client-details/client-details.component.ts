import {Component, OnInit} from '@angular/core';
import {ClientDetailsService} from "./client-details.service";
import {clientdetails} from "../../../../models/clientdetails";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {AppService} from "../../../../services/app.service";
import {ImmigrationViewClientProfile} from "../../../../models/immigrationviewclientprofile";
import {ImmigrationViewClientPersonalInfo} from "../../../../models/ImmigrationViewClientPersonalInfo";

import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {User} from "../../../../models/user";
import {HeaderService} from "../../../common/header/header.service";

export interface formControl {
  name: string;
  value: FormControl;
}

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.sass']
})
export class ClientDetailsComponent implements OnInit {

  private clientdetailsList: any;
  private client: any = {};
  public editUser: FormGroup; // our model driven form
  private fieldsList: clientdetails[];
  private status: any[];
  private gender: any[];
  private formControlValues: any = {};
  isEdit: boolean[] = [true];
  private message: string;
  isProfileEdit;
  isPersonalInfoEdit;
  clientDetails: any = {};
  public warningMessage: boolean = false;
  private clientProfile: ImmigrationViewClientProfile = new ImmigrationViewClientProfile();

  private clientPersonalInfo: ImmigrationViewClientPersonalInfo = new ImmigrationViewClientPersonalInfo();

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };
  private creationDate: string;
  private dateOfBirth: string;
  private user: User;
  private beforeCancelProfile;
  private beforeCancelPersonal;
  constructor(private ClientDetailsService: ClientDetailsService,
    private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter,
    public appService: AppService, private clientDetailsService: ClientDetailsService, public headerService: HeaderService) {

    if (this.headerService.user) {
      this.user = this.headerService.user;
    }
  }
  ngOnInit() {
    this.headerService.showSideBarMenu("clientView-client", "clientview-client-details");
    this.clientDetailsService.getClientDetails(this.user.userId)
      .subscribe((res) => {
        if (res['clientDetails']) {
          this.clientDetails = res['clientDetails'];

          console.log(this.clientDetails);

          this.appService.firstName = res['clientDetails'].firstName;
          this.appService.lastName = res['clientDetails'].lastName;
          this.mapToClientProfile();
          this.mapToClientPersonalInfo();
        }
        if (res['client']) {
          this.client = res['client'];
        }
        this.isProfileEdit = true;
        this.isPersonalInfoEdit = true;
      });

    this.status = [
      {value: 'Active', name: 'Active'},
      {value: 'Inactive', name: 'Inactive'},
      {value: 'Mark for Deletion', name: 'Mark for Deletion'}
    ]
    this.gender = [
      {value: '0', name: 'Male'},
      {value: '1', name: 'Female'}

    ]
    this.creationDate = this.clientDetails.creationDate;
    this.dateOfBirth = this.clientDetails.dateOfBirth;
  }

  onDateChanged(event: IMyDateModel) {


  }



  editProfileForm() {
    this.beforeCancelProfile = (<any>Object).assign({}, this.clientProfile);
    this.isProfileEdit = !this.isProfileEdit;
    this.creationDate = this.clientDetails['creationDate'];
  }

  cancelProfileEdit() {
    this.clientProfile = this.beforeCancelProfile;
    this.isProfileEdit = !this.isProfileEdit;
    if (this.clientProfile['creationDate'] && this.clientProfile['creationDate']['formatted']) {
      this.clientProfile['creationDate'] = this.clientProfile['creationDate']['formatted'];
    }
  }

  editPersonalInfoForm() {
    this.beforeCancelPersonal = (<any>Object).assign({}, this.clientPersonalInfo);
    this.dateOfBirth = this.clientDetails['dateOfBirth'];
    this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
  }
  cancelPersonalInfoEdit() {
    this.clientPersonalInfo = this.beforeCancelPersonal;
    if (this.clientPersonalInfo['dateOfBirth'] && this.clientPersonalInfo['dateOfBirth']['formatted']) {
      this.clientPersonalInfo['dateOfBirth'] = this.clientPersonalInfo['dateOfBirth']['formatted'];
    }
    this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
  }
  saveClientProfile() {
    this.mapFromClientProfile();

    if (this.clientProfile['creationDate'] && this.clientProfile['creationDate']['formatted']) {
      this.clientDetails['creationDate'] = this.clientDetails['creationDate']['formatted'];
    }
    if (this.clientDetails['lastName'] == '' || this.clientDetails['lastName'] == null || this.clientDetails['lastName'] == undefined || this.clientDetails['phoneNumber'] == '' || this.clientDetails['phoneNumber'] == null || this.clientDetails['phoneNumber'] == undefined || this.clientDetails['firstName'] == '' || this.clientDetails['firstName'] == null || this.clientDetails['firstName'] == undefined) {
      this.warningMessage = true;
    }
    else {
      this.warningMessage = false;
      this.clientDetailsService.saveClientDetails(this.clientDetails, this.client)
        .subscribe((res) => {
          this.isProfileEdit = true;
          if (res['clientDetails']) {
            this.clientDetails = res['clientDetails'];
            this.mapToClientProfile();
          }
        });
    }

  }

  //Save Client Details
  saveClientPersonalInfo() {
    this.mapFromClientPersonalInfo();
    if (this.clientPersonalInfo['dateOfBirth'] && this.clientPersonalInfo['dateOfBirth']['formatted']) {
      this.clientDetails['dateOfBirth'] = this.clientDetails['dateOfBirth']['formatted'];
    }
    this.clientDetailsService.saveClientDetails(this.clientDetails, this.client)
      .subscribe((res) => {
        this.isPersonalInfoEdit = true;
        if (res['clientDetails']) {
          this.clientDetails = res['clientDetails'];
          this.mapToClientPersonalInfo();
        }
      });


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
    this.clientProfile.markForDeletion = this.clientDetails['markForDeletion'];
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
    this.clientDetails['markForDeletion'] = this.clientProfile.markForDeletion;
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


