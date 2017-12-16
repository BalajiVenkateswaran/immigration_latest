import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'app-page-3.component',
    templateUrl: './page-3.component.html'
})
export class I129dcPage3Component implements OnInit {
    public isQuestionnaireEdit = false;
    beforecancelquestionnaire: any;
    public page3: any= {
        'capExemptReason': {

        }
    };

    public questions;
    public toggles = [
        { value: 'Y'},
        { value: 'N' },
    ];
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
        this.page3 = {
                         'capExemptReason': {
                         }
                     };
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 21).subscribe(res => {
            if (res['formPage'] !== undefined) {

                this.page3 = res['formPage'];

                if (res['formPage']['capExemptReason'] !== undefined) {
                    this.page3.capExemptReason = res['formPage']['capExemptReason'];
                }

            }
        })
    }
  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page3);
  }
  cancelQuestinnaireEdit() {
    this.page3 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }

  saveQuestionnaireInformation() {
        this.page3.pageNumber = 21;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 21, this.page3).subscribe(res => {
          this.isQuestionnaireEdit = false;
        });
    }

    gotoPrev() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129dc/page/2');
    }

}
