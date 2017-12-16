import {Organizations} from '../../../models/organization';
import {AppService} from '../../../services/app.service';
import {HeaderService} from '../../common/header/header.service';
import {Component} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ClientsService} from '../../immigrationview/clients-tab/clients/clients.service';

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
                    <p>Please Select a Petitioner</p>
                        <div class="searchOrg">
                        <input type="text" [(ngModel)]="searchText" />
                            <button><i class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                        
                   </div>
                   <div class="modal-body">
                  <ul>
                    <li *ngFor='let org of headerService.organizations | category: searchText' (click)="changeOrgName(org)">
                    {{org.displayName}}
                    </li>
                    <li *ngIf="headerService.organizations.length == 0 || headerService.organizations.length == undefined">No Organization Found</li>
                   </ul>
                   </div>
                 </div>
                </div>`
})
export class ConfirmorgComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    organizations: any = {};
  public searchText;
    constructor(dialogService: DialogService, public headerService: HeaderService, public appService: AppService, private clientsService: ClientsService) {
        super(dialogService);
    }
    changeOrgName(org: Organizations) {
        this.headerService.selectedOrg = org;
        this.clientsService.dataWithParameters('?size=15&page=0&filter=status:Active&sort=lastUpdate,DESC');
        this.appService.moveToPage('immigrationview/tab/clients');
        this.close();
    }
}
