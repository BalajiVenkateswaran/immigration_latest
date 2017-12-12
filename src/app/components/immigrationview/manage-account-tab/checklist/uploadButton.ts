import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {ManageAccountChecklistService} from './checklist.service';
import {HeaderService} from '../../../common/header/header.service';
import {FileUtils} from '../../../common/FileUtils';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';


@Component({
    template: `<div class="fileUpload btn btn-primary iportal-btn no-marg-right agridadd">
                        <i class="fa fa-upload" aria-hidden="true"></i>
                        <input type="file" #fileInput class="upload" name="file" (change)="fileUpload($event)"/>
                    </div>`,

})
export class CheckListUploadButtonComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public headerService: HeaderService, public dialog: MatDialog) {
    }

    fileUpload(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        if (fileList.length > 0 && FileUtils.checkFileExtension(file.name)) {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            this.manageAccountChecklistService.uploadFile(this.headerService.user.accountId, this.params.data.petitionTypeId, formData)
                .subscribe(
                res => {
                    this.params.context.componentParent.getchecklist();
                });

        } else {
            this.dialog.open(InformationDialogComponent, {
                data: {
                  title: 'Error',
                  message: 'Please Upload Only Pdf files'
                }
            });
        }
    }
}
