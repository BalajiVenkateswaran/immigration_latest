import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {markfordeletion} from "../../models/markfordeletion";
import {markfordeletionservice} from "./manageaccount-markfordeletion.service";
import {User} from "../../models/user";

@Component({
    selector: 'mark for deletion',
    templateUrl: './manageaccount-markfordeletion.component.html',
    styleUrls: ['./manageaccount-markfordeletion.component.sass']
})
export class MarkforDeletionComponent implements OnInit {
    public user:User;
    public markForDeletionInfoList;
    public settings;   
    public data;
    ngOnInit() { 
        if (this.appService.user) {
            this.user = this.appService.user;

        }
        this.markForDeletionservice.getMarkForDeletion(this.appService.user.accountId).subscribe(
            res=>{
               //this.markForDeletionInfoList=res['markForDeletionInfoList'];
                this.data=res['markForDeletionInfoList'];
               //this.source.load(this.markForDeletionInfoList);
            }
        )
    }
    constructor(public markForDeletionservice:markfordeletionservice,public appService:AppService) { 
    // settings = {
    //     add: {
    //         addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //         createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmCreate: true
    //     },
    //     edit: {
    //         editButtonContent: '<i class="fa fa-eye" aria-hidden="true"></i>',
    //         saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //         cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //         confirmSave: true
    //     },
    //     delete: {
    //         deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
    //         confirmDelete: true
    //     },
    //     columns: {

    //         entityName: {
    //             title: 'Entity Name'
    //         },
    //         entityType: {
    //             title: 'Entity type'
    //         },
    //         deletedByUser: {
    //             title: 'Deleted by'
    //         },
    //         markedForDeletionDate: {
    //             title: 'MFD on'
    //         },
    //         deletionDate: {
    //             title: 'Deleted on'
    //         },
    //         orgName: {
    //             title: 'Organization'
    //         },
    //         firstName: {
    //             title: 'Client Name'
    //         },
    //         petitionName: {
    //             title: 'Petition Name'
    //         },
    //     },
    //     pager: {
    //         display: true,
    //         perPage: 10
    //     },
     
    //     actions: {
    //         edit: false,
    //         add: false,
    //         delete:false
    //     }


    // };
    this.settings={
           "isAddButtonEnable":false,
            'columnsettings': [
                {
                    headerName: "Entity Name",
                    field: "entityName",
                },
                {
                    headerName: "Entity type",
                    field: "entityType",
                },
                {
                    headerName: "Deleted by",
                    field: "deletedByUser",
                },
                {
                    headerName: "MFD on",
                    field: "markedForDeletionDate",
                },
                {
                    headerName: "Deleted on",
                    field: "deletionDate",
                },
                {
                    headerName: "Organization",
                    field: "orgName",
                },
                  {
                    headerName: "Client Name",
                    field: "firstName",
                },
                {
                    headerName: "Petition Name",
                    field: "petitionName",
                },
            ]
        }
    }
    //source: LocalDataSource = new LocalDataSource();
    deleteRecord(event): void { }
    editRecord(event): void { }
    addFunction(event): void { }
}