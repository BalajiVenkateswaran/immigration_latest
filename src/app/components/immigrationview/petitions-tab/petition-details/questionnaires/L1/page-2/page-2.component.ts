import { Component, OnInit } from '@angular/core';
import {IMyOptions} from "mydatepicker";
import { AppService } from "../../../../../../../services/app.service";
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss']
})
export class Page2Component implements OnInit {
  public companyRelated: any = [];
  public myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
    editableDateField: false
  };
  public page23: any = {};
  constructor(public questionnaireService: QuestionnaireCommonService, public appService: AppService) {
    this.companyRelated = [
      {
        "id": "0",
        "display": "Parent",
        "value": ""
      },
      {
        "id": "1",
        "display": "Branch",
        "value": ""
      },
       {
        "id": "2",
        "display": "Subsidiary",
        "value": ""
      },
       {
        "id": "3",
        "display": "Affiliate",
        "value": ""
      },
       {
        "id": "4",
        "display": "Joint Venture",
        "value": ""
      }
    ];
   }

  ngOnInit() {
  }
  savequestionnaireInformation() {
      this.page23.pageNumber = 23;
  }
  gotoNext() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page3l1');
      this.appService.currentSBLink = "page3l1";
  }
  gotoPrev(){
      this.savequestionnaireInformation();
      this.appService.moveToPage('page1l1');
      this.appService.currentSBLink = "page1l1";
  }

}
