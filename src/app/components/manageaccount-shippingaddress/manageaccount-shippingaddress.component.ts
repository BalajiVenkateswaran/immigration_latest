import { Component, OnInit } from '@angular/core';
import {ManageAccountShippingAddressService} from "./manageaccount-shippingaddress.service";
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
export interface ConfirmModel {
    title: string;
    message: string;
    getShipping: boolean;
    addShippingAdress: boolean;
    addAdress: Object;
}
@Component({
    selector: 'app-manageaccount-shippingaddress',
    templateUrl: './manageaccount-shippingaddress.component.html',
    styleUrls: ['./manageaccount-shippingaddress.component.sass']
})
export class ManageAccountShippingAddressComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    private message: string;
    private data;
    private user: User;
    public getShipping: boolean = true;
    public addAdress: any = {};
    public addShippingAdress: boolean;
    public editshippingFlag: boolean = true;
    public beforeshippingEdit: any;
    public settings;
    constructor(private manageAccountShippingAddressService: ManageAccountShippingAddressService, private appService: AppService, public dialogService: DialogService) {
        super(dialogService);
      if (this.appService.user) {
          this.user = this.appService.user;
      }
     this.settings={
            'columnsettings': [
                {

                    headerName: "SL.NO",
                    field: "slNo",
                },
                {

                    headerName: "Address Name",
                    field: "addressName",
              
                },
                {

                    headerName: "Address",
                    field: "address",
                }
              
            ]
        }

     }
 
    getaccountid = function (accountid) {
    }
    getShippingDetails() {
        this.manageAccountShippingAddressService.getShipmentAddress(this.appService.user.accountId)
            .subscribe((res) => {

                for (var i = 0; i < res.length; i++) {
                    res[i]['slNo'] = i + 1;
                }

                 this.data=res;
                
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
              this.appService.addAdress['accountId'] = this.appService.user.accountId;
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
      console.log("User table onDeleteConfirm event: %o", event.data);
      this.manageAccountShippingAddressService.deleteShipmentAddress(event.data['shippmentAddressId']).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              this.getShippingDetails();
            
          } 
      });
  }

}
