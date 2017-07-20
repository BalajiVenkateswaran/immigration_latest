import { Component, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({

    template: `<span class="actions">
    <span  class="edit-delete">
    <i class="fa fa-trash" aria-hidden="true" (click)="delete()"></i>
    <div class="fileUpload">
                                            <i class="fa fa-files-o" (click)="onReplaceFile(fileDetails)" aria-hidden="true"></i>
                                            <input type="file" class="upload" name="file" (change)="fileReplace($event,fileDetails)" />
                                        </div>
    <i class="fa fa-download" aria-hidden="true" (click)="download()"></i>
    </span>
    </span>`,


})
export class ActionIcons implements ICellRendererAngularComp {
    public params: any;
    @Output() isDownloadClick = new EventEmitter;
    public static onDownloadClick = new Subject<any[]>();
    public static onEditClick = new Subject<any[]>();
    public static onReplaceClick = new Subject<any[]>();
    public static onDeleteClick = new Subject<any[]>();
    agInit(params: any): void {
        this.params = params;
    }

    constructor() {

    }
    edit() {

    }
    download() {
        ActionIcons.onDownloadClick.next(this.params.data);
        //this.isDownloadClick.emit(this.params.data);
    }
    delete(){
        ActionIcons.onDeleteClick.next(this.params.data);
    }


}