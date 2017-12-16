import {Component, OnInit} from '@angular/core';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {AppService} from '../../../../../../../services/app.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
  selector: 'ih-i129l-page-3',
  templateUrl: './page-3.component.html'
})
export class I129LPage3Component implements OnInit {
    public questions: any = [];
    public page24: any = {};
  public isQuestionnaireEdit = false;
  beforecancelquestionnaire: any;

    constructor(public questionnaireService: QuestionnaireCommonService, private appService: AppService) {
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
   }

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  24).subscribe(res => {
            console.log(res);
            if (res['formPage']) {
                this.page24 = res['formPage'];
            }
        });
  }
  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page24);
  }
  cancelQuestinnaireEdit() {
    this.page24 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }
  saveQuestionnaireInformation() {
      this.page24.pageNumber = 24;
      this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  this.page24.pageNumber, this.page24).subscribe(res => {
        this.isQuestionnaireEdit = false;
      });
  }
  gotoNext() {
    this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129l/page/4');
    this.appService.currentSBLink = 'page4l1';
  }
  gotoPrev() {
    this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129l/page/2');
    this.appService.currentSBLink = 'page2l1';
  }
}
