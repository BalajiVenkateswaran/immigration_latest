import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
@Component({

    template: `<button class="iportal-btn"  [ngClass]="{'myclass':disableButton(),'iportal-btn':!disableButton()}"  [disabled]="disableButton()"
 (click)="onDonwloadClicked()">Download Form</button>`,


})
export class DownloadButton implements ICellRendererAngularComp {
    public params: any;
    public downloadDisable:boolean=true;
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }
    disableButton(){
        if(this.params.data.fileId){
            this.downloadDisable = false;
        }
        else{
            this.downloadDisable = true;
        }
        return this.downloadDisable;
    }
    constructor() {

    }
    onDonwloadClicked(){
        this.params.context.componentParent.onGenerateFormDownloadClick({ 'data': this.params.data});
    }


}
