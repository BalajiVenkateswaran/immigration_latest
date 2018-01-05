import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../services/app.service';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {IMyOptions} from 'mydatepicker';
import {SuperuserViewAccountPreferencesService} from './accountpreferences.service';
import {AccountDetailsCommonService} from '../common/account-details-common.service';
import {IHDateUtil} from '../../../../framework/utils/date.component';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {DeepCloneUtil} from '../../../../framework/utils/deepclone.component';

export interface ConfirmModel {
    title: string;
    getacntpref?: boolean;
    adddprdctPref?: boolean;
    adddiscntPref?: boolean;
    editprdct?: boolean;
    editdscnt?: boolean;
    addproduct?: Object;
    discounts?: Object
    startDate?: string;
    endDate?: string;
}

@Component({
    selector: 'ih-account-preferences',
    templateUrl: './accountpreferences.component.html',
    styleUrls: ['./accountpreferences.component.sass'],
    providers: [SuperuserViewAccountPreferencesService]
})
export class AccountPreferencesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public getacntpref = true;
    public adddAcntPref: boolean;
    public myDatePickerOptions: IMyOptions = IHDateUtil.datePickerOptions;
    public warningMessage = false;
    public editdiscount: boolean;
    public adddprdctPref: any;
    public adddiscntPref: any;
    public addproduct: any = {};
    public adddiscount: any = {};
    public data;
    public editFlag: boolean;
    public beforeEdit: any = {};
    public discountData;
    public productInfo = [];
    public discounts: any = {};
    public discountInfo: any = [];
    public editProductFlag = true;
    public beforeProductEdit;
    public editDiscountFlag = true;
    public showWorkAddrSaveButtonProgress = false;
    public beforeDiscountEdit;
    public allProducts;
    public allDiscounts;
    public settings = {
    'isDeleteEnable': false,
    'columnsettings': [
      {
        headerName: 'Name',
        field: 'productCatalog.productName'
      },
      {
        headerName: 'Code',
        field: 'productCatalog.productCode'
      },
      {
        headerName: 'Description',
        field: 'productCatalog.productDesc'
      },
      {
        headerName: 'Start Date',
        field: 'startDate'
      },
      {
        headerName: 'End Date',
        field: 'endDate'
      },
      {
        headerName: 'Max Users',
        field: 'productCatalog.maxUsers'
      },
      {
        headerName: 'Max Clients',
        field: 'productCatalog.maxClients'
      },
      {
        headerName: 'Max Petitions',
        field: 'productCatalog.maxPetitions'
      },
      {
        headerName: 'Max S3 Storage',
        field: 'productCatalog.maxS3Storage'
      },
      {
        headerName: 'Cost',
        field: 'productCatalog.cost'
      }
    ]
  };
  public  discountSettings = {
    'isDeleteEnable': false,
    'columnsettings': [
      {
        headerName: 'Name',
        field: 'discountCatalog.discountName'
      },
      {
        headerName: 'Code',
        field: 'discountCatalog.discountCode'
      },
      {
        headerName: 'Description',
        field: 'discountCatalog.discountDesc'
      },
      {
        headerName: 'Start Date',
        field: 'startDate'
      },
      {
        headerName: 'End Date',
        field: 'endDate'
      },
      {
        headerName: 'Cost',
        field: 'discountCatalog.cost'
      },
      {
        headerName: 'Percentage',
        field: 'discountCatalog.discountPercentage'
      }
    ]
  };
  constructor(private appService: AppService, public dialogService: DialogService, public superuserViewAccountPreferencesService: SuperuserViewAccountPreferencesService,
      private accountDetailsCommonService: AccountDetailsCommonService, private dialog: MatDialog) {
      super(dialogService);
      this.editdiscount = false;
  }
  ngOnInit() {
    this.getproducts();
    this.getdiscounts();
    this.getAllProducts();
    this.getAllDiscounts();
  }
  getproducts() {
    this.superuserViewAccountPreferencesService.getproductsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
            this.data = res['products'];
        }
    });
  }
  getdiscounts() {
    this.superuserViewAccountPreferencesService.getdiscountsAccount(this.accountDetailsCommonService.accountId).subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
            this.discountData = res['discounts'];
        }
    });
  }

  addProducts(value) {
    this.dialogService.addDialog(AccountPreferencesComponent, {
        adddprdctPref: true,
        getacntpref: false,
        title: 'Add Product',
        editprdct: false,
        addproduct: {
          accountId: this.accountDetailsCommonService.accountId,
          productCatalog: {
          }
        }
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.getproducts();
      }
    });
  }

  editProducts(event) {
      this.editProductFlag = true;
      if (this.editProductFlag) {
          this.beforeProductEdit = DeepCloneUtil.deepClone(event.data);
      }
      this.dialogService.addDialog(AccountPreferencesComponent, {
          adddprdctPref: true,
          getacntpref: false,
          title: 'Edit Product',
          editprdct: true,
          addproduct: event.data,
          startDate: event.data.startDate,
          endDate: event.data.endDate
      }).subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.getproducts();
        } else {
          event.data = this.beforeProductEdit;
        }
      });
  }
  addDiscounts(event) {
      this.dialogService.addDialog(AccountPreferencesComponent, {
          adddiscntPref: true,
          getacntpref: false,
          title: 'Add Discount',
          editdscnt: false,
          discounts: {
            accountId: this.accountDetailsCommonService.accountId,
            discountCatalog: {
            }
          }
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
            this.getdiscounts();
          }
      });
  }

  editDiscounts(event) {
      this.editDiscountFlag = true;
      this.beforeDiscountEdit = DeepCloneUtil.deepClone(event.data);
      this.dialogService.addDialog(AccountPreferencesComponent, {
          adddiscntPref: true,
          getacntpref: false,
          title: 'Edit Discount',
          editdscnt: true,
          discounts: event.data,
          startDate: event.data.startDate,
          endDate: event.data.endDate,
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
            this.getdiscounts();
          } else {
            event.data = this.beforeDiscountEdit;
          }
      });
  }
  productSave() {
      this.showWorkAddrSaveButtonProgress = true;
      if ((this.addproduct['productCatalog']['productCode'] === '' || this.addproduct['productCatalog']['productCode'] == null || this.addproduct['productCatalog']['productCode'] === undefined
          || this.addproduct['startDate'] === '' || this.addproduct['startDate'] == null || this.addproduct['startDate'] === undefined || this.addproduct['endDate'] === ''
          || this.addproduct['endDate'] == null || this.addproduct['endDate'] === undefined)) {
          this.warningMessage = true;
      } else {
        this.warningMessage = false;
        this.showWorkAddrSaveButtonProgress = false;
        this.addproduct['startDate'] = this.addproduct['startDate']['formatted'];
        this.addproduct['endDate'] = this.addproduct['endDate']['formatted'];
        this.superuserViewAccountPreferencesService.saveProduct(this.addproduct).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.result = true;
          } else {
            this.dialog.open(InformationDialogComponent, {
              data: {
                title: 'Error',
                message: res['statusDescription']
              }
            });
            this.result = false;            
          }
          this.close();
        });
      }
  }
  discountSave() {
      this.showWorkAddrSaveButtonProgress = true;
    if ((this.discounts['discountCatalog']['discountCode'] === '' || this.discounts['discountCatalog']['discountCode'] == null || this.discounts['discountCatalog']['discountCode'] === undefined ||
        this.discounts['startDate'] === '' || this.discounts['startDate'] == null || this.discounts['startDate'] === undefined ||
        this.discounts['endDate'] === '' || this.discounts['endDate'] == null || this.discounts['endDate'] === undefined)) {
        this.warningMessage = true;
    } else {
      this.showWorkAddrSaveButtonProgress = false;
      this.discounts['startDate'] = this.discounts.startDate['formatted'];
      this.discounts['endDate'] = this.discounts.endDate['formatted'];

      this.superuserViewAccountPreferencesService.savediscount(this.discounts).subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
          this.result = true;
        } else {
          this.dialog.open(InformationDialogComponent, {
            data: {
              title: 'Error',
              message: res['statusDescription']
            }
          });
          this.result = false;
        }
        this.showWorkAddrSaveButtonProgress = false;
        this.close();
      });
    }
  }
  cancel() {
      this.result = false;
      this.close();
  }

  getAllProducts() {
    this.superuserViewAccountPreferencesService.getAllActiveProductCodes().subscribe(
      res => {
        this.allProducts = res['codes'];
      }
    )
  }
  getAllDiscounts() {
    this.superuserViewAccountPreferencesService.getAllActiveDiscountCodes().subscribe(
      res => {
        this.allDiscounts = res['codes'];
      }
    )
  }

}
