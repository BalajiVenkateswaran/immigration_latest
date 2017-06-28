import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {superuserinvoice} from "../../models/superuserinvoice";
import {AccountInvoiceService} from './invoice.service';


@Component({
    selector: 'account-invoice',
    templateUrl: './invoice-component.html'
})
export class AccountInvoiceComponent implements OnInit {
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
    constructor(public appService: AppService, public dialogService: DialogService) { }
    ngOnInit() { }
}