import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `<button class="btn iportal-btnIMclient" style="margin: -4px 0px 0px 0px !important;"  [ngClass]="{'myclass':disableButton(),'btn iportal-btnIMclient':!disableButton()}"  [disabled]="disableButton()"
                       (click)="download()">Download Form</button>`,

})
export class DownloadInvoiceButtonComponent implements ICellRendererAngularComp {
    public params: any;
    public static onButtonClick = new Subject<any>();
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    download() {
          this.params.context.componentParent.onDownloadClick({ 'data': this.params.data})
    }
  disableButton() {
    if (this.params.data.fileId) {
      return false;
    } else {
      return true;
    }
  }

}
