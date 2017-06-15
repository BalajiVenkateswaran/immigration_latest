import { Component, OnInit } from '@angular/core';
import {OrganizationService} from "./organization.service";
import {organizations} from "../../models/organization";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {UiFieldService} from "../../services/uifield.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent implements OnInit {


    isProfileEdit;
    isAdminEdit: boolean = true;
    isSigninEdit: boolean = true;
    private signinDetails: any = {};
    private adminstrativeDetails: any = {};
    private signinAddress: any = {};
    private adminstrativeAddress: any = {};
    private isPersonProfileEdit;
    private orgDetails: any = {};
    private openDate:string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    private beforeCancelOrg;
    private beforeCancelAdmin;
    private beforeCancelSignin;

    private status = [
                { value: 'Active', name: 'Active' },
                { value: 'Inactive', name: 'Inactive' },
                { value: 'Mark for Deletion', name: 'Mark for Deletion' }
                ];

    constructor(private uiFieldService: UiFieldService,
        private formBuilder: FormBuilder, private appService: AppService, private  organizationService: OrganizationService, private dialogService: DialogService) {
    }

    ngOnInit() {
      this.appService.showSideBarMenu("organization", "organization");

      this.organizationService.getOrganizationDetails(this.appService.orgId)
        .subscribe((res) => {
            if (res['organizationDetails']) {
                this.orgDetails = res['organizationDetails'];
                console.log(this.orgDetails);
            }
            for (var i = 0; i < res['contactDetails'].length; i++) {
                if (res['contactDetails'][i].contactType == "SIGNING") {
                    this.signinDetails = res['contactDetails'][i];
                    this.signinAddress = this.signinDetails.address;
                }
                else {
                    this.adminstrativeDetails = res['contactDetails'][i];
                    this.adminstrativeAddress = this.adminstrativeDetails.address;
                }

            }

            this.isProfileEdit = true;
            this.isPersonProfileEdit = true;
        });
    }


    onDateChanged(event: IMyDateModel) {
    }

    saveOrgProfile() {


        if (this.orgDetails['openDate'] && this.orgDetails['openDate']['formatted']) {
            this.orgDetails['openDate'] = this.orgDetails['openDate']['formatted'];
        }
        this.orgDetails['orgId'] = this.appService.orgId;

        this.organizationService.saveOrgDetails(this.orgDetails, this.appService.user.userId)
            .subscribe((res) => {
                this.isProfileEdit = true;
                if (res['organizationDetails']) {
                   this.orgDetails = res['organizationDetails'];
                }

                if (res['statusCode'] == "FAILURE") {
                                    this.dialogService.addDialog(ConfirmComponent, {
                                        title: 'Error..!',
                                        message: 'Organization has Active Clients Associated..'
                                    });
                                }
            });

    }

    editProfileForm() {
        this.beforeCancelOrg = (<any>Object).assign({}, this.orgDetails);
        this.isProfileEdit = !this.isProfileEdit;
        this.openDate = this.orgDetails.openDate;
        this.orgDetails.markForDeletion= this.orgDetails['markForDeletion'];
   }

    cancelProfileEdit() {
        this.orgDetails = this.beforeCancelOrg;
        this.isProfileEdit = !this.isProfileEdit;

        if (this.orgDetails['openDate'] && this.orgDetails['openDate']['formatted']) {
            this.orgDetails['openDate'] = this.orgDetails['openDate']['formatted'];
        }


    }

    editPersonProfileForm()
    {
        this.isPersonProfileEdit = !this.isPersonProfileEdit;
    }
    cancelPersonProfileEdit()
    {
        this.isPersonProfileEdit = !this.isPersonProfileEdit;
    }

    //For signing form
    //is edit function for read only
    editSigninDetails() {
        this.beforeCancelSignin = (<any>Object).assign({}, this.signinDetails);
        this.isSigninEdit = !this.isSigninEdit;
    }

    //cancel button function
    cancelSigninEdit() {
        this.signinDetails = this.beforeCancelSignin;
        this.isSigninEdit = !this.isSigninEdit;
    }

    //Save Client Details
    saveSignInformation() {
        this.signinDetails.orgId = this.appService.orgId;
        this.signinDetails.contactType = "SIGNING";
        this.signinAddress.aptType = "APT";
        this.organizationService.saveSigningDetails(this.signinDetails, this.signinAddress)
            .subscribe((res) => {
                this.isSigninEdit = true;
                if (res['contactDetails']) {
                    this.signinDetails = res['contactDetails'];
                    this.signinAddress = this.signinDetails.address;
                }
            });

    }

    //Adminstrative Form
    editAdminDetails() {
        this.beforeCancelAdmin = (<any>Object).assign({}, this.adminstrativeDetails);
        this.isAdminEdit = !this.isAdminEdit;
    }
    cancelAdminEdit() {
        this.adminstrativeDetails = this.beforeCancelAdmin;
        this.isAdminEdit = !this.isAdminEdit;
    }

    //Save Client Details
    saveAdminInformation() {
        this.adminstrativeDetails.orgId = this.appService.orgId;
        this.adminstrativeDetails.contactType = "ADMINISTRATION";
        this.adminstrativeDetails.aptType = "APT";
        this.organizationService.saveAdminstrativeDetails(this.adminstrativeDetails, this.adminstrativeAddress)
            .subscribe((res) => {
                this.isAdminEdit = true;
                if (res['contactDetails']) {
                    this.adminstrativeDetails = res['contactDetails'];
                    this.adminstrativeAddress = this.adminstrativeDetails.address;
                }
            });


    }


}
