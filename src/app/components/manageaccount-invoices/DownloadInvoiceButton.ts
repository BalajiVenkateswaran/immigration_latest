import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `<button class="iportal-btn" (click)="onDownloadClick()">Download</button>`,

})
export class DownloadInvoiceButton implements ICellRendererAngularComp {
    public params: any;
    public static onButtonClick = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    onDownloadClick(){
        DownloadInvoiceButton.onButtonClick.next({'data':this.params.data,'flag':true});
    }


}