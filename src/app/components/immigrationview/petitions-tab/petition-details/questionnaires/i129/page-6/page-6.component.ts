import { Component, OnInit } from '@angular/core';
import {i129Page6Service} from "./page-6.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-6.component',
    templateUrl: './page-6.component.html',
    styleUrls: ['./page-6.component.scss']
})
export class i129Page6Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
    public page6: any = {};
     constructor(public questionnaireService: QuestionnaireCommonService) {
    }

    ngOnInit() {
        this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 6).subscribe(res => {
            if (res['formPage'] != undefined) {
                this.page6 = res['formPage'];
            }
        })
    }

    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page6);
    }
    cancelQuestinnaireEdit() {
        this.page6 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page6.pageNumber = 6;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 6, this.page6).subscribe(res => {

        })
    }


}
