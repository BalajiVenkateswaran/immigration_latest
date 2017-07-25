import { Component, OnInit } from '@angular/core';
import { OrganizationDocumentRepositoryService } from "./organization-document-repository.service";
import { documentRepository } from "../../models/documentRepository";
import { FormGroup, FormControl } from "@angular/forms";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import * as FileSaver from 'file-saver';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ActionIcons } from '../immigrationview-client-document-repository/ActionsIcons'
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
     private delmessage;
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
    public fileName;
    public getData: boolean = true;
    public editFiles: boolean;
    public editFileObject: any = {};
    public editFlag: boolean = true;
    public beforeEdit: any;
    public checked: boolean = false;
    public deleteFlag: boolean = false;
    public replaceFlag: boolean = false;
    public replacing: boolean = false;
    public downloadFlag: boolean = false;
     constructor(private organizationdocumentrepositoryService: OrganizationDocumentRepositoryService, private http: Http, public appService: AppService, public dialogService: DialogService){
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;


        }

        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.downloadSubscription = ActionIcons.onDownloadClick.subscribe(res => {
            if (res.hasOwnProperty('downloadFlag')) {
                this.checked = true;
                this.downloadFlag = true;
            }
            else {
                this.checked = false;
            }
        })
        this.deleteSubscription = ActionIcons.onDeleteClick.subscribe(res => {
            if (res.hasOwnProperty('deleteFlag')) {
                this.checked = true;
                this.deleteFlag = true;

            }
            else {
                this.checked = false;
            }
        })
        this.subscription = ActionIcons.replace.subscribe(
            res => {
                if (res.hasOwnProperty('flag')) {
                    this.checked = true;
                }
                else {
                    this.checked = false;

                }
            }
        )
        this.replaceSubscription = ActionIcons.onReplaceClick.subscribe(res => {
            if (res.hasOwnProperty('replaceFlag')) {
                this.checked = true;
                this.replaceFlag = true;
                this.fileReplace(res);

            }
            else {
                this.checked = false;

            }
        })
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
            'columnsettings': [
                {
                    headerName: "Actions",
                    cellRendererFramework: ActionIcons,
                    width:80

                },
                {
                    headerName: "SL No",
                    field: "orderNo",
                    width:50
                },
                {

                    headerName: "File Name",
                    field: "fileName",
                },
                {

                    headerName: "Updated Date",
                    field: "updatedDate",
                    width: 100
                }
            ]
        }
    };
    private FileId;
    onFileDelete(FileDetails) {
        console.log("filesDelete%o", FileDetails);
        var index = this.files.indexOf(FileDetails);
        this.FileId = FileDetails.fileId;
        this.delmessage = FileDetails.fileName
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.files.splice(index, 1);
                    this.organizationdocumentrepositoryService.deleteFile(FileDetails.fileId).subscribe(res => {
                        this.getFilesList();
                    });
                }
            });
        this.deleteFlag = false;
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    fileUpload(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        var x = file.name;
        for (var j = 0; j < this.files.length; j++) {
            if (x == this.files[j].fileName) {
                var upload = false;
            }
        }
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf" && upload != false) {

            formData.append('file', file, file.name);

            let headers = new Headers();
            headers.append("Content-Type", "multipart/ form - data");
            let options = new RequestOptions({ headers: headers });
            this.organizationdocumentrepositoryService.uploadFile(this.appService.orgId, formData, headers)
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

    fileReplace(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Do You Want to Replace this file',

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.FileId = event.data.fileId;
                let fileList: FileList = event.event.target.files;
                let file: File = fileList[0];
                let formData: FormData = new FormData();
                var x = file.name;
                var y = x.split(".");
                if (fileList.length > 0 && y[1] == "pdf") {

                    formData.append('file', file, file.name);

                    let headers = new Headers();
                    headers.append("Content-Type", "multipart/ form - data");
                    let options = new RequestOptions({ headers: headers });
                    this.organizationdocumentrepositoryService.replaceFile(this.FileId, formData, headers)
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
            this.checked = false;  
        })

    }
    onDownloadFile(fileDetails) {
        this.FileId = fileDetails.fileId;
        this.fileName = fileDetails.fileName;
        this.organizationdocumentrepositoryService.downloadFile(this.FileId).subscribe
            (data => this.downloadFiles(data, this.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");

    }

    files = [];
    ngOnInit() {
        this.getFilesList();
    }
    getFilesList() {
        this.organizationdocumentrepositoryService.getFile(this.appService.orgId)
            .subscribe((res) => {
                if (res != undefined) {
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
        this.downloadFlag = false;
    }



    addDocumentRepositorySubmit(model: documentRepository, isValid: boolean) {
        console.log('formdata|account: %o|isValid:%o', model, isValid);
        if (isValid) {
            this.organizationdocumentrepositoryService.saveNewDocumentRepository(model).subscribe((status) => { this.message = status[0] });
        } else {
            this.message = "Filled etails are not correct! please correct...";
        }

    }
    editFileName(event) {
        if (!this.checked) {
            this.editFileObject.fileName = event.data.fileName.split(".")[0];
            this.dialogService.addDialog(OrganizationDocumentRepositoryComponent, {
                editFiles: true,
                getData: false,
                title: 'Edit File Name',
                editFileObject: this.editFileObject,

            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                        this.FileId = event.data.fileId;
                    this.fileName = this.editFileObject.fileName.concat(".pdf");
                    event.data.fileName = this.fileName;
                    var url = "/file/rename";
                    var data = {
                        "accountId": this.accountId,
                        "fileId": this.FileId,
                        "fileName": this.fileName
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
                this.checked = false;
            });
        }
        else if (this.checked && this.deleteFlag) {
            this.onFileDelete(event.data);
            this.checked = false;
        }
        else if (this.checked && this.downloadFlag) {
            this.onDownloadFile(event.data);
            this.checked = false;
        }
        else {
            this.checked = false;
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
