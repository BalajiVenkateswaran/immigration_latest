import { Component, OnInit } from '@angular/core';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { AppService } from "../../../../../../../services/app.service";
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html',
  styleUrls: ['./page-1.component.scss']
})
export class Page1Component implements OnInit {
  public questions: any = [];
  public isPetition:any =[];
  public states: any[] = [];
  public classificationSought:any =[];
  public aptType;
  public I129Hpage1: any = {};
  public fromDate1:string;
  public fromDate2:string;
  public fromDate3:string;
  public fromDate4:string;
  public fromDate5:string;
  public fromDate6:string;
  public toDate1:string;
  public toDate2:string;
  public toDate3:string;
  public toDate4:string;
  public toDate5:string;
  public toDate6: string;
  public page22: any = {};
  public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
        editableDateField: false
    };
  constructor(public questionnaireService: QuestionnaireCommonService,public appService: AppService) {
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
    this.isPetition = [
      {
        "id": "0",
        "display": "An individual petition",
        "value": ""
      },
      {
        "id": "1",
        "display": "A blanket petition",
        "value": ""
      },
    ];
    this.classificationSought = [
      {
        "id": "0",
        "display": "L-1A manager or executive",
        "value": ""
      },
      {
        "id": "1",
        "display": "L-1B specialized knowledge",
        "value": ""
      },
    ];
    this.aptType = [
            {
                "id": "0",
                "display": "Apt.",
                "value": "APT"
            },
            {
                "id": "1",
                "display": "Stc.",
                "value": "STE"
            },
            {
                "id": "2",
                "display": "Flr.",
                "value": "FLR"
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
  }
  savequestionnaireInformation() {
      this.page22.pageNumber = 22;
      }
      gotoNext() {
      this.savequestionnaireInformation();
      this.appService.moveToPage('page2l1');
      this.appService.currentSBLink = "page2l1";
  }
}
