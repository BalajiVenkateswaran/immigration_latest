import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from "../../../../services/app.service";
import {ManageAccountChecklistService} from './checklist.service';

@Component({
    template: `
    <div>
     <button class="iportal-btn" (click)="downloadClick()">Download</button>
    </div>
   `,

})
export class checklistdownloadButton implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public appService: AppService) {
    }

    downloadClick(){

    }

}
