import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
@Component({
  template: `
    <div>
     <button class="iportal-btn" (click)="downloadInvoice()"
      [disabled]="params.data.fileId == null"
      [ngClass]="{'saveorder':params.data.fileId != null,'myclass':params.data.fileId == null}">Download</button>
    </div>
   `
})
export class InvoiceDownloadButtonComponent implements ICellRendererAngularComp {
  public params: any;
  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
  downloadInvoice() {
    this.params.context.componentParent.onDownloadClick({'data': this.params.data});
  }
}
