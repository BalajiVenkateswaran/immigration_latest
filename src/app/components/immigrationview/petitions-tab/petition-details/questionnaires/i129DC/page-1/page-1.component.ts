import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129dc-page-1',
    templateUrl: './page-1.component.html'
})
export class I129dcPage1Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit = false;
    public page1: any = {
        'employerInfo': {}
    };
    public questions;
    public higherEducation;
    constructor(public questionnaireService: QuestionnaireCommonService,
    private route: ActivatedRoute, private router: Router) {
        this.questions = [
            {
                'id': '0',
                'display': 'Yes',
                'value': 'Y'
            },
            {
                'id': '1',
                'display': 'No',
                'value': 'N'
            },
        ];
         this.higherEducation = [
            {
                'id': '0',
                'display': 'NO DIPLOMA',
                'value': 'NO_DIPLOMA'
            },
            {
                'id': '1',
                'display': 'HIGH SCHOOL GRADUATE DIPLOMA',
                'value': 'HIGH_SCHOOL'
            },
            {
                'id': '2',
                'display': 'Some college credit, but less than 1 year',
                'value': 'COLLEGE_CREDIT'
            },
            {
                'id': '3',
                'display': 'One or more years of college, no degree',
                'value': 'NO_DEGREE'
            },
            {
                'id': '4',
                'display': 'Associate\'s degree (for example: AA, AS)',
                'value': 'ASSOCIATES_DEGREE'
            },
            {
                'id': '5',
                'display': 'Bachelor\'s degree (for example: BA, AB, BS)',
                'value': 'BACHELORS_DEGREE'
            },
            {
                'id': '6',
                'display': 'Master\'s degree (for example: MA, MS, MEng, MEd, MSW, MBA)',
                'value': 'MASTERS_DEGREE'
            },
            {
                'id': '7',
                'display': 'Professional degree (for example: MD, DDS, DVM, LLB, JD)',
                'value': 'PROFESSIONAL_DEGREE'
            },
            {
                'id': '8',
                'display': 'Doctorate degree (for example:  PhD, EdD)',
                'value': 'DOCTORATE_DEGREE'
            }
        ];
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.page1 = {
                'employerInfo': {}
            };
            this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 19).subscribe(res => {
                if (res['formPage'] !== undefined) {

                    this.page1 = res['formPage'];

                    if (res['formPage']['employerInfo'] !== undefined) {
                        this.page1.employerInfo = res['formPage']['employerInfo'];
                    }

                }
            })
        });
    }
    editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page1);
    }
    cancelQuestinnaireEdit() {
        this.page1 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }
  saveQuestionnaireInformation() {
        this.page1.pageNumber = 19;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 19, this.page1).subscribe(res => {
          this.isQuestionnaireEdit = false;
        })
    }
    gotoNext() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129dc/page/2');
    }

}
