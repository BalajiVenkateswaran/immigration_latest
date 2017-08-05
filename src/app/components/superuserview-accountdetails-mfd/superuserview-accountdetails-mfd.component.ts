import { Component, OnInit } from '@angular/core';
import {SuperUserViewMFDService} from './accountdetails-mfd-service';
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";

@Component({
  selector: 'app-superuserview-accountdetails-mfd',
  templateUrl: './superuserview-accountdetails-mfd.component.html',
  styleUrls: ['./superuserview-accountdetails-mfd.component.scss']
})
export class SuperuserviewAccountdetailsMfdComponent implements OnInit {
  public settings;
  public data;
  constructor(public accountDetailsMFDService:SuperUserViewMFDService, private accountDetailsCommonService: AccountDetailsCommonService) { 
    this.settings={
            'isDeleteEnable':false,
            'isAddButtonEnable':false,
            'columnsettings': [
                {

                    headerName: "Entity Name",
                    field: "entityName",
                },
                {

                    headerName: "Entity Type",
                    field: "entityType",
                },
                {

                    headerName: "Deleted By",
                    field: "deletedByUser"
                },
                {
                    headerName: "MFD on",
                    field: "markedForDeletionDate"
                },
                {

                    headerName: "Deleted on",
                    field: "deletionDate"
                },
                {

                    headerName: "Client Name",
                    field: ""
                },
                {

                    headerName: "Petition Name",
                    field: "petitionName"
                }
                
            ]
        }
    
   
  }

  ngOnInit() {
      this.accountDetailsMFDService.getMarkForDeletion(this.accountDetailsCommonService.accountId).subscribe(res=>{
          this.data=res['markForDeletionInfoList'];
      })
  }

}
