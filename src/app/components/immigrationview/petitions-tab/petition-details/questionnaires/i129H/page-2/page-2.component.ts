import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions} from 'mydatepicker';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';

@Component({
  selector: 'app-page-2.component',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss']
})
export class i129HPage2Component implements OnInit {
  I129Hpage2Employment: any [];
  I129Hpage2TemporaryNeed: any [];
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
    this.I129Hpage2 = {};
    this.I129Hpage2Employment = [
      {
        "id": "0",
        "display": "Seasonal",
        "value": "SEASONAL"
      },
      {
        "id": "1",
        "display": "Peak load",
        "value": "PEAK_LOAD"
      },
      {
        "id": "1",
        "display": "Intermittent",
        "value": "INTERMITTENT"
      },
      {
        "id": "1",
        "display": "One-time occurrence",
        "value": "ONE_IIME_OCCURANCE"
      },
    ];
    this.I129Hpage2TemporaryNeed = [
      {
        "id": "0",
        "display": "Unpredictable",
        "value": "UNPREDICTABLE"
      },
      {
        "id": "1",
        "display": "Periodic",
        "value": "PERIODIC"
      },
      {
        "id": "2",
        "display": "Recurrent annually",
        "value": "RECURRENT_ANNUALLY"
      },
    ];
    this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 14).subscribe(res => {
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
  }

  gotoPrev() {
    this.savequestionnaireInformation();
    this.appService.moveToPage('i129hPage1/' + this.questionnaireService.selectedQuestionnaire['questionnaireId']);
  }

  savequestionnaireInformation() {
    this.I129Hpage2.pageNumber = 14;
    if (this.I129Hpage2['petitionerDateOfSignature'] != null) {
      this.I129Hpage2['petitionerDateOfSignature'] = this.I129Hpage2['petitionerDateOfSignature']['formatted'];
    }
    if (this.I129Hpage2['officialDateOfSignature'] != null) {
      this.I129Hpage2['officialDateOfSignature'] = this.I129Hpage2['officialDateOfSignature']['formatted'];
    }
    if (this.I129Hpage2['projectManagerDateOfSignature'] != null) {
      this.I129Hpage2['projectManagerDateOfSignature'] = this.I129Hpage2['projectManagerDateOfSignature']['formatted'];
    }

    this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 14, this.I129Hpage2).subscribe(res => {

    });
  }
}
