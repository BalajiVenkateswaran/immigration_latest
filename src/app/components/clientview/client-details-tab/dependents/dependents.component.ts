import {Component, OnInit} from '@angular/core';
import {DependentService} from './dependents.service';
import {dependent} from '../../../../models/dependent';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {ConfirmationDialogComponent} from '../../../framework/popup/confirmation/confirmation.component';


export interface ConfirmModel {
  title: string;
  message: string;
  showAddCVdependentpopup: boolean;
  getCVDependentData: boolean;
  newCVdependentitem: Object;
}

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.sass'],
  providers: [DependentService]
})
export class DependentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  private dependentList: dependent[];
  public addDependent: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public settings;
  public data;
  public showAddCVdependentpopup: boolean;
  public getCVDependentData = true;
  public newCVdependentitem: any = {};
  public editFlag = true;
  public beforeEdit: any;
  public warningMessage = false;
  constructor(private dependentService: DependentService, public appService: AppService,
              public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: 'First Name',
          field: 'firstName'
        },
        {
          headerName: 'Middle Name',
          field: 'middleName'
        },
        {
          headerName: 'Last Name',
          field: 'lastName'
        },
        {
          headerName: 'Relation',
          field: 'relation'
        }
      ]
    }
  }

  getCVDpntData() {
    this.dependentService.getDependentSummary(this.headerService.user.userId).subscribe((res) => {
      this.data = res['dependents'];
      this.appService.dependents = res['dependents'];
    });
  }

  ngOnInit() {
    this.getCVDpntData();
  }
  capitalizeName(record) {
    if (record.firstName) {
      let splitWords = record.firstName.split(' ');
      let capitalizedFirstName = splitWords.map((item, index) => {
          if (index === 0) {
            return item.charAt(0).toUpperCase() + item.slice(1);
          } else {
            return item;
          }
      }).join(' ');
      record.firstName = capitalizedFirstName;
    }
    if (record.lastName) {
      let splitsWords = record.lastName.split(' ');
      let capitalizedLastName = splitsWords.map((item, index) => {
        if (index === 0) {
            return item.charAt(0).toUpperCase() + item.slice(1);
          } else {
            return item;
          }
      }).join(' ');
      record.lastName = capitalizedLastName;
    }

  }
  addFunction() {
    this.dialogService.addDialog(DependentsComponent, {
      showAddCVdependentpopup: true,
      getCVDependentData: false,
      title: 'Add Dependent',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dependentService.saveDependentsSummary(this.appService.newCVdependentitem).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message === 'SUCCESS') {
            this.getCVDpntData();
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: 'Unable to Add Dependent.'
              }
            });
          }

        });
      }
    });
  }
  dependentSave() {
    let isDuplicateExists: boolean;
    console.log(typeof(this.newCVdependentitem));
    this.data.map(item => {
      if (item.firstName.toUpperCase() === this.newCVdependentitem['firstName'].toUpperCase() && item.lastName.toUpperCase() === this.newCVdependentitem['lastName'].toUpperCase()
        && item.relation.toUpperCase() === this.newCVdependentitem['relation'].toUpperCase() && (item.middleName === this.newCVdependentitem.middleName || item.middleName === undefined
          || item.middleName === '')) {
        isDuplicateExists = true;
        return true;
      }
      return false;
    });
    this.newCVdependentitem['clientId'] = this.appService.clientId;
    if (this.newCVdependentitem['firstName'] === '' || this.newCVdependentitem['firstName'] == null || this.newCVdependentitem['firstName'] === undefined
      || this.newCVdependentitem['lastName'] === '' || this.newCVdependentitem['lastName'] == null || this.newCVdependentitem['lastName'] === undefined
      || this.newCVdependentitem['relation'] === '' || this.newCVdependentitem['relation'] == null || this.newCVdependentitem['relation'] === undefined) {
      this.warningMessage = true;
    } else if (isDuplicateExists) {
      this.dialog.open(InformationDialogComponent, {
        data: {
          title: 'Error',
          message: 'Dependent Already exists'
        }
      })
    } else {
      this.appService.newCVdependentitem = this.newCVdependentitem;
      this.result = true;
      this.close();
    }


  }
  cancel() {
    this.result = false;
    this.close();
  }



  onCreateConfirm(event): void {
    event.newData['clientId'] = this.headerService.user.userId;
    this.dependentService.saveDependentsSummary(event.newData).subscribe((res) => {
      this.message = res['statusCode'];
      if (this.message === 'SUCCESS') {
        event.newData = res['dependentsSummary'];
        event.confirm.resolve(event.newData);
      } else {
        this.dialog.open(InformationDialogComponent, {
          data: {
            title: 'Error',
            message: 'Unable to Add Dependent'
          }
        });
        event.confirm.reject();
      }
    });
  }

  editRecord(event): void {
    this.appService.moveToPageWithParams('immigrationview/client/detail/dependentDetails', event.data.dependentId);
    this.appService.currentSBLink = event.data.firstName;
  }
  deleteRecord(event): void {
    this.delmessage = event.data.firstName
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Delete ' + this.delmessage + '?'
      }
    }).afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.dependentService.removeDependentsSummary(event.data['dependentId']).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message === 'SUCCESS') {
              this.getCVDpntData();
            } else {
              event.confirm.reject();
            }
          });
        }
      });
  }


}
