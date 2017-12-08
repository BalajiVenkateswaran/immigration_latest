import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JobdetailsService} from './job-details.service';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {HeaderService} from '../../../../common/header/header.service';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.sass'],
  providers: [JobdetailsService]
})
export class ImmigrationViewJobDetailsComponent implements OnInit {

    jobdetailsList: any;
    private entityId: string;
    public editUser: FormGroup; // our model driven form
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    isjobdetailsEdit;
    public jobDetails: any = {};
    private message: string;
    private hireDate: string;
    private internationalHireDate: string;
    private rehireDate: string;
    private lastDayWorkedDate: string;
    private terminationDate: string;
    private beforeCancelJobDetails;
    constructor(public headerService: HeaderService,
        private formBuilder: FormBuilder, public appService: AppService, private jobdetails: JobdetailsService) {
    }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    ngOnInit() {
        let index = 0;
        this.jobdetails.getFile(this.appService.clientId)
            .subscribe((res) => {
                if (res['jobDetails']) {
                    this.jobDetails = res['jobDetails'];
                    console.log(this.jobDetails)
                }
                this.isjobdetailsEdit = true;
            });
    }
    onDateChanged(event: IMyDateModel) {
    }

    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    editJobInfoForm() {
        this.beforeCancelJobDetails = (<any>Object).assign({}, this.jobDetails);
        this.isjobdetailsEdit = !this.isjobdetailsEdit;

        this.hireDate = this.jobDetails['hireDate'];
        this.internationalHireDate = this.jobDetails['internationalHireDate'];
        this.rehireDate = this.jobDetails['rehireDate'];
        this.lastDayWorkedDate = this.jobDetails['lastDayWorkedDate'];
        this.terminationDate = this.jobDetails['rehireDate'];

    }

    cancelJobInfoEdit() {
        this.jobDetails = this.beforeCancelJobDetails;
        if (this.jobDetails['hireDate'] && this.jobDetails['hireDate']['formatted']) {
            this.jobDetails['hireDate'] = this.jobDetails['hireDate']['formatted'];
        }

        if (this.jobDetails['rehireDate'] && this.jobDetails['rehireDate']['formatted']) {
            this.jobDetails['rehireDate'] = this.jobDetails['rehireDate']['formatted'];
        }

        if (this.jobDetails['internationalHireDate'] && this.jobDetails['internationalHireDate']['formatted']) {
            this.jobDetails['internationalHireDate'] = this.jobDetails['internationalHireDate']['formatted'];
        }

        if (this.jobDetails['lastDayWorkedDate'] && this.jobDetails['lastDayWorkedDate']['formatted']) {
            this.jobDetails['lastDayWorkedDate'] = this.jobDetails['lastDayWorkedDate']['formatted'];
        }

        if (this.jobDetails['terminationDate'] && this.jobDetails['terminationDate']['formatted']) {
            this.jobDetails['terminationDate'] = this.jobDetails['terminationDate']['formatted'];
        }

        this.isjobdetailsEdit = !this.isjobdetailsEdit;
    }

    saveJobInformation() {
        if (this.jobDetails['hireDate'] && this.jobDetails['hireDate']['formatted']) {
            this.jobDetails['hireDate'] = this.jobDetails['hireDate']['formatted'];
        }

        if (this.jobDetails['rehireDate'] && this.jobDetails['rehireDate']['formatted']) {
            this.jobDetails['rehireDate'] = this.jobDetails['rehireDate']['formatted'];
        }

        if (this.jobDetails['internationalHireDate'] && this.jobDetails['internationalHireDate']['formatted']) {
            this.jobDetails['internationalHireDate'] = this.jobDetails['internationalHireDate']['formatted'];
        }

        if (this.jobDetails['lastDayWorkedDate'] && this.jobDetails['lastDayWorkedDate']['formatted']) {
            this.jobDetails['lastDayWorkedDate'] = this.jobDetails['lastDayWorkedDate']['formatted'];
        }

        if (this.jobDetails['terminationDate'] && this.jobDetails['terminationDate']['formatted']) {
            this.jobDetails['terminationDate'] = this.jobDetails['terminationDate']['formatted'];
        }
        this.jobDetails['clientId'] = this.appService.clientId;
        this.jobdetails.saveJobDetails(this.jobDetails, this.headerService.user.userId)
            .subscribe((res) => {
                this.isjobdetailsEdit = true;
                if (res['jobDetails']) {
                    this.jobDetails = res['jobDetails'];
                }
            });

    }
}
