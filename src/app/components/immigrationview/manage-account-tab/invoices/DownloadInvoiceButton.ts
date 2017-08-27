import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `<button class="iportal-btn" (click)="download()">Download</button>`,

})
export class DownloadInvoiceButton implements ICellRendererAngularComp {
    public params: any;
    public static onButtonClick = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    constructor() {

    }
    download(){
          this.params.context.componentParent.onDownloadClick({ 'data': this.params.data})
    }


}
