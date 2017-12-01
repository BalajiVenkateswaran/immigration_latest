import {MarkForDeletionService} from './markfordeletion.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';

@Component({
    selector: 'mark for deletion',
    templateUrl: './markfordeletion.component.html',
    styleUrls: ['./markfordeletion.component.sass'],
  providers: [MarkForDeletionService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class MarkforDeletionComponent implements OnInit {
    public markForDeletionInfoList;
    public settings;
    public data;
  public paginationData: any;
  constructor(public markForDeletionservice: MarkForDeletionService, public headerService: HeaderService) {

    this.settings = {
      'isAddButtonEnable': false,
      'isDeleteEnable': false,
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

        this.markForDeletionservice.getMarkForDeletion(this.headerService.user.accountId).subscribe(
            res => {
                this.data = res['markForDeletionInfoList'];
              this.paginationData = res['pageMetadata'];
            }
        )
    }

}
