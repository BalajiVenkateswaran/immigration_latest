import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
    <div *ngIf="buttonVisible">
     <button class="iportal-btn" (click)="onRequestClick()">Accept</button>
    <button class="iportal-btn" (click)="onDeclineClick()">Decline</button>
    </div>
    <div *ngIf="textVisisble">{{this.params.data.status}}</div>
   `,

})
export class RequestButton implements ICellRendererAngularComp {
    public params: any;
    public static onRequestClicked = new Subject<any>();
    public static onDeclineClicked = new Subject<any>();
    public buttonVisible:boolean=false;
    public textVisisble:boolean=false;
    agInit(params: any): void {
        this.params = params;
        if(this.params.data.status=="Accept" || this.params.data.status=="Decline"){
            this.textVisisble=true;
        }
        else{
            this.textVisisble=false;
         
        }
        if(this.params.data.status=="" || this.params.data.status==null){
            this.buttonVisible=true;
        }else{
            this.buttonVisible=false;
        }
    }

    constructor() {
    }
    onRequestClick(){
        RequestButton.onRequestClicked.next({'data':this.params.data,'requested':true});
    }
    onDeclineClick(){
        RequestButton.onDeclineClicked.next({'data':this.params.data});
    }

}