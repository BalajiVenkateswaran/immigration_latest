import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';

@Component({
    template: `
    <div>
     <span *ngIf="params.data.status==='Active'" style="background: #27AE60;border-radius: 4px;padding: 2px 3px 3px 5px; cursor: none;">Active</span>
     <span  *ngIf="params.data.status==='Inactive'">Inactive</span>
    </div>
   `
})
export class StatusButtonComponent implements ICellRendererAngularComp {
    public params: any;
    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
        return false;
    }
}
