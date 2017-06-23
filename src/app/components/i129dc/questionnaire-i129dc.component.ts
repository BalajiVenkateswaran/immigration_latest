import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {QuestionnaireI129DCService} from "./questionnaire-i129dc.service";
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-questionnaire-i129dc.component',
    templateUrl: './questionnaire-i129dc.component.html',
    styleUrls: ['./questionnaire-i129dc.component.sass']
})
export class QuestionnaireI129DCComponent implements OnInit {
    private user: User;
    questionnaireDC: any[] = [];
    private employerInfo: any = {};
    private determinationInfo: any = {};
    isQuestionnaireDCEdit: boolean;
    private higherEducation: any[] = [];
    private generalInfo: any = {};
    questions: any[] = [];
    private isNonimmigrantExempt: boolean;
    private beforeCancelQuestionnaireDC: any[] = [];
    private backendEmployerInfo: any[] = [];
    private backendGeneralInfo: any[] = [];
    private backendDeterminationInfo: any[] = [];
    private questionnaireId: string = "";
 
    constructor(public appService: AppService, private questionnaire129DCService: QuestionnaireI129DCService,private http:Http,
    private route: ActivatedRoute,
              private router: Router) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
  
    ngOnInit() {
       
        this.higherEducation = [
            {
                "id": "0",
                "display": "NO DIPLOMA",
                "value":"G"
            },
            {
                "id": "1",
                "display": "HIGH SCHOOL GRADUATE DIPLOMA",
                "value":"PG"
            },
            {
                "id": "2",
                "display": "Some college credit, but less than 1 year",
                "value": "PG"
            },
            {
                "id": "3",
                "display": "Some college credit, but less than 1 year",
                "value": "PG"
            },
            {
                "id": "4",
                "display": "One or more years of college, no degree",
                "value": "PG"
            },
            {
                "id": "5",
                "display": "Associate's degree (for example: AA, AS)",
                "value": "PG"
            },
            {
                "id": "6",
                "display": "Bachelor's degree (for example: BA, AB, BS)",
                "value": "PG"
            },
            {
                "id": "7",
                "display": "Master's degree (for example: MA, MS, MEng, MEd, MSW, MBA)",
                "value": "PG"
            },
            {
                "id": "8",
                "display": "Professional degree (for example: MD, DDS, DVM, LLB, JD)",
                "value": "PG"
            },
            {
                "id": "9",
                "display": "Doctorate degree (for example:  PhD, EdD)",
                "value": "PG"
            },

        ];
        this.questions = [
            {
                "id": "0",
                "display": "Yes",
                "value":"Y"
            },
            {
                "id": "1",
                "display": "No",
                "value": "N"
            },
        ];
        this.route.params.subscribe(params => {
            this.questionnaireId = params['questionnaireId'];
            this.isQuestionnaireDCEdit = true;
            this.questionnaire129DCService.getI129DC(this.questionnaireId).subscribe(
                res => {
                    if (res['i129DC'] != undefined) {
                        this.questionnaireDC = res['i129DC'];
                        if (res['i129DC']['generalInfo'] != undefined && res['i129DC']['generalInfo']['employerInfo'] != undefined) {
                            this.employerInfo = res['i129DC']['generalInfo']['employerInfo'];
                        }
                        if (res['i129DC']['determinationInfo'] != undefined) {
                            this.determinationInfo = res['i129DC']['determinationInfo'];
                        }
                        if (res['i129DC']['generalInfo'] != undefined) {
                            this.generalInfo = res['i129DC']['generalInfo'];
                        }
                    }

                    if (this.employerInfo['isNonimmigrantExempt'] == 'Y') {
                        this.isNonimmigrantExempt = true;
                    }
               }

            );
        });


    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    repopulateQuestionnaireDC() {
        this.questionnaire129DCService.populateQuestionnaireDC(this.questionnaireId).subscribe(res => {
            if (res['statusCode'] == "SUCCESS") {

            }
        });

    }

    editQuestionnaireDC() {
        this.beforeCancelQuestionnaireDC = (<any>Object).assign({}, this.questionnaireDC);
        this.backendEmployerInfo = (<any>Object).assign({}, this.employerInfo);
        this.backendDeterminationInfo = (<any>Object).assign({}, this.determinationInfo);
        this.backendGeneralInfo = (<any>Object).assign({}, this.generalInfo);
        this.isQuestionnaireDCEdit = !this.isQuestionnaireDCEdit;
    }
    cancelQuestionnaireDC() {
        this.questionnaireDC = this.beforeCancelQuestionnaireDC;
        this.employerInfo = this.backendEmployerInfo;
        this.determinationInfo = this.backendDeterminationInfo;
        this.generalInfo = this.backendGeneralInfo;
        this.isQuestionnaireDCEdit = !this.isQuestionnaireDCEdit;
    }
    saveQuestionnaireDC() {
        this.isQuestionnaireDCEdit = true;
        this.questionnaire129DCService.saveI129DC(this.questionnaireDC, this.employerInfo, this.determinationInfo, this.generalInfo,this.questionnaireId).subscribe(
            res => {
                console.log(res);
            }
        );

    }

}
