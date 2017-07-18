import {Component, OnDestroy, EventEmitter, Output,Input} from '@angular/core';
import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'actions-columns',
    template: `<span><input [disabled]="!enableOrDisableCheckBox()"  type="checkbox"/></span>`,


})
export class SendToClientQuestionnaire implements ICellRendererAngularComp    {
    public params: any;
    public static sendToClient = new Subject<Object>();
    agInit(params: any): void {
        this.params = params;
    }
    
    constructor(){
       
    }
    enableOrDisableCheckBox(){
        SendToClientQuestionnaire.sendToClient.next(this.params);
    }
   
    
    
}