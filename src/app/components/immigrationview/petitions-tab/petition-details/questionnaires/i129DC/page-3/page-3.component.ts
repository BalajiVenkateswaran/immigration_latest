import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-3.component',
    templateUrl: './page-3.component.html',
    styleUrls: ['./page-3.component.scss']
})
export class i129dcPage3Component implements OnInit {
    public page3:any={
        "capExemptReason":{

        }
    };
    public questions;
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
          this.questions = [
            {
                "id": "0",
                "display": "Yes",
                "value":"Y"
            },
            {
                "id": "1",
                "display": "No",
                "value": "N"
            },
        ];
    }

    ngOnInit() {

    }
   savequestionnaireInformation() {
        this.page3.pageNumber = 21;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 21, this.page3).subscribe(res => {

        })
    }

    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129dcPage2');
    }

    gotoNext() {
       this.savequestionnaireInformation();
    }
}
