import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../../../framework/popup/information/information.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'ih-i129-page-1',
    templateUrl: './page-1.component.html'
})
export class I129Page1Component implements OnInit {
    beforecancelquestionnaire: any;
    public isQuestionnaireEdit = false;
    public page1: any = {
        'address': {},
        'contact': {}
    };
    public aptType;
    public states: any[] = [];
    public saveButtonProgress = false;
    constructor(public questionnaireService: QuestionnaireCommonService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
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
        this.page1 = {
                'address': {},
                'contact': {}
            };
        this.route.params.subscribe(params => {
            this.page1 = {
                           'address': {
                             'country' : 'USA'
                           },
                           'contact': {}
                         };
            this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 1).subscribe(res => {
                if (res['formPage'] !== undefined) {
                    this.page1 = res['formPage'];
                    if (res['formPage']['address'] !== undefined) {
                        this.page1.address = res['formPage']['address'];
                        this.page1.address.country = 'USA';
                    }
                    if (res['formPage']['contact'] !== undefined) {
                        this.page1.contact = res['formPage']['contact'];
                    }
                }
            });
        });
    }

    editQuestinnaireForm() {
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
        this.beforecancelquestionnaire = DeepCloneUtil.deepClone(this.page1);
    }
    cancelQuestinnaireEdit() {
        this.page1 = this.beforecancelquestionnaire;
        this.isQuestionnaireEdit = !this.isQuestionnaireEdit;
    }
    saveQuestionnaireInformation(): boolean {
        this.saveButtonProgress = true;
        this.page1.pageNumber = 1;

        if (this.page1.address && (this.page1.address['state'] || this.page1.address['zipCode'] )) {
          if (!this.page1.address['country']) {
            this.dialog.open(InformationDialogComponent, {
              data: {message: 'Please enter a country name'}
            });
            return false;
          }
        }
        this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 1, this.page1).subscribe(res => {
            this.saveButtonProgress = false;
            this.isQuestionnaireEdit = false;
        });
        return true;
    }
    gotoNext() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/2');
    }
}
