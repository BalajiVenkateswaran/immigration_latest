import {Component, OnInit} from '@angular/core';
import {ManageAccountOrganizationsService} from "./manageaccount-organizations.service";
import {manageaccountorganization} from "../../models/manageaccountorganization";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../confirmbox/confirm.component';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import {ConfirmorgComponent} from '../confirmbox/confirmorg.component';
import {HeaderService} from '../header/header.service';

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
  templateUrl: './manageaccount-organizations.component.html',
  styleUrls: ['./manageaccount-organizations.component.sass']
})
export class ManageAccountOrganizationsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public delmessage;
  private manageaccountorganizationList: manageaccountorganization[];
  public addOrganization: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  private user: User;
  private selectedOrg: any = {};
  public showAddOrgpopup: boolean;
  public getOrgsData: boolean = true;
  public neworgitem: any = {};
  private orgNamelist;
  public editiorgsFlag: boolean = true;
  public beforeorgsEdit: any;
  public warningMessage: boolean = false;
  public settings;
  public data;
  constructor(private manageaccountorganizationService: ManageAccountOrganizationsService,
    private appService: AppService, public dialogService: DialogService, private menuComponent: MenuComponent, private headerService: HeaderService) {
    super(dialogService);

    this.addOrganization = new FormGroup({
      orgId: new FormControl(''),
      orgName: new FormControl(''),
      orgStatus: new FormControl(''),
      email: new FormControl('')

    });

    if (this.appService.user) {
      this.user = this.appService.user;
    }
    this.settings = {
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
  OrganizationSave(email) {
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
  onDeleteConfirm(event): void {
    console.log("User table onDeleteConfirm event: %o", event.data);
    this.delmessage = event.data.orgName
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {

        if (isConfirmed) {
          this.manageaccountorganizationService.deleteOrganization(event.data['orgId'], this.appService.user.userId).subscribe((res) => {
            this.message = res['statusCode'];
            if (this.message == 'SUCCESS') {
              this.getorganizationData();
            }
          });

        }
      });
  }

  addOrganizationSubmit(model: manageaccountorganization, isValid: boolean) {
    console.log('formdata|account: %o|isValid:%o', model, isValid);
    if (isValid) {
      this.manageaccountorganizationService.saveNewOrganization(model).subscribe((status) => {this.message = status[0]});
    } else {
      this.message = "Filled etails are not correct! please correct...";
    }

  }
  onEditConfirm(event): void {
    this.menuComponent.highlightSBLink('Org Details');
    this.appService.moveToPage("organization");
    console.log(event.data.orgName);
    this.headerService.selectedOrg = event.data;
  }
}
