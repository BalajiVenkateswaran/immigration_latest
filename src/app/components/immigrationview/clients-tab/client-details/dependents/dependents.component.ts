import { dependent } from '../../../../../models/dependent';
import { User } from '../../../../../models/user';
import { AppService } from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {ImmigrationViewDependentService} from "./dependents.service";
import {FormGroup, FormControl} from "@angular/forms";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title: string;
  message: string;
  addDependnts: boolean;
  getDependents: boolean;

}
@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.sass']
})
export class ImmigrationViewDependentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  private dependentList: dependent[];
  public addDependent: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  private user: User;
  private deleteDependents: any;
  private dependent: any;
  public addDependents: any = {};
  public getDependents: boolean = true;
  public addedData: any = {};
  public addDependnts: any;
  public warningMessage: boolean = false;
  public settings;
  public data;
  constructor(private ImmigrationViewDependentService: ImmigrationViewDependentService, public appService: AppService, public dialogService: DialogService) {
    super(dialogService); if (this.appService.user) {
      this.user = this.appService.user;
    }
    this.settings = {
      'columnsettings': [
        {

          headerName: "First Name",
          field: "firstName",
        },
        {

          headerName: "Middle Name",
          field: "middleName",
        },
        {

          headerName: "Last Name",
          field: "lastName"
        },
        {
          headerName: "Relation",
          field: "relation"
        },


      ]
    }
  }
  getDepData() {
    this.ImmigrationViewDependentService.getDependentSummery(this.appService.clientId)
      .subscribe((res) => {
        this.data = res['dependents'];

        this.appService.dependents = res['dependents'];
      });
  }
  ngOnInit() {
    this.getDepData();
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }
  addFunction() {
    this.dialogService.addDialog(ImmigrationViewDependentsComponent, {
      addDependnts: true,
      getDependents: false,
      title: 'Add Dependent',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.addDependents = this.appService.addDependents;
        this.ImmigrationViewDependentService.saveDependentsSummary(this.addDependents).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getDepData();
          }
        });
      }
    });
  }
  dependentSave() {
    let isDuplicateExists:boolean;
    this.data.map(item=>{
       if(item.firstName.toUpperCase()==this.addDependents['firstName'].toUpperCase() && item.lastName.toUpperCase()==this.addDependents['lastName'].toUpperCase() && item.relation.toUpperCase()==this.addDependents['relation'].toUpperCase() && (item.middleName==this.addDependents.middleName || item.middleName==undefined || item.middleName=='')){
        isDuplicateExists=true;
        return true;
      }
      return false;
    })
    this.addDependents['clientId'] = this.appService.clientId;
    if (this.addDependents['firstName'] == '' || this.addDependents['firstName'] == null || this.addDependents['firstName'] == undefined || this.addDependents['lastName'] == '' || this.addDependents['lastName'] == null || this.addDependents['lastName'] == undefined || this.addDependents['relation'] == '' || this.addDependents['relation'] == null || this.addDependents['relation'] == undefined) {
      this.warningMessage = true;
    }else if(isDuplicateExists){
      this.dialogService.addDialog(ConfirmComponent,{
        title:'Error..!',
        message:'Dependent Already exists'
      })
    } 
    else {
      this.warningMessage = false;
      this.appService.addDependents = this.addDependents;
      this.result = true;
      this.close();
    }

  }
  cancel() {
    this.result = false;
    this.close();
  }

  editRecord(event): void {
    this.appService.moveToPageWithParams('dependentDetails', event.data.dependentId);
    this.appService.currentSBLink = event.data.firstName;
  }

  deleteRecord(dependents) {
    this.dependent = dependents.data.firstName;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.dependent + ' ?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.ImmigrationViewDependentService.removeDependentsSummary(dependents.data['dependentId']).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
              this.getDepData();
            }
          });
        }
      });
  }

}
