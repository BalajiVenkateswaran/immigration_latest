import {Component, OnInit} from '@angular/core';
import {ArrivalDepartureInfoService} from './arrival-departure-info.service';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../../../framework/confirmbox/confirm.component';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';


export interface ConfirmModel {
  title: string;
  message: string;
  getArvdInfoData: boolean;
  addArrDep: boolean;
  newArvdInfoitem: Object;
  arrivalDate: string;
  departureDate: string;

}

@Component({
  selector: 'ih-arrival-desparture-info',
  templateUrl: './arrival-departure-info.component.html',
  styleUrls: ['./arrival-departure-info.component.sass'],
  providers: [ArrivalDepartureInfoService]
})
export class ArrivalDepartureInfoComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  public beforeEdit: any;
  public editFlag = true;
  public newArvdInfoitem: any = {};
  public addArrDep: boolean;
  public settings;
  public data;
  public delmessage;
  public addArrivalDespartureInfo: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public getArvdInfoData = true;
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };
  constructor(private arrivalDepartureInfoService: ArrivalDepartureInfoService, public appService: AppService, public dialogService: DialogService,
              public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: 'Departure date',
          field: 'departureDate'
        },
        {
          headerName: 'Departure Country',
          field: 'departureCountry'
        },
        {
          headerName: 'Arrival date',
          field: 'arrivalDate'
        },
        {
          headerName: 'Arrival Country',
          field: 'arrivalCountry'
        },
        {
          headerName: 'Visa Type',
          field: 'visaType'
        },
        {
          headerName: 'I-94',
          field: 'i94'
        }
      ]
    }

  }
  getarvdptData() {
    this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.headerService.user.userId).subscribe((res) => {
      this.data = res['arrivalDepartures'];

    });
  }

  ngOnInit() {
    this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.headerService.user.userId)
      .subscribe((res) => {
        this.data = res['arrivalDepartures'];
      });

  }
  addFunction() {
    this.dialogService.addDialog(ArrivalDepartureInfoComponent, {
      addArrDep: true,
      getArvdInfoData: false,
      title: 'Add Arrival Departure Info',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.newArvdInfoitem).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
            this.getarvdptData();
          } else {
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error..!',
              message: 'Unable to Add Arrival Departure Info.'
            });
          }

        });
      }
    });
  }
  ArvdInfoSave() {
    this.newArvdInfoitem['clientId'] = this.appService.clientId;
    if (this.newArvdInfoitem['departureDate'] && this.newArvdInfoitem['departureDate']['formatted']) {
      this.newArvdInfoitem['departureDate'] = this.newArvdInfoitem['departureDate']['formatted'];
    }
    if (this.newArvdInfoitem['arrivalDate'] && this.newArvdInfoitem['arrivalDate']['formatted']) {
      this.newArvdInfoitem['arrivalDate'] = this.newArvdInfoitem['arrivalDate']['formatted'];
    }
    this.appService.newArvdInfoitem = this.newArvdInfoitem;
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
  editRecord(event): void {
    this.editFlag = true;
    if (this.editFlag) {
      this.beforeEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(ArrivalDepartureInfoComponent, {
      addArrDep: true,
      getArvdInfoData: false,
      title: 'Edit Arrival Departure Info',
      newArvdInfoitem: this.editFlag ? this.beforeEdit : this.newArvdInfoitem,
      arrivalDate: event.data.arrivalDate,
      departureDate: event.data.departureDate,

    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.newArvdInfoitem).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getarvdptData();
          }
        });
      } else {
        this.editFlag = false;
      }
    });
  }

  deleteRecord(event): void {
    this.delmessage = event.data.i94
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.arrivalDepartureInfoService.removeClientArrivalDeparture(event.data['arrivalDepartureInfoId']).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
              this.getarvdptData();
            }
          });
        }
      });
  }

}
