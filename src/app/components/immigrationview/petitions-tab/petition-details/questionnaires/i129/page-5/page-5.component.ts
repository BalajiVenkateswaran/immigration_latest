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
    public states: any[] = [];
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
        showSelectorArrow: false
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
        this.states = [
            { value: '0', name: 'select State' },
            { value: '1', name: 'AA' },
            { value: '2', name: 'AE' },
            { value: '3', name: 'AK' },
            { value: '4', name: 'AL' },
            { value: '5', name: 'AP' },
            { value: '6', name: 'AR' },
            { value: '7', name: 'AS' },
            { value: '8', name: 'AZ' },
            { value: '9', name: 'CA' },
            { value: '10', name: 'CO' },
            { value: '11', name: 'CT' },
            { value: '12', name: 'DC' },
            { value: '13', name: 'DE' },
            { value: '14', name: 'FL' },
            { value: '15', name: 'FM' },
            { value: '16', name: 'GA' },
            { value: '17', name: 'GU' },
            { value: '18', name: 'HI' },
            { value: '19', name: 'IA' },
            { value: '20', name: 'ID' },
            { value: '21', name: 'IL' },
            { value: '22', name: 'IN' },
            { value: '23', name: 'KS' },
            { value: '24', name: 'KY' },
            { value: '25', name: 'LA' },
            { value: '26', name: 'MA' },
            { value: '27', name: 'MD' },
            { value: '28', name: 'ME' },
            { value: '29', name: 'MH' },
            { value: '30', name: 'MI' },
            { value: '31', name: 'MN' },
            { value: '32', name: 'MO' },
            { value: '33', name: 'MP' },
            { value: '34', name: 'MS' },
            { value: '35', name: 'MT' },

            { value: '36', name: 'NC' },
            { value: '37', name: 'ND' },
            { value: '38', name: 'NE' },
            { value: '39', name: 'NH' },
            { value: '40', name: 'NJ' },
            { value: '41', name: 'NM' },
            { value: '42', name: 'NV' },
            { value: '43', name: 'NY' },

            { value: '44', name: 'OH' },
            { value: '45', name: 'OK' },
            { value: '46', name: 'OR' },

            { value: '47', name: 'PA' },
            { value: '48', name: 'PR' },
            { value: '49', name: 'PW' },

            { value: '50', name: 'RI' },

            { value: '51', name: 'SC' },
            { value: '52', name: 'SD' },

            { value: '53', name: 'TN' },
            { value: '54', name: 'TX' },

            { value: '55', name: 'UT' },

            { value: '56', name: 'VA' },
            { value: '57', name: 'VI' },
            { value: '58', name: 'VT' },


            { value: '59', name: 'WA' },
            { value: '60', name: 'WI' },
            { value: '61', name: 'WV' },
            { value: '62', name: 'WY' }
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
