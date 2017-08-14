import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ManageAccountChecklistService} from './checklist.service';
export interface ConfirmModel {
  title: string;
  message: string;
  getChecklist: boolean;
  addChecklists: boolean;
}
@Component({
  selector: 'app-manageaccount-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ManageaccountChecklistComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public settings;
  public getChecklist: boolean = true;
  public addChecklists: boolean;
  public data;
  public addChecklist:any={};
  constructor(public dialogService: DialogService,public manageAccountCheckListService:ManageAccountChecklistService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: "Sl.No",
          field: "slNo",
        },
        {

          headerName: "Petition Type",
          field: "petition Type",
        },
        {

          headerName: "Doc Name",
          field: "docName"
        },
        {
          headerName: "Upload",
          field: "approvedOn"
        }
      ]
    }

  }

  ngOnInit() {
    this.data = [];
    /*this.manageAccountCheckListService.getChecklist("").subscribe(res=>{
      this.data=res['checklist'];
    })*/

  }
  addList(event) {
    this.dialogService.addDialog(ManageaccountChecklistComponent, {
      getChecklist: false,
      addChecklists: true,
      title: 'Add Checklist',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {



      }


    });
  }
  save(){
    this.result=true;
    this.close();

  } 
  cancel(){
    this.result=false;
    this.close();
  }

}
