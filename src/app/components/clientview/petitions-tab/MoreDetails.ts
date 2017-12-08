import {Component} from '@angular/core';
import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../../../services/app.service";
import { User } from "../../../models/user";
@Component({
    selector: 'actions-columns',
    template: `<a (click)="viewAllColumns()" class="more">More Details</a>`,
})
export class MoreDetailsComponent implements ICellRendererAngularComp    {
    public params: any;
    public static viewDetails = new Subject<Object>();
    private user: User;
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }
    constructor(public appService: AppService){

    }
    viewAllColumns(){
        MoreDetailsComponent.viewDetails.next({'data':this.params.data,'flag':true});
    }



}
