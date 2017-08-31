import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html',
    styleUrls: ['./page-2.component.scss']
})
export class i129HPage2Component implements OnInit {
    public I129Hpage2: any = {};
    public petitionerDateOfSignature: string;
    public officialDateOfSignature: string;
    public projectManagerDateOfSignature: string;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    }

    ngOnInit() {
        this.I129Hpage2={};
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13).subscribe(res => {
            if (res['formPage'] != undefined) {
                this.I129Hpage2 = res['formPage'];
                this.petitionerDateOfSignature = this.I129Hpage2['petitionerDateOfSignature'];
                this.officialDateOfSignature = this.I129Hpage2['officialDateOfSignature'];
                this.projectManagerDateOfSignature = this.I129Hpage2['projectManagerDateOfSignature'];
            }
        });
    }
    gotoNext() {

        this.savequestionnaireInformation();
        this.appService.moveToPage('i129hPage3');

    }
    gotoPrev() {
        this.savequestionnaireInformation();
        this.appService.moveToPage('i129hPage1/'+this.questionnaireService.selectedQuestionnaire['questionnaireId']);
    }

     savequestionnaireInformation() {
        this.I129Hpage2.pageNumber = 14;
        this.I129Hpage2['petitionerDateOfSignature'] = this.I129Hpage2['petitionerDateOfSignature']['formatted'];
         this.I129Hpage2['officialDateOfSignature'] = this.I129Hpage2['officialDateOfSignature']['formatted'];
         this.I129Hpage2['projectManagerDateOfSignature'] = this.I129Hpage2['projectManagerDateOfSignature']['formatted'];
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 14, this.I129Hpage2).subscribe(res => {

        });
     }
}
