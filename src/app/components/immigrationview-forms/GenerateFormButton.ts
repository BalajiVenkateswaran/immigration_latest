import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({

    template: `<button class="iportal-btn" (click)="onGenerateFormClick()">Generate Form</button>`,


})
export class GenerateFormButton implements ICellRendererAngularComp {
    public params: any;
    public static onGenerateClick = new Subject<any[]>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    onGenerateFormClick(){
        GenerateFormButton.onGenerateClick.next(this.params.data);
    }


}