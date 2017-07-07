import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {superuserinvoice} from "../../models/superuserinvoice";
import {AccountInvoiceService} from './invoice.service';
import {User} from "../../models/user";
import {FormGroup, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {AccountDetailsCommonService} from "../superuserview/accounts-tab/account-details/common/account-details-common.service";


export interface ConfirmModel {
    title: string;
    message: string;
    getInvoice: boolean;
    addInvoice: boolean;
    viewPopup:boolean;
    invoice: Object;
}

@Component({
    selector: 'account-invoice',
    templateUrl: './invoice-component.html'
})
export class AccountInvoiceComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getInvoice: boolean = true;
    public addInvoice: boolean;
    public accountInvoice: boolean = false;
    public AccountInvoices: any;
    public viewRowDetails: any = {};
    public isEditInvoice:boolean=true;
    public invoice: any;
    public viewPopup: boolean;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };

    constructor(public appService: AppService, public dialogService: DialogService, public accountInvoiceService: AccountInvoiceService,
    private accountDetailsCommonService: AccountDetailsCommonService) {
        super(dialogService);
    }
    ngOnInit() {
        this.accountInvoiceService.getAccountInvoice(this.accountDetailsCommonService.accountId)
            .subscribe((res) => {
                console.log("getinoices%o", res);
                if (res['invoices']) {
                    this.AccountInvoices = res['invoices'];
                }
                console.log(this.AccountInvoices);
            });
    }

    onDeleteConfirm(event): void { }
    onEditConfirm(event): void { }

    getInvoiceInfo(rowdata) {
        //this.invoice=rowdata;
        this.dialogService.addDialog(AccountInvoiceComponent, {
            title: 'View Invoice Details',
            viewPopup: true,
            getInvoice: false,
            addInvoice:false,
            invoice:rowdata,
        })
    }
    downloadInvoice(rowData) {
        this.accountInvoiceService.downloadInvoice(rowData.invoiceId)
            .subscribe((res) => {

            });
    }

    cancel(){
         this.close();
    }
}
