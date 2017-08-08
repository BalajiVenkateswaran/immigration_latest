import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from "../../services/app.service";
import {ImmigrationViewPetitionDetailsService} from "./petition-details.service";
import {User} from "../../models/user";
import {ImmigrationViewPetitionInformation} from "../../models/ImmigrationViewPetitionInformation";
import {ImmigrationViewReceiptInformation} from "../../models/ImmigrationViewReceiptInformation";
import {ImmigrationViewLCAInformation} from "../../models/ImmigrationViewLCAInformation";
import {ImmigrationViewSponsorInformation} from "../../models/ImmigrationViewSponsorInformation";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-petition-details',
    templateUrl: './petition-details.component.html',
    styleUrls: ['./petition-details.component.sass']
})
export class ImmigrationviewPetitionDetailsComponent implements OnInit {
    sfmpi: boolean = false;
    sfmRI: boolean = false;
    private allPetitionTypesAndSubTypes;
    private allSubTypes = {};
    private user: User;
    private petitionDetails: any = {};
    petitionInformation: ImmigrationViewPetitionInformation = new ImmigrationViewPetitionInformation();
    private notes: string;
    private receiptInfo: any = {};
    private petitionAdditionalDetails: any = {};
    private lcaInfo: any = {};
    private sponsorInfo: any = {};
    private sponsorInfoAddress: any = {};
    //Profile section variables
    isPetitionInformationEdit;
    isNotesEdit;
    private status: any[];
    private finalStatus: any[] = [
      { name: 'Approved', value: 'Approved'},
      { name: 'Denied', value: 'Denied'},
      { name: 'Withdrawn', value: 'Withdrawn'},
      { name: 'Rejected', value: 'Rejected'}
    ];
    private receiptNumber: any[];
    public delegatedOrgsList: any[];
    isLCAInfoEdit: boolean = true;
    isDelegatedOrgsEdit: boolean = true;
    isReceiptInfoEdit: boolean = true;
    ispetitionAdditionalDetailsEdit: boolean = true;
    isAdditionalDetailsEdit: boolean = true;
    isSponsorInfoEdit: boolean = true;
    private defaultSelected: string;
    private selector: number = 0;
    private selDate: IMyDate = { year: 0, month: 0, day: 0 };
    private selDate1:IMyDate = { year: 0, month: 0, day: 0 };
    private selDate2: IMyDate = { year: 0, month: 0, day: 0 };
    private approvedDate: string;
    private validThruDate: string;
    private assignedDate: string;
    private effectiveOn:string;
    private effectiveTill: string;
    private rejectedDate:string;
    private receiptDate: string;
    private shippingDate: string;
    private receiptNoticeDate: string;
    private approvedOn: string;
    private validFrom: string;
    private expiresOn: string;
    private approvalReceivedOn: string;
    private sentToGovAgencyOn: string;
    private backendLCAInfo;
    private backendReceiptInfo;
    private beforeCancelPetition;
    private beforeCancelSponsor;
    private petitionStages;
    private users;
    private assignedToName;
    public orgs: any = [];
    public dummylist: any;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };

    constructor(public appService: AppService, private petitionDetailsService: ImmigrationViewPetitionDetailsService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        console.log(this.appService.user);
        let d: Date = new Date();
        this.selDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.selDate1 = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.selDate2 = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };


    }
    onDateChanged(event: IMyDateModel) {


    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    handleChange(event) {
        console.log(event.target.value);
        for (var i = 0; i < this.allPetitionTypesAndSubTypes.length; i++) {
            if (event.target.value == this.allPetitionTypesAndSubTypes[i].petitiontype) {
                this.allSubTypes = this.allPetitionTypesAndSubTypes[i].petitionSubTypes;
            }
        }
        this.appService.allsubtypesarray(this.allSubTypes);

        //var currentYear = new Date().getFullYear();
        //this.newpetitionitem['petitionName'] = this.newpetitionitem['petitiontype'] + currentYear;
    }
    ngOnInit() {
        this.appService.showSideBarMenu("immigrationview-petition", "petitions");
        this.petitionDetailsService.getPetitionDetails(this.appService.petitionId)
            .subscribe((res) => {
                if (res['petitionInfo'] != undefined) {
                    this.petitionDetails = res['petitionInfo'];
                    this.appService.petitionDetails = res['petitionInfo']['name'];
                    this.mapToPetitionInformation();
                    //TODO - Set client first name and last name to appService
                    this.notes = this.petitionDetails['notes'];
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
                this.isNotesEdit = true;
                this.isLCAInfoEdit = true;
                this.isDelegatedOrgsEdit = true;
                this.isReceiptInfoEdit = true;
                this.isAdditionalDetailsEdit = true;
                this.isSponsorInfoEdit = true;
                this.selDate = this.petitionDetails.startDate;
                this.selDate1 = this.petitionDetails.deniedDate;
                this.selDate2 = this.petitionDetails.withdrawDate;
                this.rejectedDate=this.petitionDetails.rejectedDate;
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
                    this.petitionDetailsService.getPetitionStages(this.appService.user.accountId,res['petitionTypeId'])
                        .subscribe((res) => {
                        this.petitionStages = res['petitionStageList'];
                        });
                 }
                this.petitionDetailsService
                    .getUsersForAccount(this.appService.user.accountId)
                    .subscribe((res) => {
                      this.users = res['users'];
                      this.users.filter(user => {
                      if(user.emailId == this.petitionDetails['assignedTo'])
                          this.assignedToName =  user.firstName +', '+user.lastName;
                          });
                    });
            });
        this.getPetionDelOrgs();
        console.log(this.delegatedOrgsList);
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
        console.log(this.defaultSelected);

        this.petitionDetailsService.getAllPetitionTypesAndSubTypes()
            .subscribe((res) => {
                this.allPetitionTypesAndSubTypes = res['petitionTypes'];
            });
    }
    getPetionDelOrgs() {
        this.petitionDetailsService.getDelegatedOrgs(this.appService.user.accountId, this.appService.petitionId).subscribe((res) => {
            if (res['orgs'] != undefined) {
                this.delegatedOrgsList = res['orgs'];
            }
        });
    }


    //is edit function for read only
    editPetitionInfoForm() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionInformation);
        this.selDate = this.petitionDetails.startDate;
        this.selDate1 = this.petitionDetails.deniedDate;
        this.selDate2 = this.petitionDetails.withdrawDate;
        this.rejectedDate=this.petitionDetails.rejectedDate;
        this.petitionInformation.currentStage = this.petitionDetails.currentStageId;
        this.petitionInformation.markForDeletion = this.petitionInformation.markForDeletion;
        this.isPetitionInformationEdit = !this.isPetitionInformationEdit;
    }

    //cancel button function
    cancelPetitionInfoEdit() {
        this.sfmpi = false;
        this.petitionInformation = this.beforeCancelPetition;
        this.petitionInformation.startDate = this.petitionDetails.startDate;
        this.petitionInformation.deniedDate = this.petitionDetails.deniedDate;
        this.petitionInformation.withdrawDate = this.petitionDetails.startDate;
        this.petitionInformation.rejectedDate = this.petitionDetails.rejectedDate;
        this.isPetitionInformationEdit = !this.isPetitionInformationEdit;
    }

    //Save Client Details
    savePetitionInformation() {

        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.mapFromPetitionInformation();
        if (this.petitionDetails['startDate'] && this.petitionDetails['startDate']['formatted']) {
            this.petitionDetails['startDate'] = this.petitionDetails['startDate']['formatted'];
        }
        if (this.petitionDetails['deniedDate'] && this.petitionDetails['deniedDate']['formatted']) {
            this.petitionDetails['deniedDate'] = this.petitionDetails['deniedDate']['formatted'];
        }
        if (this.petitionDetails['withdrawDate'] && this.petitionDetails['withdrawDate']['formatted']) {
            this.petitionDetails['withdrawDate'] = this.petitionDetails['withdrawDate']['formatted'];
        }
        if (this.petitionDetails['rejectedDate'] && this.petitionDetails['rejectedDate']['formatted']) {
            this.petitionDetails['rejectedDate'] = this.petitionDetails['rejectedDate']['formatted'];
        }
        if (this.petitionDetails['markForDeletion'] == true) {
            this.petitionDetails['status'] == "MFD";
        }
        if (this.petitionDetails['name'] == '' || this.petitionDetails['name'] == null || this.petitionDetails['name'] == undefined && this.petitionDetails['status'] == '' || this.petitionDetails['status'] == null || this.petitionDetails['status'] == undefined && this.petitionDetails['status'] == '' || this.petitionDetails['status'] == null || this.petitionDetails['status'] == undefined) {
            this.sfmpi = true;
        } else {
            this.sfmpi = false;
            this.petitionDetailsService.savePetitionDetails(this.petitionDetails, this.appService.user.userId)
                .subscribe((res) => {
                    this.isPetitionInformationEdit = true;
                    if (res['petitionInfo'] != undefined) {
                        this.petitionDetails = res['petitionInfo'];
                        this.petitionDetailsService.getUsersForAccount(this.appService.user.accountId)
                            .subscribe((res) => {
                                this.users = res['users'];
                                this.users.filter(user => {
                                    if (user.emailId == this.petitionDetails['assignedTo'])
                                        this.assignedToName = user.firstName + ', ' + user.lastName;
                                });
                            });
                        this.mapToPetitionInformation();

                    }
                });
        }
    }

    mapToPetitionInformation() {
        this.petitionInformation.name = this.petitionDetails['name'];
        this.petitionInformation.description = this.petitionDetails['description'];
        this.petitionInformation.fileNumber = this.petitionDetails['fileNumber'];
        this.petitionInformation.startDate = this.petitionDetails['startDate'];
        this.petitionInformation.status = this.petitionDetails['status'];
        this.petitionInformation.tag = this.petitionDetails['tag'];
        this.petitionInformation.currentStage = this.petitionDetails['currentStage'];
        this.petitionInformation.nextStage = this.petitionDetails['nextStage'];
        this.petitionInformation.deniedDate = this.petitionDetails['deniedDate'];
        this.petitionInformation.withdrawDate = this.petitionDetails['withdrawDate'];
        this.petitionInformation.rejectedDate = this.petitionDetails['rejectedDate'];
        this.petitionInformation.assignedTo = this.petitionDetails['assignedTo'];
        this.petitionInformation.createdBy = this.petitionDetails['createdByUserOn'];
        this.petitionInformation.lastUpdatedBy = this.petitionDetails['lastUpdatedByUserOn'];
        this.petitionInformation.markForDeletion = this.petitionDetails['markForDeletion'];
        this.petitionInformation.deletedBy = this.petitionDetails['deletedBy'];
        this.petitionInformation.deletedOn = this.petitionDetails['deletedByUserOn'];
        this.petitionInformation.daysInCurrentStage = this.petitionDetails['daysInStage'];
        this.petitionInformation.petitionType = this.petitionDetails['petitionType'];
        this.petitionInformation.petitionSubType = this.petitionDetails['petitionSubType'];
        this.petitionInformation.finalStatus = this.petitionDetails['finalStatus'];
    }

    mapFromPetitionInformation() {
        this.petitionDetails['name'] = this.petitionInformation.name;
        this.petitionDetails['description'] = this.petitionInformation.description;
        this.petitionDetails['fileNumber'] = this.petitionInformation.fileNumber;
        this.petitionDetails['startDate'] = this.petitionInformation.startDate;
        this.petitionDetails['status'] = this.petitionInformation.status;
        this.petitionDetails['tag'] = this.petitionInformation.tag;
        //this.petitionDetails['currentStage'] = this.petitionInformation.currentStage;
        this.petitionDetails['currentStageId'] = this.petitionInformation.currentStage;
        this.petitionDetails['nextStage'] = this.petitionInformation.nextStage;
        this.petitionDetails['deniedDate'] = this.petitionInformation.deniedDate;
        this.petitionDetails['withdrawDate'] = this.petitionInformation.rejectedDate;
        this.petitionDetails['rejectedDate'] = this.petitionInformation.withdrawDate;
        this.petitionDetails['assignedTo'] = this.petitionInformation.assignedTo;
        //this.petitionDetails['createdBy'] = this.petitionInformation.createdBy;
        //this.petitionDetails['lastUpdatedBy'] = this.petitionInformation.lastUpdatedBy;
        this.petitionDetails['markForDeletion'] = this.petitionInformation.markForDeletion;
        this.petitionDetails['deletedBy'] = this.petitionInformation.deletedBy;
        //this.petitionDetails['deletedOn'] = this.petitionInformation.deletedOn;
        this.petitionDetails['finalStatus'] = this.petitionInformation.finalStatus;
    }

    //is edit function for read only
    editNotesForm() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionDetails);
        this.isNotesEdit = !this.isNotesEdit;
    }

    //cancel button function
    cancelNotesEdit() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isNotesEdit = !this.isNotesEdit;
    }

    //Save Client Details
    saveNotes() {
        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.petitionDetails['notes'] = this.petitionDetails.notes;
        this.petitionDetailsService.savePetitionDetails(this.petitionDetails,this.appService.user.userId)
            .subscribe((res) => {
                this.isNotesEdit = true;
                if (res['petitionInfo'] != undefined) {
                    this.notes = this.petitionDetails['notes'];
                }
            });
    }

    editReceiptInfoForm() {
        this.backendReceiptInfo = (<any>Object).assign({}, this.receiptInfo);
        this.receiptDate = this.receiptInfo.receiptDate;
        this.receiptNoticeDate = this.receiptInfo.receiptNoticeDate;
        this.approvedOn = this.receiptInfo.approvedOn;
        this.validFrom = this.receiptInfo.validFrom;
        this.expiresOn = this.receiptInfo.expiresOn;
        this.approvalReceivedOn = this.receiptInfo.approvalReceivedOn;
        this.sentToGovAgencyOn = this.receiptInfo.sentToGovAgencyOn;
        this.isReceiptInfoEdit = !this.isReceiptInfoEdit;
    }

    //cancel button function
    cancelReceiptInfoEdit() {
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
    saveReceiptInformation() {
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

        if (this.receiptInfo['showReceiptNumberToClient'] == '' || null || undefined) {
            this.sfmRI = true;
        } else {
            this.sfmRI = false;
            this.petitionDetailsService.saveReceiptInfo(this.receiptInfo)
                .subscribe((res) => {
                    console.log(this.receiptInfo);
                    console.log(res);
                    this.isReceiptInfoEdit = true;
                    if (res['receiptInfo'] != undefined) {
                        this.receiptInfo = res['receiptInfo'];
                    }
                });
        }


    }
    //For LCA form Section
    editLCAInfoForm() {

        this.backendLCAInfo = (<any>Object).assign({}, this.lcaInfo);
        this.approvedDate = this.lcaInfo.approvedDate;
        this.assignedDate = this.lcaInfo.assignedDate;
        this.validThruDate = this.lcaInfo.validThruDate;
        this.effectiveOn = this.lcaInfo.effectiveOn;

        this.effectiveTill = this.lcaInfo.effectiveTill;
        this.isLCAInfoEdit = !this.isLCAInfoEdit;
    }

    //cancel button function
    cancelLCAInfoEdit() {
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
    saveLCAInforEidt() {
        this.lcaInfo.petitionId = this.appService.petitionId;

        if (this.lcaInfo['approvedDate'] && this.lcaInfo['approvedDate']['formatted'] ) {
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

        this.petitionDetailsService.saveLcaInfo(this.lcaInfo)
            .subscribe((res) => {
                console.log(this.lcaInfo);
                this.isLCAInfoEdit = true;
                if (res['lcaInfo'] != undefined) {
                    this.lcaInfo = res['lcaInfo'];
                }
            });

    }
    //For Sponsor Info On Form
    editSponsorInfoForm() {
        this.beforeCancelSponsor = (<any>Object).assign({}, this.sponsorInfo);
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }

    //cancel button function
    cancelSponsorInfoEdit() {
        this.sponsorInfo = this.beforeCancelSponsor;
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }
    saveSponsorInformation() {

        this.sponsorInfo.petitionId = this.appService.petitionId;
        if (this.sponsorInfoAddress != undefined) {
            this.sponsorInfo.address = this.sponsorInfoAddress;
        }
        this.petitionDetailsService.saveSponsorInfo(this.sponsorInfo)
            .subscribe((res) => {
                this.isSponsorInfoEdit = true;
                if (res['sponsorInfo'] != undefined) {
                    this.sponsorInfo = res['sponsorInfo'];

                }
            });
    }

    //edit petitionAdditionalDetails Details
    editAdditionalDetailsForm() {
        this.backendReceiptInfo = (<any>Object).assign({}, this.petitionAdditionalDetails);
        this.receiptDate = this.petitionAdditionalDetails.receiptDate;
        this.receiptNoticeDate = this.petitionAdditionalDetails.receiptNoticeDate;
        this.approvedOn = this.petitionAdditionalDetails.approvedOn;
        this.validFrom = this.petitionAdditionalDetails.validFrom;
        this.expiresOn = this.petitionAdditionalDetails.expiresOn;
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    //cancel button function
    cancelAdditionalDetailsEdit() {
        this.petitionAdditionalDetails = this.backendReceiptInfo;
        if (this.petitionAdditionalDetails['shippingDate'] && this.petitionAdditionalDetails['shippingDate']['formatted']) {
            this.petitionAdditionalDetails['shippingDate'] = this.petitionAdditionalDetails['shippingDate']['formatted'];
        }
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    //Save petitionAdditionalDetails Details
    saveAdditionalDetails() {
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
            this.petitionDetailsService.savePetitionAdditionalDetails(this.petitionAdditionalDetails)
                .subscribe((res) => {
                    console.log(this.petitionAdditionalDetails);
                    console.log(res);
                    this.isAdditionalDetailsEdit = true;
                    if (res['petitionAdditionalDetails'] != undefined) {
                        this.petitionAdditionalDetails = res['petitionAdditionalDetails'];
                    }
                });
        }
    }


    editdelOrgs() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionDetails);
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    //cancel button function
    canceldelOrgs() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    savedelOrgs() {
        this.delegatedOrgsList['petitionId'] = this.appService.petitionId;
        //  this.delegatedOrgsList['orgId'] = this.appService.orgId;
        for (var i = 0; i < this.delegatedOrgsList.length; i++) {
            if (this.delegatedOrgsList[i].petitionAssigned == true) {
                this.orgs.push(this.delegatedOrgsList[i].orgId);
            }
            //if (this.dummylist[i].petitionAssigned != this.delegatedOrgsList[i].petitionAssigned) {
            //    this.orgs.push(this.delegatedOrgsList[i].orgId);
            //}
        }
        this.petitionDetailsService.saveDelegatedOrgs(this.orgs,this.appService.petitionId)
            .subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                    this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
                    this.getPetionDelOrgs();
                }

            });
    }
}
