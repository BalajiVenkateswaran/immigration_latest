import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from '../../../../services/app.service';
import {ManageAccountChecklistService} from './checklist.service';
import * as FileSaver from 'file-saver';

@Component({
    template: `
     <a class="iportal-btn" (click)="downloadClick($event)"><i aria-hidden="true" class="fa fa-download"></i></a>
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

    constructor(private manageAccountChecklistService: ManageAccountChecklistService, public appService: AppService) {
    }

    downloadClick(event) {

        this.manageAccountChecklistService.downloadChecklist(this.params.data.checkListId).subscribe
            (data => this.downloadFiles(data, this.params.data.fileName)),
            error => console.log('Error Downloading....');
        () => console.log('OK');
    }
    downloadFiles(data: any, fileName) {
        let blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
    }
}
