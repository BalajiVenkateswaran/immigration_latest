import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {User} from "../../models/user";
import {QuestionnaireClientViewService} from "./questionnaire-i129-client.component.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-questionnaire-i129client.component',
    templateUrl: './questionnaire-i129-client.component.html',
    styleUrls: ['./questionnaire-i129-client.component.sass']
})
export class QuestionnaireI129ClientComponent implements OnInit {

    private gender: any[];
    isQuestionnaireClientEdit: boolean;
    private questionnaireClient: any = {};
    private user: User;
    private dateOfLastArrival;
    private passportIssueDate;
    private passportExpiryDate;
    private dateStatusExpires;
    private dateOfBirth;
    private beforeCancelQuestionnaire: any = {};
    private apt: any[];
    public questionnaireId: string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private appService: AppService, private questionnaireClientViewService: QuestionnaireClientViewService, private route: ActivatedRoute,
        private router: Router) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
    onDateChanged(event: IMyDateModel) {
    }

    ngOnInit() {

        this.isQuestionnaireClientEdit = false;

        this.gender = [
            { value: '0', name: 'Male' },
            { value: '1', name: 'Female' }
        ];

        this.apt = [
            { value: 'Apt', name: 'APT' },
            { value: 'Ste', name: 'STE' },
            { value: 'Flr', name: 'FLR' }
        ]

        this.getData();
       
    }
    getData = function () {
        this.route.params.subscribe(params => {
            this.questionnaireId = params['questionnaireId'];
            return this.questionnaireClientViewService.getQuestionnaire(this.questionnaireId).subscribe(
                res => {
                    if (res['beneficiaryInfo']) {
                        this.questionnaireClient = res['beneficiaryInfo'];
                        this.dateOfBirth = this.questionnaireClient['dateOfBirth'];
                        this.dateOfLastArrival = this.questionnaireClient['dateOfLastArrival'];
                        this.passportIssueDate = this.questionnaireClient['passportIssueDate'];
                        this.passportExpiryDate = this.questionnaireClient['passportExpiryDate'];
                        this.dateStatusExpires = this.questionnaireClient['dateStatusExpires'];
                        console.log(this.questionnaireClient);
                       
                    }
                    else {
                        this.questionnaireClient = [];
                        this.dateOfBirth = "";
                        this.dateOfLastArrival = "";
                        this.passportIssueDate = "";
                        this.passportExpiryDate = "";
                        this.dateStatusExpires = "";
                    }
                }
            );
        }); 
    }
    //editClientQuestionnaire() {
    //    console.log("coming");
    //    this.isQuestionnaireClientEdit = !this.isQuestionnaireClientEdit;
    //    this.dateOfBirth = this.questionnaireClient['dateOfBirth'];
    //    this.beforeCancelQuestionnaire = (<any>Object).assign({}, this.questionnaireClient);
    //    this.dateOfLastArrival = this.questionnaireClient.dateOfLastArrival;
    //    this.passportExpiryDate = this.questionnaireClient.passportExpiryDate;
    //    this.passportIssueDate = this.questionnaireClient.passportIssueDate;
    //    this.dateStatusExpires = this.questionnaireClient.dateStatusExpires;
    //    this.dateOfBirth = this.questionnaireClient.dateOfBirth;

    //}
    //cancelClientQuestionnaire() {
    //    this.questionnaireClient = this.beforeCancelQuestionnaire;
    //    this.isQuestionnaireClientEdit = !this.isQuestionnaireClientEdit;
    //    if (this.questionnaireClient['dateOfLastArrival'] && this.questionnaireClient['dateOfLastArrival']['formatted']) {
    //        this.questionnaireClient['dateOfLastArrival'] = this.questionnaireClient['dateOfLastArrival']['formatted'];
    //    }
    //    if (this.questionnaireClient['passportIssueDate'] && this.questionnaireClient['passportIssueDate']['formatted']) {
    //        this.questionnaireClient['passportIssueDate'] = this.questionnaireClient['passportIssueDate']['formatted'];
    //    }
    //    if (this.questionnaireClient['passportExpiryDate'] && this.questionnaireClient['passportExpiryDate']['formatted']) {
    //        this.questionnaireClient['passportExpiryDate'] = this.questionnaireClient['passportExpiryDate']['formatted'];
    //    }
    //    if (this.questionnaireClient['dateStatusExpires'] && this.questionnaireClient['dateStatusExpires']['formatted']) {
    //        this.questionnaireClient['dateStatusExpires'] = this.questionnaireClient['dateStatusExpires']['formatted'];
    //    }
    //    if (this.questionnaireClient['dateOfBirth'] && this.questionnaireClient['dateOfBirth']['formatted']) {
    //        this.questionnaireClient['dateOfBirth'] = this.questionnaireClient['dateOfBirth']['formatted'];
    //    }

    //}
    saveClientQuestionnaire() {
       // this.isQuestionnaireClientEdit = !this.isQuestionnaireClientEdit;
        if (this.questionnaireClient['dateOfLastArrival'] && this.questionnaireClient['dateOfLastArrival']['formatted']) {
            this.questionnaireClient['dateOfLastArrival'] = this.questionnaireClient['dateOfLastArrival']['formatted'];
        }
        if (this.questionnaireClient['passportIssueDate'] && this.questionnaireClient['passportIssueDate']['formatted']) {
            this.questionnaireClient['passportIssueDate'] = this.questionnaireClient['passportIssueDate']['formatted'];
        }
        if (this.questionnaireClient['passportExpiryDate'] && this.questionnaireClient['passportExpiryDate']['formatted']) {
            this.questionnaireClient['passportExpiryDate'] = this.questionnaireClient['passportExpiryDate']['formatted'];
        }
        if (this.questionnaireClient['dateStatusExpires'] && this.questionnaireClient['dateStatusExpires']['formatted']) {
            this.questionnaireClient['dateStatusExpires'] = this.questionnaireClient['dateStatusExpires']['formatted'];
        }
        if (this.questionnaireClient['dateOfBirth'] && this.questionnaireClient['dateOfBirth']['formatted']) {
            this.questionnaireClient['dateOfBirth'] = this.questionnaireClient['dateOfBirth']['formatted'];
        }
        this.questionnaireClientViewService.saveQuestionnaire(this.questionnaireClient,this.appService.questionaryName,'Save').subscribe(
            res => {

                this.questionnaireClient = true;
                if (res['beneficiaryInfo']) {
                    this.questionnaireClient = res['beneficiaryInfo'];
                }
                this.getData();

           }
        );
    }

