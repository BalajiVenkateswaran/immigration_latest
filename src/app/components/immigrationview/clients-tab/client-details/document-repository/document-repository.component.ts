import { User } from '../../../../../models/user';
import { AppService } from '../../../../../services/app.service';
import { ConfirmComponent } from '../../../../framework/confirmbox/confirm.component';
import { ActionIcons } from '../../../../framework/smarttable/cellRenderer/ActionsIcons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDocumentRepositoryService } from "./document-repository.service";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import * as FileSaver from 'file-saver';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {SortType} from "../../../../framework/smarttable/types/query-parameters";

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
export class ClientDocumentRepositoryComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    warningMessage: boolean;
    private message: string;
    private user: User;
    private accountId;
    public settings;
    public data;
    public getFiles;
    public getData: boolean = true;
    public editFiles: boolean;
    public editFileObject: any = {};
    public editFlag: boolean = true;
    public beforeEdit: any;
    public progress: number = 0;
    public progessBarDiv:boolean=false;
    public uploadArray=[];
    public circularProgess:number=0;
    public selectedindex: number;
    constructor(private clientdocumentrepositoryService: ClientDocumentRepositoryService, private http: Http,
        public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.circularProgess=50;
        this.accountId = this.user.accountId;
        this.settings = {
            'pagination': false,
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight': 30,
            'context': {
                'componentParent': this
            },
            'sort' : [{
              headingName: "updatedDate",
              sort: SortType.DESC
            }],
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

    }
    onDeleteClick(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to delete ' + event.data.fileName + ' ?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                if (isConfirmed) {
                    this.clientdocumentrepositoryService.deleteFile(event.data.fileId).subscribe(res => {
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
        var x = file.name;
        let fileExists = this.isfileExists(file);
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf" && fileExists != true) {
            this.uploadArray.push({'name':x});
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
             let that = this;
                    let interval = setInterval(function () {
                        that.progress += 10;
                        that.progessBarDiv=true;
                        if (that.progress >= 100) {
                            that.progress=100;
                            clearInterval(interval);
                            if (that.progress == 100) {
                                that.progessBarDiv = false;
                            }
                        }
                    },200)
            this.clientdocumentrepositoryService.uploadFile(this.appService.clientId, formData)
                .subscribe(

                res => {

                    if (res['statusCode'] == 'SUCCESS') {

                        this.getFilesList();

                    }


                }
                );

        }
        else {
            if (fileExists == true) {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'File already exists'
                });
            }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Please upload only PDF file'
                });
            }
        }


    }
    isfileExists(file) {
        let fileExists: boolean = false;
        this.getFiles.filter(item => {
            if (file.name == item.fileName) {
                fileExists = true;
            }
        });
        return fileExists;
    }

    onReplaceClick(event) {
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        var x = this.getFiles[this.selectedindex].fileName;
        let fileExists = this.isfileExists(file);
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Information',
            message: 'Do you want to replace ' + x + ' file ?'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                var y = x.split(".");
                if (fileList.length > 0 && y[1] == "pdf" && fileExists != true) {
                    let formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    this.clientdocumentrepositoryService.replaceFile(event.data.fileId, formData)
                        .subscribe(
                        res => {
                            this.getFilesList();
                        }
                        );
                }
                if (fileExists) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'File already exists'
                    });
                }
                if (y[1] !== 'pdf') {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Please upload only PDF file'
                    });
                }

            }

        })
    }

    onDownloadClick(event) {
        this.clientdocumentrepositoryService.downloadFile(event.data.fileId).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");

    }
    ngOnInit() {
        this.getFilesList();
    }

    getFilesList() {
        this.clientdocumentrepositoryService.getFile(this.appService.clientId)
            .subscribe((res) => {
                if (res != undefined) {
                    console.log("filesGetmethod%o", res);
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
    editFileName(event) {
        this.selectedindex=event.rowIndex;
        if (event.colDef.headerName != 'Actions') {
            this.editFileObject.fileName = event.data.fileName.split(".")[0];
            this.dialogService.addDialog(ClientDocumentRepositoryComponent, {
                editFiles: true,
                getData: false,
                title: 'Edit File Name',
                editFileObject: this.editFileObject,

            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    var fileName = this.editFileObject.fileName.concat(".pdf");
                    event.data.fileName = fileName;
                    var url = "/file/rename";
                    var data = {
                        "accountId": this.accountId,
                        "fileId": event.data.fileId,
                        "fileName": fileName
                    };
                    this.clientdocumentrepositoryService.renameFile(url, data).subscribe(
                        res => {
                            if (res['statusCode'] == 'SUCCESS') {
                                this.getFilesList();

                            }
                            if (res['statusDescription'] == "File Name Exists, Use a different Name") {
                                this.dialogService.addDialog(ConfirmComponent, {
                                    title: 'Error..!',
                                    message: 'File with same name exists, please use a different name'
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
    onFileUploadClick(file) {
        file.value = null;
        this.progress=0;
        this.uploadArray=[];

    }


}
