import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-8.component',
    templateUrl: './page-8.component.html'
})
export class I129Page8Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean = false;
    public page8: any = {};
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    }

    ngOnInit() {
        //this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 8).subscribe(res => {
            if (res['formPage'] != undefined) {
                this.page8 = res['formPage'];
            }
        })
    }
     editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page8);
    }
    cancelQuestinnaireEdit() {
        this.page8 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.page8.pageNumber = 8;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 8, this.page8).subscribe(res => {

        })
    }

    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129/page/7');
    }

    gotoNext() {
        this.savequestionnaireInformation();
    }
}
