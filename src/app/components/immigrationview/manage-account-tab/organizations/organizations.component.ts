import { manageaccountorganization } from '../../../../models/manageaccountorganization';
import { User } from '../../../../models/user';
import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { HeaderService } from '../../../common/header/header.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import {Component, OnInit} from '@angular/core';
import {ManageAccountOrganizationsService} from "./organizations.service";
import {FormGroup, FormControl} from "@angular/forms";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";

export interface ConfirmModel {
  title: string;
  message: string;
  showAddOrgpopup: boolean;
  getOrgsData: boolean;
  editorg: boolean;
  neworgitem: Object;
}

@Component({
  selector: 'app-manageaccount-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.sass']
})
export class ManageAccountOrganizationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  private message: string;
  private user: User;
  private selectedOrg: any = {};
  public showAddOrgpopup: boolean;
  public getOrgsData: boolean = true;
  public neworgitem: any = {};
  public warningMessage: boolean = false;
  public settings;
  public data;
  constructor(private manageaccountorganizationService: ManageAccountOrganizationsService,
    private appService: AppService, public dialogService: DialogService, private menuComponent: MenuComponent, 
    private headerService: HeaderService) {
    super(dialogService);
    if (this.appService.user) {
      this.user = this.appService.user;
    }
    this.settings = {
        'isDeleteEnable': false,
        'context': {
            'componentParent': this
        },
      'columnsettings': [
        {
          headerName: "Org Name",
          field: "orgName"
        },
        {
          headerName: "Display Name",
          field: "displayName"
        },
        {
          headerName: "Type(Regular/Delegated)",
          field: "orgType"
        },
        {
          headerName: "Status",
          field: "orgStatus"
        },
        {
          headerName: "Email",
          field: "email"
        }
      ]
    }



  }
  getorganizationData() {
    this.manageaccountorganizationService.getManageAccountOrganizations(this.appService.user.accountId).subscribe((res: any) => {
      this.data = res['orgs'];
    });
  }
  ngOnInit() {
    this.manageaccountorganizationService
      .getManageAccountOrganizations(this.appService.user.accountId)
      .subscribe((res: any) => {
        console.log("PetitionsComponent|ngOnInit|res:%o", res);
        this.data = res['orgs'];
      });
  }
  addNewOrganization() {
    this.dialogService.addDialog(ManageAccountOrganizationsComponent, {
      showAddOrgpopup: true,
      getOrgsData: false,
      title: 'Add Organization',
      editorg: false,

    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.manageaccountorganizationService.saveNewOrganization(this.appService.neworgitem).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
            this.getorganizationData();
          } else {
            this.dialogService.addDialog(ConfirmComponent, {
              title: 'Error..!',
              message: 'Unable to Add organization.'
            });
          }

        });
      }
    });
  }
  organizationSave(email) {
    if (this.neworgitem['orgName'] == undefined || this.neworgitem['displayName'] == undefined || this.neworgitem['orgStatus'] == undefined || this.neworgitem['email'] == undefined || this.neworgitem['orgType'] == undefined ||
      this.neworgitem['orgName'] == "" || this.neworgitem['displayName'] == "" || this.neworgitem['orgStatus'] == "" || this.neworgitem['email'] == "" || this.neworgitem['orgType'] == "" ||
      this.neworgitem['orgName'] == null || this.neworgitem['displayName'] == null || this.neworgitem['orgStatus'] == null || this.neworgitem['email'] == null || this.neworgitem['orgType'] == null) {
      this.warningMessage = true;
    } else if (email != null) {
      this.warningMessage = false;
    }
    else {
      this.warningMessage = false;
      this.neworgitem['accountId'] = this.appService.user.accountId;
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
    this.appService.moveToPage("organization");
    this.headerService.selectedOrg = event.data;
  }
}
