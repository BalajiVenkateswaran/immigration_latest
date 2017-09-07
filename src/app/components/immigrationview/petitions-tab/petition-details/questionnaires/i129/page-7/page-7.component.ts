import { Component, OnInit } from '@angular/core';
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
    isquestionnaireEdit: boolean = false;
    public page7: any = {
        "preparerAddress":{}
    };
    public dateOfSignature: string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public aptType;
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
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
        //this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 7).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page7 = res['formPage'];
                this.dateOfSignature = this.page7['dateOfSignature'];
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
        //this.isquestionnaireEdit = true;
        this.page7.pageNumber = 7;
        if(this.page7['dateOfSignature'] != null){
          this.page7['dateOfSignature'] = this.page7['dateOfSignature']['formatted'];
        }
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 7, this.page7).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129Page8');
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129Page6');
    }
}
