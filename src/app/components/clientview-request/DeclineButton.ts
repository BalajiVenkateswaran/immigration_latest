import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `<button class="iportal-btn" (click)="onDeclineClick()">Decline</button>`,

})
export class DeclineButton implements ICellRendererAngularComp {
    public params: any;
    public static onDeclineClicked = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    onDeclineClick(){
        DeclineButton.onDeclineClicked.next({'data':this.params.data});
    }


}