import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { profileswitchservice } from "./profileswitch.service";
import { AppService } from "../../services/app.service";
@Component({
    template: `
    <div>
     <button class="iportal-btn" (click)="onSwitchClick()">Switch</button>
    </div>
   `,

})
export class switchButton implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }
    constructor(private profileSwitchservice: profileswitchservice, public appService: AppService) {
    }
    onSwitchClick() {
        
    }
}