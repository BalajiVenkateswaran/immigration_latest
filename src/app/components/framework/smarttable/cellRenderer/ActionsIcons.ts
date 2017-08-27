import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';

@Component({

    template: `<span class="actions">
    <span  class="edit-delete">
    <i class="fa fa-trash" aria-hidden="true" (click)="delete()"></i>
    <div class="fileUpload">
    <div>
            <i class="fa fa-files-o" aria-hidden="true" ></i>
            </div>
            <input type="file" #fileInput (click)="onUploadFileClick(fileInput)" (change)="onReplaceFile($event)" class="upload" name="file"  />
    </div>
    <i class="fa fa-download" aria-hidden="true" (click)="download()"></i>
    </span>
    </span>`,


})
export class ActionIcons implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }
    constructor() {
    }

    download() {
        this.params.context.componentParent.onDownloadClick({ 'data': this.params.data});
    }
    delete() {
        this.params.context.componentParent.onDeleteClick({ 'data': this.params.data});
    }
    onReplaceFile(event) {
      this.params.context.componentParent.onReplaceClick({'event': event, 'data': this.params.data});
    }
    onUploadFileClick(file){
       file.value=null;
    }


}
