import { User } from '../../../../models/user';
import { AppService } from '../../../../services/app.service';
import { markfordeletionservice } from './markfordeletion.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mark for deletion',
    templateUrl: './markfordeletion.component.html',
    styleUrls: ['./markfordeletion.component.sass']
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
                this.data=res['markForDeletionInfoList'];
            }
        )
    }
    constructor(public markForDeletionservice:markfordeletionservice,public appService:AppService) {

    this.settings={
           "isAddButtonEnable":false,
           'isDeleteEnable':false,
            'columnsettings': [
                {
                    headerName: "Name",
                    field: "entityName",
                },
                {
                    headerName: "Type",
                    field: "entityType",
                },
                {
                  headerName: "Organization",
                  field: "orgName",
                },
                {
                  headerName: "Client Name",
                  field: "clientName",
                },
                {
                  headerName: "Petition Name",
                  field: "petitionName",
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
                  headerName: "Deleted by",
                  field: "deletedByUser",
                },
            ]
        }
    }

}
