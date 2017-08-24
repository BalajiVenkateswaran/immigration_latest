import { Component, OnInit } from '@angular/core';
import {i129Page7Service} from "./page-7.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-7.component',
    templateUrl: './page-7.component.html',
    styleUrls: ['./page-7.component.scss']
})
export class i129Page7Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
    public page7: any = {
        "preparerAddress":{}
    };
    public aptType;
     constructor(public questionnaireService: QuestionnaireCommonService) {
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
    }

    ngOnInit() {
        this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 7).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page7 = res['formPage'];

                if (res['formPage']['preparerAddress'] != undefined) {
                    this.page7.preparerAddress = res['formPage']['preparerAddress'];
                }
            }
        })
    }
     editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page7);
    }
    cancelQuestinnaireEdit() {
        this.page7 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page7.pageNumber = 7;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 7, this.page7).subscribe(res => {

        })
    }

}
