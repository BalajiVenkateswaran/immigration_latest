import { AppService } from '../../../../services/app.service';
import { MenuComponent } from '../../../common/menu/menu.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ProductCatalogProductService } from './product-catalog.service';

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
  selector: 'app-superuserview-productcatalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.sass']
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
  public getData: boolean = true;
  public editFlag: boolean = true;
  public isEditProducts: boolean = true;
  public warningMessage: boolean = false;

  constructor(public appService: AppService, public dialogService: DialogService, public productCatalogProductService: ProductCatalogProductService, private menuComponent: MenuComponent) {
    super(dialogService);
    this.settings = {
      'isDeleteEnable': false,
      'customPanel': true,
      'defaultFilter': [{
        headingName: "status",
        headerName: "Status",
        filterValue: "Active"
      }
      ],
      'columnsettings': [
        {
          headerName: "Name",
          field: "name"
        },
        {
          headerName: "Code",
          field: "code"
        },
        {
          headerName: "Max Users",
          field: "maxUsers"
        },
        {
          headerName: "Max Clients/Month",
          field: "maxClientsPerMonth"
        },
        {
          headerName: "Max Petitions/Month",
          field: "maxPetitionsPerMonth"
        },
        {
          headerName: "Max S3 Storage",
          field: "maxS3Storage"
        },
        {
          headerName: "Cost",
          field: "cost"
        },
        {
          headerName: "Type",
          field: "productType"
        },
        {
          headerName: "Status",
          field: "status"
        },
        {
          headerName: "Created On",
          field: "startDate"
        }
      ]
    }
    this.typeValues = [
      {
        "value": "Plan",
        "name": "Plan"
      },
      {
        "value": "UserAdOn",
        "name": "User Add On"
      },
      {
        "value": "ClientAddOn",
        "name": "Client Add On"
      },
      {
        "value": "PetitionAddOn",
        "name": "Petition Add On"
      },
      {
        "value": "StorageAddOn",
        "name": "Storage Add On"
      }
    ]
    this.reloadData();
  }
  ngOnInit() {
    this.menuComponent.highlightSBLink('Products');
    this.appService.showSideBarMenu("superuserview-product", "ProductCatalog");

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
      product: this.editFlag ? this.beforeEdit : event.data,


    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.productCatalogProductService.editProducts(this.appService.addUsers).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.reloadData();

          }
        });
      }
      else {

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
          if (res['statusCode'] == 'SUCCESS') {
            this.reloadData();
            this.addProduct = {};
          }
        });
      }
      else {
        this.addProduct = {};
      }
    });
  }
  saveProduct() {
    if (this.addProduct['name'] == '' || this.addProduct['name'] == null || this.addProduct['name'] == undefined || this.addProduct['code'] == '' || this.addProduct['code'] == null || this.addProduct['code'] == undefined || this.addProduct['cost'] == '' || this.addProduct['cost'] == null || this.addProduct['cost'] == undefined) {
      this.warningMessage = true;
    }
    else {
      this.warningMessage = false;
      this.appService.addUsers = this.addProduct;
      this.result = true;
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
    this.isEditProducts = !this.isEditProducts;
    this.appService.addUsers.accountProductId = this.product.accountProductId;
    this.appService.addUsers = this.product;
    this.result = true;
    this.close();
  }
  dataWithParameters(queryData) {
    if(queryData){
      this.queryParameters=queryData;
    }
    this.productCatalogProductService.getProductDetailsWithQueryparams(queryData).subscribe(
      res => {

        this.data = res['products'];
        this.paginationData = res['pageMetadata'];
      })
  }
  reloadData(){
    if(this.queryParameters != undefined){
      this.productCatalogProductService.getProductDetailsWithQueryparams(this.queryParameters).subscribe(
        res=>{
          this.data = res['products'];
          this.paginationData = res['pageMetadata'];
        }
      )
    }
     
    if(this.queryParameters == null || this.queryParameters == undefined){
       this.productCatalogProductService.getProductDetails().subscribe(
        res=>{
          this.data = res['products'];
        }
      )
    }
    
  }

}

