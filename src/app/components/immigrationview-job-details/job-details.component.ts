import { Component, OnInit } from '@angular/core';
import {UiFieldService} from "../../services/uifield.service";
import {jobdetails} from "../../models/jobdetails";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {JobdetailsService} from "./job-details-service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.sass']
})
export class ImmigrationViewJobDetailsComponent implements OnInit {

    jobdetailsList: any;
    private entityId : string;
    public editUser: FormGroup; // our model driven form
    private fieldsList: jobdetails[];
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    isjobdetailsEdit;
    private jobDetails = {};
    private message: string;
    private user: User;
    private hireDate:string;
    private internationalHireDate: string;
    private rehireDate: string;
    private lastDayWorkedDate: string;
    private terminationDate: string;
    private beforeCancelJobDetails;
    constructor(private uiFieldService: UiFieldService,
        private formBuilder: FormBuilder, public appService: AppService, private jobdetails: JobdetailsService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    ngOnInit() {
        var index = 0;
        this.entityId = "f4594c0b-d2c3-11e6-900a-34e6d7382cac";
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
    editUserSubmit(model: jobdetails, isValid: boolean, index: number, sectionName: string) {
        console.log('formdata|account: %o|isValid:%o', model, isValid);
        if (isValid) {
            let sectionIndex = -1;
            let dataIndex = 0;
            this.jobdetailsList.map((forms) => {
                if (forms.name === sectionName) {
                    forms.data[0].data.map((val) => {
                        this.jobdetailsList[index].data[0].data[dataIndex].value = model[val.name];
                        dataIndex += 1;
                    });
                    dataIndex = 0;
                }
                sectionIndex += 1;
            });
            //model is key value pair and this.jobdetailsList holds the data in the form it got from server
            //console.log('form data: %o | data in the receieved form: %o', model, this.jobdetailsList);
            // service is not available

            this.uiFieldService.saveEditUser(this.jobdetailsList, this.entityId).subscribe((response) => {
                this.message = response['statusCode']
                if(this.message === "SUCCESS"){
                  this.jobdetailsList = response['uiFieldGroups'];
                }
                this.isEdit[index] = !this.isEdit[index];
            });
        } else {
            this.message = "Filled etails are not correct! please correct...";
        }

    }


    editJobInfoForm() {
        this.beforeCancelJobDetails = (<any>Object).assign({}, this.jobDetails);
        this.isjobdetailsEdit = !this.isjobdetailsEdit;

        this.hireDate = this.jobDetails['hireDate'];
        this.internationalHireDate = this.jobDetails['internationalHireDate'];
        this.rehireDate= this.jobDetails['rehireDate'];
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
        this.jobdetails.saveJobDetails(this.jobDetails)
            .subscribe((res) => {
                this.isjobdetailsEdit = true;
                if (res['jobDetails']) {
                    this.jobDetails = res['jobDetails'];
                }
            });

    }
}
