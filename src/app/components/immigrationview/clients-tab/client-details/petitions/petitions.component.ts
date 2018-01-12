import {AppService} from '../../../../../services/app.service';
import {HeaderService} from '../../../../common/header/header.service';
import {MenuService} from '../../../../common/menu/menu.service';
import {Component, OnInit} from '@angular/core';
import {ImmigrationViewPetitionsService} from './petitions.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SortType} from '../../../../framework/smarttable/types/query-parameters';
import {ImmigrationViewClientDetailsService} from '../client-details/client-details.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {AddPetitionDialogComponent, NewPetitionData} from './addpetition.component';
import {ImmigrationClientCommonService} from '../common/immigration-client.service';
import {QuestionnaireCommonService} from '../../../petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';

export interface ConfirmModel {
    title: string;
    message: string;
    showAddPetitionpopup: boolean;
    countryNames: string[];
    allPetitionTypesAndSubTypes: any[];
    allSubTypes: any[];
    getPetitionsData: boolean;

}
@Component({
  selector: 'ih-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.sass'],
  providers: [ImmigrationViewClientDetailsService, ImmigrationViewPetitionsService],
  entryComponents: [AddPetitionDialogComponent, SmartTableFrameworkComponent]
})
export class ImmigrationViewPetitionsComponent implements OnInit {

    private delmessage;
    public addPetition: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private allPetitionTypesAndSubTypes;
    public showAddPetitionpopup: boolean;
    public getPetitionsData = true;

    public settings;
    public data;
    public clientInviteStatus;
    public countryNames: string[] = [];
    public queryParams: any;
    clientDetails: any = {};
    client: any = {};
    public user1;


    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    constructor(private immigrationviewpetitionService: ImmigrationViewPetitionsService, public appService: AppService, private immigrationClientCommonService: ImmigrationClientCommonService,
        private menuService: MenuService, private router: Router, private headerService: HeaderService, private questionnaireCommonService: QuestionnaireCommonService,
                private clientDetailsService: ImmigrationViewClientDetailsService, private dialog: MatDialog) {
        this.addPetition = new FormGroup({
            petitionName: new FormControl(''),
            petitionNumber: new FormControl(''),
            clientFirstName: new FormControl(''),
            clientLastName: new FormControl(''),
            petitionType: new FormControl(''),
            lastUpdated: new FormControl(''),
            status: new FormControl(''),
            assignedToName: new FormControl(''),
            petitionStage: new FormControl(''),
            daysCurrentStage: new FormControl(''),
            tag: new FormControl(''),
            userId: new FormControl(''),
            accountId: new FormControl('')
        });
         this.settings = {
            'isDeleteEnable': false,
            'isMorefilters': false,
            'columnsettings': [
                {
                    headerName: 'Name',
                    field: 'petitionName'
                },
                {
                    headerName: 'Type',
                    field: 'petitionType'
                },
                {
                    headerName: 'SubType',
                    field: 'petitionSubType'
                },
              {
                headerName: 'Stage',
                field: 'stage'
              },
                {
                    headerName: 'Status',
                    field: 'status'
                },
              {
                headerName: 'Final Action',
                field: 'finalAction'
              },
              {
                headerName: 'Assigned To',
                field: 'assignedToName'
              },
              {
                    headerName: 'Created On',
                    field: 'createdOn',
                    width: 350
                },
                {
                    headerName: 'Last Updated',
                    field: 'lastUpdate',
                    width: 350
                }
            ]
        };
    }

  dataWithParameters(queryData) {
    if (queryData !== undefined) {
      this.queryParams = queryData;
    }
    this.getPetitionData();

  }

  getPetitionData() {
      this.immigrationviewpetitionService.getPetitions(this.headerService.selectedOrg['orgId'], this.appService.clientId, this.queryParams).subscribe((res) => {
          this.data = res['petitions'];
          this.clientInviteStatus = res['clientInviteStatus'];

          this.getClientDetails();
          console.log(res)
      });
      if (!this.allPetitionTypesAndSubTypes) {
        this.getPetitionTypes();
      }
  }

  getClientDetails() {
    this.clientDetailsService.getClientDetails(this.appService.clientId)
      .subscribe((res) => {
        this.clientDetails = res['clientDetails'];
        this.immigrationClientCommonService.userId = this.clientDetails['userId'];
        this.client = res['client'];
        this.appService.clientfirstName = res['clientDetails']['firstName'];
        this.appService.clientlastName = res['clientDetails']['lastName'];

      });
  }


  getPetitionTypes() {
    this.immigrationviewpetitionService.getAllPetitionTypesAndSubTypes()
      .subscribe((res) => {
          this.allPetitionTypesAndSubTypes = res['petitionTypes'];

          // Get all currencies
          const countryNamesMap: string[] = this.allPetitionTypesAndSubTypes.map(data => data['country']);

          // Unique currencies
          this.countryNames = countryNamesMap.filter((x, i, a) => x && a.indexOf(x) === i);
      });
  }

  ngOnInit() {
    this.headerService.showSideBarMenu('immigrationview-client', 'immigrationview/tab/clients');
  }

  addNewPetition() {
      if (this.clientInviteStatus !== 'Accept') {
        let informationMessage = 'Cannot add petition as the Beneficiary has not accepted the invite. Please inform him to accept the same in order to proceed further.';
        if (this.clientInviteStatus === 'Decline') {
          informationMessage = 'Petitions cannot be added to this beneficiary as the invitation is declined.';
        }
        this.dialog.open(InformationDialogComponent, {
          data: {message: informationMessage}
        });
      } else {
        let newPetitionData: NewPetitionData = {
          countryNames: this.countryNames,
          allPetitionTypesAndSubTypes: this.allPetitionTypesAndSubTypes
        };

        this.dialog.open(AddPetitionDialogComponent, {
          data: newPetitionData
        }).afterClosed().subscribe((result) => {
          if (result) {
            this.immigrationviewpetitionService.saveNewImmigrationViewPetition(result, this.headerService.user.userId).subscribe((res) => {
              this.message = res['statusCode'];
              if (this.message === 'SUCCESS') {
                this.getPetitionData();
              } else {
                let errorMessage = 'Unable to add petition';
                if (res['statusDescription'] != null) {
                  errorMessage = res['statusDescription'];
                }

                this.dialog.open(InformationDialogComponent, {
                  data: {
                    title: 'Error',
                    message: errorMessage
                  }
                });
              }
            });
          }
        });

      }
  }

  toggleEmailNotifications() {
    this.immigrationviewpetitionService.toggleEmailNotification(this.appService.clientId).subscribe((res) => {
      if (res['statusCode'] === 'SUCCESS') {
        this.getPetitionData();
      }
    });
  }

  onUserRowClick(event): void {
      console.log('petitions:::::%o', event.data);
      this.appService.petitionId = event.data.petitionId;
      this.appService.clientId = event.data.clientId;
      this.questionnaireCommonService.questionnaireList = null;
      this.appService.moveToPage('immigrationview/petition/details/petition-details');
      this.appService.currentSBLink = 'Petition Details';
  }
}
