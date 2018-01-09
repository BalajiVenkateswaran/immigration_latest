import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {ManageAccountChecklistService} from './checklist.service';
import {HeaderService} from '../../../common/header/header.service';
import {FileUtils} from '../../../common/FileUtils';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';


@Component({
    template: `<div class="fileUpload btn btn-primary iportal-btn no-marg-right agridadd" style="background:none !important;color: #04a9fc !important;margin-top: -7px !important;left: -23px!important;">
                        
<button _ngcontent-c2="" class="pull-right no-marg-right agridadd addbtnnsmart iportal-btnIMclient" style="margin-top: -2px !important; font-size: 11px !important;height: 26px !important;" type="button" 
ng-reflect-klass="pull-right no-marg-right agrid" ng-reflect-ng-class="[object Object]">Upload</button>
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
                    this.params.context.componentParent.dataWithParameters('');
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
