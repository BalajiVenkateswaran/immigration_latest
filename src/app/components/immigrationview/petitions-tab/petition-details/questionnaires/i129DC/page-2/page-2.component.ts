import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html'
})
export class I129dcPage2Component implements OnInit {
    public questions;
    public aptType;
    public petitionType;
    public isQuestionnaireEdit: boolean = false;
    public page2:any={
        "addressOfUSinstitution":{}
    }
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
         this.aptType = [
            {
                "id": "0",
                "display": "Apt.",
                "value":"APT"
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
        this.petitionType=[
            {
                "id":"0",
                "display": "CAP H-1B Bachelor's Degree",
                "value": "CAP_BACHELOR_DEGREE"

            },
             {
                "id":"1",
                "display": "CAP H-1B U.S. Master's Degree or Higher",
                "value": "CAP_MASTER_DEGREE"

            },
             {
                "id":"2",
                "display": "CAP H-1B1 Chile/Singapore",
                "value": "CAP_CHILE_SINGAPORE"

            },
             {
                "id":"3",
                "display": "CAP Exempt",
                "value": "CAP_EXEMPT"

            }
        ]

    }

    ngOnInit() {
        this.page2 = {
                         "addressOfUSinstitution":{}
                     };
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 20).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page2 = res['formPage'];

                if (res['formPage']['addressOfUSinstitution'] != undefined) {
                    this.page2.addressOfUSinstitution = res['formPage']['addressOfUSinstitution'];
                }

            }
        })
    }

    savequestionnaireInformation() {
        this.page2.pageNumber = 20;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 20, this.page2).subscribe(res => {

        })
    }

    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129dc/page/3');
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129dc/page/1/'+this.questionnaireService.selectedQuestionnaire['questionnaireId']);
    }
}
