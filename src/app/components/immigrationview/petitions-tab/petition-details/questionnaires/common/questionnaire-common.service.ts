import {Injectable} from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import {AppService} from '../../../../../../services/app.service'
import {Router} from '@angular/router';
import {HeaderService} from '../../../../../common/header/header.service';
import {ConfirmationDialogComponent} from '../../../../../framework/popup/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class QuestionnaireCommonService {

  private _questionnaireList: any[];
  private _selectedQuestionnaire: any;

  set questionnaireList(questionnaireList: any[]) {
    this._questionnaireList = questionnaireList;
  }
  get questionnaireList() {
    return this._questionnaireList;
  }
  set selectedQuestionnaire(selectedQuestionnaire: any) {
    this._selectedQuestionnaire = selectedQuestionnaire;
  }
  get selectedQuestionnaire() {
      return this._selectedQuestionnaire;
  }

  constructor(private restService: RestService, private appService: AppService, private _router: Router, private headerService: HeaderService, private dialog: MatDialog) {
  }

  public moveToQuestionnaire(questionnaire: any) {
      this.selectedQuestionnaire = questionnaire;
      let pageName = '';
      if (this.selectedQuestionnaire['formName'] === 'I-129') {
          if (this.appService.applicationViewMode === 'Immigration') {
              pageName = 'immigrationview/questionnaire/i129/page/1';
          } else {
              pageName = 'clientview-i129Page2';
          }
      } else if (this.selectedQuestionnaire['formName'] === 'I-129 DC') {
          if (this.appService.applicationViewMode === 'Immigration') {
              pageName = 'immigrationview/questionnaire/i129dc/page/1';
          }
      } else if (this.selectedQuestionnaire['formName'] === 'I-129 H') {
          if (this.appService.applicationViewMode === 'Immigration') {
              pageName = 'immigrationview/questionnaire/i129h/page/1';
          } else {
              pageName = 'clientview-i129hPage1';
          }
      } else {
          if (this.appService.applicationViewMode === 'Immigration') {
              pageName = 'immigrationview/questionnaire/i129l/page/1';
          }
      }

      this._router.navigate([pageName, this.selectedQuestionnaire['questionnaireId']], { skipLocationChange: true });
  }

  public goToNextPage(isQuestionnaireEdit: boolean, moveToPage: string){
    if (isQuestionnaireEdit) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {message: 'There are unsaved changes. Are you sure you want to leave the current page?'}
      }).afterClosed()
        .subscribe( confirm => {
          if (confirm) {
            this.appService.moveToPage(moveToPage);
          }
        });
    } else {
      this.appService.moveToPage(moveToPage);
    }
  }


  public getQuestionnaireData(questionnaireId, pageNo) {
      return this.restService.getData('/immigration/questionnaire/' + questionnaireId + '/page/' + pageNo);
  }

  public saveQuestionnaireData(questionnaireId: string, pageNo: number, data: any) {
     return this.restService.postData('/immigration/questionnaire/' + questionnaireId + '/updatedBy/' + this.headerService.user.userId + '/page/' + pageNo, data);
  }

  public submitQuestionnaireData(questionnaireId: string, pageNo: number, data: any, isSubmit: boolean) {
    return this.restService.postData('/client/questionnaire/' + questionnaireId + '/updatedBy/' + this.headerService.user.userId + '/page/' + pageNo + '/submit/' + isSubmit, data);
  }
}
