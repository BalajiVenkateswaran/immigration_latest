import {AppService} from '../../../../services/app.service';
import {MenuComponent} from '../../../common/menu/menu.component';
import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ProductCatalogProductService} from './product-catalog.service';
import {HeaderService} from '../../../common/header/header.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';

export interface ConfirmModel {
  title: string;
  message: string;
  getData: boolean;
  addPopup: boolean;
  viewPopup: boolean;
  product: Object;
  addProduct: Object;

}
@Component({
  selector: 'ih-superuserview-productcatalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.sass'],
  providers: [ProductCatalogProductService]
})
export class SuperuserviewProductcatalogComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  queryParameters: any;

  public data;
  public settings;
  public addPopup;
  public typeValues;
  public paginationData;
  public beforeEdit: any;
  public viewPopup: boolean;
  public product: any = {};
  public addProduct: any = {};
  public getData = true;
  public editFlag = true;
  public isEditProducts = true;
  public warningMessage = false;
  public statusTypes: any = [];
  public validationTypeValues: any = [];
  public showWorkAddrSaveButtonProgress = false;
  constructor(public appService: AppService, public dialogService: DialogService, public productCatalogProductService: ProductCatalogProductService,
              private menuComponent: MenuComponent, public headerService: HeaderService, private dialog: MatDialog) {
    super(dialogService);

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
      'isDeleteEnable': false,
      'customPanel': true,
      'defaultFilter': [{
        headingName: 'status',
        headerName: 'Status',
        filterValue: 'Active'
      }
      ],
      'columnsettings': [
        {
          headerName: 'Name',
          field: 'name',
          type: 'text'
        },
        {
          headerName: 'Code',
          field: 'code',
          type: 'text'
        },
        {
          headerName: 'Max Users',
          field: 'maxUsers',
          type: 'text'
        },
        {
          headerName: 'Max Orgs',
          field: 'maxOrgs',
          type: 'text'
        },
        {
          headerName: 'Max Clients/Month',
          field: 'maxClientsPerMonth',
          type: 'text'
        },
        {
          headerName: 'Max Petitions/Month',
          field: 'maxPetitionsPerMonth',
          type: 'text'
        },
        {
          headerName: 'Max S3 Storage',
          field: 'maxS3Storage',
          type: 'text'
        },
        {
          headerName: 'Cost',
          field: 'cost',
          type: 'text'
        },
        {
          headerName: 'Type',
          field: 'productType',
          type: 'text'
        },
        {
          headerName: 'Status',
          field: 'status',
          type: 'dropDown',
          data: this.statusTypes
        },
        {
          headerName: 'Created On',
          field: 'createdOn',
          type: 'datePicker'
        }
      ]
    };
    this.typeValues = [
      {
        'value': 'Plan',
        'name': 'Plan'
      },
      {
        'value': 'UserAdOn',
        'name': 'User Add On'
      },
      {
        'value': 'ClientAddOn',
        'name': 'Client Add On'
      },
      {
        'value': 'PetitionAddOn',
        'name': 'Petition Add On'
      },
      {
        'value': 'StorageAddOn',
        'name': 'Storage Add On'
      }
    ];

    this.validationTypeValues = [
      {
        name: 'Monthly',
        value: 'Monthly'
      },
      {
        name: 'Total',
        value: 'Total'
      }];

    this.reloadData();
  }
  ngOnInit() {
    this.menuComponent.highlightSBLink('Products');
    this.headerService.showSideBarMenu('superuserview-product', 'ProductCatalog');

  }
  /*reloadData() {
    this.productCatalogProductService.getProductDetails().subscribe(
      res => {
        if (res['statusCode'] == 'SUCCESS') {
          this.data = res['products'];
        }
      }
    )
  }*/
  viewDetails(event) {
    this.editFlag = true;
    if (this.editFlag) {
      this.beforeEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(SuperuserviewProductcatalogComponent, {
      viewPopup: true,
      getData: false,
      addPopup: false,
      title: 'View Product Details',
      product: this.editFlag ? this.beforeEdit : event.data
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.productCatalogProductService.editProducts(this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.reloadData();
          }
        });
      } else {
        this.editFlag = false;
      }
    });
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }
  addProducts(event) {
    this.dialogService.addDialog(SuperuserviewProductcatalogComponent, {
      addPopup: true,
      getData: false,
      viewPopup: false,
      title: 'Add New Product',
      addProduct: this.addProduct,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.productCatalogProductService.saveProductDetails(this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.reloadData();
            this.addProduct = {};
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
          }
        });
      } else {
        this.addProduct = {};
      }
    });
  }
  saveProduct() {
      this.showWorkAddrSaveButtonProgress = true;
    if (this.addProduct['name'] === '' || this.addProduct['name'] == null || this.addProduct['name'] === undefined
      || this.addProduct['code'] === '' || this.addProduct['code'] == null || this.addProduct['code'] === undefined
      || this.addProduct['cost'] === '' || this.addProduct['cost'] == null || this.addProduct['cost'] === undefined) {
      this.warningMessage = true;
    } else {
      this.warningMessage = false;
      this.appService.addUsers = this.addProduct;
      this.showWorkAddrSaveButtonProgress = false;
      this.result = true;
      this.showWorkAddrSaveButtonProgress = false;
      this.close();
    }

  }
  cancel() {
    this.result = false;
    this.close();
  }
  editProductInfo() {
      this.isEditProducts = !this.isEditProducts;
  }
  cancelProductInfo() {
    this.isEditProducts = !this.isEditProducts;
    this.result = false;

  }
  saveProductInfo() {
      this.showWorkAddrSaveButtonProgress = true;
    this.isEditProducts = !this.isEditProducts;
    this.appService.addUsers.accountProductId = this.product.accountProductId;
    this.appService.addUsers = this.product;
    this.result = true;
    this.close();
  }
  dataWithParameters(queryData) {
    if (queryData) {
      this.queryParameters = queryData;
    }
    this.productCatalogProductService.getProductDetailsWithQueryparams(queryData).subscribe(
        res => {
        this.data = res['products'];
        this.paginationData = res['pageMetadata'];
      });
  }
  reloadData() {
    if (this.queryParameters !== undefined) {
      this.productCatalogProductService.getProductDetailsWithQueryparams(this.queryParameters).subscribe(
          res => {
              this.showWorkAddrSaveButtonProgress = false;
          this.data = res['products'];
          this.paginationData = res['pageMetadata'];
        }
      )
    }

    if (this.queryParameters == null || this.queryParameters === undefined) {
       this.productCatalogProductService.getProductDetails().subscribe(
           res => {
          this.data = res['products'];
        }
      )
    }

  }

}

