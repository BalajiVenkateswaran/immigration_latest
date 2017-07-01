import { Component, OnInit } from '@angular/core';
import {ArrivalDespartureInfoService} from "./arrival-desparture-info.service";
import {arrivaldespartureinfo} from "../../models/arrivaldespartureinfo";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';


export interface ConfirmModel {
    title: string;
    message: string;
    getArvdInfoData: boolean;
    addArrDep: boolean;
    newArvdInfoitem:Object;
    arrivalDate:string;
    departureDate:string;

}

@Component({
  selector: 'app-arrival-desparture-info',
  templateUrl: './arrival-desparture-info.component.html',
  styleUrls: ['./arrival-desparture-info.component.sass']
})
export class ArrivalDespartureInfoComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public beforeEdit: any;
    public editFlag: boolean = true;
    public addArrDeparture: any = {};
    public addArrDep: boolean;
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
        },
        mode:'external'
    };
    public delmessage;
    public addArrivalDespartureInfo: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public getArvdInfoData: boolean = true;
    public newArvdInfoitem: any = {};
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private arrivalDespartureInfoService: ArrivalDespartureInfoService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
    }

    source: LocalDataSource = new LocalDataSource();

    getarvdptData() {
        this.arrivalDespartureInfoService.getArrivalDepartureInfo(this.appService.user.userId).subscribe((res) => {
            this.source.load(res['arrivalDepartures']);
        });
    }

    ngOnInit() {
        this.arrivalDespartureInfoService.getArrivalDepartureInfo(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['arrivalDepartures']);
            });

    }
    addNewArvdInfo() {
        this.dialogService.addDialog(ArrivalDespartureInfoComponent, {
            addArrDep: true,
            getArvdInfoData: false,
            title: 'Add Arrival Departure Info',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
               
                this.arrivalDespartureInfoService.saveClientArrivalDeparture(this.appService.newArvdInfoitem).subscribe((res) => {
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
        if(this.newArvdInfoitem['departureDate'] && this.newArvdInfoitem['departureDate']['formatted']){
           this.newArvdInfoitem['departureDate'] = this.newArvdInfoitem['departureDate']['formatted'];
        }
        if(this.newArvdInfoitem['arrivalDate'] && this.newArvdInfoitem['arrivalDate']['formatted']){
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
       this.editFlag = true;
      if (this.editFlag) {
          this.beforeEdit = (<any>Object).assign({}, event.data);
      }
     this.dialogService.addDialog(ArrivalDespartureInfoComponent, {
          addArrDep: true,
          getArvdInfoData: false,
          title: 'Edit Arrival Departue Info',
          newArvdInfoitem: this.editFlag ? this.beforeEdit : this.newArvdInfoitem,
          arrivalDate:event.data.arrivalDate,
          departureDate:event.data.departureDate,
          
     }).subscribe((isConfirmed) => {
         if (isConfirmed) {
              this.arrivalDespartureInfoService.saveClientArrivalDeparture(this.appService.newArvdInfoitem).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
                      this.getarvdptData();
                  }
              });
          }
          else {
              this.editFlag = false;   
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
                            this.getarvdptData();
                            event.confirm.resolve();
                        } else {
                            event.confirm.reject();
                        }
                    });
                }
            });
    }

}
