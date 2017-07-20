import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({

    template: `<button class="iportal-btn" (click)="onDonwloadClicked()">Download Form</button>`,


})
export class DownloadButton implements ICellRendererAngularComp {
    public params: any;
    public static onDownloadClick = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    onDonwloadClicked(){
        DownloadButton.onDownloadClick.next({'data':this.params.data,'downloadFlag':true});
    }


}