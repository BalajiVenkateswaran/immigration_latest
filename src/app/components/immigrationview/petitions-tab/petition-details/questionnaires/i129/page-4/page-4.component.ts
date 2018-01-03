import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129-page-4',
    templateUrl: './page-4.component.html'
})
export class I129Page4Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit = false;
    public page4: any = {};
    public questions;
    public saveButtonProgress = false;
     constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
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
            }
        ];
    }

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 4).subscribe(res => {
            if (res['formPage'] !== undefined) {
                this.page4 = res['formPage'];
            }
        })
    }
     editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page4);
    }
    cancelQuestinnaireEdit() {
        this.page4 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }
    saveQuestionnaireInformation() {
        this.saveButtonProgress = true;
        this.page4.pageNumber = 4;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 4, this.page4).subscribe(res => {
            this.isQuestionnaireEdit = false;
            this.saveButtonProgress = false;
        });
    }
    gotoNext() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/5');
    }

    gotoPrev() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/3');
    }
}
