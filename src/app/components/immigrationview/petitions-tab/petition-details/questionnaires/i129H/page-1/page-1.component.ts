import { Component, OnInit } from '@angular/core';
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
    public fromDate1: string;
    public toDate1: string;
    public fromDate2: string;
    public toDate2: string;
    public fromDate3: string;
    public toDate3: string;
    public fromDate4: string;
    public toDate4: string;
    public fromDate5: string;
    public toDate5: string;
    public fromDate6: string;
    public toDate6: string;

  myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService,
      private route: ActivatedRoute, private router: Router) {
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

        this.route.params.subscribe(params => {
             this.I129Hpage1 = {};
             this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13).subscribe(res => {
                 if (res['formPage'] != undefined) {
                     this.I129Hpage1 = res['formPage'];
                     this.fromDate1 = this.I129Hpage1['fromDate1'];
                     this.toDate1 = this.I129Hpage1['toDate1'];
                     this.fromDate2 = this.I129Hpage1['fromDate2'];
                     this.toDate2 = this.I129Hpage1['toDate2'];
                     this.fromDate3 = this.I129Hpage1['fromDate3'];
                     this.toDate3 = this.I129Hpage1['toDate3'];
                     this.fromDate4 = this.I129Hpage1['fromDate4'];
                     this.toDate4 = this.I129Hpage1['toDate4'];
                     this.fromDate5 = this.I129Hpage1['fromDate5'];
                     this.toDate5 = this.I129Hpage1['toDate5'];
                     this.fromDate6 = this.I129Hpage1['fromDate6'];
                     this.toDate6 = this.I129Hpage1['toDate6'];
                 }
             });
        });
    }

    savequestionnaireInformation() {
        this.I129Hpage1.pageNumber = 13;
        this.I129Hpage1['fromDate1'] = this.I129Hpage1['fromDate1']['formatted'];
        this.I129Hpage1['toDate1'] = this.I129Hpage1['toDate1']['formatted'];
        this.I129Hpage1['fromDate2'] = this.I129Hpage1['fromDate2']['formatted'];
        this.I129Hpage1['toDate2'] = this.I129Hpage1['toDate2']['formatted'];
        this.I129Hpage1['fromDate3'] = this.I129Hpage1['fromDate3']['formatted'];
        this.I129Hpage1['toDate3'] = this.I129Hpage1['toDate3']['formatted'];
        this.I129Hpage1['fromDate4'] = this.I129Hpage1['fromDate4']['formatted'];
        this.I129Hpage1['toDate4'] = this.I129Hpage1['toDate4']['formatted'];
        this.I129Hpage1['fromDate5'] = this.I129Hpage1['fromDate5']['formatted'];
        this.I129Hpage1['toDate5'] = this.I129Hpage1['toDate5']['formatted'];
        this.I129Hpage1['fromDate6'] = this.I129Hpage1['fromDate6']['formatted'];
        this.I129Hpage1['toDate6'] = this.I129Hpage1['toDate6']['formatted'];
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13, this.I129Hpage1).subscribe(res => {

        });
    }
    gotoNext() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129hPage2');
    }
    gotoPrev() {
    }
}
