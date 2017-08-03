import { Component, OnInit, DoCheck } from '@angular/core';
import {petition} from "../../models/petitions";
import {PetitionsService} from "./petitions.service";
import {FormGroup, FormControl} from "@angular/forms";
import { Router } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import {MenuComponent} from "../menu/menu.component";

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
    private user: User;
    private users;
    public settings;
    public data;

    constructor(private router: Router,
        private petitionService: PetitionsService, private appService: AppService, private menuComponent: MenuComponent) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }

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
            tag: new FormControl('')
        });
        this.settings={
            "isAddButtonEnable":false,
            "columnFilter":true,
            "isDeleteEnable":false,
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
                    headerName: "Last Updated",
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
                },
            ]
        }
    }

  ngOnInit() {
    this.appService.showSideBarMenu(null, "petitions");
    this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    this.orgId = this.appService.orgId;
    this.petitionService
      .getPetitions(this.appService.orgId)
      .subscribe((res: any) => {
          this.petitions = res['petitions'];
          this.petitionfirstName = this.petitions;
          console.log(this.petitions);
          this.data=this.petitions;
      });


  }
  filterData(filterQueries){
        this.petitionService.getPetitionsFilteredData(this.appService.orgId, filterQueries).subscribe(res=>{
            this.data=res['petitions'];
        })
    }


  ngDoCheck(){
    //console.log("Petitions|ngDoCheck|orgId:%o",this.appService.orgId);
    if(this.orgId != this.appService.orgId){
      this.ngOnInit();
    }
  }

  addPetitionSubmit(model: petition, isValid: boolean) {
      if (isValid) {
          this.petitionService.saveNewPetition(model).subscribe((status) => { this.message = status[0] });
      } else {
          this.message = "Filled details are not correct! please correct...";
      }

  }

  moveTo(event): void{
    this.menuComponent.highlightSBLink('Petition Details');
    console.log("petitions:::::%o",event.data);
    this.appService.petitionId = event.data.petitionId;
    this.appService.clientId = event.data.clientId;
    this.appService.clientfirstName = event.data.firstName;
    console.log(this.appService.petitionfirstName);
    this.appService.clientlastName = event.data.lastName;
    this.appService.petitionType=event.data.petitionType;
    this.appService.moveToPage("immigrationview-petition-details");
  }
}
