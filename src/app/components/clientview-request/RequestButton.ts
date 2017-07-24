import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `<button class="iportal-btn" (click)="onRequestClick()">Request</button>`,

})
export class RequestButton implements ICellRendererAngularComp {
    public params: any;
    public static onRequestClicked = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    onRequestClick(){
        RequestButton.onRequestClicked.next({'data':this.params.data,'requested':true});
    }


}