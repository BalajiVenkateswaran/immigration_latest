import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {superuserinvoice} from "../../models/superuserinvoice";
import {AccountInvoiceService} from './invoice.service';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {User} from "../../models/user";


export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    addInvoice: boolean;
}

@Component({
    selector: 'account-invoice',
    templateUrl: './invoice-component.html'
})
export class AccountInvoiceComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getInvoice: boolean = true;
    public addInvoice: boolean;
    public accountInvoice: boolean = false;
    private user: User;  
    public AccountInvoices: any;
    public viewRowDetails: any = {};
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
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
                title: 'PDF uploaded'
            },
            download: {
                title: 'Download Button'
            },
            viewDetails: {
                title:'View Details'
            }      
        },
        pager: {
            display: true,
            perPage: 10
        },
        mode: 'external'
    };
    constructor(public appService: AppService, public dialogService: DialogService, public accountInvoiceService: AccountInvoiceService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = appService.user;
        }
    }
    source: LocalDataSource = new LocalDataSource();
    ngOnInit() {
        this.appService.showSideBarMenu("accounts", "accounts");
        this.accountInvoiceService.getAccountInvoice(this.user.accountId)
            .subscribe((res) => {
                console.log("getinoices%o", res);
                if (res['invoices']) {
                    this.AccountInvoices = res['invoices'];
                }
                console.log(this.AccountInvoices);
                
            });
        //this.source.load(this.AccountInvoices);
    }
    
    onDeleteConfirm(event): void { }
    onEditConfirm(event): void { }
    addNewInvoice(){
        this.dialogService.addDialog(AccountInvoiceComponent, {
            addInvoice: true,
            getInvoice: false,
            title: 'Add Invoice'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
             
            }
        });
    }
    cancel() {
        this.result = false;
        this.close();
    }

    getInvoiceInfo(rowdata) {
        this.accountInvoice = true;
        this.viewRowDetails = rowdata;
    }
}