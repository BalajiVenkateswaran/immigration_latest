import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {ManageAccountChecklistService} from './checklist.service';
import { AppService } from '../../../../services/app.service';
import { CheckListDownloadButtonComponent } from './downloadButton';
import { CheckListUploadButtonComponent } from './uploadButton';
import {ManageAccountPetitionStagesService} from '../petitiontypestages/petitiontypestages.service';
import {HeaderService} from '../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-manageaccount-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [ManageAccountChecklistService, ManageAccountPetitionStagesService],
  entryComponents: [SmartTableFrameworkComponent, CheckListDownloadButtonComponent, CheckListUploadButtonComponent]
})
export class ManageaccountChecklistComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public settings;
  public data;

  public fileId: any;
  public petitionTypes: any;
  constructor(public dialogService: DialogService, public manageAccountCheckListService: ManageAccountChecklistService,
      public headerService: HeaderService, public manageAccountPetitionStagesService: ManageAccountPetitionStagesService) {
    super(dialogService);
    this.settings = {
        'isAddButtonEnable': false,
        'isDeleteEnable': false,
        'context': {
            'componentParent': this
        },
      'columnsettings': [
        {
          headerName: 'Sl.No',
          field: 'slNo',
        },
        {
          headerName: 'Petition Type',
          field: 'petitionType',
        },
        {
          headerName: 'Doc Name',
          field: 'fileName',
        },
        {
            headerName: 'Upload',
            cellRendererFramework: CheckListUploadButtonComponent,
        },
        {
            headerName: 'Download',
            cellRendererFramework: CheckListDownloadButtonComponent,
        }
      ]
    };

  }

  ngOnInit() {
      this.manageAccountPetitionStagesService.getPetitionTypes().subscribe(
      res => {
            this.petitionTypes = res['petitionTypes'];
          });
  }

  public dataWithParameters(queryData: string) {
    this.manageAccountCheckListService.getChecklist(this.headerService.user.accountId).subscribe(res => {
      this.data = res['accountCheckList'];
      for (let i = 0; i < this.data.length; i++) {
        this.data[i]['slNo'] = i + 1;
      }
    });
  }

}
