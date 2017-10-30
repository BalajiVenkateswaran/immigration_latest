import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';

@Component({
    template: `
    <div>
     <button class="iportal-btn" *ngIf="params.data.status==='Active'" style="background: #27AE60;">Active</button>
     <button class="iportal-btn" *ngIf="params.data.status==='Inactive'" style="color:#757575">Inactive</button>
    </div>
   `
})
export class StatusButton implements ICellRendererAngularComp {
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
