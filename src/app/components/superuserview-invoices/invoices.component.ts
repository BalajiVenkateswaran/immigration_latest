import { Component, OnInit } from '@angular/core';
import {invoice} from "../../models/invoice";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import {SuperUserViewInvoicestabService} from "./invoices.service";

export interface ConfirmModel {
    title: string;
    message: string;
    addNewClient: boolean;
    getClientsData: boolean;

}


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class SuperUserViewInvoicestabComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private invoicesList: invoice[];
    public addClient: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data;
    private user: User;
    private deleteclients: any;
    private clientName: any;
    public addNewClient: boolean;
    public getClientsData: boolean = true;
    public newclitem: any = {};
    public DefaultResponse = {"status": "Active" };

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
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        columns: {
            invoiceNumber: {
                title: 'Invoice Number'
            },
            accountName: {
                title: 'Account Name'
            },
            accountNumber: {
                title: 'Account Number'
            },
            invoiceDate: {
                title: 'Invoice Date'
            },
            invoiceAmount: {
                title: 'Invoice Amount'
            },
            paymentStatus: {
                title: 'Payment Status'
            },
            pdfGenerated: {
                title: 'PDF generated'
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    constructor(private superuserviewInvoicestabService: SuperUserViewInvoicestabService, private appService: AppService, private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent) {
        super(dialogService);
    }
    source: LocalDataSource = new LocalDataSource();
    getCliData() {
        this.appService.showSideBarMenu(null, "invoices");
        this.superuserviewInvoicestabService.getInvoices(this.appService.orgId).subscribe((res) => {
            this.invoicesList = res['invoices'];
            this.source.load(this.invoicesList);
            });
    }
      ngOnInit() {
      this.appService.showSideBarMenu(null, "invoices");
      this.superuserviewInvoicestabService.getInvoices(this.appService.orgId)
        .subscribe((res: any) => {
            this.invoicesList = res.invoices;
          this.source.load(this.invoicesList);
          });
      if (this.appService.user) {
          this.user = this.appService.user;
      }
  }
    //addNewCli() {
    //    this.dialogService.addDialog(SuperUserViewInvoicestabComponent, {
    //        addNewClient: true,
    //        getClientsData: false,
    //        title: 'Add Client',
    //    }).subscribe((isConfirmed) => {
    //        if (isConfirmed) {
    //            this.superuserviewInvoicestabService.saveNewClient(this.appService.newclitem).subscribe((res) => {
    //                if (res['statusCode'] == 'SUCCESS') {
    //                    this.getCliData();
    //                }
    //            });
    //        }
    //    });
    //}
    clientSave() {
        this.newclitem['accountId'] = this.appService.user.accountId;
        this.newclitem['orgId'] = this.appService.orgId;
        this.newclitem['createdBy'] = this.appService.user.userId;
        if (this.newclitem['status'] == '' || null || undefined) {
            this.newclitem['status'] = "Active";
        }
        this.appService.newclitem = this.newclitem;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }




  //onCreateConfirm(event) : void {
  //    event.newData['accountId'] = this.appService.user.accountId;
  //    event.newData['orgId'] = this.appService.orgId;
  //    event.newData['createdBy'] = this.appService.user.userId;

  //    if (event.newData['status'] == '' || null || undefined) {
  //        event.newData['status'] = "Active";
  //    }
  //    this.superuserviewInvoicestabService.saveNewClient(event.newData).subscribe((res) => {
  //        if (res['statusCode'] == "SUCCESS") {
  //            event.newData['clientId'] = res['clientId'];
  //            event.confirm.resolve(event.newData);
  //        } else {
  //            this.dialogService.addDialog(ConfirmComponent, {
  //                title: 'Error..!',
  //                message: 'Unable to Add Client..!'
  //            });
  //            event.confirm.reject();
  //          }
  //    });
  //}

  //onEditConfirm(event) : void {
  //  this.superuserviewInvoicestabService.updateClient(event.newData, this.appService.user.userId).subscribe((res) => {
  //            this.message = res['statusCode'];
  //            if(this.message === "SUCCESS"){
  //              event.confirm.resolve(event.newData);
  //            } else {
  //                this.dialogService.addDialog(ConfirmComponent, {
  //                    title: 'Error..!',
  //                    message: 'Unable to Edit Client..!'
  //                });
  //              event.confirm.resolve(event.data);
  //            }
  //  });
  //}
  //onDeleteConfirm(clients) {
  //    this.clientName=clients.data.firstName;
  //    this.dialogService.addDialog(ConfirmComponent, {
  //        title: 'Confirmation',
  //        message: 'Are you sure you want to Delete '+this.clientName+' ?'
  //    })
  //        .subscribe((isConfirmed) => {
  //            //Get dialog result
  //            //this.confirmResult = isConfirmed;
  //            if (isConfirmed) {
  //                this.superuserviewInvoicestabService.removeclient(clients.data['clientId'], this.appService.user.userId).subscribe((res) => {
  //                    this.message = res['statusCode'];
  //                    clients.data.clientStatus = "Mark for Deletion";
  //                    clients.confirm.reject();
  //                    this.source.refresh();
  //                 });

  //            }
  //        });
  //}
  onUserRowClick(event): void{
      this.menuComponent.highlightSBLink('Account Details Invoices');
      this.appService.moveToPage("accountdetails-invoice");
    this.appService.clientId = event.data.clientId;

  }

}
