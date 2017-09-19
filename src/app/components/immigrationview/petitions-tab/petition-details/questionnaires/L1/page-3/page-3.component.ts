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
        this.questionnaireService.getQuestionnaireData("402859815e23b336015e23b5e9680005", 24).subscribe(res => {
            console.log(res);
            if (res['formPage']) {
                this.page24 = res['formPage'];
            }
        });
  }
  savequestionnaireInformation() {
      this.page24.pageNumber = 24;
      this.questionnaireService.saveQuestionnaireData("402859815e23b336015e23b5e9680005", this.page24.pageNumber, this.page24).subscribe(res => {
          console.log(res);
      });
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
