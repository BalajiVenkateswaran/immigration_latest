import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../../common/header/header.service';
import {MenuComponent} from '../../../common/menu/menu.component';
import {StatusButtonComponent} from './statusButton';
import {Component, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {SortType} from '../../../framework/smarttable/types/query-parameters';
import {Router} from '@angular/router';
import {ImmigrationClientCommonService} from '../client-details/common/immigration-client.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {ConfirmationDialogComponent} from '../../../framework/popup/confirmation/confirmation.component';

export interface ConfirmModel {
  title: string;
  message: string;
  addNewClient: boolean;
  addMorefilters: boolean;
  getClientsData: boolean;
}

@Component({
  selector: 'ih-immigrationview-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass'],
  entryComponents: [SmartTableFrameworkComponent, StatusButtonComponent]
})
export class ClientsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public saveButtonProgress = false;
  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: null
  };

  private message: string;
  private clientName: any;
  public addNewClient: boolean;
  public addMorefilters: boolean;
  public getClientsData = true;
  public newclitem: any = {};
  public warningMessage = false;
  public settings;

  // More filter popup variables
  public openPetitions: string;
  public status: string;
  public phoneNumber: string;
  public email: string;
  public lastName: string;
  public firstName: string;
  private orgId: string;
  public statusTypes: any = [];

  constructor(private router: Router, private clientService: ClientsService, private appService: AppService,
    public dialogService: DialogService, public dialog: MatDialog, private menuComponent: MenuComponent,
    private headerService: HeaderService, private immigrationClientCommonService: ImmigrationClientCommonService) {
    super(dialogService);
    console.log('Clients component constructor');

    this.statusTypes = [
      {
        'display': 'Active',
        'value': 'Active'
      },
      {
        'display': 'Inactive',
        'value': 'Inactive'
      }
    ];

    this.settings = {
      'columnFilter': false,
      'isDeleteEnable': false,
      'customPanel': true,
      'isAddFilterButtonEnable': true,
      'isMorefilters': true,
      'defaultFilter': [{
          headingName: 'status',
          headerName: 'Status',
          filterValue: 'Active'
      }
      ],
      filter: {
        types: [
          {
            field: 'lastUpdate',
            operator: '>'
          }
          ],
          quick: [
              {
                  headerName: 'Status',
                  field: 'status',
                  values: [
                      { alias: 'Active', value: 'Active' },
                      { alias: 'Inactive', value: 'Inactive' }
                  ]
              }
          ]
      },
      'sort': [{
          headingName: 'lastUpdate',
          sort: SortType.DESC
      }],
      gridOptions: {
        getRowStyle: function(params) {
          if (params.data.markForDeletion) {
            return {
              color: 'red !important'
            };
          } else {
            return null;
          }
        }
      },
      'columnsettings': [
          {
              headerName: 'First Name',
              field: 'firstName',
              type: 'text'
          },
          {
              headerName: 'Last Name',
              field: 'lastName',
              type: 'text'
          },
          {
              headerName: 'Email Address',
              field: 'email',
              type: 'text'
          },
          {
              headerName: 'Phone',
              field: 'phone',
              type: 'text'
          },
          {
              headerName: 'Status',
              field: 'status',
              cellRendererFramework: StatusButtonComponent,
              type: 'dropDown',
              data: this.statusTypes
          },
          {
            headerName: 'Last Update',
            field: 'lastUpdate',
            type: 'datePicker'
          },
          {
              headerName: 'Petitions',
              field: 'openPetitions',
              headerTooltip: 'Open/Total Petitions',
              type: 'text'
          }
      ]
    };
  }

    ngOnInit() {
      this.headerService.showSideBarMenu(null, 'immigrationview/tab/clients');
      this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    }
    filteradd() {
        console.log('Filter Add');
        this.dialogService.addDialog(ClientsComponent, {
            addMorefilters: true,
            getClientsData: false,
            title: 'Add Client',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
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

            }
        });
    }
    capitialize(data) {
        if (this.newclitem['firstName']) {
            this.newclitem['firstName'] = data['firstName'].split(' ').map(item => { return item.charAt(0).toUpperCase() + item.slice(1) }).join(' ');
        }
        if (this.newclitem['lastName']) {
            this.newclitem['lastName'] = data['lastName'].split(' ').map(item => { return item.charAt(0).toUpperCase() + item.slice(1) }).join(' ');
        }
    }
    clientSave(email, phone) {
        this.saveButtonProgress = true;
        this.newclitem['accountId'] = this.headerService.user.accountId;
        this.newclitem['orgId'] = this.headerService.selectedOrg['orgId'];
        this.newclitem['createdBy'] = this.headerService.user.userId;
        if (this.newclitem['status'] === '' || null || undefined) {
            this.newclitem['status'] = 'Active';
        }

        if (this.newclitem['firstName'] === '' || this.newclitem['firstName'] == null || this.newclitem['firstName'] === undefined
          || this.newclitem['lastName'] === '' || this.newclitem['lastName'] == null || this.newclitem['lastName'] === undefined
          || this.newclitem['email'] === '' || this.newclitem['email'] == null || this.newclitem['email'] === undefined
          || this.newclitem['phone'] === '' || this.newclitem['phone'] == null || this.newclitem['phone'] === undefined) {
            this.warningMessage = true;
            this.saveButtonProgress = false;
        } else if (email != null || phone != null) {

        } else {
            this.warningMessage = false;
            this.appService.newclitem = this.newclitem;
            this.result = true;

          //Add new client
          this.clientService.saveNewClient(this.appService.newclitem).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
              this.clientService.getClients(this.clientService.queryParams, this.headerService.selectedOrg['orgId']).subscribe(
                (res1) => {
                  this.clientService.data = res1['clients'];
                  this.clientService.paginationData = res1['pageMetadata'];
                  this.saveButtonProgress = false;
                  this.close();
                }
              );
            } else {
              let message = res['statusDescription'];
              if (res['statusDescription'] === 'Duplicate client') {
                message = 'User already Exists';
              }
              this.dialog.open(InformationDialogComponent, {
                data: {
                  title: 'Error',
                  message: message
                }
              });
              this.saveButtonProgress = false;
              this.close();
            }
          });
        }
    }

    cancel() {
        this.result = false;
        this.close();
    }

    onDeleteConfirm(clients) {
        this.clientName = clients.data.firstName;
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
              message: 'Are you sure you want to Delete ' + this.clientName + ' ?'
            }
        }).afterClosed()
          .subscribe((isConfirmed) => {
              // Get dialog result
              if (isConfirmed) {
                  this.clientService.removeclient(clients.data['clientId'], this.headerService.user.userId).subscribe((res) => {
                      this.message = res['statusCode'];
                      clients.data.clientStatus = 'Mark for Deletion';
                      clients.confirm.reject();
                  });
              }
          });
    }
    onUserRowClick(event): void {
        this.menuComponent.highlightSBLink('Petitions');
        this.appService.moveToPage('immigrationview/client/detail/petitions');
        this.immigrationClientCommonService.clientId = event.data.clientId;
        this.immigrationClientCommonService.userId = event.data.userId;
        this.appService.clientId = event.data.clientId;
    }
}
