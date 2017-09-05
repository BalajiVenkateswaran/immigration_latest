import {Component, OnDestroy, EventEmitter, Output,Input} from '@angular/core';

import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
@Component({
    selector: 'actions-columns',
    template: `<input type="checkbox" [disabled]="!enableOrDisableCheckBox()" [(ngModel)]="checked"  (change)="questionnaireChecked()" />`,
})
export class SendToClientQuestionnaire implements ICellRendererAngularComp    {
    public params: any;
    public checked;
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }
    constructor(){
    }
    questionnaireChecked(){
        this.params.data.itemChecked=this.checked;
        this.params.context.componentParent.onQuestionnaireChecked({ 'data': this.params.data,"check":this.checked});
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
