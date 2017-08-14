import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ManageAccountChecklistService} from './checklist.service';
import { AppService } from '../../../../services/app.service';
import { checklistdownloadButton } from './downloadButton';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {ManageAccountPetitionStagesService} from '../petitiontypestages/petitiontypestages.service';

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
  public addChecklist: any = {};
  public fileId: any;
  public petitionTypes: any;
  constructor(public dialogService: DialogService, public manageAccountCheckListService: ManageAccountChecklistService,
      public appService: AppService, public manageAccountPetitionStagesService: ManageAccountPetitionStagesService) {
    super(dialogService);
    this.settings = {
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
          field: "docName"
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
  addList(event) {
    this.dialogService.addDialog(ManageaccountChecklistComponent, {
      getChecklist: false,
      addChecklists: true,
      title: 'Add Checklist',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
          this.getchecklist();
      }
    });
  }
  fileUpload(event) {
      let fileList: FileList = event.target.files;
      let file: File = fileList[0];
      var x = file.name;
      let fileExists = this.isfileExists(file);
      var y = x.split(".");
      if (fileList.length > 0 && y[1] == "pdf" && fileExists != true) {
          let formData: FormData = new FormData();
          formData.append('file', file, file.name);
      
          this.manageAccountCheckListService.uploadFile(this.data[0].checkListId, formData)
              .subscribe(
              res => {
                  console.log(res);
              }
              );

      }
      else {
          if (fileExists == true) {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Filename is already exists.'
              });
          }
          else {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Please Upload Only Pdf files'
              });
          }
      }
  }
  isfileExists(file) {
      if (this.data == undefined) {
          this.data = [];
      }
      let upload: boolean = false;
      this.data.filter(item => {
          if (file.name == item.fileName) {
              upload = true;
              return false;
          }
          return true;
      })
      return upload;
  }
  save() {
    
      this.manageAccountCheckListService.addChecklist(this.appService.selacntId, this.fileId,this.addChecklist.petitiontype)
          .subscribe(res => {
              console.log(res);
          });
    this.result=true;
    this.close();

  } 
  cancel(){
    this.result=false;
    this.close();
  }

}
