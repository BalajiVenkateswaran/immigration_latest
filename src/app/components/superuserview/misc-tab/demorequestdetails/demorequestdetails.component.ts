import {AppService} from '../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {DemoRequestDetailsService} from './demorequestdetails.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
import {IHDateUtil} from '../../../framework/utils/date.component';
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
    providers: [DemoRequestDetailsService]
})
export class DemoRequestDetailsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public data;
    public settings;
    public getdemorequests = true;
    public adddemorequest = false;
    public adddemoRequests: any = {};
    public demoRequestDate: any;
    public showWorkAddrSaveButtonProgress = false;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  constructor(private demorequestdetailsservice: DemoRequestDetailsService,
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
        this.headerService.showSideBarMenu('superuserview/misc/demorequest', 'superuserview/misc/demorequest');
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
        this.showWorkAddrSaveButtonProgress = true;
        if (this.adddemoRequests['demoRequestDate']) {
          this.adddemoRequests['demoRequestDate'] = this.adddemoRequests['demoRequestDate']['formatted'];
        }
        this.demorequestdetailsservice.savedemoRequest(this.adddemoRequests).subscribe((res) => {
            console.log(res);
            this.showWorkAddrSaveButtonProgress = false;

            });
            this.result = true;
            this.close();

    }
    cancel() {
        this.close();
    }
    }

