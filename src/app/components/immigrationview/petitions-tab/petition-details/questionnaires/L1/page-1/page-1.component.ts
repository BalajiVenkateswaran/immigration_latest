import {Component, OnInit} from '@angular/core';
import {IMyOptions} from 'mydatepicker';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {AppService} from '../../../../../../../services/app.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html'
})
export class I129LPage1Component implements OnInit {
  public questions: any = [];
  public isPetition: any = [];
  public states: any[] = [];
  public classificationSought: any = [];
  public aptType;
  public I129Hpage1: any = {};
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
  public page22: any = {};
  public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
  public isQuestionnaireEdit = false;
  beforecancelquestionnaire: any;
  constructor(public questionnaireService: QuestionnaireCommonService, private appService: AppService) {
    this.questions = [
      {
        'id': '0',
        'display': 'Yes',
        'value': 'Y'
      },
      {
        'id': '1',
        'display': 'No',
        'value': 'N'
      },
    ];
    this.isPetition = [
      {
        'id': '0',
        'display': 'An individual petition',
        'value': 'INDIVIDUAL_PETITION'
      },
      {
        'id': '1',
        'display': 'A blanket petition',
        'value': 'BLANKET_PETITION'
      },
    ];
    this.classificationSought = [
      {
        'id': '0',
        'display': 'L-1A manager or executive',
        'value': 'L1A_MANAGER'
      },
      {
        'id': '1',
        'display': 'L-1B specialized knowledge',
        'value': 'L1B_SPECIALIZED_KNOWLEDGE'
      },
    ];
    this.aptType = [
            {
                'id': '0',
                'display': 'Apt.',
                'value': 'APT'
            },
            {
                'id': '1',
                'display': 'Stc.',
                'value': 'STE'
            },
            {
                'id': '2',
                'display': 'Flr.',
                'value': 'FLR'
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
      this.page22.employerAddress = {};
      this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  22).subscribe(res => {
          console.log(res);
          if (res['formPage']) {
              this.page22 = res['formPage'];

              if (this.page22['fromDate1']) {
                  this.fromDate1 = this.page22['fromDate1'];
              }
              if (this.page22['fromDate2']) {
                  this.fromDate2 = this.page22['fromDate2'];
              }
              if (this.page22['fromDate3']) {
                  this.fromDate3 = this.page22['fromDate3'];
              }
              if (this.page22['fromDate4']) {
                  this.fromDate4 = this.page22['fromDate4'];
              }
              if (this.page22['fromDate5']) {
                  this.fromDate5 = this.page22['fromDate5'];
              }
              if (this.page22['fromDate6']) {
                  this.fromDate6 = this.page22['fromDate6'];
              }
              if (this.page22['fromDate7']) {
                  this.fromDate7 = this.page22['fromDate7'];
              }
              if (this.page22['toDate1']) {
                  this.toDate1 = this.page22['toDate1'];
              }
              if (this.page22['toDate2']) {
                  this.toDate2 = this.page22['toDate2'];
              }
              if (this.page22['toDate3']) {
                  this.toDate3 = this.page22['toDate3'];
              }
              if (this.page22['toDate4']) {
                  this.toDate4 = this.page22['toDate4'];
              }
              if (this.page22['toDate5']) {
                  this.toDate5 = this.page22['toDate5'];

              }
              if (this.page22['toDate6']) {
                  this.toDate6 = this.page22['toDate6'];

              }
              if (this.page22['toDate7']) {
                  this.toDate7 = this.page22['toDate7'];

              }
          }
      });
  }
  editQuestinnaireForm() {
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page22);
  }
  cancelQuestinnaireEdit() {
    this.page22 = this.beforecancelquestionnaire;
    this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
  }

  saveQuestionnaireInformation() {
      this.page22.pageNumber = 22;
      if (this.page22.fromDate1) {
          this.page22.fromDate1 = this.page22.fromDate1['formatted'];
      }
      if (this.page22.fromDate2) {
          this.page22.fromDate2 = this.page22.fromDate2['formatted'];
      }
      if (this.page22.fromDate3) {
          this.page22.fromDate3 = this.page22.fromDate3['formatted'];
      }
      if (this.page22.fromDate4) {
          this.page22.fromDate4 = this.page22.fromDate4['formatted'];
      }
      if (this.page22.fromDate5) {
          this.page22.fromDate5 = this.page22.fromDate5['formatted'];
      }
      if (this.page22.fromDate6) {
          this.page22.fromDate6 = this.page22.fromDate6['formatted'];
      }
      if (this.page22.fromDate7) {
          this.page22.fromDate7 = this.page22.fromDate7['formatted'];
      }
      if (this.page22.toDate1) {
          this.page22.toDate1 = this.page22.toDate1['formatted'];
      }
      if (this.page22.toDate2) {
          this.page22.toDate2 = this.page22.toDate2['formatted'];
      }
      if (this.page22.toDate3) {
          this.page22.toDate3 = this.page22.toDate3['formatted'];
      }
      if (this.page22.toDate4) {
          this.page22.toDate4 = this.page22.toDate4['formatted'];
      }
      if (this.page22.toDate5) {
          this.page22.toDate5 = this.page22.toDate5['formatted'];
      }
      if (this.page22.toDate6) {
          this.page22.toDate6 = this.page22.toDate6['formatted'];
      }
      if (this.page22.toDate7) {
          this.page22.toDate7 = this.page22.toDate7['formatted'];
      }
      this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  this.page22.pageNumber, this.page22).subscribe(res => {
          this.isQuestionnaireEdit = false;
      });
      }

  gotoNext() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit,'immigrationview/questionnaire/i129l/page/2');
      this.appService.currentSBLink = 'page2l1';
  }
}
