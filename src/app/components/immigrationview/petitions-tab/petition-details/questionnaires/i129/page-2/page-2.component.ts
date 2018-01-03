import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {IMyOptions} from 'mydatepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';
import {IHDateUtil} from '../../../../../../framework/utils/date.component';
import {DeepCloneUtil} from '../../../../../../framework/utils/deepclone.component';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html'
})
export class I129Page2Component implements OnInit {
    beforecancelquestionnaire: any;
    public page2: any = {};
    public basicClassification;
    public requestedAction;
    public isQuestionnaireEdit = false;
    public dateOfBirth: string;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    public gender;
    public saveButtonProgress = false;
    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService,
    private route: ActivatedRoute, private router: Router) {
         this.basicClassification = [
            {
                'id': '0',
                'display': 'New employment.',
                'value': 'NEW_EMPLOYMETNT'
            },
             {
                'id': '1',
                'display': 'Continuation of previously approved employment without change with the same employer.',
                'value': 'CONTINUATION_OF_PREV_APPROVED_EMPLOYMENT'
            },
             {
                'id': '2',
                'display': 'Change in previously approved employment.',
                'value': 'CHANGE_IN_PREV_APPROVED_EMPLOYMENT'
            },
             {
                'id': '3',
                'display': 'New concurrent employment.',
                'value': 'NEW_CONCURRENT_EMPLOYMENT'
            },
             {
                'id': '4',
                'display': 'Change of employer.',
                'value': 'CHANGE_OF_EMPLOYER'
            },
            {
                'id': '5',
                'display': 'Amended petition.',
                'value': 'AMENDED_PETITION'
            }
        ];
        this.requestedAction = [
            {
                'id': '0',
                'display': 'Notify the Office in Part 4. so each beneficiary can obtain a visa or be admitted.(NOTE: A petition is not required for E-1, E-2, E-3, H-1B1 Chile/Singapore, or TN visa beneficiaries.)',
                'value': 'NOTIFY_OFFICE'
            },
             {
                'id': '1',
                'display': 'Change the status and extend the stay of each beneficiary because the beneficiary(ies) is/are now in the United States in another status (see instructions for limitations). ' +
                'This is available only when you check "New Employment" in Item Number 2., above',
                'value': 'CHANGE_STATUS_BENEFICIARY'
            },
             {
                'id': '2',
                'display': 'Extend the stay of each beneficiary because the beneficiary(ies) now hold(s) this status.',
                'value': 'EXTEND_STAY_BENEFICIARY'
            },
             {
                'id': '3',
                'display': 'Amend the stay of each beneficiary because the beneficiary(ies) now hold(s) this status.',
                'value': 'AMEND_STAY_BENEFICIARY'
            },
             {
                'id': '4',
                'display': 'Extend the status of a nonimmigrant classification based on a free trade agreement. (See Trade Agreement Supplement to Form I-129 for TN and H-1B1.)',
                'value': 'EXTEND_STATUS_NONIMMIGRANT'
            },
            {
                'id': '5',
                'display': 'Change status to a nonimmigrant classification based on a free trade agreement. (See Trade Agreement Supplement to Form I-129 for TN and H-1B1.)',
                'value': 'CHANGE_STATUS_NONIMMIGRANT'
            }
        ];
        this.gender = [
            {
                'id': '0',
                'display': 'Male.',
                'value': 'M'
            },
            {
                'id': '1',
                'display': 'Female.',
                'value': 'F'
            },
        ];


    }

    ngOnInit() {
       this.route.params.subscribe(params => {
          this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 2).subscribe(res => {
            if (res['formPage'] !== undefined) {
               this.page2 = res['formPage'];
               this.dateOfBirth = this.page2['dateOfBirth'];
            }
          });
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
        this.saveButtonProgress = true;
       this.page2.pageNumber = 2;
       if (this.page2['dateOfBirth'] != null) {
         this.page2['dateOfBirth'] = this.page2['dateOfBirth']['formatted'];
       }

       this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'], 2, this.page2).subscribe(res => {
           this.isQuestionnaireEdit = false;
           this.saveButtonProgress = false;
       });
    }
    gotoNext() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/3');
    }
    gotoPrev() {
      this.questionnaireService.goToNextPage(this.isQuestionnaireEdit, 'immigrationview/questionnaire/i129/page/1/' + this.questionnaireService.selectedQuestionnaire['questionnaireId']);
    }
}
