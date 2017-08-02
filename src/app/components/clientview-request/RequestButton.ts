import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ClientRequestService } from "./clientview-request.service";
import { AppService } from "../../services/app.service";
@Component({
    template: `
    <div *ngIf="buttonVisible==true">
     <button class="iportal-btn" (click)="onRequestClick()">Accept</button>
    <button class="iportal-btn" (click)="onDeclineClick()">Decline</button>
    </div>
    <div *ngIf="textVisisble==true">{{displayStatus}}</div>
   `,

})
export class RequestButton implements ICellRendererAngularComp {
    public params: any;
    public static onRequestClicked = new Subject<any>();
    public static onDeclineClicked = new Subject<any>();
    public buttonVisible:boolean=false;
    public textVisisble:boolean=false;
    public displayStatus;
    public updateStatus: any = {};
    agInit(params: any): void {
        this.params = params;
        this.checkedIniviteStatus(this.params.data.status);
    }
    checkedIniviteStatus(status){
        this.displayStatus=status;
        if(status=="Accept" || status=="Decline"){
            this.textVisisble=true;
              
        }
        else{
            this.textVisisble=false;
         
        }
        if(status=="" || status==null){
            this.buttonVisible=true;
        }else{
            this.buttonVisible=false;
        }
    }
    constructor(private clientviewrequestservice: ClientRequestService,public appService: AppService) {
    }
    onRequestClick(){
         this.updateStatus['clientInviteId'] = this.params.data.clientInviteId;
         this.updateStatus['status'] = "Accept";
            this.clientviewrequestservice.updateClientInviteStatus(this.updateStatus).subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                  this.clientviewrequestservice.getClientInvites(this.appService.user.userId).subscribe(res=>{
                      if(res['statusCode']=="SUCCESS"){
                           let invite=res['clientInvite'].filter(item=>{
                               if(item['clientInviteId']==this.params.data.clientInviteId){
                                   return item;
                               }
                           })
                           invite.map(item=>{
                               this.checkedIniviteStatus(item.status)
                           })
                      }
                  })    
                }
            });
    }
    onDeclineClick(){
         this.updateStatus['clientInviteId'] = this.params.data.clientInviteId;
         this.updateStatus['status'] = "Decline";
            this.clientviewrequestservice.updateClientInviteStatus(this.updateStatus).subscribe((res) => {
                if (res['statusCode'] == "SUCCESS") {
                   this.clientviewrequestservice.getClientInvites(this.appService.user.userId).subscribe(res=>{
                      if(res['statusCode']=="SUCCESS"){
                           let invite=res['clientInvite'].filter(item=>{
                               if(item['clientInviteId']==this.params.data.clientInviteId){
                                   return item;
                               }
                           })
                           invite.map(item=>{
                               this.checkedIniviteStatus(item.status)
                           })
                      }
                  })   ;
                    
                }
            });
    }

}