import { Component, OnInit } from '@angular/core';
import { DocumentService } from "./documents.service";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AppService } from "../../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../framework/confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { MenuComponent } from "../../common/menu/menu.component";
import { ActionIcons } from '../../framework/smarttable/cellRenderer/ActionsIcons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as FileSaver from 'file-saver';
import {HeaderService} from "../../common/header/header.service";
//dropfile code
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
//dropfile code end
import {FileUtils} from "../../common/FileUtils";
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
    //dropfile code
    public uploader: FileUploader;
    //dropfile code end
    private message: string;
    private user: any;
    private accountId;
    public orgNames: any = [];
    public clientid: string;
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
    public count = 0;
    constructor(private documentservice: DocumentService, private http: Http, public appService: AppService,
                public dialogService: DialogService, private router: Router, private route: ActivatedRoute,
                private menuComponent: MenuComponent, public headerService: HeaderService) {
        super(dialogService);

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
    }


    files = [];
    ngOnInit() {
        //dropdown code
        this.uploader = new FileUploader({
            url: environment.appUrl + '/file/upload/entityId/' + this.appService.petitionId + '/entityType/PETITION/org/' + this.headerService.selectedOrg['orgId']
        });
        //dropdown code end
        this.route.params.subscribe(params => {
            if (params['clientId'] == "") {
                this.documentservice.getOrgNames(this.headerService.user.userId).subscribe((res) => {
                    this.orgNames = res['orgs'];
                    this.appService.documentSideMenu(this.orgNames);
                    this.appService.selectedOrgClienttId = this.orgNames[0].clientId;
                    this.menuComponent.highlightSBLink(this.orgNames[0].orgName);
                    this.getFilesList();
                });
            } else {
                this.getFilesList();
            }
            this.headerService.showSideBarMenu("clientview-document", "clientview-documents");

        });
    }

    onDeleteClick(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to delete ' + event.data.fileName + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                if (isConfirmed) {
                    this.documentservice.deleteFile(event.data.fileId).subscribe(res => {
                        this.getFilesList();
                    });
                }
            });
    }
    fileUpload(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        var fileName = file.name;
        let fileExists = this.isfileExists(file);
        if (fileList.length > 0 && FileUtils.checkFileExtension(fileName) && fileExists != true) {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);

            this.documentservice.uploadFile(this.appService.selectedOrgClienttId, formData)
                .subscribe(
                res => {
                    this.getFilesList();
                    fileList=null;
                    formData=null;
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
    onReplaceClick(event) {
        let fileList: FileList = event.event.target.files;
        let file: File = fileList[0];
        var fileName = file.name;

        let fileExists = this.isfileExists(file);
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Information',
            message: 'Do You Want to Replace this file?'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                if (fileList.length > 0 && FileUtils.checkFileExtension(fileName) && fileExists != true) {
                    let formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    this.documentservice.replaceFile(event.data.fileId, formData)
                        .subscribe(
                        res => {
                            this.getFilesList();
                        }
                        );
                }

                if (fileExists) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Filename is already exists.'
                    });
                }
                if (!FileUtils.checkFileExtension(fileName)) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Please Upload Only Pdf files.'
                    });
                }
            }
        })
    }
    onDownloadClick(event) {
        this.documentservice.downloadFile(event.data.fileId).subscribe
            (data => this.downloadFiles(data, event.data.fileName)),
            error => console.log("Error Downloading....");
        () => console.log("OK");
    }
    getFilesList = function () {
        this.documentservice.getFile(this.appService.selectedOrgClienttId)
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
    editFileName(event) {
        if (event.colDef.headerName != 'Actions') {
            this.editFileObject.fileName = FileUtils.getFileName(event.data.fileName);
            this.dialogService.addDialog(DocumentsComponent, {
                editFiles: true,
                getData: false,
                title: 'Edit File Name',
                editFileObject: this.editFileObject,

            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let fileName = this.editFileObject.fileName.concat(".pdf");
                    event.data.fileName = fileName;
                    var url = "/file/rename";
                    var data = {
                        "accountId": this.headerService.user.accountId,
                        "fileId": event.data.fileId,
                        "fileName": fileName,
                        "orgId": this.documentservice.selectedOrgId
                    };
                    this.documentservice.renameFile(url, data).subscribe(
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
    onFileUploadClick(file){
        file.value=null;
    }

}
