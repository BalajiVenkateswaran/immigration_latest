import {Component, OnInit} from '@angular/core';
import {I797HistoryService} from './i-797-history.service';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../framework/popup/confirmation/confirmation.component';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {IHDateUtil} from '../../../framework/utils/date.component';

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
  styleUrls: ['./i-797-history.component.sass'],
  providers: [I797HistoryService]
})
export class I797HistoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  public addI797History: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public settings;
  public data;
  public showAddi797popup: boolean;
  public getCvi797Data = true;
  public newi797item: any = {};
  public editFlag = true;
  public beforeEdit: any;
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions; 

  constructor(private i797HistoryService: I797HistoryService, public appService: AppService, public dialogService: DialogService,
              public dialog: MatDialog, public headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: 'Receipt Number',
          field: 'receiptNumber'
        },
        {
          headerName: 'Status On I-797',
          field: 'status'
        },
        {
          headerName: 'Receipt Date',
          field: 'receiptDate'
        },
        {
          headerName: 'Approved on',
          field: 'approvedOn',
          width: 100
        },
        {
          headerName: 'Valid From',
          field: 'validFrom',
          width: 100
        },
        {
          headerName: 'Valid Till',
          field: 'validTill',
          width: 100
        }
      ]
    }
  }
  ngOnInit() {
    this.geti797Data();
  }
  geti797Data() {
    this.i797HistoryService.getI797Details(this.headerService.user.userId).subscribe((res) => {
      this.data = res['i797HistoryList'];
    });
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
          if (this.message === 'SUCCESS') {
            this.geti797Data();
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: 'Unable to Add I-797 History.'
              }
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
          if (res['statusCode'] === 'SUCCESS') {
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
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Delete ' + this.delmessage + '?'
      }
    }).afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.i797HistoryService.removeI797Details(event.data['i797HistoryId']).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message === 'SUCCESS') {
              event.confirm.resolve();
            } else {
              event.confirm.reject();
            }
          });
        }
      });
  }
}
