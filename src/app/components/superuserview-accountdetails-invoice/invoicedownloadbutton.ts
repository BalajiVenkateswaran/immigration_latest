import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import {AccountInvoiceService} from './invoice.service';
import { AppService } from "../../services/app.service";
@Component({
    template: `
    <div *ngIf="buttonVisible==true">
     <button class="iportal-btn" (click)="downloadInvoice()">Download</button>
    </div>
   
   `,

})
export class InvoicedownloadButton implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }
    constructor(private accountInvoiceService: AccountInvoiceService, public appService: AppService) {
    }
    downloadInvoice() {
        this.accountInvoiceService.downloadInvoice(this.params.invoiceId)
            .subscribe((res) => {

            });
    }
}