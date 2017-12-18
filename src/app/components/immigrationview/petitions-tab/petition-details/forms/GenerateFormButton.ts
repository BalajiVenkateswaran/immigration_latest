import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
@Component({

    template: `<button class="btn iportal-btnIMclient"   (click)="onGenerateFormClick()">Generate Form</button>`,
    styleUrls: ['./forms.component.scss']

})
export class GenerateFormButton implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    constructor() {

    }
    onGenerateFormClick(){
        this.params.context.componentParent.onGenerateFormClick({ 'data': this.params.data});
    }


}
