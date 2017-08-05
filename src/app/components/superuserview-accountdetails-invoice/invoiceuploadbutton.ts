import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { AccountInvoiceService } from './invoice.service';
import { AppService } from "../../services/app.service";
@Component({
    template: `
   <div class="fileUpload btn btn-primary">
                    <span>Upload</span>
                    <input type="file" class="upload" name="file" (change)="fileUpload($event)" />
                </div>

   `,

})
export class InvoiceUploadButton implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }
    constructor(private accountInvoiceService: AccountInvoiceService, public appService: AppService) {
    }
    fileUpload(event) {
        this.params.context.componentParent.onUploadClick({ 'event':event,'data': this.params.data });
    }
}
