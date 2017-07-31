import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({

    template: `<button class="iportal-btn" [(disabled)]=generateDisable  (click)="onGenerateFormClick()">Generate Form</button>`,
    styleUrls: ['./forms.component.scss']

})
export class GenerateFormButton implements ICellRendererAngularComp {
    public params: any;
    public static onGenerateClick = new Subject<any>();
    public generateDisable:boolean=false;
    agInit(params: any): void {
        this.params = params;
        if(this.params.data.fileId){
            this.generateDisable=true;
        }
        else{
            this.generateDisable=false;
        }
    }

    constructor() {

    }
    onGenerateFormClick(){
        GenerateFormButton.onGenerateClick.next({'data':this.params.data,'generateFlag':true});
    }


}