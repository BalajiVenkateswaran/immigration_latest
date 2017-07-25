import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {documentService} from "./documents.service";
import {clientDocuments} from "../../models/documents";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import { ActionIcons } from '../immigrationview-client-document-repository/ActionsIcons'
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as FileSaver from 'file-saver';
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

    public addDocumentRepository: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
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
    public checked: boolean = false;
    public deleteFlag: boolean = false;
    public replaceFlag: boolean = false;
    public replacing: boolean = false;
    public downloadFlag: boolean = false;
    public count=0;
    constructor(private Documentservice: documentService, private http: Http, public appService: AppService, public dialogService: DialogService, private router: Router, private route: ActivatedRoute, private menuComponent: MenuComponent) {
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
                this.count++;
                this.fileReplace(res);

            }
            else {
                this.checked = false;

            }
        })
         this.settings = {
            'pagination': false,
            'isDeleteEnable': false,
            'isAddButtonEnable': false,
            'rowHeight':30,
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

                    headerName: "Updated Date",
                    field: "updatedDate",
                    width: 100
                }
            ]
        }
    }
    

    files = [];
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['clientId'] == "") {
                this.Documentservice.getOrgNames(this.appService.user.userId).subscribe((res) => {
                    this.orgNames = res['orgs'];
                    this.appService.documentSideMenu(this.orgNames);
                    this.appService.selectedOrgClienttId = this.orgNames[0].clientId;
                    this.menuComponent.highlightSBLink(this.orgNames[0].orgName);              
                    this.getFilesList();
                });
            } else {
                this.getFilesList();
            }
            this.appService.showSideBarMenu("clientview-document", "clientview-documents");

        });
    }

    private deleterow;
    private FileId;
    onFileDelete(FileDetails) {
        var index = this.files.indexOf(FileDetails);
        this.FileId = FileDetails.fileId;
        this.files.splice(index, 1);
        this.Documentservice.deleteFile(FileDetails.fileId).subscribe(res => {
            console.log("FileDelete %o", res);
        });
    }

    private rowEdit: boolean[] = [];
    private onloadisEdit: boolean[] = [];
   
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
            this.Documentservice.uploadFile(this.appService.clientId, formData, headers)
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
    
    onReplaceFile(fileDetails) {
        console.log(fileDetails + "replce")
        this.FileId = fileDetails.fileId;
        console.log(event);

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
                    this.Documentservice.replaceFile(this.FileId, formData, headers)
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
        this.Documentservice.downloadFile(this.FileId).subscribe
            (data => this.downloadFiles(data, this.fileName)),
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


    getFilesList = function () {
           this.Documentservice.getFile(this.appService.selectedOrgClienttId)
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


    addDocumentRepositorySubmit(model, isValid: boolean) {
        console.log('formdata|account: %o|isValid:%o', model, isValid);
        if (isValid) {
            this.Documentservice.saveNewDocumentRepository(model).subscribe((status) => { this.message = status[0] });
        } else {
            this.message = "Filled etails are not correct! please correct...";
        }

    }
    editFileName(event) {
        if (!this.checked) {
            this.editFileObject.fileName = event.data.fileName.split(".")[0];
            this.dialogService.addDialog(DocumentsComponent, {
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
                    this.Documentservice.renameFile(url, data).subscribe(
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
