import { Component, OnInit } from '@angular/core';
import {client} from "../../models/client";
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
import { ManageAccountInvoiceService } from "./manageaccount-invoices.service";


export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    viewPopup:boolean;
    invoice: Object;

}
@Component({
    selector: 'app-manageaccount-invoices',
    templateUrl: './manageaccount-invoices.component.html',
    styleUrls: ['./manageaccount-invoices.component.sass']
})
export class ManageAccountInvoicesComponent extends DialogComponent<ConfirmModel, boolean>  implements OnInit {
    public getInvoice: boolean = true;
    public viewPopup:boolean;
    public AccountInvoices: any;
    public DefaultResponse = { "status": "Active" };
    public invoice:any;
    public isEditInvoice:boolean=true;
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
            delete: false,
            add: false,
            edit: false
        },
        columns: {
            invoiceNumber: {
                title: 'Invoice Number'
            },
            invoiceDate: {
                title: 'Invoice Date'
            },
            invoiceAmount: {
                title: 'Invoice Amount'
            },
            paymentReceived: {
                title: 'Payment Received'
            },
            pdfUploaded: {
                title: 'PDF uploaded',
            },
            downloadButton: {
                title: 'Download Button',
            },
            viewDetails: {
                title: 'View Details',
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    //source: LocalDataSource = new LocalDataSource();
    private user: User;
    constructor(private appService: AppService,public dialogService: DialogService,private manageAccountInvoiceService:ManageAccountInvoiceService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;

        }
    }
    

    ngOnInit() {
         this.manageAccountInvoiceService.getAccountInvoice(this.user.accountId)
            .subscribe((res) => {
                console.log("getinoices%o", res);
                if (res['invoices']) {
                    this.AccountInvoices = res['invoices'];
                }
                console.log(this.AccountInvoices);
                
            });
    }
    getDetails() {
        
    }
    getInvoiceInfo(rowdata) {
        //this.invoice=rowdata;
        this.dialogService.addDialog(ManageAccountInvoicesComponent, {
            title: 'View Invoice Details',
            viewPopup: true,
            getInvoice: false,
            invoice:rowdata,
        })
    }
    downloadInvoice(rowData) {
        this.manageAccountInvoiceService.downloadInvoice(rowData.invoiceId)
            .subscribe((res) => {

            });
    }
    cancel(){
         this.close();
    }
}
