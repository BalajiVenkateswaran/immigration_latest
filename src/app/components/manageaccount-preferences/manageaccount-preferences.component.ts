import { Component, OnInit } from '@angular/core';
import {client} from "../../models/client";
import {FormGroup, FormControl} from "@angular/forms";
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
    public settings;
    public data;   
    public settings1;
    public data1;   
    private user: User;
    constructor(private appService: AppService,private manageAccountpreferencessService:ManageAccountpreferencessService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.settings= {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "name",
                },
                {

                    headerName: "Code",
                    field: "code",
                },
                {

                    headerName: "Description",
                    field: "description"
                },
                {
                    headerName: "Start Date",
                    field: "startDate"
                },
                {

                    headerName: "End Date",
                    field: "endDate"
                },
                {

                    headerName: "Max Users",
                    field: "maxUsers"
                },
                {

                    headerName: "Max Clients/Month",
                    field: "maxClientsPerMonth"
                },
                {
                    headerName: "Max Petitions/Month",
                    field: "maxPetitionsPerMonth"
                },
                {

                    headerName: "Max S3 Storage",
                    field: "maxS3Storage"
                },
                {

                    headerName: "Cost",
                    field: "cost"
                },

            ]
        }
        this.settings1 = {
            "isAddButtonEnable": false,
            "isDeleteEnable": false,
            'columnsettings': [
                {

                    headerName: "Name",
                    field: "discountName",
                },
                {

                    headerName: "Code",
                    field: "discountCode",
                },
                {

                    headerName: "Description",
                    field: "description"
                },
                {
                    headerName: "Start Date",
                    field: "startDate"
                },
                {

                    headerName: "End Date",
                    field: "endDate"
                },
                {

                    headerName: "Cost",
                    field: "cost"
                },
                {

                    headerName: "Percentage",
                    field: "percentage"
                }

            ]
        }
    }

    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
    getproducts() {
        this.manageAccountpreferencessService.getproductsAccount(this.appService.user.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.data = res['products'];
            }
        });
    }
    getdiscounts() {
        this.manageAccountpreferencessService.getdiscountsAccount(this.appService.user.accountId).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                this.data1 = res['discounts'];

            }
        });
    }
}
