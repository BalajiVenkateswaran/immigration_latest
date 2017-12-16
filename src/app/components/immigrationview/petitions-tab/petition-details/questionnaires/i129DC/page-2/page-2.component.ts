import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129dc-page-2',
    templateUrl: './page-2.component.html'
})
export class I129dcPage2Component implements OnInit {
    public questions;
    public aptType;
    public petitionType;
    public states;
    public isQuestionnaireEdit = false;
    beforecancelquestionnaire: any;
    public page2: any= {
        'addressOfUSinstitution': {}
    }
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
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
        this.petitionType = [
            {
                'id': '0',
                'display': 'CAP H-1B Bachelor\'s Degree',
                'value': 'CAP_BACHELOR_DEGREE'
            },
             {
                'id': '1',
                'display': 'CAP H-1B U.S. Master\'s Degree or Higher',
                'value': 'CAP_MASTER_DEGREE'
             },
             {
                'id': '2',
                'display': 'CAP H-1B1 Chile/Singapore',
                'value': 'CAP_CHILE_SINGAPORE'
             },
             {
                'id': '3',
                'display': 'CAP Exempt',
                'value': 'CAP_EXEMPT'
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
        this.page2 = {
                         'addressOfUSinstitution': {}
                     };
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 20).subscribe(res => {
            if (res['formPage'] !== undefined) {

                this.page2 = res['formPage'];

                if (res['formPage']['addressOfUSinstitution'] !== undefined) {
                    this.page2.addressOfUSinstitution = res['formPage']['addressOfUSinstitution'];
                }

            }
        });
    }

    editQuestinnaireForm() {
      this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
      this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page2);
    }
    cancelQuestinnaireEdit() {
      this.page2 = this.beforecancelquestionnaire;
      this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }

  saveQuestionnaireInformation() {
        this.page2.pageNumber = 20;
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 20, this.page2).subscribe(res => {
          this.isQuestionnaireEdit = false;
        });
    }

    gotoNext() {
        this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129dc/page/3');
    }
    gotoPrev() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit,  'immigrationview/questionnaire/i129dc/page/1/' + this.questionnaireService.selectedQuestionnaire['questionnaireId']);
    }
}
