import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {IMyOptions} from 'mydatepicker';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';


@Component({
    selector: 'ih-i129-page-3',
    templateUrl: './page-3.component.html',
     styleUrls: ['./page-3.component.scss'],
})
export class I129Page3Component implements OnInit {
    beforecancelquestionnaire: any;
    isQuestionnaireEdit = false;
    public aptType;
    public questions;
    public typeOfOffice;
    public dateOfLastArrival: string;
    public passportIssueDate: string;
    public passportExpiryDate: string;
    public dateStatusExpires: string;
    public states: any[] = [];
    public saveButtonProgress = false;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    public page3: any = {
        'address': {},
        'foreignAddress': {}
    };
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
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
            }
        ];
        this.typeOfOffice = [
            {
                'id': '0',
                'display': 'Consulate',
                'value': 'CONSULATE'
            },
            {
                'id': '1',
                'display': 'Pre-flight inspection',
                'value': 'PRE_FLIGHT_INSPECTION'
            },
            {
                'id': '2',
                'display': 'Port of entry',
                'value': 'PORT_OF_ENTRY'
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
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 3).subscribe(res => {
            if (res['formPage'] !== undefined) {
                this.page3 = res['formPage'];
                if (res['formPage']['address'] !== undefined) {
                    this.page3.address = res['formPage']['address'];
                }
                if (res['formPage']['foreignAddress'] !== undefined) {
                    this.page3.foreignAddress = res['formPage']['foreignAddress'];
                }
              this.dateOfLastArrival = this.page3['dateOfLastArrival'];
              this.passportIssueDate = this.page3['passportIssueDate'];
              this.passportExpiryDate = this.page3['passportExpiryDate'];
              this.dateStatusExpires = this.page3['dateStatusExpires'];
            }
        });
    }
    editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page3);
    }
    cancelQuestinnaireEdit() {
        this.page3 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }

    mapDatesToSave() {
      if (this.page3['dateOfLastArrival'] != null && this.page3['dateOfLastArrival']['formatted'] != null) {
        this.page3['dateOfLastArrival'] = this.page3['dateOfLastArrival']['formatted'];
      }
      if (this.page3['passportIssueDate'] != null && this.page3['passportIssueDate']['formatted'] != null) {
        this.page3['passportIssueDate'] = this.page3['passportIssueDate']['formatted'];
      }
      if (this.page3['passportExpiryDate'] != null && this.page3['passportExpiryDate']['formatted'] != null) {
        this.page3['passportExpiryDate'] = this.page3['passportExpiryDate']['formatted'];
      }
      if (this.page3['dateStatusExpires'] != null && this.page3['dateStatusExpires']['formatted'] != null) {
        this.page3['dateStatusExpires'] = this.page3['dateStatusExpires']['formatted'];
      }
    }

    saveQuestionnaireInformation() {
        this.saveButtonProgress = true;
        this.page3.pageNumber = 3;
        this.mapDatesToSave();
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 3, this.page3).subscribe(res => {
            this.isQuestionnaireEdit = false;
            this.saveButtonProgress = false;
        });
    }

    submitClientQuestionnaireInformation(): any {
      this.page3.pageNumber = 3;
      this.mapDatesToSave();
      this.questionnaireService.submitQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 3,
        this.page3, true).subscribe(res => {
          this.appService.moveToPage('clientview/questionnaries');
      });
    }

    gotoNext() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/4');
    }
    gotoPrev() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/2');
    }
    submit() {
      this.submitClientQuestionnaireInformation();
    }
}
