import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'ih-information-popup',
    template: `<div class="modal-dialog" ngDraggable>
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Information'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message}}</p>

                    <div class="row">
                            <div class="col-md-5">
                            </div>
                            <div class="col-md-7">
                                <div class="row">
                                    <div class="col-md-6"><button type="button" class="btn btn-primary" (click)="confirm()">Ok</button></div>
                                </div>
                            </div>
                        </div>
                   </div>
                 </div>
                </div>`
})
export class InformationComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
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

}
