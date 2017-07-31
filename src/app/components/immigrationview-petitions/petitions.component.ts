import { Component, OnInit } from '@angular/core';
import {petition} from "../../models/petitions";
import {ImmigrationViewPetitionsService} from "./petitions.service";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {MenuService} from "../menu/menu.service";
import {Router} from "@angular/router";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";

import { CustomEditorComponent } from './custom-editor.component';
import { CustomRenderComponent } from './custom-render.component';

import { PetitionSubTypeCustomEditorComponent } from './petitionSubType-custom-editor.component';

export interface ConfirmModel {
    title: string;
    message: string;
    showAddPetitionpopup: boolean;
    getPetitionsData: boolean;

}
@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.sass']
})
export class ImmigrationViewPetitionsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private allSubTypes = {};

    private delmessage;
    private petitionList: petition[];
    public addPetition: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private allPetitionTypesAndSubTypes;
    public showAddPetitionpopup: boolean;
    public getPetitionsData: boolean = true;
    public newpetitionitem: any = {};
    public warningMessage:boolean=false;
    public settings;
    public data;
    private user: User;
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    constructor(private immigrationviewpetitionService: ImmigrationViewPetitionsService, public appService: AppService,
        private menuService: MenuService, private router: Router, public dialogService: DialogService) {
        super(dialogService);
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
            tag: new FormControl(''),
            userId: new FormControl(''),
            accountId: new FormControl('')
        });
         this.settings={
            'isDeleteEnable':false,
            'newVariable':'abc',
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "petitionName",
                },
                {

                    headerName: "Type",
                    field: "petitionType",
                },
                {

                    headerName: "Subtype",
                    field: "petitionSubType"
                },
                {

                    headerName: "Status",
                    field: "status"
                },
                {

                    headerName: "Stage",
                    field: "stage"
                },
                {

                    headerName: "Created On",
                    field: "createdOn",
                    width:350,
                },
                {

                    headerName: "Last Updated",
                    field: "lastUpdate",
                    width:350,
                },
                {

                    headerName: "Assigned To",
                    field: "assignedToName"
                },
                
                
            ]
        }
    }

    getPetitionData() {
        this.immigrationviewpetitionService.getPetitions(this.appService.orgId, this.appService.clientId).subscribe((res) => {
            //this.source.load(res['petitions']);
            this.data=res['petitions'];
        });
        this.immigrationviewpetitionService.getAllPetitionTypesAndSubTypes()
            .subscribe((res) => {
                this.allPetitionTypesAndSubTypes = res['petitionTypes'];
            });
    }
    handleChange(event) {
        console.log(event.target.value);
        for (var i = 0; i < this.allPetitionTypesAndSubTypes.length; i++) {
            if (event.target.value == this.allPetitionTypesAndSubTypes[i].petitiontype) {
                this.allSubTypes = this.allPetitionTypesAndSubTypes[i].petitionSubTypes;
            }
        }
        this.appService.allsubtypesarray(this.allSubTypes);

            var currentYear = new Date().getFullYear();
            this.newpetitionitem['petitionName'] = this.newpetitionitem['petitiontype']+ " " + currentYear;
    }

  ngOnInit() {
      this.immigrationviewpetitionService.getPetitions(this.appService.orgId, this.appService.clientId)
          .subscribe((res) => {
              //this.source.load(res['petitions']);
              this.data=res['petitions'];
          });

      this.immigrationviewpetitionService.getAllPetitionTypesAndSubTypes()
          .subscribe((res) => {
              this.allPetitionTypesAndSubTypes = res['petitionTypes'];
          });

  }
  addNewPetition() {
      this.dialogService.addDialog(ImmigrationViewPetitionsComponent, {
          showAddPetitionpopup: true,
          getPetitionsData: false,
          title: 'Add Petition',
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
              this.immigrationviewpetitionService.saveNewImmigrationViewPetition(this.appService.newpetitionitem).subscribe((res) => {
                  this.message = res['statusCode'];
                  if (this.message == 'SUCCESS') {
                      this.getPetitionData();
                  } else {
                      this.dialogService.addDialog(ConfirmComponent, {
                          title: 'Error..!',
                          message: 'Unable to Add Petition.'
                      });
                  }

              });
          }
      });
  }

  getPetitionTypeId(petitionType: string) : string{
    for(let petitionTypeObj of this.allPetitionTypesAndSubTypes){
      if(petitionTypeObj['petitiontype'] === petitionType){
        return petitionTypeObj['petitionTypeId'];
      }
    }
  }

  getPetitionSubTypeId(petitionType: string, petitionSubType: string) : string{
      for(let petitionTypeObj of this.allPetitionTypesAndSubTypes){
        if(petitionTypeObj['petitiontype'] === petitionType){
          if(petitionTypeObj['petitionSubTypes'].length == 0){
            return;
          }
          for(let petitionSubTypeObj of petitionTypeObj['petitionSubTypes']){
            if(petitionSubTypeObj['petitionSubType'] === petitionSubType){
              return petitionSubTypeObj['petitionSubTypeId'];
            }
          }
        }
      }
    }

    isPetitionSubTypeExists(petitionType: string){
      for(let petitionTypeObj of this.allPetitionTypesAndSubTypes){
            if(petitionTypeObj['petitiontype'] === petitionType && petitionTypeObj['petitionSubTypes'].length > 0){
              return true;
            }
      }
      return false;
    }

  petitionSave() {
      this.newpetitionitem['clientId'] = this.appService.clientId;
      this.newpetitionitem['orgId'] = this.appService.orgId;
      this.newpetitionitem['petitionTypeId'] = this.getPetitionTypeId(this.newpetitionitem['petitiontype']);
      this.newpetitionitem['petitionSubTypeId'] = this.getPetitionSubTypeId(this.newpetitionitem['petitiontype'], this.newpetitionitem['petitionSubType']);
      this.newpetitionitem['userId'] = this.user.userId;
      this.newpetitionitem['accountId'] = this.user.accountId;

      //Set default values
      if (this.newpetitionitem['status'] == undefined) {
          this.newpetitionitem['status'] = "Open";
      }
      if (this.newpetitionitem['petitionName'] == undefined || this.newpetitionitem['petitionName'] == '') {
          var currentYear = new Date().getFullYear();
          this.newpetitionitem['petitionName'] = this.newpetitionitem['petitiontype'] + currentYear;
      }
      if((this.isPetitionSubTypeExists(this.newpetitionitem['petitiontype']) && this.newpetitionitem['petitionSubType']==undefined)||this.newpetitionitem['petitiontype']==undefined||this.newpetitionitem['petitionName']==''){
          this.warningMessage=true;
      }
      else{
          this.warningMessage=false;
          this.appService.newpetitionitem = this.newpetitionitem;
          this.result = true;
          this.close();
      }

  }
  cancel() {
      this.result = false;
      this.close();
  }



   

    onDeleteConfirm(immViewpetitions) {
        this.delmessage = immViewpetitions.data.petitionName;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete '+this.delmessage+' ?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {

                }
            });
    }

  onUserRowClick(event): void {
      console.log("petitions:::::%o", event.data);
      this.appService.petitionId = event.data.petitionId;
      this.appService.clientId = event.data.clientId;
      this.appService.moveToPage("immigrationview-petition-details");
      this.appService.currentSBLink = "Petition Details";
  }
}
