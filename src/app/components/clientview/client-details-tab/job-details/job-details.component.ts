import { Component, OnInit } from '@angular/core';
import {JobDetailsService} from './job-details.service';
import {jobdetails} from '../../../../models/jobdetails';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {AppService} from '../../../../services/app.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {HeaderService} from '../../../common/header/header.service';
export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.sass']
})
export class JobDetailsComponent implements OnInit {

    private jobdetailsList: any;
    public editUser: FormGroup; // our model driven form
    private fieldsList: jobdetails[];
    private formControlValues: any = {};
    private message: string;
    isjobdetailsEdit;
    public jobinDetail: any = {};
    public hireDate: string;
    public internationalHireDate: string;
    public rehireDate: string;
    public lastDayWorkedDate: string;
    public terminationDate: string;
    public beforeCancelJobDetails;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private jobDetailsService: JobDetailsService,
                private formBuilder: FormBuilder, public headerService: HeaderService, public appService: AppService) {
    }

    ngOnInit() {
        this.jobDetailsService.getJobDetails(this.headerService.user.userId).subscribe((res) => {

            if (res['jobDetails']) {
                this.jobinDetail = res['jobDetails'];
                }
            console.log(this.jobinDetail);
                this.isjobdetailsEdit = true;
            });

    }


    onDateChanged(event: IMyDateModel) {
    }

    editJobInfoForm() {
        this.beforeCancelJobDetails = (<any>Object).assign({}, this.jobinDetail);
        this.isjobdetailsEdit = !this.isjobdetailsEdit;

        this.hireDate = this.jobinDetail.hireDate;
        this.internationalHireDate = this.jobinDetail.internationalHireDate;
        this.rehireDate = this.jobinDetail.rehireDate;
        this.lastDayWorkedDate = this.jobinDetail.lastDayWorkedDate;
        this.terminationDate = this.jobinDetail.rehireDate;


    }

    cancelJobInfoEdit() {
        this.jobinDetail = this.beforeCancelJobDetails;
        this.isjobdetailsEdit = !this.isjobdetailsEdit;


        if (this.jobinDetail['hireDate'] && this.jobinDetail['hireDate']['formatted']) {
            this.jobinDetail['hireDate'] = this.jobinDetail['hireDate']['formatted'];
        }

        if (this.jobinDetail['rehireDate'] && this.jobinDetail['rehireDate']['formatted']) {
            this.jobinDetail['rehireDate'] = this.jobinDetail['rehireDate']['formatted'];
        }

        if (this.jobinDetail['internationalHireDate'] && this.jobinDetail['internationalHireDate']['formatted']) {
            this.jobinDetail['internationalHireDate'] = this.jobinDetail['internationalHireDate']['formatted'];
        }

        if (this.jobinDetail['lastDayWorkedDate'] && this.jobinDetail['lastDayWorkedDate']['formatted']) {
            this.jobinDetail['lastDayWorkedDate'] = this.jobinDetail['lastDayWorkedDate']['formatted'];
        }

        if (this.jobinDetail['terminationDate'] && this.jobinDetail['terminationDate']['formatted']) {
            this.jobinDetail['terminationDate'] = this.jobinDetail['terminationDate']['formatted'];
        }


    }
    saveJobInformation() {


        if (this.jobinDetail['hireDate'] && this.jobinDetail['hireDate']['formatted']) {
            this.jobinDetail['hireDate'] = this.jobinDetail['hireDate']['formatted'];
        }

        if (this.jobinDetail['rehireDate'] && this.jobinDetail['rehireDate']['formatted']) {
            this.jobinDetail['rehireDate'] = this.jobinDetail['rehireDate']['formatted'];
        }

        if (this.jobinDetail['internationalHireDate'] && this.jobinDetail['internationalHireDate']['formatted']) {
            this.jobinDetail['internationalHireDate'] = this.jobinDetail['internationalHireDate']['formatted'];
        }

        if (this.jobinDetail['lastDayWorkedDate'] && this.jobinDetail['lastDayWorkedDate']['formatted']) {
            this.jobinDetail['lastDayWorkedDate'] = this.jobinDetail['lastDayWorkedDate']['formatted'];
        }

        if (this.jobinDetail['terminationDate'] && this.jobinDetail['terminationDate']['formatted']) {
            this.jobinDetail['terminationDate'] = this.jobinDetail['terminationDate']['formatted'];
        }
        this.jobinDetail['clientId'] = this.headerService.user.userId;
        this.jobDetailsService.saveJobDetails(this.jobinDetail)
            .subscribe((res) => {
                this.isjobdetailsEdit = true;
                if (res['jobDetails']) {
                    this.jobinDetail = res['jobDetails'];
                }

            });

    }
}
