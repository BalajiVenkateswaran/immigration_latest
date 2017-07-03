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
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';

export interface ConfirmModel {
    title: string;
    message: string;
    getacntpref: boolean;
    adddprdctPref: boolean;
    adddiscntPref: boolean;
    editprdct: boolean;
    editdscnt: boolean;
}

@Component({
    selector: 'app-account-preferences',
    templateUrl: './accountpreferences.component.html',
    styleUrls: ['./accountpreferences.component.sass']
})
export class AccountPreferencesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {


    public DefaultResponse = { "status": "Active" };
    public getacntpref: boolean = true;
    public adddAcntPref: boolean;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public editproduct: any;
    public editdiscount: any;
    //settings = {

    //    add: {
    //        addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
    //        createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmCreate: true
    //    },
    //    edit: {
    //        editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
    //        saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
    //        cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
    //        confirmSave: true
    //    },
    //    actions: {
    //        delete: false
    //    },
    //    columns: {
    //        firstName: {
    //            title: 'First Name'
    //        },
    //        lastName: {
    //            title: 'Last Name'
    //        },
    //        email: {
    //            title: 'Email'
    //        },
    //        phone: {
    //            title: 'Phone'
    //        },
    //        status: {
    //            title: 'Status',
    //        }
    //    },
    //    pager: {
    //        display: true,
    //        perPage: 10
    //    }
    //};
    //source: LocalDataSource = new LocalDataSource();
    private user: User;
    constructor(private appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;

        }
    }
    addEditProduct(value) {
        if (value == "edit") {
            var productlable = "Edit";
            this.editproduct = true;
        }
        if (value == "add") {
            var productlable = "Add";
            this.editproduct = false;
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddprdctPref: true,
            getacntpref: false,
            title: productlable + ' Product',
            editprdct: this.editproduct    
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }
    addEditDiscount(value) {
        if (value == "edit") {
            var productlable = "Edit";
            this.editdiscount = true;
        }
        if (value == "add") {
            var productlable = "Add";
            this.editdiscount = false;
        }
        this.dialogService.addDialog(AccountPreferencesComponent, {
            adddiscntPref: true,
            getacntpref: false,
            title: productlable + ' Discount',
            editdscnt: this.editdiscount    

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }
    ngOnInit() {
    }
}
