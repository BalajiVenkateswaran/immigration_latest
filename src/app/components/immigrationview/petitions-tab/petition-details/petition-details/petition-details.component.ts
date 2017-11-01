import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { ImmigrationViewPetitionInformation } from '../../../../../models/ImmigrationViewPetitionInformation';
import { AppService } from '../../../../../services/app.service';
import { PetitionDetailsService } from "./petition-details.service";
import { IhDateUtil } from '../../../../framework/utils/date.component';
import {ConfirmComponent} from "../../../../framework/confirmbox/confirm.component";
import {DialogService} from "ng2-bootstrap-modal";
import {HeaderService} from "../../../../common/header/header.service";


@Component({
    selector: 'app-petition-details',
    templateUrl: './petition-details.component.html',
    styleUrls: ['./petition-details.component.sass']
})
export class PetitionDetailsComponent implements OnInit {
    isNotesEdit;
    private users;
    private notes: string;
    isPetitionInformationEdit;
    isPetitionInformationSave;
    isPetitionInformationSaveStatus;
    private allPetitionTypesAndSubTypes;
    public petitionStages;
    private assignedToName;
    private backendLCAInfo;
    private backendReceiptInfo;
    private beforeCancelSponsor;
    private beforeCancelPetition;
    public orgs: any = [];
    public status: any[];
    private receiptNumber: any[];
    public delegatedOrgsList: any[];
    private startDate: string;
    private deniedDate: string;
    private withdrawDate: string;
    private assignedDate: string;
    private approvedDate: string;
    private validThruDate: string;
    private effectiveOn: string;
    private effectiveTill: string;
    private rejectedDate: string;
    private receiptDate: string;
    private shippingDate: string;
    private receiptNoticeDate: string;
    private approvedOn: string;
    private validFrom: string;
    private expiresOn: string;
    private defaultSelected: string;
    private approvalReceivedOn: string;
    private sentToGovAgencyOn: string;
    sfmpi: boolean = false;
    sfmRI: boolean = false;
    private petitionDetails: any = {};
    private lcaInfo: any = {};
    private sponsorInfo: any = {};
    public receiptInfo: any = {};
    private sponsorInfoAddress: any = {};
    private petitionAdditionalDetails: any = {};
    public datePickerOptions = IhDateUtil.datePickerOptions;
    isLCAInfoEdit: boolean = true;
    isReceiptInfoEdit: boolean = true;
    isReceiptInfoSave: boolean = false;
    isReceiptInfoSaveStatus: boolean = false;
    isSponsorInfoEdit: boolean = true;
    isDelegatedOrgsEdit: boolean = true;
    isAdditionalDetailsEdit: boolean = true;
    public finalStatus: any[] = [
        { name: 'Pending', value: 'Pending' },
        { name: 'Approved', value: 'Approved' },
        { name: 'Denied', value: 'Denied' },
        { name: 'Withdrawn', value: 'Withdrawn' },
        { name: 'Rejected', value: 'Rejected' },
        { name: 'RFE', value: 'RFE' }
    ];
    petitionInformation: ImmigrationViewPetitionInformation = new ImmigrationViewPetitionInformation();
    constructor(public appService: AppService, private petitionDetailsService: PetitionDetailsService,
                public dialogService: DialogService, public headerService: HeaderService) {
    }
    ngOnInit() {
        this.headerService.showSideBarMenu("immigrationview-petition", "petitions");
        this.petitionDetailsService.getPetitionDetails(this.appService.petitionId)
            .subscribe((res) => {
                if (res['petitionInfo'] != undefined) {
                    this.petitionDetails = res['petitionInfo'];
                    this.appService.petitionDetails = res['petitionInfo']['name'];
                    this.petitionInformation = this.petitionDetails;
                    //TODO - Set client first name and last name to appService
                }
                if (res['receiptInfo'] != undefined) {
                    this.receiptInfo = res['receiptInfo'];
                }
                if (res['petitionAdditionalDetails'] != undefined) {
                    this.petitionAdditionalDetails = res['petitionAdditionalDetails'];
                }
                if (res['lcaInfo'] != undefined) {
                    this.lcaInfo = res['lcaInfo'];
                }
                if (res['sponsorInfo'] != undefined) {
                    this.sponsorInfo = res['sponsorInfo'];
                    this.sponsorInfoAddress = this.sponsorInfo.address;
                }

                if (res['clientId'] != undefined) {
                    this.appService.clientId = res['clientId'];
                }
                this.isPetitionInformationEdit = true;
                this.isPetitionInformationSave = false;
                this.isPetitionInformationSaveStatus = false;
                this.isNotesEdit = true;
                this.isLCAInfoEdit = true;
                this.isDelegatedOrgsEdit = true;
                this.isReceiptInfoEdit = true;
                this.isReceiptInfoSave = false;
                this.isReceiptInfoSaveStatus = false;
                this.isAdditionalDetailsEdit = true;
                this.isSponsorInfoEdit = true;
                this.startDate = this.petitionDetails.startDate;
                this.deniedDate = this.petitionDetails.deniedDate;
                this.withdrawDate = this.petitionDetails.withdrawDate;
                this.rejectedDate = this.petitionDetails.rejectedDate;
                this.approvedDate = this.lcaInfo.approvedDate;
                this.assignedDate = this.lcaInfo.assignedDate;
                this.validThruDate = this.lcaInfo.validThruDate;
                this.effectiveOn = this.lcaInfo.effectiveOn;
                this.effectiveTill = this.lcaInfo.effectiveTill;
                this.receiptDate = this.receiptInfo.receiptDate;
                this.receiptNoticeDate = this.receiptInfo.receiptNoticeDate;
                this.approvedOn = this.receiptInfo.approvedOn;
                this.validFrom = this.receiptInfo.validFrom;
                this.expiresOn = this.receiptInfo.expiresOn;
                this.approvalReceivedOn = this.receiptInfo.approvalReceivedOn;
                this.sentToGovAgencyOn = this.receiptInfo.sentToGovAgencyOn;
                if (res['petitionTypeId'] != undefined) {
                    this.petitionDetailsService.getPetitionStages(this.headerService.user.accountId, res['petitionTypeId'])
                        .subscribe((res) => {
                            this.petitionStages = res['petitionStageList'];
                        });
                }
                this.petitionDetailsService
                    .getUsersForAccount(this.headerService.user.accountId)
                    .subscribe((res) => {
                        this.users = res['users'];
                        this.users.filter(user => {
                            if (user.emailId == this.petitionDetails['assignedTo'])
                                this.assignedToName = user.firstName + ', ' + user.lastName;
                        });
                    });
            });
        this.getPetionDelOrgs();
        this.status = [
            { value: '0', name: 'Open' },
            { value: '1', name: 'Close' },

        ];
        this.receiptNumber = [
            { value: '1', name: 'Yes' },
            { value: '0', name: 'No' },

        ];

        if (this.petitionDetails['markForDeletion'] == true) {
            this.petitionDetails['status'] == "MFD";
        }
        this.defaultSelected = this.receiptNumber[1].name;
        this.petitionDetailsService.getAllPetitionTypesAndSubTypes()
            .subscribe((res) => {
                this.allPetitionTypesAndSubTypes = res['petitionTypes'];
            });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    getPetionDelOrgs() {
        this.petitionDetailsService.getDelegatedOrgs(this.headerService.user.accountId, this.appService.petitionId).subscribe((res) => {
            if (res['orgs'] != undefined) {
                this.delegatedOrgsList = res['orgs'];
            }
        });
    }
    sendchecklist() {
        this.petitionDetailsService.sendChecklist(this.headerService.user.accountId, this.appService.petitionId).subscribe((res) => {

        });
    }

    //is edit function for read only
    onEditPetitionInfoClick() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionInformation);
        this.startDate = this.petitionInformation.startDate;
        this.deniedDate = this.petitionInformation.deniedDate;
        this.withdrawDate = this.petitionInformation.withdrawDate;
        this.rejectedDate = this.petitionInformation.rejectedDate;
        this.petitionInformation.currentStage = this.petitionDetails.currentStageId;
        this.petitionInformation.markForDeletion = this.petitionInformation.markForDeletion;
        this.isPetitionInformationEdit = false;
        this.isPetitionInformationSave = true;
    }

    //cancel button function
    onCancelPetitionInfoClick() {
        this.sfmpi = false;
        this.petitionInformation = this.beforeCancelPetition;
        if (this.petitionDetails['startDate'] && this.petitionDetails['startDate']['formatted']) {
            this.petitionInformation.startDate = this.petitionDetails.startDate.formatted;
        }
        if (this.petitionDetails['deniedDate'] && this.petitionDetails['deniedDate']['formatted']) {
            this.petitionInformation.deniedDate = this.petitionDetails.deniedDate.formatted;
        }
        if (this.petitionDetails['withdrawDate'] && this.petitionDetails['withdrawDate']['formatted']) {
            this.petitionInformation.withdrawDate = this.petitionDetails.withdrawDate.formatted;
        }
        if (this.petitionDetails['rejectedDate'] && this.petitionDetails['rejectedDate']['formatted']) {
            this.petitionInformation.rejectedDate = this.petitionDetails.rejectedDate.formatted;
        }
        this.isPetitionInformationEdit = !this.isPetitionInformationEdit;
    }

    //Save Client Details
    onSavePetitionInfoClick() {

        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.petitionDetails=this.petitionInformation;
        this.petitionDetails['currentStageId'] = this.petitionInformation.currentStage;
        if (this.petitionDetails['startDate'] && this.petitionDetails['startDate']['formatted']) {
            this.petitionInformation['startDate'] = this.petitionDetails['startDate']['formatted'];
        }
        if (this.petitionDetails['deniedDate'] && this.petitionDetails['deniedDate']['formatted']) {
            this.petitionInformation['deniedDate'] = this.petitionDetails['deniedDate']['formatted'];
        }
        if (this.petitionDetails['withdrawDate'] && this.petitionDetails['withdrawDate']['formatted']) {
            this.petitionInformation['withdrawDate'] = this.petitionDetails['withdrawDate']['formatted'];
        }
        if (this.petitionDetails['rejectedDate'] && this.petitionDetails['rejectedDate']['formatted']) {
            this.petitionInformation['rejectedDate'] = this.petitionDetails['rejectedDate']['formatted'];
        }
        if (this.petitionDetails['markForDeletion'] == true) {
            this.petitionDetails['status'] == "MFD";
        }
        if (this.petitionDetails['name'] == '' || this.petitionDetails['name'] == null || this.petitionDetails['name'] == undefined && this.petitionDetails['status'] == '' || this.petitionDetails['status'] == null || this.petitionDetails['status'] == undefined && this.petitionDetails['status'] == '' || this.petitionDetails['status'] == null || this.petitionDetails['status'] == undefined) {
            this.sfmpi = true;
        } else {
            this.sfmpi = false;
            this.petitionDetailsService.savePetitionDetails(this.petitionDetails, this.headerService.user.userId)
                .subscribe((res) => {
                    if (res['petitionInfo'] != undefined) {
                        this.isPetitionInformationSave = false;
                        this.petitionDetails = res['petitionInfo'];
                        this.petitionDetailsService.getUsersForAccount(this.headerService.user.accountId)
                            .subscribe((res) => {
                                this.users = res['users'];
                                this.users.filter(user => {
                                    if (user.emailId == this.petitionDetails['assignedTo'])
                                        this.assignedToName = user.firstName + ', ' + user.lastName;
                                });
                            });
                        this.isPetitionInformationSaveStatus = true;
                        setTimeout(() => {    //<<<---    using ()=> syntax
                            this.isPetitionInformationSaveStatus = false;
                            this.isPetitionInformationEdit = true;
                        }, 3000);
                        this.petitionInformation = this.petitionDetails;

                    }
                });
        }
    }
    onEditReceiptInfoClick() {
        this.backendReceiptInfo = (<any>Object).assign({}, this.receiptInfo);
        this.receiptDate = this.receiptInfo.receiptDate;
        this.receiptNoticeDate = this.receiptInfo.receiptNoticeDate;
        this.approvedOn = this.receiptInfo.approvedOn;
        this.validFrom = this.receiptInfo.validFrom;
        this.expiresOn = this.receiptInfo.expiresOn;
        this.approvalReceivedOn = this.receiptInfo.approvalReceivedOn;
        this.sentToGovAgencyOn = this.receiptInfo.sentToGovAgencyOn;
        this.isReceiptInfoEdit = false;
        this.isReceiptInfoSave = true;
        if (this.receiptInfo.showReceiptNumberToClient == 1) {
            this.receiptInfo['showReceiptNumberToClient'] = 1;
        }
        else {
            this.receiptInfo['showReceiptNumberToClient'] = 0;

        }
    }

    //cancel button function
    onCancelReceiptInfoClick() {
        this.receiptInfo = this.backendReceiptInfo;
        if (this.receiptInfo['receiptDate'] && this.receiptInfo['receiptDate']['formatted']) {
            this.receiptInfo['receiptDate'] = this.receiptInfo['receiptDate']['formatted'];
        }
        if (this.receiptInfo['receiptNoticeDate'] && this.receiptInfo['receiptNoticeDate']['formatted']) {
            this.receiptInfo['receiptNoticeDate'] = this.receiptInfo['receiptNoticeDate']['formatted'];
        }
        if (this.receiptInfo['approvedOn'] && this.receiptInfo['approvedOn']['formatted']) {
            this.receiptInfo['approvedOn'] = this.receiptInfo['approvedOn']['formatted'];
        }
        if (this.receiptInfo['validFrom'] && this.receiptInfo['validFrom']['formatted']) {
            this.receiptInfo['validFrom'] = this.receiptInfo['validFrom']['formatted'];
        }
        if (this.receiptInfo['expiresOn'] && this.receiptInfo['expiresOn']['formatted']) {
            this.receiptInfo['expiresOn'] = this.receiptInfo['expiresOn']['formatted'];
        }
        if (this.receiptInfo['approvalReceivedOn'] && this.receiptInfo['approvalReceivedOn']['formatted']) {
            this.receiptInfo['approvalReceivedOn'] = this.receiptInfo['approvalReceivedOn']['formatted'];
        }
        if (this.receiptInfo['sentToGovAgencyOn'] && this.receiptInfo['sentToGovAgencyOn']['formatted']) {
            this.receiptInfo['sentToGovAgencyOn'] = this.receiptInfo['sentToGovAgencyOn']['formatted'];
        }
        this.isReceiptInfoEdit = !this.isReceiptInfoEdit;
    }

    //Save Client Details
    onSaveReceiptInfoClick() {
        this.receiptInfo.petitionId = this.appService.petitionId;

        if (this.receiptInfo['receiptDate'] && this.receiptInfo['receiptDate']['formatted']) {
            this.receiptInfo['receiptDate'] = this.receiptInfo['receiptDate']['formatted'];
        }
        if (this.receiptInfo['receiptNoticeDate'] && this.receiptInfo['receiptNoticeDate']['formatted']) {
            this.receiptInfo['receiptNoticeDate'] = this.receiptInfo['receiptNoticeDate']['formatted'];
        }
        if (this.receiptInfo['approvedOn'] && this.receiptInfo['approvedOn']['formatted']) {
            this.receiptInfo['approvedOn'] = this.receiptInfo['approvedOn']['formatted'];
        }
        if (this.receiptInfo['validFrom'] && this.receiptInfo['validFrom']['formatted']) {
            this.receiptInfo['validFrom'] = this.receiptInfo['validFrom']['formatted'];
        }
        if (this.receiptInfo['expiresOn'] && this.receiptInfo['expiresOn']['formatted']) {
            this.receiptInfo['expiresOn'] = this.receiptInfo['expiresOn']['formatted'];
        }
        if (this.receiptInfo['approvalReceivedOn'] && this.receiptInfo['approvalReceivedOn']['formatted']) {
            this.receiptInfo['approvalReceivedOn'] = this.receiptInfo['approvalReceivedOn']['formatted'];
        }
        if (this.receiptInfo['sentToGovAgencyOn'] && this.receiptInfo['sentToGovAgencyOn']['formatted']) {
            this.receiptInfo['sentToGovAgencyOn'] = this.receiptInfo['sentToGovAgencyOn']['formatted'];
        }

        this.receiptInfo['petitionId'] = this.appService.petitionId;
        this.receiptInfo['petitionReceiptId'] = this.receiptInfo['petitionReceiptId'];

        if (this.receiptInfo.showReceiptNumberToClient != 0 && this.receiptInfo.showReceiptNumberToClient != 1) {
            this.sfmRI = true;
        }
        else {
            this.sfmRI = false;
            this.petitionDetailsService.saveReceiptInfo(this.receiptInfo, this.headerService.user.userId)
                .subscribe((res) => {
                    if (res['receiptInfo'] != undefined) {
                        this.isReceiptInfoSave = false;
                        this.receiptInfo = res['receiptInfo'];

                        this.isReceiptInfoSaveStatus = true;
                        setTimeout(() => {    //<<<---    using ()=> syntax
                            this.isReceiptInfoSaveStatus = false;
                            this.isReceiptInfoEdit = true;
                        }, 3000);


                    }
                });
        }


    }
    //For LCA form Section
    onEditLCAInfoClick() {

        this.backendLCAInfo = (<any>Object).assign({}, this.lcaInfo);
        this.approvedDate = this.lcaInfo.approvedDate;
        this.assignedDate = this.lcaInfo.assignedDate;
        this.validThruDate = this.lcaInfo.validThruDate;
        this.effectiveOn = this.lcaInfo.effectiveOn;

        this.effectiveTill = this.lcaInfo.effectiveTill;
        this.isLCAInfoEdit = !this.isLCAInfoEdit;
    }

    //cancel button function
    onCancelLCAInfoClick() {
        this.lcaInfo = this.backendLCAInfo;
        this.lcaInfo = this.backendLCAInfo;
        if (this.lcaInfo['approvedDate'] && this.lcaInfo['approvedDate']['formatted']) {
            this.lcaInfo['approvedDate'] = this.lcaInfo['approvedDate']['formatted'];
        }
        if (this.lcaInfo['validThruDate'] && this.lcaInfo['validThruDate']['formatted']) {
            this.lcaInfo['validThruDate'] = this.lcaInfo['validThruDate']['formatted'];
        }
        if (this.lcaInfo['assignedDate'] && this.lcaInfo['assignedDate']['formatted']) {
            this.lcaInfo['assignedDate'] = this.lcaInfo['assignedDate']['formatted'];
        }
        if (this.lcaInfo['effectiveOn'] && this.lcaInfo['effectiveOn']['formatted']) {
            this.lcaInfo['effectiveOn'] = this.lcaInfo['effectiveOn']['formatted'];
        }
        if (this.lcaInfo['effectiveTill'] && this.lcaInfo['effectiveTill']['formatted']) {
            this.lcaInfo['effectiveTill'] = this.lcaInfo['effectiveTill']['formatted'];
        }

        this.isLCAInfoEdit = !this.isLCAInfoEdit;
    }
    onSaveLCAInfoClick() {
        this.lcaInfo.petitionId = this.appService.petitionId;

        if (this.lcaInfo['approvedDate'] && this.lcaInfo['approvedDate']['formatted']) {
            this.lcaInfo['approvedDate'] = this.lcaInfo['approvedDate']['formatted'];
        }
        if (this.lcaInfo['validThruDate'] && this.lcaInfo['validThruDate']['formatted']) {
            this.lcaInfo['validThruDate'] = this.lcaInfo['validThruDate']['formatted'];
        }
        if (this.lcaInfo['assignedDate'] && this.lcaInfo['assignedDate']['formatted']) {
            this.lcaInfo['assignedDate'] = this.lcaInfo['assignedDate']['formatted'];
        }
        if (this.lcaInfo['effectiveOn'] && this.lcaInfo['effectiveOn']['formatted']) {
            this.lcaInfo['effectiveOn'] = this.lcaInfo['effectiveOn']['formatted'];
        }
        if (this.lcaInfo['effectiveTill'] && this.lcaInfo['effectiveTill']['formatted']) {
            this.lcaInfo['effectiveTill'] = this.lcaInfo['effectiveTill']['formatted'];
        }

        this.petitionDetailsService.saveLcaInfo(this.lcaInfo, this.headerService.user.userId)
            .subscribe((res) => {
                this.isLCAInfoEdit = true;
                if (res['lcaInfo'] != undefined) {
                    this.lcaInfo = res['lcaInfo'];
                }
            });

    }
    //For Sponsor Info On Form
    onEditSponsorInfoClick() {
        this.beforeCancelSponsor = (<any>Object).assign({}, this.sponsorInfo);
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }

    //cancel button function
    onCancelSponsorInfoClick() {
        this.sponsorInfo = this.beforeCancelSponsor;
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }
    onSaveSponsorInfoClick() {

        this.sponsorInfo.petitionId = this.appService.petitionId;
        if (this.sponsorInfoAddress != undefined) {
            this.sponsorInfo.address = this.sponsorInfoAddress;
        }
        this.petitionDetailsService.saveSponsorInfo(this.sponsorInfo, this.headerService.user.userId)
            .subscribe((res) => {
                this.isSponsorInfoEdit = true;
                if (res['sponsorInfo'] != undefined) {
                    this.sponsorInfo = res['sponsorInfo'];

                }
            });
    }

    //edit petitionAdditionalDetails Details
    onEditAdditionalDetailsClick() {
        this.backendReceiptInfo = (<any>Object).assign({}, this.petitionAdditionalDetails);
        this.receiptDate = this.petitionAdditionalDetails.receiptDate;
        this.receiptNoticeDate = this.petitionAdditionalDetails.receiptNoticeDate;
        this.approvedOn = this.petitionAdditionalDetails.approvedOn;
        this.validFrom = this.petitionAdditionalDetails.validFrom;
        this.expiresOn = this.petitionAdditionalDetails.expiresOn;
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    //cancel button function
    onCancelAdditionalDetailsClick() {
        this.petitionAdditionalDetails = this.backendReceiptInfo;
        if (this.petitionAdditionalDetails['shippingDate'] && this.petitionAdditionalDetails['shippingDate']['formatted']) {
            this.petitionAdditionalDetails['shippingDate'] = this.petitionAdditionalDetails['shippingDate']['formatted'];
        }
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    //Save petitionAdditionalDetails Details
    onSaveAdditionalDetailsClick() {
        this.petitionAdditionalDetails.petitionId = this.appService.petitionId;

        if (this.petitionAdditionalDetails['shippingDate'] && this.petitionAdditionalDetails['shippingDate']['formatted']) {
            this.petitionAdditionalDetails['shippingDate'] = this.petitionAdditionalDetails['shippingDate']['formatted'];
        }
        this.petitionAdditionalDetails['petitionId'] = this.appService.petitionId;
        this.petitionAdditionalDetails['petitionReceiptId'] = this.petitionAdditionalDetails['petitionReceiptId'];

        if (this.petitionAdditionalDetails['showReceiptNumberToClient'] == '' || null || undefined) {
            this.sfmRI = true;
        } else {
            this.sfmRI = false;
            this.petitionDetailsService.savePetitionAdditionalDetails(this.petitionAdditionalDetails, this.headerService.user.userId)
                .subscribe((res) => {
                    this.isAdditionalDetailsEdit = true;
                    if (res['petitionAdditionalDetails'] != undefined) {
                        this.petitionAdditionalDetails = res['petitionAdditionalDetails'];
                    }
                });
        }
    }


    onEditDelegatedOrgsClick() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionDetails);
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    //cancel button function
    onCancelDelegatedOrgsClick() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    onSaveDelegatedOrgsClick() {
        this.delegatedOrgsList['petitionId'] = this.appService.petitionId;
        for (var i = 0; i < this.delegatedOrgsList.length; i++) {
            if (this.delegatedOrgsList[i].petitionAssigned == true) {
                this.orgs.push(this.delegatedOrgsList[i].orgId);
            }
        }
        this.petitionDetailsService.saveDelegatedOrgs(this.orgs, this.appService.petitionId, this.headerService.user.userId)
            .subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                    this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
                    this.getPetionDelOrgs();
                }

            });
    }


  onPetitionStatusChange(event){
      if(event.target.value === 'Close'){
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Information',
          message: 'Closing a Petition will lead to removal of the Questionnaires (if any) in the Petition'
        }).subscribe((isConfirmed) => {});
      }
  }
}
