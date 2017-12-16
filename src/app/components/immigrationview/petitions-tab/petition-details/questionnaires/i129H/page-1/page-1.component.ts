import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {IMyOptions} from 'mydatepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
  selector: 'app-page-1.component',
  templateUrl: './page-1.component.html'
})
export class I129HPage1Component implements OnInit {
  public I129Hpage1: any = {};
  public I129Hpage1questions: any = [];
  public I129Hpage1Sought: any = [];

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

  myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public isQuestionnaireEdit = false;
  beforecancelquestionnaire: any;

  constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService,
              private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.I129Hpage1questions = [
      {
        'id': '0',
        'display': 'Yes',
        'value': 'Y'
      },
      {
        'id': '1',
        'display': 'No',
        'value': 'N'
      }
    ];

    this.I129Hpage1Sought = [
      {
        'id': '0',
        'display': 'H-1B Specialty Occupation',
        'value': 'SPECIALITY_OCCUPATION'
      },
      {
        'id': '1',
        'display': 'H-1B1 Chile and Singapore',
        'value': 'CHILE_AND_SINGAPORE'
      },
      {
        'id': '2',
        'display': 'H-1B2 Exceptional services relating to a cooperative research and development project administered by the U.S. Department of Defense (DOD)',
        'value': 'EXCEPTIONAL_SERVICES'
      },
      {
        'id': '3',
        'display': 'H-1B3 Fashion model of distinguished merit and ability',
        'value': 'FASHION_MODEL'
      },
      {
        'id': '4',
        'display': 'H-2A Agricultural worker',
        'value': 'AGRICULTURAL_WORKER'
      },
      {
        'id': '5',
        'display': 'H-2B Non-agricultural worker',
        'value': 'NON_AGRICULTURAL_WORKER'
      },
      {
        'id': '6',
        'display': 'H-3 Trainee',
        'value': 'TRAINEE'
      },
      {
        'id': '7',
        'display': 'H-3 Special education exchange visitor program',
        'value': 'SPECIAL_EDUCATION'
      }
    ];

    this.route.params.subscribe(params => {
      this.I129Hpage1 = {};
      this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13).subscribe(res => {
        if (res['formPage'] !== undefined) {
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

  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.I129Hpage1);
  }
  cancelQuestinnaireEdit() {
    this.I129Hpage1 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }

  saveQuestionnaireInformation() {
    this.I129Hpage1.pageNumber = 13;
    if (null != this.I129Hpage1['fromDate1']) {
      this.I129Hpage1['fromDate1'] = this.I129Hpage1['fromDate1']['formatted'];
    }
    if (null != this.I129Hpage1['toDate1']) {
      this.I129Hpage1['toDate1'] = this.I129Hpage1['toDate1']['formatted'];
    }
    if (null != this.I129Hpage1['fromDate2']) {
      this.I129Hpage1['fromDate2'] = this.I129Hpage1['fromDate2']['formatted'];
    }
    if (null != this.I129Hpage1['toDate2']) {
      this.I129Hpage1['toDate2'] = this.I129Hpage1['toDate2']['formatted'];
    }
    if (null != this.I129Hpage1['fromDate3']) {
      this.I129Hpage1['fromDate3'] = this.I129Hpage1['fromDate3']['formatted'];
    }
    if (null != this.I129Hpage1['toDate3']) {
      this.I129Hpage1['toDate3'] = this.I129Hpage1['toDate3']['formatted'];
    }
    if (null != this.I129Hpage1['fromDate4']) {
      this.I129Hpage1['fromDate4'] = this.I129Hpage1['fromDate4']['formatted'];
    }
    if (null != this.I129Hpage1['toDate4']) {
      this.I129Hpage1['toDate4'] = this.I129Hpage1['toDate4']['formatted'];
    }
    if (null != this.I129Hpage1['fromDate5']) {
      this.I129Hpage1['fromDate5'] = this.I129Hpage1['fromDate5']['formatted'];
    }
    if (null != this.I129Hpage1['toDate5']) {
      this.I129Hpage1['toDate5'] = this.I129Hpage1['toDate5']['formatted'];
    }
    if (null != this.I129Hpage1['fromDate6']) {
      this.I129Hpage1['fromDate6'] = this.I129Hpage1['fromDate6']['formatted'];
    }
    if (null != this.I129Hpage1['toDate6']) {
      this.I129Hpage1['toDate6'] = this.I129Hpage1['toDate6']['formatted'];
    }
    this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 13, this.I129Hpage1).subscribe(res => {
      this.isQuestionnaireEdit = false;
    });
  }

  gotoNext() {
    this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129h/page/2');
  }

}
