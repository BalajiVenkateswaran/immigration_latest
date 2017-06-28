import { Component, OnInit } from '@angular/core';
import { ImmigrationViewArrivalDepartureInfoService } from './arrival-departure-info.service';
import { ArrivalDepartureInfo } from "../../models/arrivalDepartureInfo";
import { LocalDataSource  } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
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
  private user: User;
  public arrDepInfo: boolean = true;
  public addArrDeparture: any = {};
  public addArrDep: boolean;
  public beforeEdit: any;
  public editFlag: boolean = true;
  public rowClicked: boolean ;
  onDateChanged(event: IMyDateModel) {}
  private myDatePickerOptions: IMyOptions = {
      // other options...
      dateFormat: 'mm-dd-yyyy',
      showClearDateBtn: false,
  };
  settings = {
      add: {
          addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
          createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
          cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
          confirmCreate: true
      },
      edit: {
          editButtonContent: '<i class="fa fa-pencil" aria-hidden="false"></i>',
          saveButtonContent: '<i class="fa fa-check" aria-hidden="false"></i>',
          cancelButtonContent: '<i class="fa fa-times" aria-hidden="false"></i>',
          confirmSave: false
      },
      delete: {
          deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
          confirmDelete: true
      },
      columns: {
          departureDate: {
              title: 'Departure date',
              
          },
          departureCountry: {
              title: 'Departure Country',
              
          },
          arrivalDate: {
              title: 'Arrival date',
              
          },
          arrivalCountry: {
              title: 'Arrival Country',
              
          },
          visaType: {
              title: 'Visa Type',
              
          },
          i94: {
              title: 'I-94',
              
          }
      },
      pager: {
          display: true,
          perPage: 10
      },
      mode:'external'
  };

  constructor(private arrivalDepartureInfoService: ImmigrationViewArrivalDepartureInfoService,
      public appService: AppService, public dialogService: DialogService) {
      super(dialogService);
      if (this.appService.user) {
          this.user = this.appService.user;
      }
  }
  source: LocalDataSource = new LocalDataSource();
  getArrivalDepartueInfo() {
      this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.appService.clientId)
          .subscribe((res) => {
              this.source.load(res['arrivalDepartures']);
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
          title: 'Add Arrival Departue Info',
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
           
              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture).subscribe((res) => {
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
/*
  onCreateConfirm(event): void {
      event.newData['clientId'] = this.appService.clientId;
      this.arrivalDepartureInfoService.saveClientArrivalDeparture(event.newData).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              event.confirm.resolve();
          } else {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Unable to Add Arrival Desparture Info.'
              });
              event.confirm.reject();
          }
      });

  }
  onEditConfirm(event): void {
      event.newData['clientId'] = this.appService.clientId;
      this.arrivalDepartureInfoService.saveClientArrivalDeparture(event.newData).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              event.newData = res['arrivalDepartureInfo'];
              event.confirm.resolve(event.newData);
          } else {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Unable to Edit Arrival Desparture Info.'
              });
              event.confirm.resolve(event.data);
          }
      });
  }*/

  onDeleteConfirm(arrivalDeprtInfo) {
      this.delmessage = arrivalDeprtInfo.data.departureCountry;
      this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirmation',
          message: 'Are you sure you want to Delete ' + this.delmessage+'?'
      })
          .subscribe((isConfirmed) => {
              if (isConfirmed) {
                  this.arrivalDepartureInfoService.removeClientArrivalDeparture(arrivalDeprtInfo.data['arrivalDepartureInfoId']).subscribe((res) => {
                      //this.message = res['statusCode'];
                      //if (this.message == 'SUCCESS') {
                      //    arrivalDeprtInfo.confirm.resolve();
                      //} else {
                      //    arrivalDeprtInfo.confirm.reject();
                      //}
                      if (res['statusCode'] == 'SUCCESS') {
                          this.getArrivalDepartueInfo();
                      }
                  });
              }
          });
  }
  onEditConfirm(arrivalDeptInfo) {
      this.editFlag = true;
      if (this.editFlag) {
          this.beforeEdit = (<any>Object).assign({}, arrivalDeptInfo.data);
      }
     this.dialogService.addDialog(ImmigrationViewArrivalDepartureInfoComponent, {
          addArrDep: true,
          arrDepInfo: false,
          title: 'Edit Arrival Departue Info',
          addArrDeparture: this.editFlag ? this.beforeEdit : this.addArrDeparture,
          arrivalDate:arrivalDeptInfo.data.arrivalDate,
          departureDate:arrivalDeptInfo.data.departureDate,
          
     }).subscribe((isConfirmed) => {
         if (isConfirmed) {
              this.arrivalDepartureInfoService.saveClientArrivalDeparture(this.appService.addArrDeparture).subscribe((res) => {
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
