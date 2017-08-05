import { Component, OnInit } from '@angular/core';
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
   
}