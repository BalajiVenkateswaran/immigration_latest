import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html'
})
export class I129Page4Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit: boolean = false;
    public page4: any = {};
    public questions;
     constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
          this.questions = [
            {
                "id": "0",
                "display": "Yes",
                "value": "Y"
            },
            {
                "id": "1",
                "display": "No",
                "value": "N"
            },
        ];
    }

    ngOnInit() {
        //this.isQuestionnaireEdit=true;
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 4).subscribe(res => {
            if (res['formPage'] != undefined) {
                this.page4 = res['formPage'];
            }
        })
    }
     editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page4);
    }
    cancelQuestinnaireEdit() {
        this.page4 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        //this.isQuestionnaireEdit = true;
        this.page4.pageNumber = 4;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 4, this.page4).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129/page/5');
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129/page/3');
    }
}
