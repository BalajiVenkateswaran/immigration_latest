import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {markfordeletion} from "../../models/markfordeletion";
import {markfordeletionservice} from "./manageaccount-markfordeletion.service";


@Component({
    selector: 'mark for deletion',
    templateUrl: './manageaccount-markfordeletion.component.html',
    styleUrls: ['./manageaccount-markfordeletion.component.sass']
})
export class MarkforDeletionComponent implements OnInit {
    ngOnInit() { }
    constructor() { }
    settings = {
        add: {
            addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="fa fa-eye" aria-hidden="true"></i>',
            saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmDelete: true
        },
        columns: {

            entityName: {
                title: 'Entity Name'
            },
            entityType: {
                title: 'Entity type'
            },
            deletedBy: {
                title: 'Deleted by'
            },
            mfdOn: {
                title: 'MFD on'
            },
            deletedOn: {
                title: 'Deleted on'
            },
            organization: {
                title: 'Organization'
            },
            clientName: {
                title: 'Client Name'
            },
            petitionName: {
                title: 'Petition Name'
            },
        },
        pager: {
            display: true,
            perPage: 10
        },
     
        actions: {
            edit: false,
            add: false,
            delete:false
        }


    };
    source: LocalDataSource = new LocalDataSource();
    onDeleteConfirm(event): void { }
    onEditConfirm(event): void { }
    onCreateConfirm(event): void { }


}