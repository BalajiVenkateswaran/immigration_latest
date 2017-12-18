import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppService} from '../../../../../services/app.service';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
  selector: 'ih-add-petition-popup',
  template: `<div class="modal-dialog" ngDraggable>
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" mat-dialog-title="">Add Petition</h4>
        <button type="button" class="close" (click)="cancelClick()" id="ivClientDtlsPetitionsClose" tabindex=-1 >&times;</button>
      </div>
      <div class="modal-body" mat-dialog-content>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-5">Country:<span class="redstar">*</span></div>
              <div class="col-md-7">
                <select class="form-control" (change)="handleCountryChange($event)">
                  <option *ngFor="let countryName of data.countryNames" [selected]="countryName == 'United States'"
                          [value]="countryName" id="{{countryName}}">{{ countryName }}</option>
                </select>
              </div>
              <div class="col-md-5">Petition Type:<span class="redstar">*</span></div>
              <div class="col-md-7">
                <select class="form-control" [(ngModel)]="newPetitionItem.petitiontype" (change)="handlePetitionTypeChange($event)"
                        [ngClass]="newPetitionItem.petitiontype == '' ? 'redborder': ''">
                  <option *ngFor="let ptst of data.allPetitionTypesAndSubTypes" [value]="ptst.petitiontype"
                          id="{{ptst.petitiontype}}">{{ ptst.petitiontype }}</option>
                </select>
              </div>
              <div class="col-md-5">Petition Subtype:<span class="redstar">*</span></div>
              <div class="col-md-7">
                <select class="form-control" [(ngModel)]="newPetitionItem.petitionSubType" [ngClass]="allSubTypes.length > 0 
                && newPetitionItem.petitionSubType == '' ? 'redborder': ''">
                  <option *ngFor="let subtype of allSubTypes" [value]="subtype.petitionSubType" 
                          id="{{subtype.petitionSubType}}">{{ subtype.petitionSubType }}</option>
                </select>
              </div>
              <div class="col-md-5">Petition Name:<span class="redstar">*</span></div>
              <div class="col-md-7"><input type="text" id="ivClientDtlsPetitionsName" [(ngModel)]="newPetitionItem.petitionName" 
                                           [ngClass]="newPetitionItem.petitionName == '' ? 'redborder': ''"
                                           class="form-control"></div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <div class="row sfm" *ngIf="warningMessage">
                  <div class="col-md-12">
                    <span class="redstar">* Fields are Mandatory.</span>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-6"><button type="button" class="editbtn tbl-head-btn iportal-btnIMclient" 
	style="color: #008000 !important;margin-top: 4px!important;margin-right: 11px; width: 90%;" id="ivClientDtlsPetitionSave1" (click)="petitionSave()" 
                                                [disabled]="newPetitionItem.petitiontype == undefined || newPetitionItem.petitionSubType == undefined
                                                || newPetitionItem.petitionName == null || newPetitionItem.petitionName == undefined || newPetitionItem.petitionName == ''">Save</button></div>
                  <div class="col-md-6"><button type="button" class="editbtn tbl-head-btn iportal-btnIMclient" 
	style="color: #FF0000 !important;margin-left: 4px;width: 90%;margin-top: 4px!important;" id="ivClientDtlsPetitionCancel1" (click)="cancelClick()">Cancel</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
})
export class AddPetitionDialogComponent {

  public newPetitionItem: any = {};
  public allSubTypes: any[] = [];
  public warningMessage= false;

  constructor(public dialogRef: MatDialogRef<AddPetitionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: NewPetitionData,
              private appService: AppService, private headerService: HeaderService) {}

  cancelClick() {
    this.dialogRef.close(false);
  }

  handlePetitionTypeChange(event) {
    console.log(event.target.value);
    for (let i = 0; i < this.data.allPetitionTypesAndSubTypes.length; i++) {
      if (event.target.value === this.data.allPetitionTypesAndSubTypes[i].petitiontype) {
        this.allSubTypes = this.data.allPetitionTypesAndSubTypes[i].petitionSubTypes;
      }
    }
    if (!this.allSubTypes) {
      this.allSubTypes = [];
    }

    let currentYear = new Date().getFullYear();
    this.newPetitionItem['petitionName'] = this.newPetitionItem['petitiontype'] + ' ' + currentYear;
  }

  handleCountryChange(event){

  }



  petitionSave() {
    this.newPetitionItem['clientId'] = this.appService.clientId;
    this.newPetitionItem['orgId'] = this.headerService.selectedOrg['orgId'];
    this.newPetitionItem['petitionTypeId'] = this.getPetitionTypeId(this.newPetitionItem['petitiontype']);
    this.newPetitionItem['petitionSubTypeId'] = this.getPetitionSubTypeId(this.newPetitionItem['petitiontype'], this.newPetitionItem['petitionSubType']);
    this.newPetitionItem['userId'] = this.headerService.user.userId;
    this.newPetitionItem['accountId'] = this.headerService.user.accountId;

    // Set default values
    if (this.newPetitionItem['status'] === undefined) {
      this.newPetitionItem['status'] = 'Open';
    }
    if (this.newPetitionItem['petitionName'] === undefined || this.newPetitionItem['petitionName'] === '') {
      let currentYear = new Date().getFullYear();
      this.newPetitionItem['petitionName'] = this.newPetitionItem['petitiontype'] + currentYear;
    }
    if ((this.isPetitionSubTypeExists(this.newPetitionItem['petitiontype']) && this.newPetitionItem['petitionSubType'] === undefined)
      || this.newPetitionItem['petitiontype'] === undefined || this.newPetitionItem['petitionName'] === '') {
      this.warningMessage = true;
    } else {
      this.warningMessage = false;
      this.dialogRef.close(this.newPetitionItem);
    }
  }

  getPetitionTypeId(petitionType: string): string {
    for (let petitionTypeObj of this.data.allPetitionTypesAndSubTypes) {
      if (petitionTypeObj['petitiontype'] === petitionType) {
        return petitionTypeObj['petitionTypeId'];
      }
    }
  }

  getPetitionSubTypeId(petitionType: string, petitionSubType: string): string {
    for (let petitionTypeObj of this.data.allPetitionTypesAndSubTypes) {
      if (petitionTypeObj['petitiontype'] === petitionType) {
        if (petitionTypeObj['petitionSubTypes'].length === 0) {
          return;
        }
        for (let petitionSubTypeObj of petitionTypeObj['petitionSubTypes']) {
          if (petitionSubTypeObj['petitionSubType'] === petitionSubType) {
            return petitionSubTypeObj['petitionSubTypeId'];
          }
        }
      }
    }
  }

  isPetitionSubTypeExists(petitionType: string) {
    for (let petitionTypeObj of this.data.allPetitionTypesAndSubTypes) {
      if (petitionTypeObj['petitiontype'] === petitionType && petitionTypeObj['petitionSubTypes'].length > 0) {
        return true;
      }
    }
    return false;
  }
}

export interface NewPetitionData {
  countryNames: any[];
  allPetitionTypesAndSubTypes: any[];
}
