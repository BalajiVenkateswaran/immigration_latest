import {AppService} from '../../../../services/app.service';
import {ConfirmComponent} from '../../../confirmbox/confirm.component';
import {HeaderService} from '../../../header/header.service';
import {ActionIcons} from '../../../framework/smarttable/cellRenderer/ActionsIcons';
import {Component, OnInit} from '@angular/core';
import {OrganizationDocumentRepositoryService} from "./document-repository.service";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import * as FileSaver from 'file-saver';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title: string;
  message: string;
  getData: boolean;
  editFiles: boolean;
  editFileObject: Object;

}
@Component({
  selector: 'app-document-repository',
  templateUrl: './document-repository.component.html',
  styleUrls: ['./document-repository.component.sass']
})
export class OrganizationDocumentRepositoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  warningMessage: boolean;
  private message: string;
  private accountId;
  public settings;
  public getFiles;
  public getData: boolean = true;
  public editFiles: boolean;
  public editFileObject: any = {};
  public editFlag: boolean = true;
  public beforeEdit: any;
  constructor(private organizationdocumentrepositoryService: OrganizationDocumentRepositoryService, private http: Http,
    public appService: AppService, public dialogService: DialogService, private headerService: HeaderService) {
    super(dialogService);
    this.accountId = this.appService.user.accountId;
    this.settings = {
      'pagination': false,
      'isDeleteEnable': false,
      'isAddButtonEnable': false,
      'rowHeight': 30,
      'context': {
        'componentParent': this
      },
      'columnsettings': [
        {
          headerName: "Actions",
          cellRendererFramework: ActionIcons,
          width: 80
        },
        {
          headerName: "SL No",
          field: "orderNo",
          width: 50
        },
        {
          headerName: "File Name",
          field: "fileName",
        },
        {

          headerName: "Uploaded Date",
          field: "updatedDate",
          width: 100
        }
      ]
    }
  };
  onDeleteClick(event) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + event.data.fileName + '?'
    })
      .subscribe((isConfirmed) => {
        //Get dialog result
        if (isConfirmed) {
          this.organizationdocumentrepositoryService.deleteFile(event.data.fileId).subscribe(res => {
            this.getFilesList();
          });
        }
      });
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }
  fileUpload(event) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    var x = file.name;
    let fileExists = this.isfileExists(file);
    var y = x.split(".");
    if (fileList.length > 0 && y[1] == "pdf" && fileExists != true) {
      formData.append('file', file, file.name);
      this.organizationdocumentrepositoryService.uploadFile(this.headerService.selectedOrg['orgId'], formData)
        .subscribe(
        res => {
          this.getFilesList();
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

  onReplaceClick(event) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Information',
      message: 'Do You Want to Replace this file?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        var x = file.name;
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf") {
          formData.append('file', file, file.name);
          this.organizationdocumentrepositoryService.replaceFile(event.data.fileId, formData)
            .subscribe(
            res => {
              this.getFilesList();
            }
            );

        }
        let fileExists = this.isfileExists(file);
        if (fileExists) {
          this.dialogService.addDialog(ConfirmComponent, {
            title: 'Error..!',
            message: 'Filename is already exists.'
          });
        }
        if (y[1] !== 'pdf') {
          this.dialogService.addDialog(ConfirmComponent, {
            title: 'Error..!',
            message: 'Please Upload Only Pdf files.'
          });
        }
      }
    })

  }
  onDownloadClick(event) {
    this.organizationdocumentrepositoryService.downloadFile(event.data.fileId).subscribe
      (data => this.downloadFiles(data, event.data.fileName)),
      error => console.log("Error Downloading....");
    () => console.log("OK");

  }
  ngOnInit() {
    this.getFilesList();
  }
  getFilesList() {
    this.organizationdocumentrepositoryService.getFile(this.headerService.selectedOrg['orgId'])
      .subscribe((res) => {
        if (res != undefined) {
          let data = res['files'];
          for (var i = 0; i < data.length; i++) {
            data[i]['orderNo'] = i + 1;
          }
          this.getFiles = data;
        }
      });
  }
  downloadFiles(data: any, fileName) {
    var blob = new Blob([data], {
      type: 'application/pdf'
    });
    FileSaver.saveAs(blob, fileName);
  }
  isfileExists(file) {
    let upload: boolean = false;
    this.getFiles.filter(item => {
      if (file.name == item.fileName) {
        upload = true;
        return false;
      }
      return true;
    })
    return upload;
  }
  editFileName(event) {
    if (event.colDef.headerName != 'Actions') {
      this.editFileObject.fileName = event.data.fileName.split(".")[0];
      this.dialogService.addDialog(OrganizationDocumentRepositoryComponent, {
        editFiles: true,
        getData: false,
        title: 'Edit File Name',
        editFileObject: this.editFileObject,

      }).subscribe((isConfirmed) => {
        if (isConfirmed) {
          var FileId = event.data.fileId;
          var fileName = this.editFileObject.fileName.concat(".pdf");
          event.data.fileName = fileName;
          var url = "/file/rename";
          var data = {
            "accountId": this.accountId,
            "fileId": FileId,
            "fileName": fileName
          };
          this.organizationdocumentrepositoryService.renameFile(url, data).subscribe(
            res => {
              if (res['statusCode'] == 'SUCCESS') {
                this.getFilesList();

              }
              if (res['statusDescription'] == "File Name Exists, Use a different Name") {
                this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'File Name Exists, Use a different Name'
                });
              }
            }
          );
        }
        else {
          this.editFileObject.fileName = event.data.fileName;
        }
      });
    }
  }
  save() {
    if (this.editFileObject['fileName'] == '' || this.editFileObject['fileName'] == null || this.editFileObject['fileName'] == undefined) {
      this.warningMessage = true;
    }
    else {
      this.warningMessage = false;
      this.result = true;
      this.close();
    }
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
