import { AppService } from '../../../../services/app.service';
import { Component, OnDestroy} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import {HeaderService} from "../../../common/header/header.service";

@Component({
    template: `
    <div>
     <button class="iportal-btn" style="background: #27AE60;">Active</button>
     <button class="iportal-btn"style="color:#757575">Inactive</button>
    </div>
   `

})
export class StatusButton implements ICellRendererAngularComp {
    public params: any;
    public switchdisable: boolean;
    constructor(public appService: AppService, public headerService: HeaderService) {
    }
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
        return false;
    }
}