import {Component, OnInit} from '@angular/core';
import {VisasService} from "./visas.service";
import {visa} from "../../models/visa";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../confirmbox/confirm.component';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';

export interface ConfirmModel {
  title: string;
  message: string;
  getCleintVisa: boolean;
  addCleintVisa: boolean;
  addNewVisa: Object;
  expiresOn: string;
  issuedOn: string;
}
@Component({
  selector: 'app-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.sass']
})
export class VisasComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  public addVisa: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public getCleintVisa: boolean = true;
  public addCleintVisa: boolean;
  public addNewVisa: any = {};
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };
  public editvisaFlag: boolean = true;
  public beforevisaEdit: any;
  public settings;
  public data;

  constructor(private visasService: VisasService, public appService: AppService, public dialogService: DialogService) {
    super(dialogService);
    this.addVisa = new FormGroup({
      country: new FormControl(''),
      petitionNumber: new FormControl(''),
      visaNumber: new FormControl(''),
      visaType: new FormControl(''),
      issuedOn: new FormControl(''),
      expiresOn: new FormControl('')
    });
    this.settings = {
      'columnsettings': [
        {

          headerName: "Country",
          field: "country",
        },
        {

          headerName: "Petition Number",
          field: "petitionNumber",

        },
        {

          headerName: "Visa Number",
          field: "visaNumber",
        },
        {
          headerName: "Visa Type",
          field: "visaType",
        },
        {

          headerName: "Issued On",
          field: "issuedOn",
        },
        {

          headerName: "Expires On",
          field: "expiresOn",
        },

      ]
    }
  }

  getClientviewvisa() {
    this.visasService.getClientVisas(this.appService.user.userId)
      .subscribe((res) => {
        this.data = res['visas'];

      });

  }

  ngOnInit() {

    this.getClientviewvisa();

  }
  addFunction() {
    this.dialogService.addDialog(VisasComponent, {
      addCleintVisa: true,
      getCleintVisa: false,
      title: 'Add Visa',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.visasService.saveClientVisas(this.appService.addNewVisa).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getClientviewvisa();

          }
        });
      }
    });
  }
  clientVisaSave() {
    this.addNewVisa['clientId'] = this.appService.clientId;
    this.addNewVisa['issuedOn'] = this.addNewVisa['issuedOn']['formatted'];
    this.addNewVisa['expiresOn'] = this.addNewVisa['expiresOn']['formatted'];
    this.appService.addNewVisa = this.addNewVisa;
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

  editRecord(event): void {
    this.editvisaFlag = true;
    if (this.editvisaFlag) {
      this.beforevisaEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(VisasComponent, {
      addCleintVisa: true,
      getCleintVisa: false,
      title: 'Edit Visa',
      addNewVisa: this.editvisaFlag ? this.beforevisaEdit : this.addNewVisa,
      issuedOn: event.data.issuedOn,
      expiresOn: event.data.expiresOn,

    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.visasService.saveClientVisas(this.appService.addNewVisa).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getClientviewvisa();

          }
        });
      }
    });
  }
  public delmesage;
  deleteRecord(event): void {
    this.delmesage = event.data.country
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete  ' + this.delmesage + ' ?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.visasService.deleteClientVisa(event.data['visaId']).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
              this.getClientviewvisa();

            }
          });
        }
      });
  }

}
