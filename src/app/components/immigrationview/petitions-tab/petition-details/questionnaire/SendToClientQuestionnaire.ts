import {Component, OnDestroy, EventEmitter, Output, Input} from '@angular/core';

import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
@Component({
    template: `<input type="checkbox" [disabled]="!enableOrDisableCheckBox()" [(ngModel)]="checked"  (change)="questionnaireChecked()" />`
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
    constructor() {
    }
    questionnaireChecked() {
        this.params.data.itemChecked = this.checked;
        this.params.context.componentParent.onQuestionnaireChecked({ 'data': this.params.data, 'check': this.checked});
    }
    enableOrDisableCheckBox() {
      if (this.params.data && (this.params.data.formName === 'I-129 DC' || this.params.data.formName === 'I-129 L')) {
        return false;
      } else {
        return true;
      }
    }
}
