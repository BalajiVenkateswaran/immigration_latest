import {Component, OnInit} from '@angular/core';
import {SuperUserViewMFDService} from './mfd.service';
import {AccountDetailsCommonService} from '../common/account-details-common.service';

@Component({
  selector: 'app-superuserview-accountdetails-mfd',
  templateUrl: './mfd.component.html',
  styleUrls: ['./mfd.component.scss'],
  providers: [SuperUserViewMFDService]
})
export class SuperuserviewAccountdetailsMfdComponent implements OnInit {
  public settings;
  public data;
  public paginationData;
  constructor(public accountDetailsMFDService: SuperUserViewMFDService, public accountDetailsCommonService: AccountDetailsCommonService) {
    this.settings = {
      'isDeleteEnable': false,
      'isAddButtonEnable': false,
      'columnsettings': [
        {

          headerName: 'Name',
          field: 'entityName',
        },
        {

          headerName: 'Type',
          field: 'entityType',
        },
        {
          headerName: 'Organization',
          field: 'orgName',
        },
        {
          headerName: 'Client Name',
          field: 'clientName',
        },
        {
          headerName: 'Petition Name',
          field: 'petitionName',
        },
        {
          headerName: 'MFD on',
          field: 'markedForDeletionDate',
        },
        {
          headerName: 'Deleted on',
          field: 'deletionDate',
        },
        {
          headerName: 'Deleted by',
          field: 'deletedByUser',
        }
      ]
    }
  }

  ngOnInit() {
    this.accountDetailsMFDService.getMarkForDeletion(this.accountDetailsCommonService.accountId).subscribe(res => {
      this.data = res['markForDeletionInfoList'];
      this.paginationData = res['pageMetadata'];
    })
  }

}
