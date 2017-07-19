import {Component, OnDestroy, EventEmitter, Output,Input} from '@angular/core';
import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { QuestionnaireService } from "./questionnaire.service";
import { AppService } from "../../services/app.service";
import { User } from "../../models/user";
@Component({
    selector: 'actions-columns',
    template: `<input type="checkbox" [disabled]="!enableOrDisableCheckBox()"  (change)="questionnaireChecked()" />`,
})
export class SendToClientQuestionnaire implements ICellRendererAngularComp    {
    public params: any;
    public static onItemChecked = new Subject<Object>();
    sendQuestionnaire: boolean = true;
    private user: User;
    private formsList = [];
    private sentQuestionnaireClient = [];
    questionnaireList = [];
    checkboxDisable;
    agInit(params: any): void {
        this.params = params;
    }
    
    constructor(private questionnaireService: QuestionnaireService,public appService: AppService){
    }
    questionnaireChecked(){
        SendToClientQuestionnaire.onItemChecked.next({'data':this.params.data,'flag':true});
    }
    enableOrDisableCheckBox(){
      var formNameBasedCheck;
      if(this.params.data!=undefined){
        if(this.params.data.formName=="I-129 H"){
        formNameBasedCheck = true;
      } else if(this.params.data.formName== "I-129 DC"){
        formNameBasedCheck = false;
      }
      else{
        formNameBasedCheck = true;
      }
      
    }
    return formNameBasedCheck;
      
    }
}