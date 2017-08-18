import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ManageAccountChecklistService} from './checklist.service';
import { AppService } from '../../../../services/app.service';
import { checklistdownloadButton } from './downloadButton';
import { checklistuploadButton } from './uploadButton';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {ManageAccountPetitionStagesService} from '../petitiontypestages/petitiontypestages.service';

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-manageaccount-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ManageaccountChecklistComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public settings;
  public data;

  public fileId: any;
  public petitionTypes: any;
  constructor(public dialogService: DialogService, public manageAccountCheckListService: ManageAccountChecklistService,
      public appService: AppService, public manageAccountPetitionStagesService: ManageAccountPetitionStagesService) {
    super(dialogService);
    this.settings = {
        'isAddButtonEnable': false,
        'isDeleteEnable': false,
        'context': {
            'componentParent': this
        },
      'columnsettings': [
        {
          headerName: "Sl.No",
          field: "slNo",
        },
        {

          headerName: "Petition Type",
          field: "petitionType",
        },
        {

          headerName: "Doc Name",
          field: "fileName",
        },
        {
            headerName: "Upload",
            cellRendererFramework: checklistuploadButton,
        },
        {
            headerName: "Download",
            cellRendererFramework: checklistdownloadButton,
        }
      ]
    }

  }

  ngOnInit() {
      this.data = [];
      this.getchecklist();
    this.manageAccountPetitionStagesService.getPetitionTypes().subscribe(
        res => {
            this.petitionTypes = res['petitionTypes'];
        });


  }
  getchecklist() {
      this.manageAccountCheckListService.getChecklist(this.appService.selacntId).subscribe(res => {
          this.data = res['accountCheckList'];
          for (var i = 0; i < this.data.length; i++) {
              this.data[i]['slNo'] = i + 1;
          }
      });
  }

 

}
