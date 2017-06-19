import {Component, OnDestroy, EventEmitter, Output} from '@angular/core';
import {ImmigrationViewI797HistoryService} from "./i-797-history.service";
import {IHeaderAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
@Component({
    selector: 'params-cell',
    template: `<span>{{params.displayName}}</span>
    <div>
        <input type="text" style="width:83px" [(ngModel)]="filterText" (keyup)="addFilters(filterText)">
    </div>
    <div class="clsadd" *ngIf="clsaddFilter" style="width: 40px;position: absolute;z-index: 10;top: 20px;left: 44px;">
        <span class="close" (click)="delete(filterText)">&times;</span>
        <span class="close" (click)="add(filterText)">+</span>
    </div>`,
    providers: [ImmigrationViewI797HistoryService]
})
export class CustomFilterRow implements IHeaderAngularComp  {
    public params: any;
    public clsaddFilter: boolean = false;
    public filterArray = [];
    public filterText;
    public static fillValues = new Subject<any[]>();
    public count = 0;
    public deletedFilter: boolean = false;
    public static sendBoolean = new Subject<boolean>();
    agInit(params: any): void {
        this.params = params;
        this.count+=1;
    }
    public addFilters(text) {
        if (text.length != 0) {
            this.clsaddFilter = true;
        }
        else {
            this.clsaddFilter = false;
        }
    }
    public add(text) {
        this.filterArray.push({ 'headingName': this.params.displayName, 'filterValue': text });
        CustomFilterRow.fillValues.next(this.filterArray);
        this.clsaddFilter = false;
        this.filterText = '';
    }
    public delete(text) {
        this.deletedFilter = true;
       
        if (text) {
            this.filterText = '';
            this.clsaddFilter = false;
            CustomFilterRow.sendBoolean.next(this.deletedFilter);
        }
    }

}