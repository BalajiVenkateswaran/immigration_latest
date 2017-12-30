import {Component, OnInit} from '@angular/core';

import {ImmigrationViewPetitionInformation} from '../../../../../models/ImmigrationViewPetitionInformation';
import {AppService} from '../../../../../services/app.service';
import {PetitionDetailsService} from './petition-details.service';
import {IHDateUtil} from '../../../../framework/utils/date.component';
import {DialogService} from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {DeepCloneUtil} from '../../../../framework/utils/deepclone.component';


@Component({
    selector: 'ih-petition-details',
    templateUrl: './petition-details.component.html',
    styleUrls: ['./petition-details.component.scss'],
  providers: [PetitionDetailsService]
})
export class PetitionDetailsComponent implements OnInit {
    isNotesEdit;
  public users;
  public notes: string;
    isPetitionInformationEdit;
    isPetitionInformationSave;
    isPetitionInformationSaveStatus;
  public allPetitionTypesAndSubTypes;
    public petitionStages;
  public assignedToName;
  public backendLCAInfo;
  public backendReceiptInfo;
    private beforeCancelSponsor;
    private beforeCancelPetition;
    public orgs: any = [];
    public status: any[];
    public receiptNumber: any[];
    public delegatedOrgsList: any[] = [];
  public startDate: string;
  public deniedDate: string;
  public withdrawDate: string;
  public assignedDate: string;
  public approvedDate: string;
  public validThruDate: string;
  public effectiveOn: string;
  public effectiveTill: string;
  public rejectedDate: string;
  public receiptDate: string;
  public shippingDate: string;
  public receiptNoticeDate: string;
    public approvedOn: string;
    public validFrom: string;
  public expiresOn: string;
  public defaultSelected: string;
  public approvalReceivedOn: string;
  public sentToGovAgencyOn: string;
    sfmpi = false;
    sfmRI = false;
  public petitionDetails: any = {};
    public lcaInfo: any = {};
    public sponsorInfo: any = {};
    public receiptInfo: any = {};
    public sponsorInfoAddress: any = {};
    private beforeSponsorInfoAddress: any;
    public petitionAdditionalDetails: any = {};
  public beforePetitionAdditionalDetails: any;
    public datePickerOptions = IHDateUtil.datePickerOptions;
    isLCAInfoEdit = true;
    isReceiptInfoEdit = true;
    isReceiptInfoSave = false;
    isReceiptInfoSaveStatus = false;
    isSponsorInfoEdit = true;
    isDelegatedOrgsEdit = true;
    isAdditionalDetailsEdit = true;
    public finalStatus: any[] = [
        { name: 'Pending', value: 'Pending' },
        { name: 'Approved', value: 'Approved' },
        { name: 'Denied', value: 'Denied' },
        { name: 'Withdrawn', value: 'Withdrawn' },
        { name: 'Rejected', value: 'Rejected' },
        { name: 'RFE', value: 'RFE' }
    ];
    petitionInformation: ImmigrationViewPetitionInformation = new ImmigrationViewPetitionInformation();
  public showPetitionInfoSaveButtonProgress = false;
  public showReceiptInfoSaveButtonProgress = false;
  public showAdditionalInfoSaveButtonProgress = false;
  public showSponsorInfoSaveButtonProgress = false;
  public showLCAInfoSaveButtonProgress = false;
  public showDelegatedOrgsSaveButtonProgress = false;

