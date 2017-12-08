import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {MoreDetailsComponent} from './MoreDetails';
import {ClientViewPetitionsService} from './petitions.service';
import {SortType} from '../../framework/smarttable/types/query-parameters';
import {HeaderService} from '../../common/header/header.service';

export interface ConfirmModel {
  title: string;
  message: string;
  showclientviewPetitionpopup: boolean;
  getClientviewPetitionData: boolean;
  cvpedit: Object;
}
@Component({
  selector: 'ih-petitions-clientview',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.sass'],
  providers: [ClientViewPetitionsService],
  entryComponents: [MoreDetailsComponent]
})

export class ClientViewPetitionsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: null
  };
  public paginationData;
  public addclientviewPetition: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  public clientviewpetitionList;
  public addPetition: FormGroup;
  public editFlag = true;
  public beforeEdit: any;
  public cvpmore: any = {};
  public showclientviewPetitionpopup: boolean;
  public getClientviewPetitionData = true;
  private clientviewpetition = {};
  private cvpedit = {};
  public settings;
  public data;
  public checked = false;
  public viewData;
  public viewSubscription;
  public queryParameters;
  public petitionTypesData: any = [];
  public statusTypes: any = [];
  constructor(private router: Router, private appService: AppService, private clientviewpetitionsService: ClientViewPetitionsService,
    public dialogService: DialogService, private headerService: HeaderService) {
    super(dialogService);
    // this.petitionTypesData = [
    //   {
    //     'display': 'H1B',
    //     'value': 'H1B'
    //   },
    //   {
    //     'display': 'L1',
    //     'value': 'L1'
    //   },
    //
    //   {
    //     'display': 'H1B-RFE',
    //     'value': 'H1B-RFE'
    //   },
    //
    //   {
    //     'display': 'B1',
    //     'value': 'B1'
    //   },
    //
    // ];
    this.statusTypes = [
      {
        'display': 'Open',
        'value': 'Open'
      },
      {
        'display': 'Close',
        'value': 'Close'
      }
    ];
    this.settings = {

      'isAddButtonEnable': false,
      'columnFilter': false,
      'isAddFilterButtonEnable': true,
      'isMorefilters': true,
      'isDeleteEnable': false,
      'customPanel': true,
      'sort': [{
        headingName: 'lastUpdate',
        sort: SortType.DESC
      }],
      'columnsettings': [
        {
          headerName: 'Petition Name',
          field: 'petitionName',
          type: 'text'
        },
        {
          headerName: 'Petition Type',
          field: 'petitionType',
          type: 'dropDown',
          data: this.getPetitionTypeValues()
        },
        {
          headerName: 'Organization',
          field: 'organization',
          type: 'text'
        },
        {
          headerName: 'Status',
          field: 'status',
          type: 'dropDown',
          data: this.statusTypes
        },
        {
          headerName: 'Stage',
          field: 'petitionStage',
          type: 'text'
        },
        {
          headerName: 'Start Date',
          field: 'startDate',
          type: 'datePicker'
        },
        {
          headerName: 'Last Updated',
          field: 'lastUpdate',
          type: 'datePicker'
        },
        {
          headerName: 'Receipt Number',
          field: 'recieptNumber',
          type: 'text'
        },
        {
          headerName: 'More',
          cellRendererFramework: MoreDetailsComponent,
          type: 'none',
          filter:
            {
            showInMoreFilters: false
          }
        }
      ]
    };
    this.viewSubscription = MoreDetailsComponent.viewDetails.subscribe(res => {
      if (res) {
        if (res.hasOwnProperty('flag')) {
          this.checked = true;
          this.viewData = res['data'];
          this.viewAllColumns();
        } else {
          this.checked = false;

        }
      }

    })
  }

  ngOnInit() {
    this.headerService.showSideBarMenu(null, 'clientview/petitions');
    this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.viewSubscription.unsubscribe();
  }
  filterData(filterQueries) {
    this.clientviewpetitionsService.getPetitionsFilteredData(this.headerService.user.userId, filterQueries).subscribe(res => {
      this.data = res['petitions'];
    })
  }

  dataWithParameters(queryData) {
    console.log(queryData)
    if (queryData) {
      this.queryParameters = queryData;
      console.log(queryData)
    }
    this.clientviewpetitionsService.getPetitions(this.headerService.user.userId, queryData)
      .subscribe((res) => {
       // this.clientviewpetitionList = res['petitions'];

        this.data = res['petitions'];
        this.paginationData = res['pageMetadata'];
          console.log(this.paginationData);
          console.log(res)
      }

      );
  }



  viewAllColumns() {
    if (this.checked) {
      this.editFlag = true;
      if (this.editFlag) {
        this.beforeEdit = (<any>Object).assign({}, this.viewData);
      }

      this.dialogService.addDialog(ClientViewPetitionsComponent, {
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
  getPetitionTypeValues() {
    let x = [];
    this.clientviewpetitionsService.getAllPetitionTypesAndSubTypes().subscribe(res => {
      if (res['petitionTypes'] !== undefined) {
        let data = res['petitionTypes'];
        for (let i = 0; i < data.length; i++) {
          x.push({ 'display': data[i]['petitiontype'], 'value': data[i]['petitiontype'] });
        }
      }

    })
    return x;
  }

}
