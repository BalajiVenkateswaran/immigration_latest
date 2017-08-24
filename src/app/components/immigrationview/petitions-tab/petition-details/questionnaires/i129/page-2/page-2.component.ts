import { Component, OnInit } from '@angular/core';
import {i129Page2Service} from "./page-2.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {QuestionnaireCommonService} from '../../../questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html',
    styleUrls: ['./page-2.component.scss']
})
export class i129Page2Component implements OnInit {
    beforecancelquestionnaire: any;
    public page2: any = {};
    public basicClassification;
    public requestedAction;
    public isquestionnaireEdit: boolean = false;
    public gender;
     constructor(public questionnaireService:QuestionnaireCommonService) {
         this.basicClassification =[
            {
                "id":"0",
                "display": "New employment.",
                "value": "NEW_EMPLOYMETNT"

            },
             {
                "id":"1",
                "display": "Continuation of previously approved employment without change with the same employer.",
                "value": "CONTINUATION_OF_PREV_APPROVED_EMPLOYMENT"

            },
             {
                "id":"2",
                "display": "Change in previously approved employment.",
                "value": "CHANGE_IN_PREV_APPROVED_EMPLOYMENT"

            },
             {
                "id":"3",
                "display": "New concurrent employment.",
                "value": "NEW_CONCURRENT_EMPLOYMENT"

            },
             {
                "id":"4",
                "display": "Change of employer.",
                "value": "CHANGE_OF_EMPLOYER"

            },
            {
                "id":"5",
                "display": "Amended petition.",
                "value": "AMENDED_PETITION"
            }
        ];
        this.requestedAction =[
            {
                "id":"0",
                "display": "New employment.",
                "value": "NOTIFY_OFFICE"

            },
             {
                "id":"1",
                "display": "Continuation of previously approved employment without change with the same employer.",
                "value": "CHANGE_STATUS_BENEFICIARY"

            },
             {
                "id":"2",
                "display": "Change in previously approved employment.",
                "value": "EXTEND_STAY_BENEFICIARY"

            },
             {
                "id":"3",
                "display": "New concurrent employment.",
                "value": "AMEND_STAY_BENEFICIARY"

            },
             {
                "id":"4",
                "display": "Change of employer.",
                "value": "EXTEND_STATUS_NONIMMIGRANT"

            },
            {
                "id":"5",
                "display": "Amended petition.",
                "value": "CHANGE_STATUS_NONIMMIGRANT"
            }
        ];
        this.gender = [
            {
                "id": "0",
                "display": "Male.",
                "value":"M"
            },
            {
                "id": "1",
                "display": "Female.",
                "value": "F"
            },
        ];
        
    
    }
     
    ngOnInit() {
         this.isquestionnaireEdit=true;
          this.questionnaireService.getQuestionnaireData("2c9fc60d5e0cef3a015e0f194da1006c",2).subscribe(res=>{
            if(res['formPage']!=undefined){
                  this.page2=res['formPage'];
            }
          
          
        })
    }
    editQuestinnaireForm(){
          this.isquestionnaireEdit = !this.isquestionnaireEdit;
          this.beforecancelquestionnaire = (<any>Object).assign({}, this.page2);
    }
    cancelQuestinnaireEdit(){
        this.page2=this.beforecancelquestionnaire;
        this.isquestionnaireEdit = true;
    }
    savequestionnaireInformation(){
         this.isquestionnaireEdit = true;
         this.page2.pageNumber=2;
         this.questionnaireService.saveQuestionnaireData('2c9fc60d5e0cef3a015e0f194da1006c',2,this.page2).subscribe(res=>{

         })
    }
    


}
