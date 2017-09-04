import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { Component, OnInit, DoCheck } from '@angular/core';
import { PetitionsService } from "./petitions.service";
import { Router } from '@angular/router';
import {SortType} from "../../../framework/smarttable/types/query-parameters";

@Component({
    selector: 'app-petitions',
    templateUrl: './petitions.component.html',
    styleUrls: ['./petitions.component.sass']
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
    private petitionfirstName: any = [];
    private message: string;
    private orgId: string;
    public settings;
    public data;
    public paginationData;
    public queryParameters;
    constructor(private router: Router,
        private petitionService: PetitionsService, private appService: AppService,
        private menuComponent: MenuComponent, private headerService: HeaderService) {
        this.settings = {
            "isAddButtonEnable": false,
            "columnFilter": true,
            "isDeleteEnable": false,
            'customPanel': true,
            'defaultFilter': [{
                headingName: "status",
                headerName: "Status",
                filterValue: "Open"
            }],
            'sort' : [{
                headingName: "lastUpdate",
                sort: SortType.DESC
            }],
            'filter' : {
                types : [{
                    field : 'daysInStage',
                    operator : '>'
                }]
            },
            'columnsettings': [
                {
                    headerName: "Name",
                    field: "petitionName",
                },
                {
                    headerName: "File No.",
                    field: "petitionNumber",
                },
                {
                    headerName: "First Name",
                    field: "firstName",
                },
                {
                    headerName: "Last Name",
                    field: "lastName",
                },
                {
                    headerName: "Type",
                    field: "petitionType",
                },
                {
                    headerName: "Updated On",
                    field: "lastUpdate",
                },
                {
                    headerName: "Status",
                    field: "status",
                    cellStyle:function(params){
                        if(params.value === 'M F D'){
                            return {
                                backgroundColor:'red'
                            };
                            
                        }
                        else{
                                return null;
                            }
                    }
                },
                {
                    headerName: "Final Action",
                    field: "finalStatus",
                },
                {
                    headerName: "Assigned To",
                    field: "assignedToName"
                },
                {
                    headerName: "Stage",
                    field: "petitionStage"
                },
                {
                    headerName: "# Days",
                    field: "daysInStage",
                    headerTooltip: "Number of days in current stage"
                },
                {
                    headerName: "Tag",
                    field: "tag"
                }
            ]
        }
    }

    ngOnInit() {
        this.appService.showSideBarMenu(null, "petitions");
        this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    }
    gettingOrganizationId(value){
        this.orgId=value;
        this.dataWithParameters(this.queryParameters);
    }
    dataWithParameters(queryData) {
        if(queryData){
            this.queryParameters=queryData
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

    ngDoCheck() {
        if (this.headerService.selectedOrg) {
            if (this.orgId != this.headerService.selectedOrg['orgId']) {
                this.orgId = this.headerService.selectedOrg['orgId'];
                this.dataWithParameters(this.queryParameters);
            }
        }

    }
    moveTo(event): void {
        this.menuComponent.highlightSBLink('Petition Details');
        this.appService.petitionId = event.data.petitionId;
        this.appService.clientId = event.data.clientId;
        this.appService.clientfirstName = event.data.firstName;
        this.appService.clientlastName = event.data.lastName;
        this.appService.petitionType = event.data.petitionType;
        this.appService.moveToPage("immigrationview-petition-details");
    }
}
