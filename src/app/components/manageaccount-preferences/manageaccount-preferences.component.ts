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
import {ManageAccountpreferencessService} from './manageaccount-preferences.service';


@Component({
    selector: 'app-manageaccount-preferences',
    templateUrl: './manageaccount-preferences.component.html',
    styleUrls: ['./manageaccount-preferences.component.sass']
})
export class ManageAccountPreferencesComponent implements OnInit {

    public products:any=[];
    public discounts:any=[];
    public DefaultResponse = { "status": "Active" };
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
            delete: false
        },
        columns: {
            firstName: {
                title: 'First Name'
            },
            lastName: {
                title: 'Last Name'
            },
            email: {
                title: 'Email'
            },
            phone: {
                title: 'Phone'
            },
            status: {
                title: 'Status',
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    //source: LocalDataSource = new LocalDataSource();
    private user: User;
    constructor(private appService: AppService,private manageAccountpreferencessService:ManageAccountpreferencessService) {
        if (this.appService.user) {
            this.user = this.appService.user;

        }
    }

    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
    getproducts() {
        this.manageAccountpreferencessService.getproductsAccount(this.appService.user.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.products = res['products'];
            }
        });
    }
    getdiscounts() {
        this.manageAccountpreferencessService.getdiscountsAccount(this.appService.user.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.discounts = res['discounts'];

            }
        });
    }
}