  constructor(public appService: AppService, private petitionDetailsService: PetitionDetailsService,
                public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService) {
  }
    ngOnInit() {
        this.headerService.showSideBarMenu('immigrationview-petition', 'immigrationview/tab/petitions');
        this.petitionDetailsService.getPetitionDetails(this.appService.petitionId)
            .subscribe((res) => {
                if (res['petitionInfo'] !== undefined) {
                    this.petitionDetails = res['petitionInfo'];
                    this.appService.petitionDetails = res['petitionInfo']['name'];
                    this.petitionInformation = this.petitionDetails;
                    this.mapFromPetitionInfo();
                    //TODO - Set client first name and last name to appService
                }
                if (res['receiptInfo'] !== undefined) {
                    this.receiptInfo = res['receiptInfo'];
                    this.mapFromReceiptInfo();
                }
                if (res['petitionAdditionalDetails'] !== undefined) {
                    this.petitionAdditionalDetails = res['petitionAdditionalDetails'];
                    this.mapFromAdditionalDetails();
                }
                if (res['lcaInfo'] !== undefined) {
                    this.lcaInfo = res['lcaInfo'];
                    this.mapFromLCAInfo();
                }
                if (res['sponsorInfo'] !== undefined) {
                    this.sponsorInfo = res['sponsorInfo'];
                    this.sponsorInfoAddress = this.sponsorInfo.address;
                }

                if (res['clientId'] !== undefined) {
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
                if (res['petitionTypeId'] !== undefined) {
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
                            if (user.emailId === this.petitionDetails['assignedTo']) {
                                this.assignedToName = user.firstName + ', ' + user.lastName;
                            }
                        });
                    });
            });
        this.getPetionDelOrgs();
        this.status = [
            { value: '0', name: 'Open' },
            { value: '1', name: 'Close' }
        ];
        this.receiptNumber = [
            { value: '1', name: 'Yes' },
            { value: '0', name: 'No' }
        ];

        if (this.petitionDetails['markForDeletion'] === true) {
            this.petitionDetails['status'] = 'MFD';
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
            if (res['orgs'] !== undefined) {
                this.delegatedOrgsList = res['orgs'];
            }
        });
    }
    sendCheckList() {
        this.petitionDetailsService.sendChecklist(this.headerService.user.accountId, this.appService.petitionId).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.dialog.open(InformationDialogComponent, {
              data: {
                message: 'Checklist email is sent to client'
              }
            });
          } else if (res['statusCode'] === 'FAILURE') {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
          }
        });
    }


    mapFromPetitionInfo() {
     if (this.petitionInformation) {
       this.startDate = this.petitionInformation.startDate;
       this.deniedDate = this.petitionInformation.deniedDate;
       this.withdrawDate = this.petitionInformation.withdrawDate;
       this.rejectedDate = this.petitionInformation.rejectedDate;
     }
    }

    // is edit function for read only
    onEditPetitionInfoClick() {
        this.beforeCancelPetition = DeepCloneUtil.deepClone(this.petitionInformation);
        this.isPetitionInformationEdit = false;
        this.isPetitionInformationSave = true;
    }

    // cancel button function
    onCancelPetitionInfoClick() {
        this.sfmpi = false;
        this.petitionInformation = this.beforeCancelPetition;
        this.isPetitionInformationEdit = !this.isPetitionInformationEdit;
    }

    // Save Client Details
    onSavePetitionInfoClick() {
        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.petitionDetails = this.petitionInformation;

        if (this.petitionDetails['name'] === '' || this.petitionDetails['name'] == null || this.petitionDetails['name'] === undefined && this.petitionDetails['status'] === '' ||
          this.petitionDetails['status'] == null || this.petitionDetails['status'] === undefined && this.petitionDetails['status'] === '' || this.petitionDetails['status'] == null ||
          this.petitionDetails['status'] === undefined) {
            this.sfmpi = true;
        } else {
            this.sfmpi = false;
            this.showPetitionInfoSaveButtonProgress = true;
            this.petitionDetails['currentStageId'] = this.petitionInformation.currentStageId;
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
            if (this.petitionDetails['markForDeletion'] === true) {
              this.petitionDetails['status'] = 'MFD';
            }
            this.petitionDetailsService.savePetitionDetails(this.petitionDetails, this.headerService.user.userId)
                .subscribe((res) => {
                    if (res['petitionInfo'] !== undefined) {
                      this.isPetitionInformationEdit = true;
                      this.showPetitionInfoSaveButtonProgress = false;
                      this.isPetitionInformationSave = false;
                      this.petitionDetails = res['petitionInfo'];
                      this.petitionDetailsService.getUsersForAccount(this.headerService.user.accountId)
                          .subscribe((res) => {
                              this.users = res['users'];
                              this.users.filter(user => {
                                  if (user.emailId === this.petitionDetails['assignedTo']) {
                                      this.assignedToName = user.firstName + ', ' + user.lastName;
                                  }
                              });
                          });
                      this.isPetitionInformationSaveStatus = true;
                      this.petitionInformation = this.petitionDetails;
                      this.mapFromPetitionInfo();
                    }
                });
        }
    }

    mapFromReceiptInfo() {
      if (this.receiptInfo) {
        this.receiptDate = this.receiptInfo.receiptDate;
        this.receiptNoticeDate = this.receiptInfo.receiptNoticeDate;
        this.approvedOn = this.receiptInfo.approvedOn;
        this.validFrom = this.receiptInfo.validFrom;
        this.expiresOn = this.receiptInfo.expiresOn;
        this.approvalReceivedOn = this.receiptInfo.approvalReceivedOn;
        this.sentToGovAgencyOn = this.receiptInfo.sentToGovAgencyOn;
      }
    }

    onEditReceiptInfoClick() {
        this.backendReceiptInfo = (<any>Object).assign({}, this.receiptInfo);
        this.isReceiptInfoEdit = false;
        this.isReceiptInfoSave = true;
        if (this.receiptInfo.showReceiptNumberToClient === '1') {
            this.receiptInfo['showReceiptNumberToClient'] = '1';
        } else {
            this.receiptInfo['showReceiptNumberToClient'] = '0';

        }
    }

    // cancel button function
    onCancelReceiptInfoClick() {
        this.receiptInfo = this.backendReceiptInfo;
        this.isReceiptInfoEdit = !this.isReceiptInfoEdit;
    }

    // Save Client Details
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

        if (this.receiptInfo.showReceiptNumberToClient !== '0' && this.receiptInfo.showReceiptNumberToClient !== '1') {
            this.sfmRI = true;
        } else {
            this.sfmRI = false;
            this.showReceiptInfoSaveButtonProgress = true;
            this.petitionDetailsService.saveReceiptInfo(this.receiptInfo, this.headerService.user.userId)
                .subscribe((res) => {
                    if (res['receiptInfo'] !== undefined) {
                        this.isReceiptInfoSave = false;
                        this.receiptInfo = res['receiptInfo'];
                        this.mapFromReceiptInfo();
                        this.isReceiptInfoSaveStatus = true;
                        this.isReceiptInfoEdit = true;
                    }
                  this.showReceiptInfoSaveButtonProgress = false;
                });
        }
    }

    mapFromLCAInfo() {
      this.approvedDate = this.lcaInfo.approvedDate;
      this.assignedDate = this.lcaInfo.assignedDate;
      this.validThruDate = this.lcaInfo.validThruDate;
      this.effectiveOn = this.lcaInfo.effectiveOn;
      this.effectiveTill = this.lcaInfo.effectiveTill;
    }

    // For LCA form Section
    onEditLCAInfoClick() {
        this.backendLCAInfo = (<any>Object).assign({}, this.lcaInfo);
        this.isLCAInfoEdit = !this.isLCAInfoEdit;
    }

    // cancel button function
    onCancelLCAInfoClick() {
        this.lcaInfo = this.backendLCAInfo;
        this.lcaInfo = this.backendLCAInfo;
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
        this.showLCAInfoSaveButtonProgress = true;
        this.petitionDetailsService.saveLcaInfo(this.lcaInfo, this.headerService.user.userId)
            .subscribe((res) => {
                this.isLCAInfoEdit = true;
                this.showLCAInfoSaveButtonProgress = false;
                if (res['lcaInfo'] !== undefined) {
                    this.lcaInfo = res['lcaInfo'];
                    this.mapFromLCAInfo();
                }
            });

    }
    // For Sponsor Info On Form
    onEditSponsorInfoClick() {
        this.beforeCancelSponsor = DeepCloneUtil.deepClone(this.sponsorInfo);
        this.beforeSponsorInfoAddress = DeepCloneUtil.deepClone(this.sponsorInfoAddress);
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }

    // cancel button function
    onCancelSponsorInfoClick() {
        this.sponsorInfo = this.beforeCancelSponsor;
        this.sponsorInfoAddress = this.beforeSponsorInfoAddress;
        this.isSponsorInfoEdit = !this.isSponsorInfoEdit;
    }
    onSaveSponsorInfoClick() {
        this.sponsorInfo.petitionId = this.appService.petitionId;
        if (this.sponsorInfoAddress !== undefined) {
            this.sponsorInfo.address = this.sponsorInfoAddress;
        }
        this.showSponsorInfoSaveButtonProgress = true;
        this.petitionDetailsService.saveSponsorInfo(this.sponsorInfo, this.headerService.user.userId)
        .subscribe((res) => {
            this.isSponsorInfoEdit = true;
            this.showSponsorInfoSaveButtonProgress = false;
            if (res['sponsorInfo'] !== undefined) {
                this.sponsorInfo = res['sponsorInfo'];
            }
        });
    }

    mapFromAdditionalDetails() {
      this.shippingDate = this.petitionAdditionalDetails.shippingDate;
    }

    // edit petitionAdditionalDetails Details
    onEditAdditionalDetailsClick() {
        this.beforePetitionAdditionalDetails = DeepCloneUtil.deepClone(this.petitionAdditionalDetails);
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    // cancel button function
    onCancelAdditionalDetailsClick() {
        this.petitionAdditionalDetails = this.beforePetitionAdditionalDetails;
        this.isAdditionalDetailsEdit = !this.isAdditionalDetailsEdit;
    }

    // Save petitionAdditionalDetails Details
    onSaveAdditionalDetailsClick() {
        if (this.petitionAdditionalDetails['shippingDate'] && this.petitionAdditionalDetails['shippingDate']['formatted']) {
            this.petitionAdditionalDetails['shippingDate'] = this.petitionAdditionalDetails['shippingDate']['formatted'];
        }
        this.petitionAdditionalDetails['petitionId'] = this.appService.petitionId;
        this.showAdditionalInfoSaveButtonProgress = true;
        this.petitionDetailsService.savePetitionAdditionalDetails(this.petitionAdditionalDetails, this.headerService.user.userId)
            .subscribe((res) => {
                this.isAdditionalDetailsEdit = true;
                this.showAdditionalInfoSaveButtonProgress = false;
                if (res['petitionAdditionalDetails'] !== undefined) {
                    this.petitionAdditionalDetails = res['petitionAdditionalDetails'];
                    this.mapFromAdditionalDetails();
                }
            });
    }


    onEditDelegatedOrgsClick() {
        this.beforeCancelPetition = DeepCloneUtil.deepClone(this.petitionDetails);
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    // cancel button function
    onCancelDelegatedOrgsClick() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
    }

    onSaveDelegatedOrgsClick() {
        this.delegatedOrgsList['petitionId'] = this.appService.petitionId;
        this.showDelegatedOrgsSaveButtonProgress = true;
        for (let i = 0; i < this.delegatedOrgsList.length; i++) {
            if (this.delegatedOrgsList[i].petitionAssigned === true) {
                this.orgs.push(this.delegatedOrgsList[i].orgId);
            }
        }
        this.petitionDetailsService.saveDelegatedOrgs(this.orgs, this.appService.petitionId, this.headerService.user.userId)
        .subscribe((res) => {
          this.showDelegatedOrgsSaveButtonProgress = false;
            if (res['statusCode'] === 'SUCCESS') {
                this.isDelegatedOrgsEdit = !this.isDelegatedOrgsEdit;
                this.getPetionDelOrgs();
            }
        });
    }

  onPetitionStatusChange(event) {
      if (event.target.value === 'Close') {
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: 'Closing a Petition will lead to removal of the Questionnaires (if any) in the Petition'
          }
        });
      }
  }
}
