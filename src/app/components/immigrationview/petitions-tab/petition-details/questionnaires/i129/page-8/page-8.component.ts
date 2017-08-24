import { Component, OnInit } from '@angular/core';
import {i129Page8Service} from "./page-8.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-8.component',
    templateUrl: './page-8.component.html',
    styleUrls: ['./page-8.component.scss']
})
export class i129Page8Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
    public page8: any = {};
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    }

    ngOnInit() {
        this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 8).subscribe(res => {
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
        this.isquestionnaireEdit = true;
        this.page8.pageNumber = 8;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 8, this.page8).subscribe(res => {

        })
    }
    
    gotoPrev() {
        this.appService.moveToPage('i129Page7');
    }
}
