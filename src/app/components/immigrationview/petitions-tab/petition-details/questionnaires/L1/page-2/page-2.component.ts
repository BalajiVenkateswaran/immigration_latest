import {Component, OnInit} from '@angular/core';
import {IMyOptions} from 'mydatepicker';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {AppService} from '../../../../../../../services/app.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
  selector: 'ih-i129l-page-2',
  templateUrl: './page-2.component.html'
})
export class I129LPage2Component implements OnInit {
  public companyRelated: any = [];
  public fromDate1: string;
  public fromDate2: string;
  public fromDate3: string;
  public fromDate4: string;
  public fromDate5: string;
  public fromDate6: string;
  public fromDate7: string;
  public toDate1: string;
  public toDate2: string;
  public toDate3: string;
  public toDate4: string;
  public toDate5: string;
  public toDate6: string;
  public toDate7: string;
  public page23: any = {
  };
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public isQuestionnaireEdit = false;
  beforecancelquestionnaire: any;
  constructor(public questionnaireService: QuestionnaireCommonService, private appService: AppService) {

    this.companyRelated = [
      {
        'id': '0',
        'display': 'Parent',
        'value': 'PARENT'
      },
      {
        'id': '1',
        'display': 'Branch',
        'value': 'BRANCH'
      },
       {
        'id': '2',
        'display': 'Subsidiary',
        'value': 'SUBSIDARY'
      },
       {
        'id': '3',
        'display': 'Affiliate',
        'value': 'AFFILIATE'
      },
       {
        'id': '4',
        'display': 'Joint Venture',
        'value': 'JOINT_VENTURE'
      }
    ];
   }

  ngOnInit() {
      this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  23).subscribe(res => {
          console.log(res);
          if (res['formPage']) {
              this.page23 = res['formPage'];

              if (this.page23['fromDate1']) {
                  this.fromDate1 = this.page23['fromDate1'];
              }
              if (this.page23['fromDate2']) {
                  this.fromDate2 = this.page23['fromDate2'];
              }
              if (this.page23['fromDate3']) {
                  this.fromDate3 = this.page23['fromDate3'];
              }
              if (this.page23['fromDate4']) {
                  this.fromDate4 = this.page23['fromDate4'];
              }
              if (this.page23['fromDate5']) {
                  this.fromDate5 = this.page23['fromDate5'];
              }
              if (this.page23['fromDate6']) {
                  this.fromDate6 = this.page23['fromDate6'];
              }
              if (this.page23['fromDate7']) {
                  this.fromDate7 = this.page23['fromDate7'];
              }
              if (this.page23['toDate1']) {
                  this.toDate1 = this.page23['toDate1'];
              }
              if (this.page23['toDate2']) {
                  this.toDate2 = this.page23['toDate2'];
              }
              if (this.page23['toDate3']) {
                  this.toDate3 = this.page23['toDate3'];
              }
              if (this.page23['toDate4']) {
                  this.toDate4 = this.page23['toDate4'];
              }
              if (this.page23['toDate5']) {
                  this.toDate5 = this.page23['toDate5'];

              }
              if (this.page23['toDate6']) {
                  this.toDate6 = this.page23['toDate6'];

              }
              if (this.page23['toDate7']) {
                  this.toDate7 = this.page23['toDate7'];
              }
          }

      });
  }
  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page23);
  }
  cancelQuestinnaireEdit() {
    this.page23 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }
  saveQuestionnaireInformation() {
      this.page23.pageNumber = 23;
      if (this.page23.fromDate1) {
          this.page23.fromDate1 = this.page23.fromDate1['formatted'];
      }
      if (this.page23.fromDate2) {
          this.page23.fromDate2 = this.page23.fromDate2['formatted'];
      }
      if (this.page23.fromDate3) {
          this.page23.fromDate3 = this.page23.fromDate3['formatted'];
      }
      if (this.page23.fromDate4) {
          this.page23.fromDate4 = this.page23.fromDate4['formatted'];
      }
      if (this.page23.fromDate5) {
          this.page23.fromDate5 = this.page23.fromDate5['formatted'];
      }
      if (this.page23.fromDate6) {
          this.page23.fromDate6 = this.page23.fromDate6['formatted'];
      }
      if (this.page23.fromDate7) {
          this.page23.fromDate7 = this.page23.fromDate7['formatted'];
      }
      if (this.page23.toDate1) {
          this.page23.toDate1 = this.page23.toDate1['formatted'];
      }
      if (this.page23.toDate2) {
          this.page23.toDate2 = this.page23.toDate2['formatted'];
      }
      if (this.page23.toDate3) {
          this.page23.toDate3 = this.page23.toDate3['formatted'];
      }
      if (this.page23.toDate4) {
          this.page23.toDate4 = this.page23.toDate4['formatted'];
      }
      if (this.page23.toDate5) {
          this.page23.toDate5 = this.page23.toDate5['formatted'];
      }
      if (this.page23.toDate6) {
          this.page23.toDate6 = this.page23.toDate6['formatted'];
      }
      if (this.page23.toDate7) {
          this.page23.toDate7 = this.page23.toDate7['formatted'];
      }
      this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], this.page23.pageNumber, this.page23).subscribe(res => {
          this.isQuestionnaireEdit = false;
      });
  }
  gotoNext() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129l/page/3');
      this.appService.currentSBLink = 'page3l1';
  }
  gotoPrev() {
    this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129l/page/1/' + this.questionnaireService.selectedQuestionnaire['questionnaireId']);
      this.appService.currentSBLink = 'page1l1';
  }

}
