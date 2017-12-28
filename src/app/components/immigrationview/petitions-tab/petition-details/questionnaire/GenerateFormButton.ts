import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    template: `<button class="btn iportal-btnIMclient" style="margin: -4px 0px 0px 0px !important;" [ngClass]="{'myclass':disableButton(),'btn iportal-btnIMclient':!disableButton()}"  [disabled]="disableButton()"  (click)="onGenerateFormClick()">Generate</button>`,
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
    onGenerateFormClick() {
        this.params.context.componentParent.onGenerateFormClick({ 'data': this.params.data});
    }
    disableButton() {
      return this.params.data.employerStatus !== 'Accepted';
    }

}
