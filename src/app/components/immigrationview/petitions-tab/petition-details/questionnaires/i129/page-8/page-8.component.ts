import {Component, OnInit} from '@angular/core';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129-page-8',
    templateUrl: './page-8.component.html'
})
export class I129Page8Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit = false;
    public page8: any = {};
    public saveButtonProgress = false;
    constructor(public questionnaireService: QuestionnaireCommonService) {
    }

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 8).subscribe(res => {
            if (res['formPage'] !== undefined) {
                this.page8 = res['formPage'];
            }
        })
    }
     editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page8);
    }
    cancelQuestinnaireEdit() {
        this.page8 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }
    saveQuestionnaireInformation() {
        this.saveButtonProgress = true;
        this.page8.pageNumber = 8;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 8, this.page8).subscribe(res => {
            this.isQuestionnaireEdit = false;
            this.saveButtonProgress = false;
        })
    }

    gotoPrev() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/7');
    }
}
