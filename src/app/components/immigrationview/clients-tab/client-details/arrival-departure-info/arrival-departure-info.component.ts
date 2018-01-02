import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {ImmigrationViewArrivalDepartureInfoService} from './arrival-departure-info.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';
import {PetitionsService} from '../../../petitions-tab/petitions/petitions.service';
import {SortType} from '../../../../framework/smarttable/types/query-parameters';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {IHDateUtil} from '../../../../framework/utils/date.component';
export interface ConfirmModel {
    title: string;
    message: string;
    arrDepInfo: boolean;
    addArrDep: boolean;
    addArrDeparture: Object;
    arrivalDate: string;
    departureDate: string;
}
@Component({
  selector: 'ih-arrival-departure-info',
  templateUrl: './arrival-departure-info.component.html',
  styleUrls: ['./arrival-departure-info.component.sass'],
  providers: [ImmigrationViewArrivalDepartureInfoService, PetitionsService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ImmigrationViewArrivalDepartureInfoComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private delmessage;
  private arrivalDepartureInfo: any[];
  private arrivalDepartureInfoScreenData: any;
  private message: string;
  public arrDepInfo = true;
  public addArrDeparture: any = {};
  public addArrDep: boolean;
  public beforeEdit: any;
  public editFlag = true;
  public rowClicked: boolean ;
  public data;
  public settings;
  public showWorkAddrSaveButtonProgress = false;
  onDateChanged(event: IMyDateModel) { }
  private myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  constructor(private arrivalDepartureInfoService: ImmigrationViewArrivalDepartureInfoService,
      public appService: AppService, public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService,  private petitionService: PetitionsService) {
      super(dialogService);
      this.settings = {
        'sort': [{
          headingName: 'lastUpdate',
          sort: SortType.DESC
        }],
        'columnsettings': [
            {

                headerName: 'Departure Date',
                field: 'departureDate',
              type: 'datePicker'
            },
            {

                headerName: 'Departure Country',
                field: 'departureCountry',
              type: 'text'
            },
            {

                headerName: 'Arrival Date',
                field: 'arrivalDate',
              type: 'datePicker'
            },
            {
                headerName: 'Arrival Country',
                field: 'arrivalCountry',
              type: 'text'
            },
            {

                headerName: 'Visa Type',
                field: 'visaType',
              type: 'dropDown',
              data: this.getPetitionTypeValues()
            },
            {

                headerName: 'I-94',
                field: 'i94',
              type: 'text'
            },

        ]
      }
  }
  getArrivalDepartueInfo() {
      this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.appService.clientId)
          .subscribe((res) => {
              this.data = res['arrivalDepartures'];

          });
  }
  ngOnInit() {
      this.getArrivalDepartueInfo();
  }
  highlightSBLink(link) {
      this.appService.currentSBLink = link;
  }

  addNewArrDep() {
      this.dialogService.addDialog(ImmigrationViewArrivalDepartureInfoComponent, {
          addArrDep: true,
          arrDepInfo: false,
          title: 'Add Arrival Departure Info',
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {

              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture, this.headerService.user.userId).subscribe((res) => {
                  if (res['statusCode'] === 'SUCCESS') {
                      this.getArrivalDepartueInfo();
                  }
              });
          }
      });
  }
  arrDepSave() {
      this.addArrDeparture['clientId'] = this.appService.clientId;
      this.showWorkAddrSaveButtonProgress = true;
      if (this.addArrDeparture['departureDate'] && this.addArrDeparture['departureDate']['formatted']) {
           this.addArrDeparture['departureDate'] = this.addArrDeparture['departureDate']['formatted'];
      }
      if (this.addArrDeparture['arrivalDate'] && this.addArrDeparture['arrivalDate']['formatted']) {
        this.addArrDeparture['arrivalDate'] = this.addArrDeparture['arrivalDate']['formatted'];
      }
      this.appService.addArrDeparture = this.addArrDeparture;
      this.result = true;
      this.close();
  }
  cancel() {
      this.result = false;
      this.close();
  }
  deleteArrivalInfo(arrivalDeprtInfo) {
      this.delmessage = arrivalDeprtInfo.data.i94;
      this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
          }
      }).afterClosed().subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.arrivalDepartureInfoService.removeClientArrivalDeparture(arrivalDeprtInfo.data['arrivalDepartureInfoId']).subscribe((res) => {
                    this.showWorkAddrSaveButtonProgress = false;
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getArrivalDepartueInfo();
                    }
                });
            }
      });
  }
  editArrivalInfo(arrivalDeptInfo) {
      this.editFlag = true;
      if (this.editFlag) {
          this.beforeEdit = (<any>Object).assign({}, arrivalDeptInfo.data);
      }
     this.dialogService.addDialog(ImmigrationViewArrivalDepartureInfoComponent, {
          addArrDep: true,
          arrDepInfo: false,
          title: 'Edit Arrival Departure Info',
          addArrDeparture: this.editFlag ? this.beforeEdit : this.addArrDeparture,
          arrivalDate: arrivalDeptInfo.data.arrivalDate,
          departureDate: arrivalDeptInfo.data.departureDate,

     }).subscribe((isConfirmed) => {
         if (isConfirmed) {
              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture, this.headerService.user.userId).subscribe((res) => {
                  if (res['statusCode'] === 'SUCCESS') {
                      this.getArrivalDepartueInfo();
                  }
              });
          } else {
              this.editFlag = false;
          }
      });
  }

  getPetitionTypeValues() {
    let x = [];
    this.petitionService.getAllPetitionTypesAndSubTypes().subscribe(res => {
      if (res['petitionTypes'] !== undefined) {
        let data = res['petitionTypes'];
        for (let i = 0; i < data.length; i++) {
          x.push({'display': data[i]['petitiontype'], 'value': data[i]['petitiontype']});
        }
      }

    })
    return x;
  }
}
