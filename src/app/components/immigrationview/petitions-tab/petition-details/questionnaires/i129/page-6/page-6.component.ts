import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-6.component',
    templateUrl: './page-6.component.html'
})
export class I129Page6Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit: boolean = false;
    public page6: any = {};
    public dateOfSignature: string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    }

    ngOnInit() {
        //this.isQuestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 6).subscribe(res => {
            if (res['formPage'] != undefined) {
                this.page6 = res['formPage'];
                this.dateOfSignature = this.page6['dateOfSignature'];
            }
        })
    }

    editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page6);
    }
    cancelQuestinnaireEdit() {
        this.page6 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        //this.isQuestionnaireEdit = true;
        this.page6.pageNumber = 6;
        if(this.page6['dateOfSignature'] != null){
          this.page6['dateOfSignature'] = this.page6['dateOfSignature']['formatted'];
        }
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 6, this.page6).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129/page/7');
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('immigrationview/questionnaire/i129/page/5');
    }

}
