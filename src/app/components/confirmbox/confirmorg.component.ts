import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {AppService} from "../../services/app.service";
export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'confirm',
    template: `<div class="modal-dialog orgnamebox">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                    <p>Please select the Organization</p>
                   </div>
                   <div class="modal-body">
                  <ul>
                    <li *ngFor='let name of orgname' (click)="changeOrgName(name)">
                    {{name.orgName}}
                    </li>
                   </ul>
                   </div>
                 </div>
                </div>`
})
export class ConfirmorgComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    orgname: any = {};
    constructor(dialogService: DialogService, public appService: AppService) {
        super(dialogService);
    }
    changeOrgName(Orgname) {
        this.appService.getorgName(Orgname);
        this.appService.moveToPage('petitions');
        this.close();
    }
    ngOnInit() {
        this.orgname = this.appService.orgNameMenu;
    }
}
