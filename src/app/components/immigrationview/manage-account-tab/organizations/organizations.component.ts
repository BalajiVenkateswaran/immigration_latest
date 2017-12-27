import { User } from '../../../../models/user';
import { AppService } from '../../../../services/app.service';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import {Component, OnInit} from '@angular/core';
import {ManageAccountOrganizationsService} from './organizations.service';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';

export interface ConfirmModel {
  title: string;
  showAddOrgpopup: boolean;
  getOrgsData: boolean;
  editorg: boolean;
  neworgitem: Object;
}

@Component({
  selector: 'ih-manageaccount-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.sass'],
  providers: [ManageAccountOrganizationsService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ManageAccountOrganizationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  private message: string;
  private user: User;
  private selectedOrg: any = {};
  public showAddOrgpopup: boolean;
  public getOrgsData = true;
  public neworgitem: any = {};
  public warningMessage = false;
  public settings;
  public data;
  public paginationData;
  private queryParams;
  constructor(private manageaccountorganizationService: ManageAccountOrganizationsService,
    private appService: AppService, public dialogService: DialogService, public dialog: MatDialog, private menuComponent: MenuComponent,
    private headerService: HeaderService) {
    super(dialogService);
    if (this.headerService.user) {
      this.user = this.headerService.user;
    }
    this.settings = {
        'isDeleteEnable': false,
        'isMorefilters': true,
        'context': {
            'componentParent': this
        },
      'columnsettings': [
        {
          headerName: 'Petitioner Name',
          field: 'orgName'
        },
        {
          headerName: 'Display Name',
          field: 'displayName'
        },
        {
          headerName: 'Type(Regular/Delegated)',
          field: 'orgType'
        },
        {
          headerName: 'Status',
          field: 'orgStatus',
          type: 'dropDown',
          data : [
            {
              display : 'Active',
              value : 'Active'
            },
            {
              display : 'Inactive',
              value : 'Inactive'
            }
          ]
        },
        {
          headerName: 'Email',
          field: 'email'
        }
      ]
    }
  }
  ngOnInit() {
  }
  addNewOrganization() {
    this.dialogService.addDialog(ManageAccountOrganizationsComponent, {
      showAddOrgpopup: true,
      getOrgsData: false,
      title: 'Add Organization',
      editorg: false,
      neworgitem: {
        orgStatus: 'Active',
        orgType: 'Regular'
      }
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.manageaccountorganizationService.saveNewOrganization(this.appService.neworgitem).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message === 'SUCCESS') {
            this.dataWithParameters(this.queryParams);
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
          }
        });
      }
    });
  }
  organizationSave(email) {
    if (this.neworgitem['orgName'] === undefined || this.neworgitem['displayName'] === undefined || this.neworgitem['orgStatus'] === undefined || this.neworgitem['email'] === undefined || this.neworgitem['orgType'] === undefined ||
      this.neworgitem['orgName'] === '' || this.neworgitem['displayName'] === '' || this.neworgitem['orgStatus'] === '' || this.neworgitem['email'] === '' || this.neworgitem['orgType'] === '' ||
      this.neworgitem['orgName'] == null || this.neworgitem['displayName'] == null || this.neworgitem['orgStatus'] == null || this.neworgitem['email'] == null || this.neworgitem['orgType'] == null) {
      this.warningMessage = true;
    } else if (email != null) {
      this.warningMessage = false;
    } else {
      this.warningMessage = false;
      this.neworgitem['accountId'] = this.headerService.user.accountId;
      this.appService.neworgitem = this.neworgitem;
      this.result = true;
      this.close();
    }
  }
  cancel() {
    this.result = false;
    this.close();
  }
  onEditConfirm(event): void {
    this.menuComponent.highlightSBLink('Org Details');
    this.appService.moveToPage('immigrationview/organization/details');
    this.headerService.selectedOrg = event.data;
  }

  public dataWithParameters(queryData: string) {
    if (queryData) {
      this.queryParams = queryData;
    }
    if (this.headerService.user && this.headerService.user.accountId && queryData) {

      this.manageaccountorganizationService
        .getManageAccountOrganizations(this.headerService.user.accountId, queryData)
        .subscribe((res: any) => {
          console.log('PetitionsComponent|ngOnInit|res:%o', res);
          this.data = res['orgs'];
          this.paginationData = res['pageMetadata'];
        });
    }
  }
}
