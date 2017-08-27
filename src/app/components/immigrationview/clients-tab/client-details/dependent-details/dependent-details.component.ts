import { ImmigrationdependentPersonalInfo } from '../../../../../models/dependentdetailspersnolinfo';
import { ImmigrationdependentProfile } from '../../../../../models/dependentdetailsprofile';
import { AppService } from '../../../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import {DependentDetailsService} from "./dependent-details.service";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';

import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
  selector: 'app-dependentDetails',
  templateUrl: './dependent-details.component.html',
  styleUrls: ['./dependent-details.component.sass']
})
export class DependentDetailsComponent implements OnInit {
    private dependent: any = {} ;
    public editUser: FormGroup;
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    private message: string;
    private status: any[];
    private gender: any[];
    //Profile section variables
    isProfileEdit;
    isPersonalInfoEdit;
    dependentFirstName;
    dependentLastName;
    public dependentDetails: any = {};
    public dependentProfile: ImmigrationdependentProfile = new ImmigrationdependentProfile();
    private dependentPersonalInfo: ImmigrationdependentPersonalInfo = new ImmigrationdependentPersonalInfo();
    private creationDate: string;
    private dateOfBirth: string;
    private beforeCancelProfile;
    private beforeCancelPersonal;
    public warningMessage:boolean=false;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };

    constructor(private dependentDetailsService: DependentDetailsService,
        private formBuilder: FormBuilder, private appService: AppService,
        private route: ActivatedRoute,
          private router: Router) {
    }

    onDateChanged(event: IMyDateModel) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
             let dependentId = params['dependentId'];
             this.dependentDetailsService.getDependentDetails(dependentId)
              .subscribe((res) => {
                  if (res['dependent']) {
                      this.dependent = res['dependent'];
                      console.log(this.dependent);
                      this.dependentDetails = res;
                      this.mapToClientProfile();
                      this.mapToClientPersonalInfo();

                  }
                  this.dependentFirstName = res['dependent']['firstName'];
                  this.dependentLastName = res['dependent']['lastName'];
                  this.isProfileEdit = true;
                  this.isPersonalInfoEdit = true;
              });
           });

        this.status = [
            { value: '0', name: 'Active' },
            { value: '1', name: 'Inactive' },
            { value: '2', name: 'Mark for del' }
        ]

        this.gender = [
            { value: '0', name: 'Male' },
            { value: '1', name: 'Female' }

        ]
    }

    //is edit function for read only
    editProfileForm() {
        this.beforeCancelProfile = (<any>Object).assign({}, this.dependent);
        this.isProfileEdit = !this.isProfileEdit;
        this.creationDate = this.dependent['creationDate'];
     }

    //cancel button function
    cancelProfileEdit() {
        this.mapToClientProfile();
        this.dependent = this.beforeCancelProfile;
        this.isProfileEdit = !this.isProfileEdit;
        this.warningMessage = false;

        if (this.dependentProfile['creationDate'] && this.dependentProfile['creationDate']['formatted']) {
            this.dependentProfile['creationDate'] = this.dependentProfile['creationDate']['formatted'];
        }

    }

    //is edit function for read only
    editPersonalInfoForm() {
        this.beforeCancelPersonal = (<any>Object).assign({}, this.dependent);
        this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
        this.dateOfBirth = this.dependent['dateOfBirth'];


    }

    //cancel button function
    cancelPersonalInfoEdit() {
        this.mapToClientPersonalInfo();
        this.dependent = this.beforeCancelPersonal;
        this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
        if (this.dependentPersonalInfo['dateOfBirth'] && this.dependentPersonalInfo['dateOfBirth']['formatted']) {
            this.dependentPersonalInfo['dateOfBirth'] = this.dependentPersonalInfo['dateOfBirth']['formatted'];
        }
    }


    //Save Client Details
    saveClientProfile() {

        if (this.dependentProfile['creationDate'] && this.dependentProfile['creationDate']['formatted']) {
            this.dependentProfile['creationDate'] = this.dependentProfile['creationDate']['formatted'];
        }
        if (this.dependentProfile['firstName'] == undefined || this.dependentProfile['lastName'] == undefined || this.dependentProfile['relation'] == undefined || this.dependentProfile['fileNumber'] == undefined ||
            this.dependentProfile['firstName'] == "" || this.dependentProfile['lastName'] == "" || this.dependentProfile['relation'] == "" || this.dependentProfile['fileNumber'] == "" ||
            this.dependentProfile['firstName'] == null || this.dependentProfile['lastName'] == null || this.dependentProfile['relation'] == null || this.dependentProfile['fileNumber'] == null){
            this.warningMessage=true;
        }
        else{
            this.warningMessage = false;
            this.mapFromClientProfile();
            this.dependentDetailsService.saveDependentDetails(this.dependent,this.appService.user.userId)
            .subscribe((res) => {
                this.isProfileEdit = true;
                if (res['dependent']) {
                    this.dependent = res['dependent'];
                  this.mapToClientProfile();

                }

            });
        }


    }

    //Save Client Details
    saveClientPersonalInfo() {

        if (this.dependentPersonalInfo['dateOfBirth'] && this.dependentPersonalInfo['dateOfBirth']['formatted']) {
            this.dependentPersonalInfo['dateOfBirth'] = this.dependentPersonalInfo['dateOfBirth']['formatted'];
        }

        this.mapFromClientPersonalInfo();

          this.dependentDetailsService.saveDependentDetails(this.dependent,this.appService.user.userId)
            .subscribe((res) => {
                this.isPersonalInfoEdit = true;
                if (res['dependent']) {
                    this.dependent = res['dependent'];
               this.mapToClientPersonalInfo();
                }
        });
    }


    mapToClientProfile() {
        this.dependentProfile.fileNumber = this.dependent['fileNumber'];
        this.dependentProfile.status = this.dependent['status'];
        this.dependentProfile.creationDate = this.dependent['creationDate'];
        this.dependentProfile.employeeId = this.dependent['employeeId'];
        this.dependentProfile.email = this.dependent['email'];
        this.dependentProfile.firstName = this.dependent['firstName'];
        this.dependentProfile.middleName = this.dependent['middleName'];
        this.dependentProfile.lastName = this.dependent['lastName'];
        this.dependentProfile.phoneNumber = this.dependent['phoneNumber'];
        this.dependentProfile.relation = this.dependent['relation'];
        this.dependentProfile.markForDeletion = this.dependent['markForDeletion'];
        this.dependentProfile.deletedBy = this.dependent['deletedBy'];
        this.dependentProfile.deletedOn = this.dependent['deletedOn'];
    }

    mapFromClientProfile() {
        this.dependent['fileNumber'] = this.dependentProfile.fileNumber;
        this.dependent['status'] = this.dependentProfile.status;
        this.dependent['creationDate'] = this.dependentProfile.creationDate;
        this.dependent['employeeId'] = this.dependentProfile.employeeId;
        this.dependent['email'] = this.dependentProfile.email;
        this.dependent['firstName'] = this.dependentProfile.firstName;
        this.dependent['middleName'] = this.dependentProfile.middleName;
        this.dependent['lastName'] = this.dependentProfile.lastName;
        this.dependent['phoneNumber'] = this.dependentProfile.phoneNumber;
        this.dependent['relation'] = this.dependentProfile.relation;
        this.dependent['markForDeletion'] = this.dependentProfile.markForDeletion;
        this.dependent['deletedBy'] = this.dependentProfile.deletedBy;
        this.dependent['deletedOn'] = this.dependentProfile.deletedOn;
    }



    mapToClientPersonalInfo() {
        this.dependentPersonalInfo.gender = this.dependent['gender'];
        this.dependentPersonalInfo.dateOfBirth = this.dependent['dateOfBirth'];
        this.dependentPersonalInfo.ssn = this.dependent['ssn'];
        this.dependentPersonalInfo.alienRegistrationNumber = this.dependent['alienRegistrationNumber'];
        this.dependentPersonalInfo.countryOfBirth = this.dependent['countryOfBirth'];
        this.dependentPersonalInfo.stateOfBirth = this.dependent['stateOfBirth'];
        this.dependentPersonalInfo.nationality = this.dependent['nationality'];
        this.dependentPersonalInfo.citizenship = this.dependent['citizenship'];
        this.dependentPersonalInfo.facebook = this.dependent['facebook'];
        this.dependentPersonalInfo.linkedin = this.dependent['linkedin'];
        this.dependentPersonalInfo.twitter = this.dependent['twitter'];
    }

    mapFromClientPersonalInfo() {
        this.dependent['gender'] = this.dependentPersonalInfo.gender;
        this.dependent['dateOfBirth'] = this.dependentPersonalInfo.dateOfBirth;
        this.dependent['ssn'] = this.dependentPersonalInfo.ssn;
        this.dependent['alienRegistrationNumber'] = this.dependentPersonalInfo.alienRegistrationNumber;
        this.dependent['countryOfBirth'] = this.dependentPersonalInfo.countryOfBirth;
        this.dependent['stateOfBirth'] = this.dependentPersonalInfo.stateOfBirth;
        this.dependent['nationality'] = this.dependentPersonalInfo.nationality;
        this.dependent['citizenship'] = this.dependentPersonalInfo.citizenship;
        this.dependent['facebook'] = this.dependentPersonalInfo.facebook;
        this.dependent['linkedin'] = this.dependentPersonalInfo.linkedin;
        this.dependent['twitter'] = this.dependentPersonalInfo.twitter;
    }

}

