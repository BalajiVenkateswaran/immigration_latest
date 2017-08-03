import { Component, OnInit } from '@angular/core';
import { ClientDocumentRepositoryService } from "./client-document-repository.service";
import { documentRepository } from "../../models/documentRepository";
import { FormGroup, FormControl } from "@angular/forms";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import * as FileSaver from 'file-saver';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ActionIcons } from './ActionsIcons';
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
    public addDocumentRepository: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private accountId;
    public settings;
    public fileListData;
    public downloadSubscription;
    public deleteSubscription;
    public replaceSubscription
    public subscription;
    public data;
    public getFiles;
    public getData: boolean = true;
    public editFiles: boolean;
    public editFileObject: any = {};
    public editFlag: boolean = true;
    public beforeEdit: any;
    public count:number=0;
    constructor(private clientdocumentrepositoryService: ClientDocumentRepositoryService, private http: Http, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;
        }

        this.addDocumentRepository = new FormGroup({
            orderNo: new FormControl(''),
            fileName: new FormControl(''),
            updatedDate: new FormControl('')
        });
        this.accountId = this.user.accountId;
        this.settings = {
            'pagination': false,
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight':30,
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

    }

    onDeleteClick(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to delete ' + event.data.fileName + '?'
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

    private rowEdit: boolean[] = [];
    private onloadisEdit: boolean[] = [];
    onFileRename(i, fileDetails) {
        fileDetails.fileName = fileDetails.fileName.split(".")[0];
        this.rowEdit[i] = !this.rowEdit[i];
        this.onloadisEdit[i] = !this.onloadisEdit[i];

    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    fileUpload(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];

        var x = file.name;
        for (var j = 0; j < this.files.length; j++) {
            if (x == this.files[j].fileName) {
                var upload = false;
            }
        }
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf" && upload != false) {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);

            this.clientdocumentrepositoryService.uploadFile(this.appService.clientId, formData)
                .subscribe(
                res => {
                    this.getFilesList();
                }
                );

        }
        else {
            if (upload == false) {
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
                var x = file.name;
                var y = x.split(".");
                if (fileList.length > 0 && y[1] == "pdf") {
                    let formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    this.clientdocumentrepositoryService.replaceFile(event.data.fileId, formData)
                        .subscribe(
                          res => {
                              this.getFilesList();
                          }
                        );
                }
                if (x == event.data.fileName) {
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
        this.clientdocumentrepositoryService.downloadFile(event.data.fileId).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");

    }

    cancelFileupload(i) {
        this.rowEdit[i] = !this.rowEdit[i];
        this.onloadisEdit[i] = !this.onloadisEdit[i];
        this.ngOnInit();
    }
    private orderNo;
    private fileName;
    private updatedDate;
    private SlNoCount;
    addrow() {
        var SlNoCount = this.files.length;
        this.files.push({ orderNo: this.orderNo = SlNoCount, fileName: this.fileName, updatedDate: this.updatedDate = new Date() });

    }
    files = [];
    ngOnInit() {
        this.getFilesList();
    }

    getFilesList() {
        this.clientdocumentrepositoryService.getFile(this.appService.clientId)
            .subscribe((res) => {
                if (res != undefined) {
                    console.log("filesGetmethod%o", res);
                    let data= res['files'];
                    for(var i=0;i<data.length;i++){
                        data[i]['orderNo']=i+1;
                    }
                    this.getFiles=data;
                }


            });
    }

    downloadFiles(data: any, fileName) {
        var blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }


    addDocumentRepositorySubmit(model: documentRepository, isValid: boolean) {
        if (isValid) {
            this.clientdocumentrepositoryService.saveNewDocumentRepository(model).subscribe((status) => { this.message = status[0] });
        } else {
            this.message = "Filled Details are not correct! please correct...";
        }

    }
    editFileName(event) {
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

        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }

}
