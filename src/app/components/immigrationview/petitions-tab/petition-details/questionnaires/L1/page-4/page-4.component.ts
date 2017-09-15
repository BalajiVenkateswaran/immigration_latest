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
  }
  savequestionnaireInformation() {
      this.page25.pageNumber = 25;
  }

  gotoPrev() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page3l1');
      this.appService.currentSBLink = "page3l1";

  }
}
