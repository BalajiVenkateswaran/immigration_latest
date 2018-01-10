import {AppService} from '../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {ManageAccountShippingAddressService} from './shippingaddress.service';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {HeaderService} from '../../../common/header/header.service';
export interface ConfirmModel {
  title: string;
  message: string;
  getShipping: boolean;
  addShippingAdress: boolean;
  addAdress: Object;
}
@Component({
  selector: 'app-manageaccount-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.scss'],
  providers: [ManageAccountShippingAddressService]
})
export class ManageAccountShippingAddressComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  private message: string;
  private data;
  public getShipping = true;
  public addAdress: any = {};
  public addShippingAdress: boolean;
  public editshippingFlag = true;
  public beforeshippingEdit: any;
  public settings;
  constructor(private manageAccountShippingAddressService: ManageAccountShippingAddressService, private appService: AppService,
    public dialogService: DialogService, private headerService: HeaderService) {
    super(dialogService);
    this.settings = {
      'columnsettings': [
        {
          headerName: 'SL.NO',
          field: 'slNo'
        },
        {
          headerName: 'Address Name',
          field: 'addressName'
        },
        {
          headerName: 'Address',
          field: 'address',
          width: 100,
          cellStyle: {
              'white-space': ' pre-line'
          }
        }
      ],
      gridOptions: {
        getRowHeight: function(params) {
          // assuming 50 characters per line, working how how many lines we need
          let addressSplitByNewLine = params.data.address.split('\n');
          let lineNumbers = addressSplitByNewLine.length;
          for (let addressLine of addressSplitByNewLine) {
            lineNumbers = lineNumbers + Math.floor(addressLine.length / 30);
          }
          let rowheight = 20 * (lineNumbers + 1);
          return rowheight < 40 ? 40 : (rowheight - 10);
        }
      }
    };

  }

  getaccountid = function(accountid) {
  }
  getShippingDetails() {
    this.manageAccountShippingAddressService.getShipmentAddress(this.headerService.user.accountId)
      .subscribe((res) => {

        for (let i = 0; i < res.length; i++) {
          res[i]['slNo'] = i + 1;
        }

        this.data = res;

      });

  }
  ngOnInit() {
    this.getShippingDetails();

  }
  addFunction() {
    this.dialogService.addDialog(ManageAccountShippingAddressComponent, {
      addShippingAdress: true,
      getShipping: false,
      title: 'Add Shipping Address',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.appService.addAdress['accountId'] = this.headerService.user.accountId;
        this.manageAccountShippingAddressService.createShipmentAddress(this.appService.addAdress).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getShippingDetails();

          }
        });
      }
    });
  }
  shipAddressSave() {
    this.appService.addAdress = this.addAdress;
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

  editRecord(event): void {
    this.editshippingFlag = true;
    if (this.editshippingFlag) {
      this.beforeshippingEdit = (<any>Object).assign({}, event.data);
    }
    this.dialogService.addDialog(ManageAccountShippingAddressComponent, {
      addShippingAdress: true,
      getShipping: false,
      title: 'Edit Shipping Address',
      addAdress: this.editshippingFlag ? this.beforeshippingEdit : this.addAdress,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.manageAccountShippingAddressService.updateShipmentAddress(this.appService.addAdress).subscribe((res) => {
          if (res['statusCode'] == 'SUCCESS') {
            this.getShippingDetails();

          }
        });
      }
    });

  }
  deleteRecord(event): void {
    this.manageAccountShippingAddressService.deleteShipmentAddress(event.data['shippmentAddressId']).subscribe((res) => {
      this.message = res['statusCode'];
      if (this.message == 'SUCCESS') {
        this.getShippingDetails();

      }
    });
  }

}
