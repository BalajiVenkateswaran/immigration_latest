import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {AppService} from "../../services/app.service";
import { HeaderService } from '../header/header.service';
export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'confirm',
    template: `<div class="modal-dialog orgnamebox" ngDraggable>
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                    <p>Please select the Organization</p>
                   </div>
                   <div class="modal-body">
                  <ul>
                    <li *ngFor='let org of headerService.organizations' (click)="changeOrgName(org)">
                    {{org.displayName}}
                    </li>
                   </ul>
                   </div>
                 </div>
                </div>`
})
export class ConfirmorgComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    organizations: any = {};
    constructor(dialogService: DialogService, public headerService: HeaderService, public appService: AppService) {
        super(dialogService);
    }
    changeOrgName(org) {
        this.headerService.selectedOrg = org;
        this.appService.moveToPage('petitions');
        this.close();
    }
    ngOnInit() {
    }
}
