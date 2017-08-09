import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from "../../services/app.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ImmigrationViewClientDetailsService } from "./client-details.service";
import { ImmigrationViewClientProfile } from "../../models/immigrationviewclientprofile";
import { ImmigrationViewClientPersonalInfo } from "../../models/ImmigrationViewClientPersonalInfo";
import { User } from "../../models/user";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss']
})
export class ImmigrationViewClientDetailsComponent implements OnInit {

    clientDetails: any = {};
    private client: any = {};
    private clientProfile: ImmigrationViewClientProfile = new ImmigrationViewClientProfile();
    private clientPersonalInfo: ImmigrationViewClientPersonalInfo = new ImmigrationViewClientPersonalInfo();
    phoneNumber: FormControl;
    public phoneRegex;
    //Profile section variables
    isProfileEdit;
    isPersonalInfoEdit;
    private status: any[];
    private gender: any[];
    private user: User;
    private dateOfBirth: string;
    private creationDate: string;
    public warningMessage: boolean = false;
    public user1;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelProfile;
    private beforeCancelPersonal;
    public disableSendInvite: boolean;
    constructor(public appService: AppService, private clientDetailsService: ImmigrationViewClientDetailsService, private dialogService: DialogService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
       this.phoneRegex=/^[\+]?[0-9]*[\-]?[(]?[0-9]{3}[)]?[-]?[0-9]{3}[-]?[0-9]{4,6}$/;
       this.phoneNumber=new FormControl('', [Validators.required,Validators.pattern(this.phoneRegex)]);
       this.getClientDetails();
    }

    ngOnInit() {
        this.appService.showSideBarMenu("immigrationview-client", "clients");
        this.appService.dependents = [];
         this.status = [
            { value: 'Active', name: 'Active' },
            { value: 'Inactive', name: 'Inactive' }
        ]

        this.gender = [
            { value: '0', name: 'Male' },
            { value: '1', name: 'Female' }

        ]

    }
    getClientDetails(){

        this.clientDetailsService.getClientDetails(this.appService.clientId)
            .subscribe((res) => {
                if (res['clientDetails']) {

                    this.clientDetails = res['clientDetails'];
                    this.user1 = res['clientDetails']['userId'];
                    this.appService.clientfirstName = res['clientDetails']['firstName'];
                    this.appService.clientlastName = res['clientDetails']['lastName'];

                    this.mapToClientProfile();
                    this.mapToClientPersonalInfo();
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

                if(res['enableSendInvite'] != undefined){
                  this.disableSendInvite = !res['enableSendInvite'];
                }

                this.isProfileEdit = true;
                this.isPersonalInfoEdit = true;
            });
    }

    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    //is edit function for read only
    editProfileForm() {
        this.beforeCancelProfile = (<any>Object).assign({}, this.clientProfile);
        this.isProfileEdit = !this.isProfileEdit;
        this.clientProfile.deletedByUserOn = this.clientProfile.deletedByUserOn;
        this.clientProfile.lastUpdatedByUserOn = this.clientProfile.lastUpdatedByUserOn;
        this.clientProfile.createdByUserOn = this.clientProfile.createdByUserOn;
        this.clientProfile.markForDeletion = this.clientProfile.markForDeletion;
    }


    //cancel button function
    cancelProfileEdit() {
        this.clientProfile = this.beforeCancelProfile;
        this.isProfileEdit = !this.isProfileEdit;
        if (this.clientProfile['creationDate'] && this.clientProfile['creationDate']['formatted']) {
            this.clientProfile['creationDate'] = this.clientProfile['creationDate']['formatted'];
        }
    }

    //is edit function for read only
    editPersonalInfoForm() {
        this.beforeCancelPersonal = (<any>Object).assign({}, this.clientPersonalInfo);
        this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
        this.dateOfBirth = this.clientDetails['dateOfBirth'];
    }

    //cancel button function
    cancelPersonalInfoEdit() {
        this.clientPersonalInfo = this.beforeCancelPersonal;
        this.isPersonalInfoEdit = !this.isPersonalInfoEdit;
        if (this.clientPersonalInfo['dateOfBirth'] && this.clientPersonalInfo['dateOfBirth']['formatted']) {
            this.clientPersonalInfo['dateOfBirth'] = this.clientDetails['dateOfBirth']['formatted'];
        }

    }
    //send Invite Button function
    sendInvite() {
        this.clientDetailsService.sendClientInvite(this.appService.clientId)
            .subscribe((res) => {
                console.log("Email sent");
            });
    }
    onDateChanged(event: IMyDateModel) {
    }

    //Save Client Details
    saveClientProfile() {
        this.mapFromClientProfile();
        if (this.clientDetails['fileNumber'] == '' || this.client['clientStatus'] == '' || this.clientProfile['email'] == '' || this.clientProfile['firstName'] == '' || this.clientProfile['lastName'] == '' || this.clientProfile['phoneNumber'] == '') {
            this.warningMessage = true;
        }
        else if(this.phoneNumber.errors!=null){
            this.warningMessage=false;
        }
        else {
            this.warningMessage = false;
            this.clientDetailsService.saveClientDetails(this.clientDetails, this.client, this.user.userId)
                .subscribe((res) => {
                    this.isProfileEdit = true;
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
                    if (res['statusCode'] == "FAILURE") {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Error..!',
                            message: 'Client has Active Petitions Associated..'
                        });
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

        this.clientDetailsService.saveClientDetails(this.clientDetails, this.client, this.user.userId)
            .subscribe((res) => {
                this.isPersonalInfoEdit = true;
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
