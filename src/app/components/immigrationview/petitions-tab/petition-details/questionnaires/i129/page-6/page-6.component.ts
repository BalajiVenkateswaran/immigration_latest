import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129-page-6',
    templateUrl: './page-6.component.html'
})
export class I129Page6Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit = false;
    public page6: any = {};
    public dateOfSignature: string;
    public saveButtonProgress = false;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    constructor(public questionnaireService: QuestionnaireCommonService) {}

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 6).subscribe(res => {
            if (res['formPage'] !== undefined) {
                this.page6 = res['formPage'];
                this.dateOfSignature = this.page6['dateOfSignature'];
            }
        });
    }

    editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page6);
    }
    cancelQuestinnaireEdit() {
        this.page6 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }
    saveQuestionnaireInformation() {
        this.saveButtonProgress = true;
        this.page6.pageNumber = 6;
        if (this.page6['dateOfSignature'] != null) {
          this.page6['dateOfSignature'] = this.page6['dateOfSignature']['formatted'];
        }
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 6, this.page6).subscribe(res => {
            this.isQuestionnaireEdit = false;
            this.saveButtonProgress = false;
        })
    }
    gotoNext() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/7');
    }
    gotoPrev() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/5');
    }

}
