import { AppService } from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import { Component, OnInit } from '@angular/core';
import { ImmigrationViewArrivalDepartureInfoService } from './arrival-departure-info.service';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from "../../../../common/header/header.service";
export interface ConfirmModel {
    title: string;
    message: string;
    arrDepInfo: boolean;
    addArrDep: boolean;
    addArrDeparture:Object;
    arrivalDate:string;
    departureDate:string;
}
@Component({
  selector: 'app-arrival-departure-info',
  templateUrl: './arrival-departure-info.component.html',
  styleUrls: ['./arrival-departure-info.component.sass']
})
export class ImmigrationViewArrivalDepartureInfoComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private delmessage;
  private arrivalDepartureInfo: any[];
  private arrivalDepartureInfoScreenData: any;
  private message: string;
  public arrDepInfo: boolean = true;
  public addArrDeparture: any = {};
  public addArrDep: boolean;
  public beforeEdit: any;
  public editFlag: boolean = true;
  public rowClicked: boolean ;
  public data;
  public settings;
  onDateChanged(event: IMyDateModel) {}
  private myDatePickerOptions: IMyOptions = {
      // other options...
      dateFormat: 'mm-dd-yyyy',
      showClearDateBtn: false,
  };
  constructor(private arrivalDepartureInfoService: ImmigrationViewArrivalDepartureInfoService,
      public appService: AppService, public dialogService: DialogService, public headerService: HeaderService) {
      super(dialogService);
      this.settings = {

            'columnsettings': [
                {

                    headerName: "Departure Date",
                    field: "departureDate",
                },
                {

                    headerName: "Departure Country",
                    field: "departureCountry"
                },
                {

                    headerName: "Arrival Date",
                    field: "arrivalDate"
                },
                {
                    headerName: "Arrival Country",
                    field: "arrivalCountry"
                },
                {

                    headerName: "Visa Type",
                    field: "visaType"
                },
                {

                    headerName: "I-94",
                    field: "i94"
                },

            ]
        }
  }
  getArrivalDepartueInfo() {
      this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.appService.clientId)
          .subscribe((res) => {
              this.data=res['arrivalDepartures'];

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

              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture,this.headerService.user.userId).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
                      this.getArrivalDepartueInfo();
                  }
              });
          }
      });
  }
  arrDepSave() {
      this.addArrDeparture['clientId'] = this.appService.clientId;

      if(this.addArrDeparture['departureDate'] && this.addArrDeparture['departureDate']['formatted']){
           this.addArrDeparture['departureDate'] = this.addArrDeparture['departureDate']['formatted'];
      }
      if(this.addArrDeparture['arrivalDate'] && this.addArrDeparture['arrivalDate']['formatted']){
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
      this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirmation',
          message: 'Are you sure you want to Delete ' + this.delmessage+'?'
      })
          .subscribe((isConfirmed) => {
              if (isConfirmed) {
                  this.arrivalDepartureInfoService.removeClientArrivalDeparture(arrivalDeprtInfo.data['arrivalDepartureInfoId']).subscribe((res) => {
                      if (res['statusCode'] == 'SUCCESS') {
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
          arrivalDate:arrivalDeptInfo.data.arrivalDate,
          departureDate:arrivalDeptInfo.data.departureDate,

     }).subscribe((isConfirmed) => {
         if (isConfirmed) {
              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture,this.headerService.user.userId).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
                      this.getArrivalDepartueInfo();
                  }
              });
          }
          else {
              this.editFlag = false;
          }
      });
  }


}
