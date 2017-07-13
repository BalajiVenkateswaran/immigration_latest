import {Component, OnDestroy, EventEmitter, Output,Input} from '@angular/core';
import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'actions-columns',
    template: `<span><i class="fa fa-trash" aria-hidden="true" (click)="delRow()"></i></span>`,


})
export class ActionColumns implements ICellRendererAngularComp    {
    public params: any;
    public static sendDeleteData = new Subject<Object>();
    agInit(params: any): void {
        this.params = params;
    }
    
    constructor(){
       
    }
    delRow(){
        ActionColumns.sendDeleteData.next({'data':this.params.data,'value':'delClicked'});
    }
    
}