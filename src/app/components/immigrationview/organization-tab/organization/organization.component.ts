import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../../common/header/header.service';
import {Component, OnInit} from '@angular/core';
import {OrganizationService} from './organization.service';
import {FormControl, Validators} from '@angular/forms';
import {IHDateUtil} from '../../../framework/utils/date.component';
import {DialogService} from 'ng2-bootstrap-modal';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';


@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.sass'],
  providers: [OrganizationService]
})
export class OrganizationComponent implements OnInit {

    public warningMessage = false;
    highlightSBLink;
    isProfileEdit = true;
    isAdminEdit = true;
    isSigninEdit = true;
    public signinDetails: any = {};
    public adminstrativeDetails: any = {};
    signinAddress: any = {};
    public adminstrativeAddress: any = {};
    public isPersonProfileEdit;
    public orgDetails: any = {};
    public openDate: string;
    public beforeCancelOrg;
    public beforeCancelAdmin;
    public beforeCancelSignin;
    public datePikcerOptions= IHDateUtil.datePickerOptions;
    email: FormControl;
    public emailRegex;
    public status = [
                { value: 'Active', name: 'Active' },
                { value: 'Inactive', name: 'Inactive' }
                ];

    constructor(public appService: AppService, private  organizationService: OrganizationService,
        private dialogService: DialogService, private dialog: MatDialog, private headerService: HeaderService) {
            this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            this.email = new FormControl({value: '', disabled: this.isProfileEdit}, [Validators.required, Validators.pattern(this.emailRegex)]);
    }

    ngOnInit() {
      this.headerService.showSideBarMenu('organization', 'organization');

      this.organizationService.getOrganizationDetails(this.headerService.selectedOrg['orgId'])
        .subscribe((res) => {
            if (res['organizationDetails']) {
                this.orgDetails = res['organizationDetails'];
                if (this.orgDetails['markForDeletion'] === true) {
                    this.orgDetails['status'] = 'Mark for Deletion';
                }
            }
            for (let i = 0; i < res['contactDetails'].length; i++) {
                if (res['contactDetails'][i].contactType === 'SIGNING') {
                    this.signinDetails = res['contactDetails'][i];
                    this.signinAddress = this.signinDetails.address;
                } else {
                    this.adminstrativeDetails = res['contactDetails'][i];
                    this.adminstrativeAddress = this.adminstrativeDetails.address;
                }
            }

            this.isProfileEdit = true;
            this.isPersonProfileEdit = true;
        });
    }

    saveOrgProfile() {
        if (this.orgDetails['openDate'] && this.orgDetails['openDate']['formatted']) {
            this.orgDetails['openDate'] = this.orgDetails['openDate']['formatted'];
        }
        this.orgDetails['orgId'] = this.headerService.selectedOrg['orgId'];

        if (this.orgDetails['markForDeletion'] === 'true') {
            this.orgDetails['status'] = 'Mark for Deletion';
        }
        if (this.orgDetails['fileNumber'] === '' || this.orgDetails['fileNumber'] == null || this.orgDetails['fileNumber'] === undefined
            || this.orgDetails['orgName'] === '' || this.orgDetails['orgName'] == null || this.orgDetails['orgName'] === undefined
            || this.orgDetails['nameOnForms'] === '' || this.orgDetails['nameOnForms'] == null || this.orgDetails['nameOnForms'] === undefined
            || this.orgDetails['status'] === '' || this.orgDetails['status'] == null || this.orgDetails['status'] === undefined
            || this.orgDetails['email'] === '' || this.orgDetails['email'] == null || this.orgDetails['email'] === undefined) {
            this.warningMessage = true;
        } else if (this.email.errors != null) {
            this.warningMessage = true;
        } else {
            this.warningMessage = false;
            this.organizationService.saveOrgDetails(this.orgDetails, this.headerService.user.userId)
                .subscribe((res) => {
                    this.isProfileEdit = true;
                    this.email.enable();
                    if (res['organizationDetails']) {
                        this.orgDetails = res['organizationDetails'];
                    }

                    if (res['statusCode'] === 'FAILURE') {
                        this.dialog.open(InformationDialogComponent, {
                            data: {
                              title: 'Error',
                              message: 'Petitioner cannot be deleted as there are beneficiaries'
                            }
                        });

                        this.organizationService.getOrganizationDetails(this.headerService.selectedOrg['orgId'])
                            .subscribe((res1) => {
                                if (res1['organizationDetails']) {
                                    this.orgDetails = res1['organizationDetails'];
                                    if (this.orgDetails['markForDeletion'] === true) {
                                        this.orgDetails['status'] = 'Mark for Deletion';
                                    }
                                }
                            });
                    }
                });
        }
    }

    editProfileForm() {
        this.beforeCancelOrg = (<any>Object).assign({}, this.orgDetails);
        this.isProfileEdit = !this.isProfileEdit;
        this.openDate = this.orgDetails.openDate;
        this.orgDetails.markForDeletion = this.orgDetails['markForDeletion'];
        this.email.enable();
    }

    cancelProfileEdit() {
        this.orgDetails = this.beforeCancelOrg;
        this.isProfileEdit = !this.isProfileEdit;
        this.warningMessage = false;
        if (this.orgDetails['openDate'] && this.orgDetails['openDate']['formatted']) {
            this.orgDetails['openDate'] = this.orgDetails['openDate']['formatted'];
        }
        this.email.disable();
    }

    editPersonProfileForm() {
        this.isPersonProfileEdit = !this.isPersonProfileEdit;
    }
    cancelPersonProfileEdit() {
        this.isPersonProfileEdit = !this.isPersonProfileEdit;
    }

    // For signing form
    // is edit function for read only
    editSigninDetails() {
        this.beforeCancelSignin = (<any>Object).assign({}, this.signinDetails);
        this.isSigninEdit = !this.isSigninEdit;
    }

    // cancel button function
    cancelSigninEdit() {
        this.signinDetails = this.beforeCancelSignin;
        this.isSigninEdit = !this.isSigninEdit;
    }

    // Save Client Details
    saveSignInformation() {
        this.signinDetails.orgId = this.headerService.selectedOrg['orgId'];
        this.signinDetails.contactType = 'SIGNING';
        this.signinAddress.aptType = 'APT';
        this.organizationService.saveSigningDetails(this.signinDetails, this.signinAddress)
            .subscribe((res) => {
                this.isSigninEdit = true;
                if (res['contactDetails']) {
                    this.signinDetails = res['contactDetails'];
                    this.signinAddress = this.signinDetails.address;
                }
            });

    }

    // Adminstrative Form
    editAdminDetails() {
        this.beforeCancelAdmin = (<any>Object).assign({}, this.adminstrativeDetails);
        this.isAdminEdit = !this.isAdminEdit;
    }
    cancelAdminEdit() {
        this.adminstrativeDetails = this.beforeCancelAdmin;
        this.isAdminEdit = !this.isAdminEdit;
    }

    // Save Client Details
    saveAdminInformation() {
        this.adminstrativeDetails.orgId = this.headerService.selectedOrg['orgId'];
        this.adminstrativeDetails.contactType = 'ADMINISTRATION';
        this.adminstrativeDetails.aptType = 'APT';
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
