import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {AppService} from '../../../../services/app.service';
import {ManageAccountChecklistService} from './checklist.service';
import * as FileSaver from 'file-saver';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';

@Component({
    template: `
     <a class="iportal-btn" style="background:none !important; margin-left: 16px !important; color: #04a9fc !important; margin-top: -7px !important;" (click)="downloadClick($event)">
      <i class="fa fa-download" style=" font-size: 20px !important;" aria-hidden="true"></i>
    </a>
   `
})
export class CheckListDownloadButtonComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }
    refresh(): boolean {
      return false;
    }

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public appService: AppService, private dialog: MatDialog) {
    }

    downloadClick(event) {
      if (this.params.data.fileId) {
        this.manageAccountChecklistService.downloadChecklist(this.params.data.checkListId).subscribe
        (data => this.downloadFiles(data, this.params.data.fileName),
          error => console.log('Error Downloading....'), () => console.log('OK'));
      } else {
        this.dialog.open(InformationDialogComponent, {
          data: {
            title: 'Error',
            message: 'No file to download'
          }
        });
      }
    }
    downloadFiles(data: any, fileName) {
        let blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
}
