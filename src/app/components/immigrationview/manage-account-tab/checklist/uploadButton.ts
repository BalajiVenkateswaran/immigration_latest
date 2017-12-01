import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from '../../../../services/app.service';
import {ManageAccountChecklistService} from './checklist.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../common/header/header.service';
import {InformationComponent} from '../../../framework/confirmbox/information.component';


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

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public headerService: HeaderService, public dialogService: DialogService) {
    }

    fileUpload(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        let x = file.name;
     //   let fileExists = this.isfileExists(file);
        let y = x.split('.');
        if (fileList.length > 0 && y[1] === 'pdf') {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            this.manageAccountChecklistService.uploadFile(this.headerService.user.accountId, this.params.data.petitionTypeId, formData)
                .subscribe(
                res => {
                    console.log(res);
                    this.params.context.componentParent.getchecklist();
                }
                );

        } else {
                this.dialogService.addDialog(InformationComponent, {
                    title: 'Error',
                    message: 'Please Upload Only Pdf files'
                });
        }
    }
}
