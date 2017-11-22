import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { StatusButton } from './statusButton';
import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import {SortType} from '../../../framework/smarttable/types/query-parameters';
import {Router} from '@angular/router';
import {ImmigrationClientCommonService} from '../client-details/common/immigration-client.service';


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
    public dialogService: DialogService, private menuComponent: MenuComponent,
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
                    cellRendererFramework: StatusButton,
                    type: 'dropDown',
                    data: this.statusTypes
                },
                {
                  headerName: 'Last Update',
                  field: 'lastUpdate'
                },
                {
                    headerName: 'Open Petitions',
                    field: 'openPetitions',
                    type: 'text'
                }
            ]

        }
    }


    ngOnInit() {
      this.headerService.showSideBarMenu(null, 'clients');
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
                this.clientService.saveNewClient(this.appService.newclitem).subscribe((res) => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.clientService.getClients(this.clientService.queryParams, this.headerService.selectedOrg['orgId']).subscribe(
                            (res1) => {
                                this.clientService.data = res1['clients'];
                                this.clientService.paginationData = res1['pageMetadata'];
                            }
                        )
                    } else {
                      let message = res['statusDescription'];
                      if (res['statusDescription'] === 'Duplicate client') {
                        message = 'User already Exists';
                      }
                      this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: message
                      })
                    }

                });
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
        } else if (email != null || phone != null) {

        } else {
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
        this.appService.moveToPage('immigrationview-petitions');
        this.immigrationClientCommonService.clientId = event.data.clientId;
        this.immigrationClientCommonService.userId = event.data.userId;
        this.appService.clientId = event.data.clientId;
    }

}
