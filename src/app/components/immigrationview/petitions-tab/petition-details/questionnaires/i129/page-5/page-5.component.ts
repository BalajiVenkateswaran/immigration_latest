import { Component, OnInit } from '@angular/core';
import { i129Page5Service } from "./page-5.service";
import { AppService } from "../../../../../../../services/app.service";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-5.component',
    templateUrl: './page-5.component.html',
    styleUrls: ['./page-5.component.scss']
})
export class i129Page5Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
    public page5: any = {
        "address": {}
    };
    public questions;
    public aptType;

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
        this.aptType = [
            {
                "id": "0",
                "display": "Apt.",
                "value": "APT"
            },
            {
                "id": "1",
                "display": "Stc.",
                "value": "STE"
            },
            {
                "id": "2",
                "display": "Flr.",
                "value": "FLR"
            }

        ];
    }

    ngOnInit() {
        this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 5).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page5 = res['formPage'];

                if (res['formPage']['address'] != undefined) {
                    this.page5.address = res['formPage']['address'];
                }
               
            }
        })
    }
    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page5);
    }
    cancelQuestinnaireEdit() {
        this.page5 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page5.pageNumber = 5;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 5, this.page5).subscribe(res => {

        })
    }
    gotoNext() {
        this.appService.moveToPage('i129Page6');
    }
    gotoPrev() {
        this.appService.moveToPage('i129Page4');
    }
}
