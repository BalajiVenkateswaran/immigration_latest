import {Component, OnDestroy, EventEmitter, Output} from '@angular/core';
import {IHeaderAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import {FilterEntry} from "./types/query-parameters";
@Component({
    selector: 'params-cell',
    template: `<span style="word-wrap:break-word">{{params.displayName}}</span>
    <div>
        <input type="text" class="form-control customfilterinput" [(ngModel)]="filterText" (keyup)="addFilters(filterText)">
    </div>
    <div class="addremovefilter" *ngIf="clsaddFilter">
     
        <span class="plus" (click)="add(filterText)">&#10004;</span>
    </div>`
})
export class CustomFilterRow implements IHeaderAngularComp  {
    public params: any;
    public clsaddFilter: boolean = false;
    public filterArray = new Array<FilterEntry>();
    public filterText;
    public static fillValues = new Subject<Array<FilterEntry>>();
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

        this.filterArray.push(new FilterEntry(this.params.displayName, this.params.column.colId, null, text));

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
