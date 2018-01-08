import {AppService} from '../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ProductCatalogDiscountService} from './discounts.service';
import {MatDialog} from '@angular/material';
import {InformationDialogComponent} from '../../../framework/popup/information/information.component';

export interface ConfirmModel {
    title: string;
    message: string;
    viewDetails: boolean;
    addDiscountPopup: boolean;
    viewDiscountPopup: boolean;
    addDiscount: Object;
    discount: Object;
}
@Component({
    selector: 'app-superuserview-productcatalog-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.sass'],
  providers: [ProductCatalogDiscountService]
})
export class SuperuserviewProductcatalogDiscountsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public data;
    public settings;
    public paginationData;
    public beforeEdit: any;
    public queryParameters: any;
    public addDiscountPopup: boolean;
    public viewDiscountPopup: boolean;
    public addDiscount: any = {};
    public discount: any = {};
    public editFlag = true;
    public viewDetails = true;
    public isEditDiscount = true;
    public warningMessage = false;
    public showWorkAddrSaveButtonProgress = false;
    constructor(private appService: AppService, public productCatalogDiscountService: ProductCatalogDiscountService, public dialogService: DialogService, private dialog: MatDialog) {
        super(dialogService);
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
                    field: 'discountName'
                },
                {
                    headerName: 'Code',
                    field: 'discountCode'
                },
                {
                    headerName: 'Cost',
                    field: 'cost'
                },
                {
                    headerName: 'Percentage',
                    field: 'discountPercentage'
                },
                {
                    headerName: 'Type',
                    field: 'type'
                },
                {
                    headerName: 'Status',
                    field: 'status'
                },
                {
                    headerName: 'Created On',
                    field: 'createdOn'
                }
            ]
        }
    }
    getDiscountDetails() {
        this.productCatalogDiscountService.getDiscounts().subscribe(
            res => {
                if (res['statusCode'] === 'SUCCESS') {
                    this.data = res['discountCatalogs'];
                }
            }
        )
    }
    ngOnInit() {
        this.getDiscountDetails();
    }
    addDiscounts(event) {
        this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            addDiscountPopup: true,
            viewDetails: false,
            viewDiscountPopup: false,
            title: 'Add Discounts',
            addDiscount: this.addDiscount,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogDiscountService.saveDiscountDetails(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] === 'SUCCESS') {
                        this.getDiscountDetails();
                        this.addDiscount = {};
                    }  else {
                      this.dialog.open(InformationDialogComponent, {
                        data: {
                          title: 'Error',
                          message: res['statusDescription']
                        }
                      });
                    }
                });
            } else {
                this.addDiscount = {};
            }
        });
    }
    saveDiscounts() {
        this.showWorkAddrSaveButtonProgress = true;
      if (this.addDiscount['discountCode'] === '' || this.addDiscount['discountCode'] == null || this.addDiscount['discountCode'] === undefined
        || this.addDiscount['discountName'] === '' || this.addDiscount['discountName'] == null || this.addDiscount['discountName'] === undefined
        || this.addDiscount['type'] == null || this.addDiscount['type'] === undefined || this.addDiscount['type'] === '') {
          this.warningMessage = true;
      } else {
          this.showWorkAddrSaveButtonProgress = false;
          this.warningMessage = false;          
          this.appService.addUsers = this.addDiscount;
          this.result = true;
          this.close();
      }
    }
    cancel() {
        this.addDiscount = {};
        this.result = false;
        this.close();
    }

    //view
    viewDiscountDetails(event) {
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, event.data);
        }
        this.dialogService.addDialog(SuperuserviewProductcatalogDiscountsComponent, {
            viewDiscountPopup: true,
            viewDetails: false,
            addDiscountPopup: false,
            title: 'View  Details',
            discount: this.editFlag ? this.beforeEdit : event.data,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogDiscountService.editDiscounts(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getDiscountDetails();
                    }
                });
            } else {

                this.editFlag = false;
            }
        });
    }
    editDiscountInfo() {
        this.isEditDiscount = !this.isEditDiscount;
    }
    cancelDiscountInfo() {
        this.isEditDiscount = !this.isEditDiscount;


    }
    saveDiscountInfo() {
        this.showWorkAddrSaveButtonProgress = true;
        this.isEditDiscount = !this.isEditDiscount;
        this.appService.addUsers = this.discount;
        this.result = true;
        this.close();
    }
    dataWithParameters(queryData) {
    if (queryData) {
      this.queryParameters = queryData;
    }
    this.productCatalogDiscountService.getDiscountDetailsWithQueryparams(queryData).subscribe(
      res => {
          this.showWorkAddrSaveButtonProgress = false;
        this.data = res['discountCatalogs'];
        this.paginationData = res['pageMetadata'];
      })
  }


}
