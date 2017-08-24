import { Component, OnInit } from '@angular/core';
import { i129Page1Service } from "./page-1.service";
import { AppService } from "../../../../../../../services/app.service";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-1.component',
    templateUrl: './page-1.component.html',
    styleUrls: ['./page-1.component.scss']
})
export class i129Page1Component implements OnInit {
    beforecancelquestionnaire: any;
    public isquestionnaireEdit: boolean = false;
    public page1: any = {
        'address': {},
        'contact': {}
    };
    public aptType;
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
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
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 1).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page1 = res['formPage'];

                if (res['formPage']['address'] != undefined) {
                    this.page1.address = res['formPage']['address'];
                }
                if (res['formPage']['contact'] != undefined) {
                    this.page1.contact = res['formPage']['contact'];
                }
            }
        })
    }
    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page1);
    }
    cancelQuestinnaireEdit() {
        this.page1 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page1.pageNumber = 1;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 1, this.page1).subscribe(res => {

        })
    }
    gotoNext() {
        this.appService.moveToPage('i129Page2');
    }
    

}
