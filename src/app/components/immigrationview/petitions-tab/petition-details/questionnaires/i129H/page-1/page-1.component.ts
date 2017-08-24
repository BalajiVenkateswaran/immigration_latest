import { Component, OnInit } from '@angular/core';
import {i129HPage1Service} from "./page-1.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-1.component',
    templateUrl: './page-1.component.html',
    styleUrls: ['./page-1.component.scss']
})
export class i129HPage1Component implements OnInit {
    public I129Hpage1: any = {};
    public I129Hpage1questions: any = [];
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    }

    ngOnInit() {
        this.I129Hpage1questions = [
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

    savequestionnaireInformation() {
            //this.isquestionnaireEdit = true;
            this.I129Hpage1.pageNumber = 13;
            this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13, this.I129Hpage1).subscribe(res => {

            })
        }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129hPage2');
    }
    gotoPrev() {
    }
}