saveClientQuestionnaireInform() {
       // this.isQuestionnaireClientEdit = !this.isQuestionnaireClientEdit;
        if (this.questionnaireClient['dateOfLastArrival'] && this.questionnaireClient['dateOfLastArrival']['formatted']) {
            this.questionnaireClient['dateOfLastArrival'] = this.questionnaireClient['dateOfLastArrival']['formatted'];
        }
        if (this.questionnaireClient['passportIssueDate'] && this.questionnaireClient['passportIssueDate']['formatted']) {
            this.questionnaireClient['passportIssueDate'] = this.questionnaireClient['passportIssueDate']['formatted'];
        }
        if (this.questionnaireClient['passportExpiryDate'] && this.questionnaireClient['passportExpiryDate']['formatted']) {
            this.questionnaireClient['passportExpiryDate'] = this.questionnaireClient['passportExpiryDate']['formatted'];
        }
        if (this.questionnaireClient['dateStatusExpires'] && this.questionnaireClient['dateStatusExpires']['formatted']) {
            this.questionnaireClient['dateStatusExpires'] = this.questionnaireClient['dateStatusExpires']['formatted'];
        }
        if (this.questionnaireClient['dateOfBirth'] && this.questionnaireClient['dateOfBirth']['formatted']) {
            this.questionnaireClient['dateOfBirth'] = this.questionnaireClient['dateOfBirth']['formatted'];
        }
        this.questionnaireClientViewService.saveQuestionnaire(this.questionnaireClient,this.appService.questionaryName,'Inform').subscribe(
            res => {

                this.questionnaireClient = true;
                if (res['beneficiaryInfo']) {
                    this.questionnaireClient = res['beneficiaryInfo'];
                }
                this.getData();

           }
        );
    }

}
