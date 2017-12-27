import { User } from '../../../../../models/user';
import { AppService } from '../../../../../services/app.service';
import { ActionIcons } from '../../../../framework/smarttable/cellRenderer/ActionsIcons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDocumentRepositoryService } from './document-repository.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as FileSaver from 'file-saver';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {SortType} from '../../../../framework/smarttable/types/query-parameters';
import { HeaderService } from '../../../../common/header/header.service';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../../../../environments/environment';
import {FileUtils} from '../../../../common/FileUtils';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../framework/popup/confirmation/confirmation.component';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';

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
    styleUrls: ['./document-repository.component.sass'],
  providers: [ClientDocumentRepositoryService]
})
export class ClientDocumentRepositoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    warningMessage: boolean;
    private message: string;
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;
    private user: User;
    private accountId;
    public settings;
    public data;
    public getFiles = [];
    public getData = true;
    public editFiles: boolean;
    public editFileObject: any = {};
    public editFlag = true;
    public beforeEdit: any;
    public progress = 0;
    public progessBarDiv= false;
    public uploadArray= [];
    public circularProgess= 0;
    public selectedindex: number;
    constructor(private clientdocumentrepositoryService: ClientDocumentRepositoryService, private http: Http,
        public appService: AppService, public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService, private datePipe: DatePipe) {
        super(dialogService);
        if (this.headerService.user) {
            this.user = this.headerService.user;
        }
        this.circularProgess = 50;
        this.accountId = this.user.accountId;
    }
    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
    }
    onDeleteClick(data) {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
              message: 'Are you sure you want to delete ' + data.fileName + ' ?'
            }
        }).afterClosed()
          .subscribe((isConfirmed) => {
              // Get dialog result
              if (isConfirmed) {
                  this.clientdocumentrepositoryService.deleteFile(data.fileId, this.headerService.selectedOrg['orgId']).subscribe(res => {
                      this.getFilesList();
                  });
              }
          });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    isfileExists(file) {
        let fileExists = false;
        this.getFiles.filter(item => {
            if (file.name === item.fileName) {
                fileExists = true;
            }
        });
        return fileExists;
    }

    onReplaceClick(event, data) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        let fileName = file.name;
        let fileExists = this.isfileExists(file);
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
              message: 'Do you want to replace ' + fileName + ' file ?'
            }
        }).afterClosed().subscribe((isConfirmed) => {
            if (isConfirmed) {
              let formData: FormData = new FormData();
              if (fileList.length > 0 && FileUtils.checkFileExtension(fileName)  && fileExists !== true) {
                  formData.append('file', file, file.name);
                  this.clientdocumentrepositoryService.replaceFile(data.fileId, this.headerService.selectedOrg['orgId'], formData)
                      .subscribe(
                      res => {
                          this.getFilesList();
                      });
              }
              if (fileExists) {
                  this.dialog.open(InformationDialogComponent, {
                      data: {
                        title: 'Error',
                        message: 'File already exists'
                      }
                  });
              }
              if (!FileUtils.checkFileExtension(fileName) ) {
                  this.dialog.open(InformationDialogComponent, {
                      data: {
                        title: 'Error',
                        message: 'Please upload only PDF file'
                      }
                  });
              }
            }
        })
    }

    onDownloadClick(event) {
        this.clientdocumentrepositoryService.downloadFile(event.fileId, this.headerService.selectedOrg['orgId'])
          .subscribe(data => this.downloadFiles(data, event.fileName),
            error => console.log('Error Downloading....'),
            () => console.log('OK'));
    }

    ngOnInit() {
       this.uploader = new FileUploader({
            url: environment.appUrl + '/file/upload/entityId/' + this.appService.clientId + '/entityType/CLIENT/org/' + this.headerService.selectedOrg['orgId'] + '/updatedBy/' + this.headerService.user.userId
        });
       // Check if the file extension as PDF, if not don't upload the file
      this.uploader.onAfterAddingFile = (fileItem) => {
        if (!FileUtils.checkFileExtension(fileItem.file.name)) {
          fileItem.remove();
          this.dialog.open(InformationDialogComponent, {
            data: {
              title: 'Error',
              message: 'Please upload only PDF file'
            }
          });
        } else if (this.isfileExists(fileItem.file)) {
          fileItem.remove();
          this.dialog.open(InformationDialogComponent, {
            data: {
              title: 'Error',
              message: 'A file already exists with name ' + fileItem.file.name
            }
          });
        } else {
          fileItem.upload();
        }
      };

      // On Successful upload add the file to Uploaded files list
      this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        if (response) {
          let jsonResponse = JSON.parse(response);
          if (jsonResponse.hasOwnProperty('statusCode')) {
            if (jsonResponse['statusCode'] === 'SUCCESS') {
              this.getFiles.push({
                fileId: jsonResponse['fileId'],
                fileName: item.file.name,
                orderNo: this.getFiles.length,
                updatedDate: this.datePipe.transform(new Date(), 'MM-dd-yyyy')
              });
              item.remove();
            } else {

            }
          }
        }
      };

        this.getFilesList();
    }

    getFilesList() {
        this.clientdocumentrepositoryService.getFile(this.appService.clientId)
            .subscribe((res) => {
                if (res !== undefined) {
                    console.log('filesGetmethod%o', res);
                    let data = res['files'];
                    for (let i = 0; i < data.length; i++) {
                        data[i]['orderNo'] = i + 1;
                    }
                    this.getFiles = data;
                }


            });
    }

    downloadFiles(data: any, fileName) {
        let blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
    editFileName(pdf) {
      this.editFileObject.fileName = FileUtils.getFileName(pdf.fileName);
      this.dialogService.addDialog(ClientDocumentRepositoryComponent, {
          editFiles: true,
          getData: false,
          title: 'Edit File Name',
          editFileObject: this.editFileObject,

      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
              let fileName = this.editFileObject.fileName.concat('.pdf');
              pdf.fileName = fileName;
              let url = '/file/rename';
              let data = {
                  'accountId': this.accountId,
                  'orgId': this.headerService.selectedOrg['orgId'],
                  'fileId': pdf.fileId,
                  'fileName': fileName
              };
              this.clientdocumentrepositoryService.renameFile(url, data).subscribe(
                  res => {
                      if (res['statusCode'] === 'SUCCESS') {
                          this.getFilesList();
                      }
                      if (res['statusDescription'] === 'File Name Exists, Use a different Name') {
                          this.dialog.open(InformationDialogComponent, {
                              data: {
                                title: 'Error',
                                message: 'File with same name exists, please use a different name'
                              }
                          });
                      }
                  }
              );
          } else {
              this.editFileObject.fileName = pdf.fileName;
          }
      });
    }
    save() {
      if (this.editFileObject['fileName'] === '' || this.editFileObject['fileName'] == null || this.editFileObject['fileName'] === undefined) {
          this.warningMessage = true;
      } else {
          this.warningMessage = false;
          this.result = true;
          this.close();
      }
    }
    cancel() {
        this.result = false;
        this.close();
    }
    onFileUploadClick(file) {
        file.value = null;
        this.progress = 0;
        this.uploadArray = [];
    }
}
