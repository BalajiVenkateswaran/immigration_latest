import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../../../../../services/app.service";
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
  selector: 'app-page-4',
  templateUrl: './page-4.component.html',
  styleUrls: ['./page-4.component.scss']
})
export class Page4Component implements OnInit {
    public page25: any = {};

    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) { }

    ngOnInit() {
        this.questionnaireService.getQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  25).subscribe(res => {
            console.log(res);
            if (res['formPage']) {
                this.page25 = res['formPage'];
            }
        });
  }
  savequestionnaireInformation() {
      this.page25.pageNumber = 25;
      this.questionnaireService.saveQuestionnaireData(this.questionnaireService.selectedQuestionnaire['questionnaireId'],  this.page25.pageNumber, this.page25).subscribe(res => {
          console.log(res);
      });
  }

  gotoPrev() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page3l1');
      this.appService.currentSBLink = "page3l1";

  }
    gotoNext() {
        this.savequestionnaireInformation();
    }
}
