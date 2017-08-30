import { petition } from '../../../../models/petitions';
import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { Component, OnInit, DoCheck } from '@angular/core';
import { PetitionsService } from "./petitions.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

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
    private petitions: petition[];
    private petitionfirstName: any = [];
    public addPetition: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private orgId: string;
    private users;
    public settings;
    public data;
    public paginationData;
    public queryParameters;
    public getSubscription;
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
            'filter' : {
                'types' : [{
                    'headingName' : 'daysInStage',
                    'type' : '>'
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
                    console.log("Filter" + this.data);
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

    addPetitionSubmit(model: petition, isValid: boolean) {
        if (isValid) {
            this.petitionService.saveNewPetition(model).subscribe((status) => { this.message = status[0] });
        } else {
            this.message = "Filled details are not correct! please correct...";
        }

    }

    moveTo(event): void {
        this.menuComponent.highlightSBLink('Petition Details');
        console.log("petitions:::::%o", event.data);
        this.appService.petitionId = event.data.petitionId;
        this.appService.clientId = event.data.clientId;
        this.appService.clientfirstName = event.data.firstName;
        console.log(this.appService.petitionfirstName);
        this.appService.clientlastName = event.data.lastName;
        this.appService.petitionType = event.data.petitionType;
        this.appService.moveToPage("immigrationview-petition-details");
    }
    ngOnDestroy(){
        //this.getSubscription.unsubscribe();
    }
}
