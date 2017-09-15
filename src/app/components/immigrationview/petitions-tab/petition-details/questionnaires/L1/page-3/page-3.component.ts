import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../../../../../services/app.service";
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
  selector: 'app-page-3',
  templateUrl: './page-3.component.html',
  styleUrls: ['./page-3.component.scss']
})
export class Page3Component implements OnInit {
    public questions: any = [];
    public page24: any = {};

    constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
      this.questions = [
      {
        "id": "0",
        "display": "Yes",
        "value": "Y"
      },
      {
        "id": "1",
        "display": "No",
        "value": "N"
      },
    ];
   }

  ngOnInit() {
  }
  savequestionnaireInformation() {
      this.page24.pageNumber = 24;
  }
  gotoNext() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page4l1');
      this.appService.currentSBLink = "page4l1";

  }
  gotoPrev() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page2l1');
      this.appService.currentSBLink = "page2l1";

  }
}
