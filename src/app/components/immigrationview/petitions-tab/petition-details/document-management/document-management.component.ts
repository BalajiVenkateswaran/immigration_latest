import {dragula} from '../../../../../models/dragula';
import {AppService} from '../../../../../services/app.service';
import {HeaderService} from '../../../../common/header/header.service';
import {Component, OnInit} from '@angular/core';
import {DocumentManagementService} from './document-management.service';
import {FormGroup} from '@angular/forms';
import {Http} from '@angular/http';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';

@Component({
    selector: 'app-document-management',
    templateUrl: './document-management.component.html',
    styleUrls: ['./document-management.component.sass'],
    providers: [DocumentManagementService]
})
export class DocumentManagementComponent implements OnInit {
    dragbox;
    orgdocList: any;
    clientdocList: any;
    petitiondocList: any;
    selectedDocList: dragula[] = [];
    public addUser: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    isSaveOrderVisible = false;
    isMergeOrderVisible = true;
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    constructor(private documentManagementService: DocumentManagementService, private http: Http,
        public appService: AppService, private dragulaService: DragulaService, private headerService: HeaderService,
                private dialog: MatDialog) {

        dragulaService.dropModel.subscribe((value) => {
          this.isSaveOrderVisible = true;
          this.isMergeOrderVisible = false;
        });

    }
    ngOnInit() {
       this.getDocuments();
    }

    getDocuments() {
      let index = 0;
      this.documentManagementService
        .getDocOrder(this.appService.petitionId)
        .subscribe((res: any) => {
          this.selectedDocList = res.petitionDocs;
          this.isMergeOrderVisible = this.selectedDocList != null && this.selectedDocList.length > 0;
          this.documentManagementService
            .getOrgdocs(this.headerService.selectedOrg['orgId'])
            .subscribe((res: any) => {
              this.orgdocList = res.files;
            });
          this.documentManagementService
            .getClientdocs(this.appService.clientId)
            .subscribe((res: any) => {
              this.clientdocList = res.files;
            });
          this.documentManagementService
            .getPetitiondocs(this.appService.petitionId)
            .subscribe((res: any) => {
              this.petitiondocList = res.files;
            });
        });




    }
    addDocToSelectedList(file: any) {
      let docOrder = {
        fileId: file.fileId,
        fileName: file.fileName
      };
      this.selectedDocList.push(docOrder);
    }

    onDocSelection(x, checkBox) {
        console.log('onDocSelection %o %o', x, checkBox);
        this.isSaveOrderVisible = true;
        this.isMergeOrderVisible = false;
        if (checkBox.checked) {
            this.addDocToSelectedList(x);
        } else {
            for (let obj of this.selectedDocList) {
                if (obj['fileId'] === x['fileId']) {
                    this.selectedDocList.splice(this.selectedDocList.indexOf(obj), 1);
                    break;
                }
            }
        }
        if (this.selectedDocList.length === 0) {
            this.isSaveOrderVisible = false;
            this.isMergeOrderVisible = true;
        }
    }

    checkIfDocSelected(x: any): boolean {
      for (let obj of this.selectedDocList) {
          if (obj['fileId'] == x['fileId']) {
              return true;
          }
      }
      return false;
    }


    // Save Document order
    saveOrder() {
      let fileOrderList = [];
      for (let obj of this.selectedDocList) {
        let fileOrder = {
          fileId : obj['fileId'],
          orderNo : this.selectedDocList.indexOf(obj)
        };
        fileOrderList.push(fileOrder);
      }

      let req = {
        petitionDocs : fileOrderList,
        petitionId : this.appService.petitionId
      };
      console.log('saveOrder!!!!!!!!!%o', req);
      this.documentManagementService
        .saveDocOrder(req)
        .subscribe((res: any) => {
            console.log('SaveDocOrder response:%o', res);
            this.isSaveOrderVisible = false;
            this.isMergeOrderVisible = true || this.selectedDocList.length > 0;
        });
    }
    mergeOrder() {
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: 'Document merge process has been scheduled. Once the merge document is generated. Will notify you in email'
          }
        });
        this.documentManagementService.mergeFile(this.appService.petitionId).subscribe(
            res => { console.log(res); }
        );
    }

    cancelOrder() {
      this.isSaveOrderVisible = false;
      this.isMergeOrderVisible = true;
      this.getDocuments();
    }

}
