import { Component, OnInit } from '@angular/core';
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
    isquestionnaireEdit: boolean = false;
    public page5: any = {
        "address": {}
    };
    public questions;
    public aptType;
    public intendentEmploymentFrom: string;
    public intendentEmploymentTo: string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
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
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 5).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page5 = res['formPage'];
                this.intendentEmploymentFrom = this.page5['intendentEmploymentFrom'];
                this.intendentEmploymentTo = this.page5['intendentEmploymentTo'];
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
        //this.isquestionnaireEdit = true;
        this.page5.pageNumber = 5;
        if(this.page5['intendentEmploymentFrom'] != null){
          this.page5['intendentEmploymentFrom'] = this.page5['intendentEmploymentFrom']['formatted'];
        }
        if(this.page5['intendentEmploymentTo'] != null){
          this.page5['intendentEmploymentTo'] = this.page5['intendentEmploymentTo']['formatted'];
        }
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 5, this.page5).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129Page6');
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129Page4');
    }
}
