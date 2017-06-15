import { Component, OnInit } from '@angular/core';
import {ClientDocumentRepositoryService} from "./client-document-repository.service";
import {documentRepository} from "../../models/documentRepository";
import {FormGroup, FormControl} from "@angular/forms";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import * as FileSaver from 'file-saver';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
    selector: 'app-document-repository',
  templateUrl: './document-repository.component.html',
  styleUrls: ['./document-repository.component.sass']
})
export class ClientDocumentRepositoryComponent implements OnInit {
    public addDocumentRepository: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private user: User;
    private accountId;
    constructor(private clientdocumentrepositoryService: ClientDocumentRepositoryService, private http: Http, public appService: AppService, private dialogService: DialogService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.addDocumentRepository = new FormGroup({
            orderNo: new FormControl(''),
            fileName: new FormControl(''),
            updatedDate: new FormControl('')
        });
        this.accountId = this.user.accountId;
    }
    private deleterow;
    private FileId;
    onFileDelete(FileDetails) {
        console.log("filesDelete%o", FileDetails);
        var index = this.files.indexOf(FileDetails);
        this.FileId = FileDetails.fileId;
        this.files.splice(index, 1);
        this.clientdocumentrepositoryService.deleteFile(FileDetails.fileId).subscribe(res => {
          console.log("FileDelete %o",res);
        });
    }

    private rowEdit: boolean[]=[];
    private onloadisEdit: boolean[] = [];
    onFileRename(i, fileDetails) {
        fileDetails.fileName = fileDetails.fileName.split(".")[0];
        console.log(fileDetails.fileName);
        this.rowEdit[i] = !this.rowEdit[i];
        this.onloadisEdit[i] = !this.onloadisEdit[i];

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
            this.clientdocumentrepositoryService.uploadFile(this.appService.clientId, formData, headers)
                .subscribe(
                res => {
                    console.log(res);
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
    saveFile(i, fileDetails) {
        var filename = fileDetails.fileName.concat(".pdf");
        for (var j = 0; j < this.files.length; j++) {
            if (i != j) {
                if (filename == this.files[j].fileName) {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Filename is already exists.'
                    });
                    var save = false;
                }
            }
        }
        if (save != false) {
            this.FileId = fileDetails.fileId;
            this.fileName = fileDetails.fileName.concat(".pdf");
            fileDetails.fileName = this.fileName;
            this.rowEdit[i] = !this.rowEdit[i];
            this.onloadisEdit[i] = !this.onloadisEdit[i];
            var url = "/file/rename";
            var data = {
                "accountId": this.accountId,
                "fileId": this.FileId,
                "fileName": this.fileName
            };
            this.clientdocumentrepositoryService.renameFile(url, data).subscribe(
                res => {
                    console.log(res);
                }
            );
        }
    }
    onReplaceFile(fileDetails) {
        console.log(fileDetails+"replce")
        this.FileId = fileDetails.fileId;
        console.log(event);

    }
    fileReplace(event, fileDetails) {
        this.FileId = fileDetails.fileId;
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        var x = file.name;
        for (var j = 0; j < this.files.length; j++) {
            if (fileDetails.orderNo != j) {
                if (x == this.files[j].fileName) {

                    var replace = false;
                }
            }
        }
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf" && replace != false) {

            formData.append('file', file, file.name);

            let headers = new Headers();
            headers.append("Content-Type", "multipart/ form - data");
            let options = new RequestOptions({ headers: headers });
            this.clientdocumentrepositoryService.replaceFile(this.FileId,formData, headers)
                .subscribe(
                res => {

                    this.getFilesList();
                }
                );

        }
        else {
            if (replace == false) {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Filename is already exists.'
                });
            }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Please Upload Only Pdf files.'
                });
            }
        }

    }
    onDownloadFile(fileDetails) {
        this.FileId = fileDetails.fileId;
        this.fileName = fileDetails.fileName;
        this.clientdocumentrepositoryService.downloadFile(this.FileId).subscribe
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
        var SlNoCount=this.files.length;
        this.files.push({orderNo: this.orderNo = SlNoCount, fileName: this.fileName, updatedDate: this.updatedDate = new Date() });

    }
    files=[];
    ngOnInit() {
        this.getFilesList();

    }
    getFilesList = function () {
        return this.clientdocumentrepositoryService.getFile(this.appService.clientId)
                .subscribe((res) => {
                    console.log("filesGetmethod%o", res);
                    this.files = res['files'];
                    for (var i in this.files) {
                        this.rowEdit[i] = true;
                        this.onloadisEdit[i] = false;
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
}
