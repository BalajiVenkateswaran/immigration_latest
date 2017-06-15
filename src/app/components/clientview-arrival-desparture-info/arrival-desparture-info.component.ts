import { Component, OnInit } from '@angular/core';
import {ArrivalDespartureInfoService} from "./arrival-desparture-info.service";
import {arrivaldespartureinfo} from "../../models/arrivaldespartureinfo";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
  selector: 'app-arrival-desparture-info',
  templateUrl: './arrival-desparture-info.component.html',
  styleUrls: ['./arrival-desparture-info.component.sass']
})
export class ArrivalDespartureInfoComponent implements OnInit {
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
    public delmessage;
    public addArrivalDespartureInfo: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;

    constructor(private arrivalDespartureInfoService: ArrivalDespartureInfoService, public appService: AppService, private dialogService: DialogService) {
    }

    source: LocalDataSource = new LocalDataSource();
    ngOnInit() {
        this.arrivalDespartureInfoService.getArrivalDepartureInfo(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['arrivalDepartures']);
            });

  }
    onCreateConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.arrivalDespartureInfoService.saveClientArrivalDeparture(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.confirm.resolve();
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Arrival Desparture Info..!'
                });
                event.confirm.reject();
            }
        });

    }
    onEditConfirm(event): void {
        event.newData['clientId'] = this.appService.user.userId;
        this.arrivalDespartureInfoService.saveClientArrivalDeparture(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
                event.newData = res['arrivalDepartureInfo'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Arrival Desparture Info..!'
                });
                event.confirm.resolve(event.data);
            }
        });
    }
    onDeleteConfirm(event): void {
        this.delmessage = event.data.arrivalCountry
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.arrivalDespartureInfoService.removeClientArrivalDeparture(event.data['arrivalDepartureInfoId']).subscribe((res) => {
                        this.message = res['statusCode'];
                        if (this.message == 'SUCCESS') {
                            event.confirm.resolve();
                        } else {
                            event.confirm.reject();
                        }
                    });
                }
            });
    }

}
