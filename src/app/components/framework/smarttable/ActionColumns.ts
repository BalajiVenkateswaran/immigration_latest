import {Component, OnDestroy, EventEmitter, Output,Input} from '@angular/core';
import {ICellRendererAngularComp  } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'actions-columns',
    template: `<span><i class="fa fa-trash" aria-hidden="true" (click)="delRow()"></i></span> <span *ngIf="params.colDef.data.isEditEnable"><i class="fa fa-pencil" aria-hidden="true" (click)="editRow()"></i></span>`,


})
export class ActionColumns implements ICellRendererAngularComp    {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
      return false;
    }

    constructor() {
    }
    delRow() {
        this.params.colDef.data.onDeleteClick.emit(this.params);
    }
    editRow() {
        this.params.colDef.data.onEditClick.emit(this.params);
    }

}
