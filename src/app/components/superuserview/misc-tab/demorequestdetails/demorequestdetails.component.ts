import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {Demorequestdetailsservice} from './demorequestdetails.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';

export interface ConfirmModel {
    title: string;
    message: string;
    getdemorequests: boolean;
    adddemorequest: boolean;
    adddemoRequests: Object;
    demoRequestDate: string;
}
@Component({
    selector: 'ih-misc-demorequest',
    templateUrl: './demorequestdetails.component.html',

})


export class DemoRequestDetailsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public data;
    public settings;
    public getdemorequests = true;
    public adddemorequest = false;
    public adddemoRequests: any = {};
    public demoRequestDate: any;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
  constructor(private demorequestdetailsservice: Demorequestdetailsservice,
              private appService: AppService, public dialogService: DialogService, private headerService: HeaderService) {
    super(dialogService);

    this.settings = {
      'columnsettings': [
        {
          headerName: 'Name',
          field: 'name'
        },
        {
          headerName: 'Email',
          field: 'email'
        },
        {
          headerName: 'Phone',
          field: 'phone'
        },
        {
          headerName: 'Organization',
          field: 'organization'
        },
        {
          headerName: 'Date',
          field: 'demoRequestDate'
        },
        {
          headerName: 'Referral',
          field: 'referral'
        },
        {
          headerName: 'Comments',
          field: 'comments'
        },
        {
          headerName: 'Status',
          field: 'status'
        }
      ]
    }
  }

  ngOnInit() {
        this.headerService.showSideBarMenu('superuser-misc', 'superuser-misc');
        this.getDemoRequests();
    }
  getDemoRequests() {
        this.demorequestdetailsservice.getDemoRequests()
            .subscribe((res: any) => {
                this.data = res.demoRequests;
            });
    }
    addFunction() {
        this.dialogService.addDialog(DemoRequestDetailsComponent, {
            adddemorequest: true,
            getdemorequests: false,
            title: 'Add New Demo Request',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.getDemoRequests();


            }
        });
    }
    editRecord(event) {
        this.dialogService.addDialog(DemoRequestDetailsComponent, {
            adddemorequest: true,
            getdemorequests: false,
            title: 'Edit Demo Request',
            adddemoRequests: event.data,
            demoRequestDate: event.data.demoRequestDate
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.getDemoRequests();
            }
        });
    }
    demorequestsave(email) {
        this.adddemoRequests['demoRequestDate'] = this.adddemoRequests['demoRequestDate']['formatted'];
          this.demorequestdetailsservice.savedemoRequest(this.adddemoRequests).subscribe((res) => {
              console.log(res);

            });
            this.result = true;
            this.close();

    }
    cancel() {
        this.close();
    }
    }

