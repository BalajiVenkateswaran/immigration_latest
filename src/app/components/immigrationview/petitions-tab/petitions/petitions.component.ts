import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { PetitionsService } from './petitions.service';
import { SortType } from '../../../framework/smarttable/types/query-parameters';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';
import {QuestionnaireCommonService} from '../petition-details/questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'ih-immigrationview-petitions',
    templateUrl: './petitions.component.html',
    styleUrls: ['./petitions.component.sass'],
    providers: [PetitionsService],
    entryComponents: [SmartTableFrameworkComponent]
})
export class PetitionsComponent implements OnInit {
    private outlet: any = {
        breadcrumbs: null,
        header: 'header',
        message: null,
        carousel: null,
        menu: 'menu',
        footer: null
    };
    public data;
    public settings;
    public paginationData;
    public queryParameters;
    private orgId: string;
    private petitionTypesData: any;
    public statusTypes: any = [];
    constructor(private router: Router, private questionnaireCommonService: QuestionnaireCommonService,
        private petitionService: PetitionsService, private appService: AppService,
        private menuComponent: MenuComponent, private headerService: HeaderService) {


        this.statusTypes = [
            {
                'display': 'Open',
                'value': 'Open'
            },
            {
                'display': 'Close',
                'value': 'Close'
            }
        ];
        this.settings = {
            'isAddButtonEnable': false,
            'columnFilter': false,
            'isDeleteEnable': false,
            'customPanel': true,
            'isAddFilterButtonEnable': true,
          'isMorefilters': true,
          'defaultFilter': [{
                headingName: 'status',
                headerName: 'Status',
                filterValue: 'Open'
            }],
            'sort': [{
                headingName: 'lastUpdate',
                sort: SortType.DESC
            }],
            'filter': {
                types: [{
                    field: 'daysInStage',
                    operator: '>'
                      },
                  {
                    field: 'lastUpdate',
                    operator: '>'
                  }],
                quick: [
                    {
                        headerName: 'Status',
                        field: 'status',
                        values: [
                            { alias: 'Open', value: 'Open' },
                            { alias: 'Close', value: 'Close' }
                        ]
                    },
                    {
                        headerName: 'Type',
                        field: 'petitionType',
                        values: [
                            { alias: 'H1B', value: 'H1B' },
                            { alias: 'L1', value: 'L1' },
                            { alias: 'H1B-RFE', value: 'H1B-RFE' },
                            { alias: 'B1', value: 'B1' }
                        ]
                    }
                ]
            },
            gridOptions: {
              getRowStyle: function(params) {
                if (params.data.markForDeletion) {
                  return {
                    color: 'red !important'
                  };
                } else {
                  return null;
                }
              }
            },
            'columnsettings': [
                {
                    headerName: 'Name',
                    field: 'petitionName',
                    type: 'text'
                },
                {
                    headerName: 'File No.',
                    field: 'petitionNumber',
                    type: 'text'
                },
                {
                    headerName: 'First Name',
                    field: 'firstName',
                    type: 'text'
                },
                {
                    headerName: 'Last Name',
                    field: 'lastName',
                    type: 'text'

                },
                {
                    headerName: 'Type',
                    field: 'petitionType',
                    type: 'dropDown',
                    data: this.getPetitionTypeValues()
                },
                {
                    headerName: 'Updated On',
                    field: 'lastUpdate',
                    type: 'datePicker'
                },
                {
                    headerName: 'Status',
                    field: 'status',
                    type: 'dropDown',
                    data: this.statusTypes,
                    cellStyle: function (params) {
                        if (params.value === 'M F D') {
                            return {
                                backgroundColor: 'red'
                            };

                        } else {
                            return null;
                        }
                    }
                },
                {
                    headerName: 'Final Action',
                    field: 'finalStatus',
                  type: 'text'
                },
                {
                    headerName: 'Assigned To',
                    field: 'assignedToName',
                  type: 'text'
                },
                {
                    headerName: 'Stage',
                    field: 'petitionStage', type: 'text'
                },
                {
                    headerName: '# Days',
                    field: 'daysInStage',
                    headerTooltip: 'Number of days in current stage',
                    type: 'text'
                },
                {
                    headerName: 'Tag',
                    field: 'tag',
                  type: 'text'
                }
            ]
        }

    }

    ngOnInit() {
        this.headerService.showSideBarMenu(null, 'immigrationview/tab/petitions');
        this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    }
    gettingOrganizationId(value) {
        this.orgId = value;
        this.dataWithParameters(this.queryParameters);
    }
    dataWithParameters(queryData) {
        if (queryData) {
            this.queryParameters = queryData
        }

        if (this.headerService.selectedOrg && this.headerService.selectedOrg['orgId'] && queryData) {
            this.petitionService.getPetitionsWithQueryParams(this.headerService.selectedOrg['orgId'], queryData).subscribe(
                res => {
                    this.data = res['petitions'];
                    this.paginationData = res['pageMetadata'];
                }
            );
        }
    }


    moveToPetitionDetails(event): void {
        this.menuComponent.highlightSBLink('Petition Details');
        this.appService.petitionId = event.data.petitionId;
        this.appService.clientId = event.data.clientId;
        this.appService.clientfirstName = event.data.firstName;
        this.appService.clientlastName = event.data.lastName;
        this.appService.petitionType = event.data.petitionType;
        this.questionnaireCommonService.questionnaireList = null;
        this.appService.moveToPage('immigrationview/petition/details/petition-details');
    }
    getPetitionTypeValues() {
        let x = [];
        this.petitionService.getAllPetitionTypesAndSubTypes().subscribe(res => {
            if (res['petitionTypes'] !== undefined) {
                let data = res['petitionTypes'];
               for (let i = 0; i < data.length; i++) {
                   x.push({'display': data[i]['petitiontype'], 'value': data[i]['petitiontype']});
               }
            }

        })
        return x;
    }
}
