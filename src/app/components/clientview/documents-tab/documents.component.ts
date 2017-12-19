import {Component, OnInit} from '@angular/core';
import {DocumentService} from './documents.service';
import {Http} from '@angular/http';
import {AppService} from '../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {MenuComponent} from '../../common/menu/menu.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as FileSaver from 'file-saver';
import {HeaderService} from '../../common/header/header.service';
// dropfile code
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '../../../../environments/environment';
// dropfile code end
import {FileUtils} from '../../common/FileUtils';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../framework/popup/information/information.component';
import {ConfirmationDialogComponent} from '../../framework/popup/confirmation/confirmation.component';

export interface ConfirmModel {
    title: string;
    message: string;
    getData: boolean;
    editFiles: boolean;
    editFileObject: Object;

}
@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    warningMessage: boolean;
    // dropfile code
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;
    // dropfile code end
    private message: string;
    private user: any;
    private accountId;
    public orgNames: any = [];
    files = [];
    public clientid: string;
    public settings;
    public fileListData;
    public downloadSubscription;
    public deleteSubscription;
    public replaceSubscription;
    public subscription;
    public data;
    public getFiles;
    public getData = true;
    public editFiles: boolean;
    public editFileObject: any = {};
    public editFlag = true;
    public beforeEdit: any;
    public count = 0;
    constructor(private documentservice: DocumentService, private http: Http, public appService: AppService,
                public dialogService: DialogService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
                private menuComponent: MenuComponent, public headerService: HeaderService, private datePipe: DatePipe) {
        super(dialogService);
    }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
      // dropdown code
      this.uploader = new FileUploader({
          url: environment.appUrl + '/file/upload/entityId/' + this.appService.selectedOrgClienttId + '/entityType/CLIENT/org/' + this.documentservice.selectedOrgId + '/updatedBy/' + this.headerService.user.userId
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

      // dropdown code end
      this.route.params.subscribe(params => {
          if (params['clientId'] === '') {
            this.documentservice.getOrgNames(this.headerService.user.userId).subscribe((res) => {
              this.orgNames = res['orgs'];
              this.appService.documentSideMenu(this.orgNames);
              this.appService.selectedOrgClienttId = this.orgNames[0].clientId;
              this.documentservice.selectedOrgId = this.orgNames[0].orgId;
              this.uploader.setOptions({
                url: environment.appUrl + '/file/upload/entityId/' + this.appService.selectedOrgClienttId + '/entityType/CLIENT/org/' + this.documentservice.selectedOrgId + '/updatedBy/' + this.headerService.user.userId
              });
              this.uploader.clearQueue();
              this.menuComponent.highlightSBLink(this.orgNames[0].orgName);
              this.getFilesList();
            });
          } else if (params['clientId']) {
            this.appService.selectedOrgClienttId = params['clientId'];
            this.uploader.setOptions({
              url: environment.appUrl + '/file/upload/entityId/' + this.appService.selectedOrgClienttId + '/entityType/CLIENT/org/' + this.documentservice.selectedOrgId + '/updatedBy/' + this.headerService.user.userId
            });
            this.uploader.clearQueue();
            this.getFilesList();
          }
          this.headerService.showSideBarMenu('clientview-document', 'clientview/documents');
      });
  }

  onDeleteClick(data) {
    this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete ' + data.fileName + '?'
        }
    }).afterClosed()
    .subscribe((isConfirmed) => {
        // Get dialog result
        if (isConfirmed) {
            this.documentservice.deleteFile(data.fileId).subscribe(res => {
                this.getFilesList();
            });
        }
    });
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
            message: 'Do You Want to Replace this file?'
          }
      }).afterClosed().subscribe((isConfirmed) => {
          if (isConfirmed) {
              if (fileList.length > 0 && FileUtils.checkFileExtension(fileName) && fileExists !== true) {
                  let formData: FormData = new FormData();
                  formData.append('file', file, file.name);
                  this.documentservice.replaceFile(data.fileId, formData)
                      .subscribe(
                      res => {
                          this.getFilesList();
                      }
                      );
              }

              if (fileExists) {
                  this.dialog.open(InformationDialogComponent, {
                      data: {
                        title: 'Error',
                        message: 'Filename is already exists.'
                      }
                  });
              }
              if (!FileUtils.checkFileExtension(fileName)) {
                  this.dialog.open(InformationDialogComponent, {
                      data: {
                        title: 'Error',
                        message: 'Please Upload Only Pdf files.'
                      }
                  });
              }
          }
      });
  }

  onDownloadClick(data) {
    this.documentservice.downloadFile(data.fileId).subscribe
    (data1 => this.downloadFiles(data1, data.fileName),
      error => console.log('Error Downloading....'),
      () => console.log('OK'));
  }

  getFilesList = function () {
    this.documentservice.getFile(this.appService.selectedOrgClienttId)
      .subscribe((res) => {
          if (res !== undefined) {
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
    this.dialogService.addDialog(DocumentsComponent, {
        editFiles: true,
        getData: false,
        title: 'Edit File Name',
        editFileObject: this.editFileObject
    }).subscribe((isConfirmed) => {
        if (isConfirmed) {
            let fileName = this.editFileObject.fileName.concat('.pdf');
            pdf.fileName = fileName;
            let url = '/file/rename';
            let data = {
                'accountId': this.headerService.user.accountId,
                'fileId': pdf.fileId,
                'fileName': fileName,
                'orgId': this.documentservice.selectedOrgId
            };
            this.documentservice.renameFile(url, data).subscribe(
                res => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getFilesList();
                    }
                    if (res['statusDescription'] === 'File Name Exists, Use a different Name') {
                        this.dialog.open(InformationDialogComponent, {
                            data: {
                              title: 'Error',
                              message: 'File Name Exists, Use a different Name'
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
  }
}
