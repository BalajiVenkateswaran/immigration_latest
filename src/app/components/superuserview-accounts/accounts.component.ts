import { Component, OnInit } from '@angular/core';
import {superUserviewAccountService} from "./accounts.component.service";
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


export interface ConfirmModel {
    title: string;
    message: string;
    addNewClient: boolean;
    getClientsData: boolean;

}


@Component({
    selector: 'app-clients',
    templateUrl: './accounts.component.html'
})
export class superuserViewAccountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private clientList: client[];
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
                title: 'Phone',
                class: 'clientTable-phone'
            },
            status: {
                title: 'Status',
                class: 'clientTable-status',
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            {
                                value: "Active",
                                title: "Active",
                            },
                            {
                                value: "Inactive",
                                title: "Inactive"
                            }
                        ]
                    }
                }
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    //source: LocalDataSource = new LocalDataSource();
    constructor(private clientService: superUserviewAccountService, private appService: AppService, private router: Router, public dialogService: DialogService, private menuComponent: MenuComponent) {
        super(dialogService);
        //this.addClient = new FormGroup({
        //    firstName: new FormControl(''),
        //    lastName: new FormControl(''),
        //    email: new FormControl(''),
        //    phone: new FormControl(''),
        //    statusId: new FormControl('')

        //});
    }
    source: LocalDataSource = new LocalDataSource();
    getCliData() {
        this.appService.showSideBarMenu(null, "accounts");
        this.clientService.getClients(this.appService.orgId).subscribe((res) => {
            this.clientList = res['clients'];
            this.clientList.forEach(client => {
                if (client.markForDeletion)
                    client.status = 'Mark for Deletion';
            });
            this.source.load(this.clientList);

            if (this.appService.user) {
                this.user = this.appService.user;
            }
        });
    }
    //ngOnInit() {
    //    this.getCliData();
    //}
    ngOnInit() {
        this.appService.showSideBarMenu(null, "accounts");
        this.clientService
            .getClients(this.appService.orgId)
            .subscribe((res: any) => {
                this.clientList = res.clients;
                this.clientList.forEach(client => {
                    if (client.markForDeletion)
                        client.status = 'Mark for Deletion';
                });
                this.source.load(this.clientList);

                console.log(this.data);
                console.log(this.clientList);
            });
        if (this.appService.user) {
            this.user = this.appService.user;
        }


    }
    addNewCli() {
        this.dialogService.addDialog(superuserViewAccountsComponent, {
            addNewClient: true,
            getClientsData: false,
            title: 'Add Client',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.clientService.saveNewClient(this.appService.newclitem).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getCliData();
                    }
                });
            }
        });
    }
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




    onCreateConfirm(event): void {
        event.newData['accountId'] = this.appService.user.accountId;
        event.newData['orgId'] = this.appService.orgId;
        event.newData['createdBy'] = this.appService.user.userId;

        if (event.newData['status'] == '' || null || undefined) {
            event.newData['status'] = "Active";
        }
        this.clientService.saveNewClient(event.newData).subscribe((res) => {
            if (res['statusCode'] == "SUCCESS") {
                event.newData['clientId'] = res['clientId'];
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Add Client..!'
                });
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        this.clientService.updateClient(event.newData, this.appService.user.userId).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message === "SUCCESS") {
                event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit Client..!'
                });
                event.confirm.resolve(event.data);
            }
        });
    }
    onDeleteConfirm(clients) {
        this.clientName = clients.data.firstName;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.clientName + ' ?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.clientService.removeclient(clients.data['clientId'], this.appService.user.userId).subscribe((res) => {
                        this.message = res['statusCode'];
                        clients.data.clientStatus = "Mark for Deletion";
                        clients.confirm.reject();
                        this.source.refresh();
                    });

                }
            });
    }
    onUserRowClick(event): void {
        this.menuComponent.highlightSBLink('Account Details');
        this.appService.moveToPage("account-details");
        this.appService.clientId = event.data.clientId;
    }

}