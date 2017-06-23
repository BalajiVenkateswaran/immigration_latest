import { Component, OnInit } from '@angular/core';
import {ImmigrationViewI797HistoryService} from "./i-797-history.service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-i-797-history',
  templateUrl: './i-797-history.component.html',
  styleUrls: ['./i-797-history.component.sass']
})
export class ImmigrationViewI797HistoryComponent implements OnInit {
    settings = {
        add: {
            addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
            saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmDelete: true
        },
        columns: {

            receiptNumber: {
                title: 'Receipt Number'
            },
            receiptDate: {
                title: 'Receipt Date'
            },
            status: {
                title: 'Status On I-797'
            },
            approvedOn: {
                title: 'Approved on'
            },
            validFrom: {
                title: 'Valid From'
            },
            validTill: {
                title: 'Valid Till'
            }
        },
        pager: {
            display: true,
            perPage: 10
        }

    };
    private delmessage;
    private user: User;
    public addI797History: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;

    constructor(private immigrationViewI797HistoryService: ImmigrationViewI797HistoryService, public appService: AppService, private dialogService: DialogService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
    source: LocalDataSource = new LocalDataSource();
   ngOnInit() {
       this.immigrationViewI797HistoryService.getI797Details(this.appService.clientId)
            .subscribe((res) => {
                this.source.load(res['i797HistoryList']);
            });

    }
   highlightSBLink(link) {
       this.appService.currentSBLink = link;
   }
   onCreateConfirm(event): void {
       event.newData['clientId'] = this.appService.clientId;
       event.newData['i797HistoryId'] = this.appService.clientId;
       this.immigrationViewI797HistoryService.saveI797Details(event.newData).subscribe((res) => {
           this.message = res['statusCode'];
           if (this.message == 'SUCCESS') {
               event.newData = res['i797HistoryList'];
               event.confirm.resolve(event.newData);
           } else {
               this.dialogService.addDialog(ConfirmComponent, {
                   title: 'Error..!',
                   message: 'Unable to Add I-797.'
               });
               event.confirm.reject();
           }
       });
   }

   onEditConfirm(event): void {
       event.newData['clientId'] = this.appService.clientId;
       this.immigrationViewI797HistoryService.saveI797Details(event.newData).subscribe((res) => {
           this.message = res['statusCode'];
           if (this.message == 'SUCCESS') {
               event.newData = res['i797HistoryList'];
               event.confirm.resolve(event.newData);
           } else {
               this.dialogService.addDialog(ConfirmComponent, {
                   title: 'Error..!',
                   message: 'Unable to Edit I-797.'
               });
               event.confirm.resolve(event.data);
           }
       });
   }
   onDeleteConfirm(immViewi797) {
       this.delmessage = immViewi797.data.receiptNumber
       this.dialogService.addDialog(ConfirmComponent, {
           title: 'Confirmation',
           message: 'Are you sure you want to Delete ' +this.delmessage+'?'
       })
           .subscribe((isConfirmed) => {
               //Get dialog result
               //this.confirmResult = isConfirmed;
               if (isConfirmed) {
                   this.immigrationViewI797HistoryService.removeI797Details(immViewi797.data['i797HistoryId']).subscribe((res) => {
                       this.message = res['statusCode'];
                       if (this.message == 'SUCCESS') {
                           immViewi797.confirm.resolve();
                       } else {
                           immViewi797.confirm.reject();
                       }
                   });
               }
           });
   }
}
