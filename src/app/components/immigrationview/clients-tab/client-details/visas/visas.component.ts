import { AppService } from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {ImmigrationViewVisasService} from './visas.service';
import {FormGroup, FormControl} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {IHDateUtil} from '../../../../framework/utils/date.component';

export interface ConfirmModel {
  title: string;
  message: string;
  showAddVisapopup: boolean;
  getVisasData: boolean;
  newvisaitem: Object;
  expiresOn: string;
  issuedOn: string;
}


@Component({
  selector: 'ih-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.sass'],
  providers: [ImmigrationViewVisasService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ImmigrationViewVisasComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public addVisa: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public showAddVisapopup: boolean;
  public getVisasData = true;
  public newvisaitem: any = {};
  public editvisaFlag = true;
  public beforevisaEdit: any;
  public expiresOn;
  public issuedOn;
  public settings;
  public data;
  public delmesage;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public saveButtonProgress = false;

  onDateChanged(event: IMyDateModel) {
    this.myDatePickerOptions.disableSince = event.date;
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  constructor(private immigrationviewVisasService: ImmigrationViewVisasService, public appService: AppService, public dialogService: DialogService,
              public dialog: MatDialog, public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {

          headerName: 'Country',
          field: 'country',
        },
        {

          headerName: 'Petition Number',
          field: 'petitionNumber'
        },
        {

          headerName: 'Visa Number',
          field: 'visaNumber'
        },
        {
          headerName: 'Visa Type',
          field: 'visaType'
        },
        {

          headerName: 'Issued On',
          field: 'issuedOn'
        },
        {

          headerName: 'Expires On',
          field: 'expiresOn'
        },

      ]
    }




  }
  getVisaaData() {
    this.immigrationviewVisasService.getClientVisas(this.appService.clientId).subscribe((res) => {
      this.data = res['visas'];
    });
  }

  ngOnInit() {
    this.getVisaaData();
  }

  addNewVisa() {
    this.dialogService.addDialog(ImmigrationViewVisasComponent, {
      showAddVisapopup: true,
      getVisasData: false,
      title: 'Add Visa',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.getVisaaData();
      }
    });
  }
  visaSave() {
    this.saveButtonProgress = true;
    this.newvisaitem['clientId'] = this.appService.clientId;
    if (this.newvisaitem['issuedOn'] && this.newvisaitem['issuedOn']['formatted']) {

      this.newvisaitem['issuedOn'] = this.newvisaitem['issuedOn']['formatted'];
    }
    if (this.newvisaitem['expiresOn'] && this.newvisaitem['expiresOn']['formatted']) {
      this.newvisaitem['expiresOn'] = this.newvisaitem['expiresOn']['formatted'];
    }
    this.appService.newvisaitem = this.newvisaitem;
    this.immigrationviewVisasService.saveClientVisas(this.appService.newvisaitem, this.headerService.user.userId).subscribe((res) => {
      this.message = res['statusCode'];
      if (this.message === 'SUCCESS') {
        this.result = true;
      } else {
        this.dialog.open(InformationDialogComponent, {
          data: {
            title: 'Error',
            message: 'Unable to save Visa.'
          }
        });
        this.result = false;
      }
      this.saveButtonProgress = false;
      this.close();
    });


  }
  cancel() {
    this.result = false;
    this.close();
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }

  editVisas(event): void {
    this.editvisaFlag = true;
    if (this.editvisaFlag) {
      this.beforevisaEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(ImmigrationViewVisasComponent, {
      getVisasData: false,
      showAddVisapopup: true,
      title: 'Edit Visa',
      newvisaitem: this.editvisaFlag ? this.beforevisaEdit : this.newvisaitem,
      issuedOn: event.data.issuedOn,
      expiresOn: event.data.expiresOn
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.getVisaaData();
      }
    });
  }

  deleteVisas(event): void {
    this.delmesage = event.data.country
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Delete  ' + this.delmesage + ' ?'
      }
    }).afterClosed().subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.immigrationviewVisasService.deleteClientVisa(event.data['visaId']).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
              this.getVisaaData();
            }
          });
        }
      });
  }
}
