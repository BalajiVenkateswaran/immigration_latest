import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    message: string;
    
}

@Component({
    selector: 'confirm',
    template: `<div class="modal-dialog" ngDraggable>
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>

                    <div class="row">
                            <div class="col-md-5">
                            </div>
                            <div class="col-md-7">
                                <div class="row">
                                    <div class="col-md-6"><button type="button" class="btn btn-primary" (click)="confirm()">Ok</button></div>
                                    <div class="col-md-6"><button type="button" class="btn btn-default" (click)="cancel()">Cancel</button></div>
                                </div>
                            </div>
                        </div>
                   </div>
                 </div>
                </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
  
    constructor(dialogService: DialogService) {
        super(dialogService);
    }
  
    confirm() {
        // on click on confirm button we set dialog result as true,
        // ten we can get dialog result from caller code
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
  
}
