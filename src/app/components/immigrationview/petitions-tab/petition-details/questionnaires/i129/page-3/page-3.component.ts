import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../../../../../services/app.service";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-3.component',
    templateUrl: './page-3.component.html',
    styleUrls: ['./page-3.component.scss']
})
export class i129Page3Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean = false;
    public aptType;
    public questions;
    public typeOfOffice;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public page3: any = {
        "address": {},
        "foreignAddress": {}
    };
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
        this.typeOfOffice = [
            {
                "id": "0",
                "display": "Consulate",
                "value": "CONSULATE"
            },
            {
                "id": "1",
                "display": "Pre-flight inspection",
                "value": "PRE_FLIGHT_INSPECTION"
            },
            {
                "id": "2",
                "display": "Port of entry",
                "value": "PORT_OF_ENTRY"
            },
        ];

    }

    ngOnInit() {
        //this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 3).subscribe(res => {
            if (res['formPage']!=undefined) {
                this.page3 = res['formPage'];
                if (res['formPage']['address'] != undefined) {
                    this.page3.address = res['formPage']['address'];
                }
                if (res['formPage']['foreignAddress'] != undefined) {
                    this.page3.foreignAddress = res['formPage']['foreignAddress'];
                }
            }


        })
    }
    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page3);
    }
    cancelQuestinnaireEdit() {
        this.page3 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        //this.isquestionnaireEdit = true;
        this.page3.pageNumber = 3;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 3, this.page3).subscribe(res => {

        })
    }
    gotoNext() {
        this.savequestionnaireInformation();
        if(this.appService.applicationViewMode == 'Immigration'){
          this.appService.moveToPage('i129Page4');
        }
    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129Page2');
    }

}
