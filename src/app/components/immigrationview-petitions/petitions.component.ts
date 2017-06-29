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
    private data
    private allPetitionTypesAndSubTypes;
    public showAddPetitionpopup: boolean;
    public getPetitionsData: boolean = true;
    public newpetitionitem: any = {};

    settings = {
        add: {
            addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
            saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmSave: true
        },
        actions: {
          delete :  false
        },
        columns: {
            petitionName: {
                title: 'Name'
            },
            petitionType: {
                title: 'Type',
                class:'addPetition-Type',
                //type: 'html',
                //editor: {
                //    type: 'custom',
                //    component: CustomEditorComponent,
                //}
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            {
                                value: "H1B",
                                title: "H1B"
                            },
                            {
                                value: "L1",
                                title: "L1"
                            },
                            {
                                value: "H1B-RFE",
                                title: "H1B-RFE"
                            }
                        ]
                    }
                }
            },
            petitionSubType: {
                title: 'Subtype',
                class: 'addPetition-subType',
                //type: 'html',
                //editor: {
                //    type: 'custom',
                //    component: PetitionSubTypeCustomEditorComponent
                editor: {
                  type: 'list',
                  config: {
                      list: [
                        {
                          value: "New",
                          title: "New"
                        },
                        {
                          value: "Extension",
                          title: "Extension"
                        },
                        {
                          value: "Transfer",
                          title: "Transfer"
                        }
                      ]
                  }
                }
            },

            status: {
                title: 'Status',
                class: 'addPetition-status',
                 editor: {
                  type: 'list',
                  config: {
                      list: [
                        {
                          value: "Open",
                          title: "Open"
                        },
                        {
                          value: "Close",
                          title: "Close"
                        }
                      ]
                  }
                }
            },
            stage: {
                title: 'Stage',
                editable: false
            },
            createdOn: {
               title: 'Created',
               editable: false,
               class: 'addPetition-createdon'
            },
            lastUpdate: {
               title: 'Last Updated',
               editable: false,
               class: 'addPetition-updatedon'
            },
            assignedToName: {
                title: 'Assigned To',
                editable: false
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    source: LocalDataSource = new LocalDataSource();
    sourceForPetitionTypes: LocalDataSource = new LocalDataSource();
    private user: User;

    private petitionTypes: any = {"H1B": "14a8e52f-2f5a-11e7-bf66-0aac8eb8f426"};
    private petitionSubTypes: any = {
      "New": "45b99d86-2f5a-11e7-bf66-0aac8eb8f426",
      "Extension": "4a83aff2-2f5a-11e7-bf66-0aac8eb8f426",
      "Transfer": "4ef8b482-2f5a-11e7-bf66-0aac8eb8f426"
    };
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
    }

    getPetitionData() {
        this.immigrationviewpetitionService.getPetitions(this.appService.orgId, this.appService.clientId).subscribe((res) => {
            this.source.load(res['petitions']);
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

        //if (this.newpetitionitem['petitionName'] == undefined || this.newpetitionitem['petitionName'] == '') {
            var currentYear = new Date().getFullYear();
            this.newpetitionitem['petitionName'] = this.newpetitionitem['petitiontype'] + currentYear;
        //}
    }

  ngOnInit() {
      this.immigrationviewpetitionService.getPetitions(this.appService.orgId, this.appService.clientId)
          .subscribe((res) => {
              this.source.load(res['petitions']);
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
  petitionSave() {
      this.newpetitionitem['clientId'] = this.appService.clientId;
      this.newpetitionitem['orgId'] = this.appService.orgId;
      this.newpetitionitem['petitionTypeId'] = this.petitionTypes[this.newpetitionitem['petitiontype']];
      this.newpetitionitem['petitionSubTypeId'] = this.petitionSubTypes[this.newpetitionitem['petitionSubType']];
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
      this.appService.newpetitionitem = this.newpetitionitem;
      this.result = true;
      this.close();
  }
  cancel() {
      this.result = false;
      this.close();
  }

  onCreateConfirm(event) : void {
     console.log("Petition table onCreateConfirm event: %o",event.newData);
     event.newData['clientId'] = this.appService.clientId;
     event.newData['orgId'] = this.appService.orgId;
     //this.petitionTypes[event.newData['petitionType']];
     event.newData['petitionTypeId'] = this.petitionTypes[event.newData['petitionType']];
     event.newData['petitionSubTypeId'] = this.petitionSubTypes[event.newData['petitionSubType']];
     event.newData['userId'] = this.user.userId;
     event.newData['accountId'] = this.user.accountId;

     //Set default values
     if(event.newData['status'] == undefined){
        event.newData['status'] = "Open";
      }

     this.immigrationviewpetitionService.saveNewImmigrationViewPetition(event.newData).subscribe((res) => {
        if(res['statusCode'] == "SUCCESS"){
          event.newData = res['petition'];
          event.confirm.resolve(event.newData);
        } else {
            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Error..!',
                message: 'Please request the client to accept the invite.'
            });
          event.confirm.reject();
        }
     });
    }

    onEditConfirm(event) : void {
      console.log("Client table onEditConfirm event: %o",event.newData);
      this.immigrationviewpetitionService.updatePetition(event.newData).subscribe((res) => {
                this.message = res['statusCode'];
                if(this.message === "SUCCESS"){
                  event.confirm.resolve(event.newData);
                } else {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Unable to Edit Petition.'
                    });
                  event.confirm.resolve(event.data);
                }
      });
    }

    //onDeleteConfirm(event) : void {
    //  console.log("Client table onDeleteConfirm event: %o",event.data);
    //  //TODO - call delete backend
    //}
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
