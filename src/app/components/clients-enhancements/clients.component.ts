import { Component, OnInit } from '@angular/core';
import {ClientsEnhansmentsService} from "./clients.service";
import {client} from "../../models/client";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { HeaderService } from '../header/header.service';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsEnhansmentsComponent implements OnInit {

    private clientList: any[];
    public addClient: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data;
    private user: User;
    private deleteclients: any;
    private clientName: any;
    showNofRecords: any[];
    private filteredclientList: any[];

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
            delete :  false
        }
        /*delete: {
            deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmDelete: true
        }*/,
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
                class: 'clienttblstatus',
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
    source: LocalDataSource = new LocalDataSource();
    constructor(private clientService: ClientsEnhansmentsService, private appservice: AppService, 
      private router: Router, private dialogService: DialogService, private headerService: HeaderService) {
        this.addClient = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            phone: new FormControl(''),
            statusId: new FormControl('')

        });  }

  ngOnInit() {
    this.appservice.showSideBarMenu(null, "clients");
    this.clientService
        .getClients(this.headerService.selectedOrg['orgId'])
        .subscribe((res: any) => {
            console.log("ClientsComponent|ngOnInit|res:%o", res);
            this.clientList = res.clients;
            this.clientList.forEach(client => {
                if (client.markForDeletion)
                    client.status = 'Mark for Deletion';
            });
            this.source.load(this.clientList);
        });

    if (this.appservice.user) {
        this.user = this.appservice.user;
    }

    this.showNofRecords = ['10', '5', '50', '100' ]
    }
  setRecordsPerpage(event) {
      console.log(event.target.value);
      this.clientService
          .getClients(this.headerService.selectedOrg['orgId'])
          .subscribe((res: any) => {
              this.clientList = res.clients;
              this.filteredclientList = [];
              for (var i = 0, len = this.clientList.length; i < len; i++) {
                  this.clientList[i].srNo = i + 1;
                  if (event.target.value >= this.clientList[i].srNo) {
                      this.filteredclientList.push(this.clientList[i]);
                      console.log(this.filteredclientList);
                  }
              }
              this.source.load(this.filteredclientList);
              this.clientList.forEach(client => {
                  if (client.markForDeletion)
                      client.status = 'Mark for Deletion';
              });

          });

  }

  onCreateConfirm(event) : void {
      console.log("Client table onCreateConfirm event: %o",event.newData);
      event.newData['accountId'] = this.appservice.user.accountId;
      event.newData['orgId'] = this.headerService.selectedOrg['orgId'];
      event.newData['createdBy'] = this.appservice.user.userId;

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

  onEditConfirm(event) : void {
    console.log("Client table onEditConfirm event: %o",event.newData);
    this.clientService.updateClient(event.newData, this.appservice.user.userId).subscribe((res) => {
              this.message = res['statusCode'];
              if(this.message === "SUCCESS"){
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

  //onDeleteConfirm(event) : void {
  //  console.log("Client table onDeleteConfirm event: %o",event.data);
  //  //TODO - call delete backend
  //}
  onDeleteConfirm(clients) {
      this.clientName=clients.data.firstName;
      this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirmation',
          message: 'Are you sure you want to Delete '+this.clientName+' ?'
      })
          .subscribe((isConfirmed) => {
              //Get dialog result
              //this.confirmResult = isConfirmed;
              if (isConfirmed) {
                  this.clientService.removeclient(clients.data['clientId'], this.appservice.user.userId).subscribe((res) => {
                      this.message = res['statusCode'];
                      clients.data.clientStatus = "Mark for Deletion";
                      clients.confirm.reject();
                      this.source.refresh();
                   });

              }
          });
  }
  onUserRowClick(event): void{
    console.log("ClientsComponent|onUserRowClick|rowData:%o",event.data);
    this.appservice.moveToPage("immigrationview-client-details");
    this.appservice.clientId = event.data.clientId;
  }

}
