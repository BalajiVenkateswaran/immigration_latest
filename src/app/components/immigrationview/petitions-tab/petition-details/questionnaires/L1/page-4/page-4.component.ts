import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../../../services/app.service';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';
@Component({
  selector: 'ih-i129l-page-4',
  templateUrl: './page-4.component.html'
})
export class I129LPage4Component implements OnInit {
  public isQuestionnaireEdit = false;
  beforecancelquestionnaire: any;
    public page25: any = {};

    constructor(public questionnaireService: QuestionnaireCommonService, private appService: AppService) { }

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  25).subscribe(res => {
            console.log(res);
            if (res['formPage']) {
                this.page25 = res['formPage'];
            }
        });
  }
  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page25);
  }
  cancelQuestinnaireEdit() {
    this.page25 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }
  saveQuestionnaireInformation() {
      this.page25.pageNumber = 25;
      this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  this.page25.pageNumber, this.page25).subscribe(res => {
        this.isQuestionnaireEdit = false;
      });
  }

  gotoPrev() {
    this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129l/page/3');
    this.appService.currentSBLink = 'page3l1';

  }
}
