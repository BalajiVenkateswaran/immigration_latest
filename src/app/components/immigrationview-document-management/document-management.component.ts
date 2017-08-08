import {Component, OnInit} from '@angular/core';
import {DocumentManagementService} from "./document-management.service";
import {File} from "../../models/file";
import {FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import {AppService} from "../../services/app.service";
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { dragula } from '../../models/dragula';
import {User} from "../../models/user";
import { HeaderService } from '../header/header.service';

@Component({
    selector: 'app-document-management',
    templateUrl: './document-management.component.html',
    styleUrls: ['./document-management.component.sass']
})
export class DocumentManagementComponent implements OnInit {
    dragbox;
    private user: User;
    orgdocList: any;
    clientdocList: any;
    petitiondocList: any;
    selectedDocList: dragula[] = [];
    public addUser: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    isSaveOrderVisible :  boolean = false;
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    constructor(private documentManagementService: DocumentManagementService, private http: Http,
        public appService: AppService, private dragulaService: DragulaService, private headerService: HeaderService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }

        dragulaService.dropModel.subscribe((value) => {
          this.isSaveOrderVisible = true;
        });

    }
    ngOnInit() {
        var index = 0;
        this.documentManagementService
          .getDocOrder(this.appService.petitionId)
          .subscribe((res: any) => {
              this.selectedDocList = res.petitionDocs;
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

    addDocToSelectedList(file: any){
      var docOrder = {
        fileId: file.fileId,
        fileName: file.fileName
      };
      this.selectedDocList.push(docOrder);
    }

    onDocSelection(x, checkBox) {
        console.log("onDocSelection %o %o", x, checkBox);
        this.isSaveOrderVisible = true;
        if (checkBox.checked) {
            this.addDocToSelectedList(x);
        } else {
            for (var obj of this.selectedDocList) {
                if (obj['fileId'] == x['fileId']) {
                    this.selectedDocList.splice(this.selectedDocList.indexOf(obj), 1);
                    break;
                }
            }
        }
        if (this.selectedDocList.length == 0) {
            this.isSaveOrderVisible = false;
        }
    }

    checkIfDocSelected(x: any) : boolean {
      for (var obj of this.selectedDocList) {
          if (obj['fileId'] == x['fileId']) {
              return true;
          }
      }
      return false;
    }


    //Save Document order
    saveOrder(){
      var fileOrderList = [];
      for (var obj of this.selectedDocList) {
        var fileOrder = {
          fileId : obj['fileId'],
          orderNo : this.selectedDocList.indexOf(obj)
        };
        fileOrderList.push(fileOrder);
      }

      var req = {
        petitionDocs : fileOrderList,
        petitionId : this.appService.petitionId
      };
      console.log("saveOrder!!!!!!!!!%o", req);
      this.documentManagementService
        .saveDocOrder(req)
        .subscribe((res: any) => {
            console.log("SaveDocOrder response:%o", res);
            this.isSaveOrderVisible = false;
        });
    }
    mergeOrder() {

        this.documentManagementService.mergeFile(this.appService.petitionId).subscribe(
            res => { console.log(res); }
        );
    }

}
