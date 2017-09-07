import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-1.component',
    templateUrl: './page-1.component.html',
    styleUrls: ['./page-1.component.scss']
})
export class i129dcPage1Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean = false;
    public page1: any = {
        "employerInfo":{}
    };
    public questions;
    public higherEducation;
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService,
    private route: ActivatedRoute, private router: Router) {
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
        ]
         this.higherEducation = [
            {
                "id": "0",
                "display": "NO DIPLOMA",
                "value":"NO_DIPLOMA"
            },
            {
                "id": "1",
                "display": "HIGH SCHOOL GRADUATE DIPLOMA",
                "value":"HIGH_SCHOOL"
            },
            {
                "id": "2",
                "display": "Some college credit, but less than 1 year",
                "value": "COLLEGE_CREDIT"
            },
            {
                "id": "3",
                "display": "Some college credit, but less than 1 year",
                "value": "COLLEGE_CREDIT"
            },
            {
                "id": "4",
                "display": "One or more years of college, no degree",
                "value": "NO_DEGREE"
            },
            {
                "id": "5",
                "display": "Associate's degree (for example: AA, AS)",
                "value": "ASSOCIATES_DEGREE"
            },
            {
                "id": "6",
                "display": "Bachelor's degree (for example: BA, AB, BS)",
                "value": "BACHELORS_DEGREE"
            },
            {
                "id": "7",
                "display": "Master's degree (for example: MA, MS, MEng, MEd, MSW, MBA)",
                "value": "MASTERS_DEGREE"
            },
            {
                "id": "8",
                "display": "Professional degree (for example: MD, DDS, DVM, LLB, JD)",
                "value": "PROFESSIONAL_DEGREE"
            },
            {
                "id": "9",
                "display": "Doctorate degree (for example:  PhD, EdD)",
                "value": "DOCTORATE_DEGREE"
            },

        ];
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.page1 = {
                "employerInfo":{}
            };
            this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 19).subscribe(res => {
                if (res['formPage'] != undefined) {

                    this.page1 = res['formPage'];

                    if (res['formPage']['employerInfo'] != undefined) {
                        this.page1.employerInfo = res['formPage']['employerInfo'];
                    }

                }
            })
        });
    }
    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page1);
    }
    cancelQuestinnaireEdit() {
        this.page1 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.page1.pageNumber = 19;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 19, this.page1).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129dcPage2');
    }

}
