import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as FileSaver from 'file-saver';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

import { AppService } from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import { ActionIcons } from '../../../../framework/smarttable/cellRenderer/ActionsIcons';
import { PetitionDocumentRepositoryService } from './petition-document-repository.service';
import {SortType} from '../../../../framework/smarttable/types/query-parameters';
import {HeaderService} from '../../../../common/header/header.service';
import {FileUtils} from '../../../../common/FileUtils';
import { environment } from '../../../../../../environments/environment';

import {FileItem, FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

export interface ConfirmModel {
    title: string;
    message: string;
    getData: boolean;
    editFiles: boolean;
    editFileObject: Object;

}
@Component({
    selector: 'ih-petition-details-document-repository',
    templateUrl: './petition-document-repository.component.html',
    styleUrls: ['./petition-document-repository.component.sass']
})
export class PetitionDocumentRepositoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public uploader: FileUploader ;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;
    public data;
    public settings;
    public getFiles;
    public fileName;
    private accountId;
    warningMessage: boolean;
    private message: string;
    public editFiles: boolean;
    public editFileObject: any = {};
    public getData = true;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    constructor(private petitiondocumentrepositoryService: PetitionDocumentRepositoryService, private http: Http, public appService: AppService,
       public dialogService: DialogService, public headerService: HeaderService) {
        super(dialogService);
        this.accountId = this.headerService.user.accountId;
        this.settings = {
            'pagination': false,
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight': 60,
            'context': {
                'componentParent': this
            },
            'sort' : [{
              headingName: 'updatedDate',
              sort: SortType.DESC
            }],
            'columnsettings': [
                {
                    headerName: 'Actions',
                    cellRendererFramework: ActionIcons,
                    width: 80
                },
                {
                    headerName: 'SL No',
                    field: 'orderNo',
                    width: 50
                },
                {
                    headerName: 'File Name',
                    field: 'fileName'
                },
                {
                    headerName: 'Uploaded Date',
                    field: 'updatedDate',
                    width: 100
                }
            ]
        }
    };
    ngOnInit() {
        this.uploader = new FileUploader({
          url: environment.appUrl + '/file/upload/entityId/' + this.appService.petitionId + '/entityType/PETITION/org/' + this.headerService.selectedOrg['orgId']
        });

        this.uploader.onAfterAddingFile = (fileItem) => {
          if (!FileUtils.checkFileExtension(fileItem.file.name)) {
            fileItem.remove();
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error..!',
              message: 'Please upload only PDF file'
            });
          }
        };

        this.getFilesList();
        console.log(this.getFilesList);
    }
    onDeleteClick(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to delete ' + event.data.fileName + ' ?'
        })
            .subscribe((isConfirmed) => {
                // Get dialog result
                if (isConfirmed) {
                    this.petitiondocumentrepositoryService.deleteFile(event.data.fileId, this.headerService.selectedOrg['orgId']).subscribe(res => {
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
        let fileName = file.name;
        let fileExists = this.isfileExists(file);
        if (fileList.length > 0 && FileUtils.checkFileExtension(fileName) && fileExists !== true) {

            formData.append('file', file, file.name);
            this.petitiondocumentrepositoryService.uploadFile(this.appService.petitionId, this.headerService.selectedOrg['orgId'], formData)
                .subscribe(
                res => {
                    this.getFilesList();
                }
                );

        } else {
            if (fileExists === true) {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'File already exists'
                });
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Please upload only PDF file'
                });
            }
        }

    }

    onReplaceClick(event) {
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        let fileName = file.name;
        let fileExists = this.isfileExists(file);
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Information',
            message: 'Do you want to replace ' + fileName + ' file ?'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                let formData: FormData = new FormData();
                if (fileList.length > 0 && FileUtils.checkFileExtension(fileName) && fileExists !== true) {
                    formData.append('file', file, file.name);
                    this.petitiondocumentrepositoryService.replaceFile(event.data.fileId, this.headerService.selectedOrg['orgId'], formData)
                        .subscribe(res => {
                            this.getFilesList();
                        });
                }

                if (fileExists) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'File already exists'
                    });
                }
                if (!FileUtils.checkFileExtension(fileName)) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Please upload only PDF file'
                    });
                }
            }
        })

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
    onDownloadClick(event) {
        this.petitiondocumentrepositoryService.downloadFile(event.data.fileId, this.headerService.selectedOrg['orgId']).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log('Error Downloading....');
        () => console.log('OK');

    }
    getFilesList() {
        this.petitiondocumentrepositoryService.getFile(this.appService.petitionId)
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
    editFileName(event) {
        if (event.colDef.headerName !== 'Actions') {
            this.editFileObject.fileName = FileUtils.getFileName(event.data.fileName);
            this.dialogService.addDialog(PetitionDocumentRepositoryComponent, {
                editFiles: true,
                getData: false,
                title: 'Edit File Name',
                editFileObject: this.editFileObject,

            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    event.data.fileName = this.editFileObject.fileName.concat('.pdf');
                    let url = '/file/rename';
                    let data = {
                        'accountId': this.accountId,
                        'orgId': this.headerService.selectedOrg['orgId'],
                        'fileId': event.data.fileId,
                        'fileName': this.editFileObject.fileName.concat('.pdf')
                    };
                    this.petitiondocumentrepositoryService.renameFile(url, data).subscribe(
                        res => {
                            if (res['statusCode'] === 'SUCCESS') {
                                this.getFilesList();

                            }
                            if (res['statusDescription'] === 'File Name Exists, Use a different Name') {
                                this.dialogService.addDialog(ConfirmComponent, {
                                    title: 'Error..!',
                                    message: 'File with same name exists, please use a different name'
                                });
                            }
                        }
                    );
                } else {
                    this.editFileObject.fileName = event.data.fileName;
                }
            });
        }
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
