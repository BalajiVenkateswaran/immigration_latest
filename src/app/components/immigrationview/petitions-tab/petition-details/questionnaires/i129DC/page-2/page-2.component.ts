import { Component, OnInit } from '@angular/core';
import {i129dcPage2Service} from "./page-2.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireCommonService } from '../../../questionnaires/common/questionnaire-common.service';
@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html',
    styleUrls: ['./page-2.component.scss']
})
export class i129dcPage2Component implements OnInit {
    beforecancelquestionnaire: any;
    isquestionnaireEdit: boolean;
    public questions;
    public aptType;
    public petitionType;
    public page2:any={
        "addressOfUSinstitution":{}
    }
     constructor(public questionnaireService: QuestionnaireCommonService) {
         this.questions = [
            {
                "id": "0",
                "display": "Yes",
                "value":"Y"
            },
            {
                "id": "20",
                "display": "No",
                "value": "N"
            },
        ];
         this.aptType = [
            {
                "id": "0",
                "display": "Apt.",
                "value":"APT"
            },
            {
                "id": "20",
                "display": "Stc.",
                "value": "STE"
            },
            {
                "id": "2",
                "display": "Flr.",
                "value": "FLR"
            }
            
        ];
        this.petitionType=[
            {
                "id":"0",
                "display": "CAP H-1B Bachelor's Degree",
                "value": "CAP_BACHELOR_DEGREE"

            },
             {
                "id":"20",
                "display": "CAP H-1B U.S. Master's Degree or Higher",
                "value": "CAP_MASTER_DEGREE"

            },
             {
                "id":"2",
                "display": "CAP H-1B1 Chile/Singapore",
                "value": "CAP_CHILE_SINGAPORE"

            },
             {
                "id":"3",
                "display": "CAP Exempt",
                "value": "CAP_EXEMPT"

            }
        ]
        
    }
    
    ngOnInit() {
        this.isquestionnaireEdit = true;
        this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c", 20).subscribe(res => {
            if (res['formPage'] != undefined) {

                this.page2 = res['formPage'];

                if (res['formPage']['addressOfUSinstitution'] != undefined) {
                    this.page2.addressOfUSinstitution = res['formPage']['addressOfUSinstitution'];
                }
            }
        })
 
    }
    editQuestinnaireForm() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforecancelquestionnaire = (<any>Object).assign({}, this.page2);
    }
    cancelQuestinnaireEdit() {
        this.page2 = this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation() {
        this.isquestionnaireEdit = true;
        this.page2.pageNumber = 20;
        this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c', 20, this.page2).subscribe(res => {

        })
    }

}
