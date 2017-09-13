import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {clientviewpetition} from "../../../models/clientviewpetitions";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {User} from "../../../models/user";
import {ConfirmComponent} from '../../framework/confirmbox/confirm.component';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {MoreDetails} from './MoreDetails';
import { ClientViewPetitionsService } from './petitions.service';
import {SortType} from "../../framework/smarttable/types/query-parameters";
export interface ConfirmModel {
  title: string;
  message: string;
  showclientviewPetitionpopup: boolean;
  getClientviewPetitionData: boolean;
  cvpedit: Object;
}
@Component({
  selector: 'app-petitions-clientview.component',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.sass']
})

export class petitionsclientviewComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public paginationData: any;
  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: null
  };
  public addclientviewPetition: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public clientviewpetitionList;
  public addPetition: FormGroup;
  private user: User;
  public editFlag: boolean = true;
  public beforeEdit: any;
  public cvpmore: any = {};
  public showclientviewPetitionpopup: boolean;
  public getClientviewPetitionData: boolean = true;
  private clientviewpetition = {};
  private cvpedit = {};
  public settings;
  public data;
  public checked = false;
  public viewData;
  public viewSubscription;
  public queryParameters;
  constructor(private router: Router, private appService: AppService, private clientviewpetitionsService: ClientViewPetitionsService, public dialogService: DialogService) {
    super(dialogService);
    if (this.appService.user) {
      this.user = this.appService.user;
    }
    this.settings = {

      "isAddButtonEnable": false,
      "columnFilter": true,
      "isDeleteEnable": false,
      'customPanel': true,
      'sort' : [{
        headingName: "lastUpdate",
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: "Petition Name",
          field: "petitionName"
        },
        {
          headerName: "Petition Type",
          field: "petitionType"
        },
        {
          headerName: "Organization",
          field: "organization"
        },
        {
          headerName: "Status",
          field: "status"
        },
        {
          headerName: "Stage",
          field: "petitionStage"
        },
        {
          headerName: "Start Date",
          field: "startDate"
        },
        {
          headerName: "Last Updated",
          field: "lastUpdate"
        },
        {
          headerName: "Receipt Number",
          field: "recieptNumber"
        },
        {
          headerName: "More",
          cellRendererFramework: MoreDetails
        }
      ]
    };
    this.viewSubscription = MoreDetails.viewDetails.subscribe(res => {
      if (res) {
        if (res.hasOwnProperty('flag')) {
          this.checked = true;
          this.viewData = res['data'];
          this.viewAllColumns();
        }
        else {
          this.checked = false;

        }
      }

    })
  }

  ngOnInit() {
    //this.getClientPetitionData();

    this.appService.showSideBarMenu(null, "clientview-petitions");
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
  }

  ngOnDestroy() {
    this.viewSubscription.unsubscribe();
  }

  /*getClientPetitionData() {
    this.clientviewpetitionsService.getPetitions(this.appService.user.userId)
      .subscribe((res) => {
        this.clientviewpetitionList = res['petitions'];
        this.data = res['petitions'];
        console.log(this.clientviewpetitionList);
      });
  }*/

  filterData(filterQueries) {
    this.clientviewpetitionsService.getPetitionsFilteredData(this.appService.user.userId, filterQueries).subscribe(res => {
      this.data = res['petitions'];
    })
  }

  dataWithParameters(queryData) {
    if(queryData){
      this.queryParameters=queryData
    }

    this.clientviewpetitionsService.getPetitions(this.appService.user.userId, queryData)
      .subscribe((res) => {
        this.clientviewpetitionList = res['petitions'];
        this.data = res['petitions'];
        this.paginationData = res['pageMetadata'];
      });
  }


  viewAllColumns() {
    if (this.checked) {
      this.editFlag = true;
      if (this.editFlag) {
        this.beforeEdit = (<any>Object).assign({}, this.viewData);
      }

      this.dialogService.addDialog(petitionsclientviewComponent, {
        showclientviewPetitionpopup: true,
        getClientviewPetitionData: false,
        title: 'Petition Details',
        cvpedit: this.editFlag ? this.beforeEdit : this.viewData,

      }).subscribe((isConfirmed) => {
        if (isConfirmed) {
           this.dataWithParameters(this.queryParameters);
        }
      });
    }
  }
  cancel() {
    this.result = false;
    this.close();
  }

}
