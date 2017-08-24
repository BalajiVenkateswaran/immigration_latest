import { Component, OnInit } from '@angular/core';
import {i129Page4Service} from "./page-4.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html',
    styleUrls: ['./page-4.component.scss']
})
export class i129Page4Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
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
        this.isquestionnaireEdit=true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 4).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page4 = res['formPage'];


            }
        })
    }
     editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page4);
    }
    cancelQuestinnaireEdit() {
        this.page4 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page4.pageNumber = 4;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 4, this.page4).subscribe(res => {

        })
    }
    gotoNext() {
        this.appService.moveToPage('i129Page5');
    }
    gotoPrev() {
        this.appService.moveToPage('i129Page3');
    }
}
