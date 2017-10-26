import { client } from '../../../../models/client';
import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from "./clients.service";
import { FormGroup, FormControl } from "@angular/forms";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {SortType} from "../../../framework/smarttable/types/query-parameters";


export interface ConfirmModel {
  title: string;
  message: string;
  addNewClient: boolean;
  addMorefilters: boolean;
  getClientsData: boolean;
}


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public queryParams: any;
  private message: string;
  private clientName: any;
  public addNewClient: boolean;
  public addMorefilters: boolean;
  public getClientsData: boolean = true;
  public newclitem: any = {};
  public warningMessage: boolean = false;
  public settings;
  public data;
  public paginationData;
  constructor(private clientService: ClientsService, private appService: AppService,
    public dialogService: DialogService, private menuComponent: MenuComponent,
    private headerService: HeaderService) {
    super(dialogService);

    this.settings = {
      'columnFilter': false,
      'isDeleteEnable': false,
      'customPanel': true,
      'isAddFilterButtonEnable':true,
      'defaultFilter': [{
          headingName: "status",
          headerName: "Status",
          filterValue: "Active"
        }
      ],
      filter : {
        quick : [
          {
            headerName : 'Status',
            field : 'status',
            values : [
              {alias : 'Active', value : 'Active'},
              {alias : 'Inactive', value : 'Inactive'}
            ]
          }
        ]
      },
      'sort' : [{
        headingName: "lastUpdate",
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: "First Name",
          field: "firstName"
        },
        {
          headerName: "Last Name",
          field: "lastName"
        },
        {
          headerName: "Email Address",
          field: "email"
        },
        {
          headerName: "Phone",
          field: "phone"
        },
        {
          headerName: "Status",
          field: "status"
        },
        {
          headerName: "Open Petitions",
          field: "openPetitions"
        }
        ]

    }
  }


  ngOnInit() {
    this.headerService.showSideBarMenu(null, "clients");
    this.headerService.showSideBarMenu(null, "clients");
  }
  getClients(){

  }
  filteradd() {
      this.dialogService.addDialog(ClientsComponent, {
          addMorefilters: true,
          getClientsData: false,
          title: 'Add Client',
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
              //this.clientService.saveNewClient(this.appService.newclitem).subscribe((res) => {
              //    if (res['statusCode'] == 'SUCCESS') {
              //        this.clientService.getClients(this.queryParams, this.headerService.selectedOrg['orgId']).subscribe(
              //            (res) => {
              //                this.data = res['clients'];
              //                this.paginationData = res['pageMetadata'];

              //            }
              //        )
              //    }
              //    if (res['statusDescription'] == 'Duplicate client') {
              //        this.dialogService.addDialog(ConfirmComponent, {
              //            title: 'Error..!',
              //            message: 'User already Exists'
              //        })
              //    }
              //});
          }
      });
  }

  addNewCli() {
    this.dialogService.addDialog(ClientsComponent, {
      addNewClient: true,
      getClientsData: false,
      title: 'Add Client',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.clientService.saveNewClient(this.appService.newclitem).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.clientService.getClients(this.queryParams,this.headerService.selectedOrg['orgId']).subscribe(
              (res)=>{
                this.data = res['clients'];
                this.paginationData = res['pageMetadata'];

              }
            )
          }
          if (res['statusDescription'] == 'Duplicate client') {
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error..!',
              message: 'User already Exists'
            })
          }
        });
      }
    });
  }
  capitialize(data){
    if(this.newclitem['firstName']){
      this.newclitem['firstName']=data['firstName'].split(' ').map(item=>{return item.charAt(0).toUpperCase()+item.slice(1)}).join(' ');
    }
    if(this.newclitem['lastName']){
      this.newclitem['lastName']=data['lastName'].split(' ').map(item=>{return item.charAt(0).toUpperCase()+item.slice(1)}).join(' ');
    }
  }
  clientSave(email, phone) {
    this.newclitem['accountId'] = this.headerService.user.accountId;
    this.newclitem['orgId'] = this.headerService.selectedOrg['orgId'];
    this.newclitem['createdBy'] = this.headerService.user.userId;
    if (this.newclitem['status'] == '' || null || undefined) {
      this.newclitem['status'] = "Active";
    }

    if (this.newclitem['firstName'] == '' || this.newclitem['firstName'] == null || this.newclitem['firstName'] == undefined || this.newclitem['lastName'] == '' || this.newclitem['lastName'] == null || this.newclitem['lastName'] == undefined || this.newclitem['email'] == '' || this.newclitem['email'] == null || this.newclitem['email'] == undefined || this.newclitem['phone'] == '' || this.newclitem['phone'] == null || this.newclitem['phone'] == undefined) {
      this.warningMessage = true;
    }
    else if (email != null || phone != null) {
      this.warningMessage;
    }
    else {
      this.warningMessage = false;
      this.appService.newclitem = this.newclitem;
      this.result = true;
      this.close();
    }


  }
  cancel() {
    this.result = false;
    this.close();
  }



  onDeleteConfirm(clients) {
    this.clientName = clients.data.firstName;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.clientName + ' ?'
    })
      .subscribe((isConfirmed) => {
        //Get dialog result
        if (isConfirmed) {
          this.clientService.removeclient(clients.data['clientId'], this.headerService.user.userId).subscribe((res) => {
            this.message = res['statusCode'];
            clients.data.clientStatus = "Mark for Deletion";
            clients.confirm.reject();
          });

        }
      });
  }
  onUserRowClick(event): void {
    this.menuComponent.highlightSBLink('Client Details');
    this.appService.moveToPage("immigrationview-client-details");
    this.appService.clientId = event.data.clientId;

  }
  dataWithParameters(queryData) {
    if(queryData){
      this.queryParams=queryData;
    }
    this.clientService.getClientsWithQueryParams(this.headerService.selectedOrg['orgId'], queryData).subscribe(
      res => {
        this.data = res['clients'];
        this.paginationData = res['pageMetadata'];
      })
  }


}
