import {Component, OnInit} from '@angular/core';
import {I797HistoryService} from "./i-797-history.service";
import {i797history} from "../../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../../confirmbox/confirm.component';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';


export interface ConfirmModel {
  title: string;
  message: string;
  showAddi797popup: boolean;
  getCvi797Data: boolean;
  newi797item: Object;
  receiptDate: string;
  approvedOn: string;
  validFrom: string;
  validTill: string;
}
@Component({
  selector: 'app-i-797-history',
  templateUrl: './i-797-history.component.html',
  styleUrls: ['./i-797-history.component.sass']
})
export class I797HistoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  public addI797History: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public settings;
  public data;
  public showAddi797popup: boolean;
  public getCvi797Data: boolean = true;
  public newi797item: any = {};
  public editFlag: boolean = true;
  public beforeEdit: any;
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
  };

  constructor(private i797HistoryService: I797HistoryService, public appService: AppService, public dialogService: DialogService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: "Receipt Number",
          field: "receiptNumber"
        },
        {
          headerName: "Receipt Date",
          field: "receiptDate"
        },
        {
          headerName: "Status On I-797",
          field: "status"
        },
        {
          headerName: "Approved on",
          field: "approvedOn",
          width: 100
        },
        {
          headerName: "Valid From",
          field: "validFrom",
          width: 100
        },
        {
          headerName: "Valid Till",
          field: "validTill",
          width: 100
        }
      ]
    }
  }

  geti797Data() {
    this.i797HistoryService.getI797Details(this.appService.user.userId).subscribe((res) => {
      this.data = res['i797HistoryList'];
    });
  }
  ngOnInit() {
    this.geti797Data();
  }
  addFunction() {
    this.dialogService.addDialog(I797HistoryComponent, {
      showAddi797popup: true,
      getCvi797Data: false,
      title: 'Add I-797 History',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

        this.i797HistoryService.saveI797Details(this.appService.newi797item).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
            this.geti797Data();
          } else {
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error..!',
              message: 'Unable to Add I-797 History.'
            });
          }

        });
      }
    });
  }
  i797Save() {
    this.newi797item['clientId'] = this.appService.clientId;
    this.newi797item['receiptDate'] = this.newi797item['receiptDate']['formatted'];
    this.newi797item['approvedOn'] = this.newi797item['approvedOn']['formatted'];
    this.newi797item['validFrom'] = this.newi797item['validFrom']['formatted'];
    this.newi797item['validTill'] = this.newi797item['validTill']['formatted'];
    this.appService.newi797item = this.newi797item;
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

    this.dialogService.addDialog(I797HistoryComponent, {
      showAddi797popup: true,
      getCvi797Data: false,
      title: 'Edit I-797 History',
      newi797item: this.editFlag ? this.beforeEdit : this.newi797item,
      receiptDate: event.data.receiptDate,
      approvedOn: event.data.approvedOn,
      validFrom: event.data.validFrom,
      validTill: event.data.validTill,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.i797HistoryService.saveI797Details(this.appService.newi797item).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.geti797Data();
          }

        });
      } else {
        this.editFlag = false;
      }
    });
  }
  deleteRecord(event): void {
    this.delmessage = event.data.receiptNumber
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.i797HistoryService.removeI797Details(event.data['i797HistoryId']).subscribe((res) => {
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
