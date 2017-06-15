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
    private data;
    private orgId: string;
    private user: User;
    private users;

    settings = {
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
            petitionName: {
                title: 'Name'
            },
            petitionNumber: {
                title: 'File No.',
                class: 'petitionTable-fileno'
            },
            firstName: {
                title: 'First Name'
            },
            lastName: {
                title: 'Last Name'
            },
            petitionType: {
                title: 'Type',
                class: 'petitionTable-type'
            },
            lastUpdate: {
                title: 'Last Updated'
            },
            status: {
                title: 'Status',
                 class: 'petitionTable-status'
            },
            assignedToName: {
                title: 'Assigned To'
            },
            petitionStage: {
                title: 'Stage'
            },
            daysInStage: {
                title: '# Days',
                class: 'dsinstage'
            },
            tag: {
                title: 'Tag',
                class: 'petitionTable-tag'
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    source: LocalDataSource = new LocalDataSource();
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
          this.source.load(this.petitions);

          // shaym working on this
          //this.appService.petitionfirstName = res['petitions'][0].firstName;
          //this.appService.petitionDetails = res['petitionInfo']['name'];
          console.log("wnjfvsugh", this.appService.petitionfirstName);
      });


  }

  ngDoCheck(){
    //console.log("Petitions|ngDoCheck|orgId:%o",this.appService.orgId);
    if(this.orgId != this.appService.orgId){
      this.ngOnInit();
    }
  }

  addPetitionSubmit(model: petition, isValid: boolean) {
      //console.log('formdata|account: %o|isValid:%o', model, isValid);
      if (isValid) {
          this.petitionService.saveNewPetition(model).subscribe((status) => { this.message = status[0] });
      } else {
          this.message = "Filled etails are not correct! please correct...";
      }

  }

  onUserRowClick(event): void{
      this.menuComponent.highlightSBLink('Petition Details');
    console.log("petitions:::::%o",event.data);
    this.appService.petitionId = event.data.petitionId;
    this.appService.clientId = event.data.clientId;
    this.appService.clientfirstName = event.data.firstName;
    console.log(this.appService.petitionfirstName);
    this.appService.clientlastName = event.data.lastName;
    this.appService.moveToPage("immigrationview-petition-details");
  }
}
