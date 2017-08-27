import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from "../../../../services/app.service";
import {ManageAccountChecklistService} from './checklist.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";


@Component({
    template: `
    <div>
  <input type="file" class="upload" name="file" (change)="fileUpload($event)" />
    </div>
   `,

})
export class checklistuploadButton implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public appService: AppService, public dialogService: DialogService) {
    }

    fileUpload(event) {
        var asdf=this.params;
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        var x = file.name;
     //   let fileExists = this.isfileExists(file);
        var y = x.split(".");
        if (fileList.length > 0 && y[1] == "pdf") {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            this.manageAccountChecklistService.uploadFile(this.appService.selacntId,this.params.data.petitionTypeId,formData)
                .subscribe(
                res => {
                    console.log(res);
                    this.params.context.componentParent.getchecklist();
                }
                );

        }
        //else {
        //    if (fileExists == true) {
        //        this.dialogService.addDialog(ConfirmComponent, {
        //            title: 'Error..!',
        //            message: 'Filename is already exists.'
        //        });
        //    }
            else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Please Upload Only Pdf files'
                });
            //}
        }
    }
    //isfileExists(file) {

    //    let upload: boolean = false;
    //    this.data.filter(item => {
    //        if (file.name == item.fileName) {
    //            upload = true;
    //            return false;
    //        }
    //        return true;
    //    })
    //    return upload;
    //}

}
