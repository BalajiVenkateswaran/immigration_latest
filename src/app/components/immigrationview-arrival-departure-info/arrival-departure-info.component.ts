import { Component, OnInit } from '@angular/core';
import { ImmigrationViewArrivalDepartureInfoService } from './arrival-departure-info.service';
import { ArrivalDepartureInfo } from "../../models/arrivalDepartureInfo";
import { LocalDataSource  } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-arrival-departure-info',
  templateUrl: './arrival-departure-info.component.html',
  styleUrls: ['./arrival-departure-info.component.sass']
})
export class ImmigrationViewArrivalDepartureInfoComponent implements OnInit {
    private delmessage;
  private arrivalDepartureInfo: any[];
  private arrivalDepartureInfoScreenData: any;
  private message: string;
  private user: User;
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
      delete: {
          deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
          confirmDelete: true
      },
      columns: {
          departureDate: {
              title: 'Departure date'
          },
          departureCountry: {
              title: 'Departure Country'
          },
          arrivaldate: {
              title: 'Arrival date'
          },
          arrivalCountry: {
              title: 'Arrival Country'
          },
          visaType: {
              title: 'Visa Type'
          },
          i94: {
              title: 'I-94'
          }
      },
      pager: {
          display: true,
          perPage: 10
      }
  };

  constructor(private arrivalDepartureInfoService: ImmigrationViewArrivalDepartureInfoService,
      public appService: AppService, private dialogService: DialogService) {
      if (this.appService.user) {
          this.user = this.appService.user;
      }
  }
  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
      this.arrivalDepartureInfoService.getArrivalDepartureInfo(this.appService.clientId)
          .subscribe((res) => {
              this.source.load(res['arrivalDepartures']);
          });
  }
  highlightSBLink(link) {
      this.appService.currentSBLink = link;
  }
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
  }

  onDeleteConfirm(arrivalDeprtInfo) {
      this.delmessage = arrivalDeprtInfo.data.departureCountry;
      this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirmation',
          message: 'Are you sure you want to Delete ' + this.delmessage+'?'
      })
          .subscribe((isConfirmed) => {
              if (isConfirmed) {
                  this.arrivalDepartureInfoService.removeClientArrivalDeparture(arrivalDeprtInfo.data['arrivalDepartureInfoId']).subscribe((res) => {
                      this.message = res['statusCode'];
                      if (this.message == 'SUCCESS') {
                          arrivalDeprtInfo.confirm.resolve();
                      } else {
                          arrivalDeprtInfo.confirm.reject();
                      }
                  });
              }
          });
  }
}
