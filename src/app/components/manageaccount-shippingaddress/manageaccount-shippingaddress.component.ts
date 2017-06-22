import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';

import {ManageAccountShippingAddressService} from "./manageaccount-shippingaddress.service";
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";
export interface ConfirmModel {
    title: string;
    message: string;
    getShipping: boolean;
    addShippingAdress: boolean;

}
@Component({
    selector: 'app-manageaccount-shippingaddress',
    templateUrl: './manageaccount-shippingaddress.component.html',
    styleUrls: ['./manageaccount-shippingaddress.component.sass']
})
export class ManageAccountShippingAddressComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

    public addShippingAddress: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data;
    private user: User;
    public getShipping: boolean = true;
    public addAdress: any = {};

    settings = {
        add: {
            addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
            saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
            cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmDelete: true
        },
        columns: {
            slNo: {
                 title: 'SL.NO'
            },
            addressName: {
                title: ' Address Name'
            },
            address: {
                title: 'Address'
            }

        },
        pager: {
            display: true,
            perPage: 10
        }
    };

    constructor(private manageAccountShippingAddressService: ManageAccountShippingAddressService, private appService: AppService, public dialogService: DialogService) {
        super(dialogService);
      if (this.appService.user) {
          this.user = this.appService.user;
      }
     }
    source: LocalDataSource = new LocalDataSource();
    getaccountid = function (accountid) {
    }
    getShippingDetails() {
        this.manageAccountShippingAddressService.getShipmentAddress(this.appService.user.accountId)
            .subscribe((res) => {
                for (var address in res) {
                    res[address]['slNo'] = address;
                }
                this.source.load(res);
                console.log(res);
            });

    }
  ngOnInit() {
      this.getShippingDetails();

    }
  addNewAdress() {
      this.dialogService.addDialog(ManageAccountShippingAddressComponent, {
          addShippingAdress: true,
          getShipping: false,
          title: 'Add Shipping Address',
      }).subscribe((isConfirmed) => {
          if (isConfirmed) {
              this.manageAccountShippingAddressService.createShipmentAddress(this.appService.addAdress).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
      this.getShippingDetails();

                  }
              });
          }
      });
  }
  shipAddressSave() {
      this.addAdress['accountId'] = this.appService.user.accountId;
      this.appService.addAdress = this.addAdress;
      this.result = true;
      this.close();
  }
  cancel() {
      this.result = false;
      this.close();
  }
  onCreateConfirm(event): void {
      console.log("User table onCreateConfirm event: %o", event.newData);
      event.newData['accountId'] = this.appService.user.accountId;
      this.manageAccountShippingAddressService.createShipmentAddress(event.newData).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              event.confirm.resolve();
          } else {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Unable to Add Shipping Address..!'
              });
              event.confirm.reject();
          }
      });

  }
  onEditConfirm(event): void {
      event.newData['accountId'] = this.appService.user.accountId;
      this.manageAccountShippingAddressService.updateShipmentAddress(event.newData).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              event.confirm.resolve(event.newData);
          } else {
              this.dialogService.addDialog(ConfirmComponent, {
                  title: 'Error..!',
                  message: 'Unable to Edit Shipping Address..!'
              });
              event.confirm.resolve(event.data);
          }
      });
  }
  onDeleteConfirm(event): void {
      console.log("User table onDeleteConfirm event: %o", event.data);
      this.manageAccountShippingAddressService.deleteShipmentAddress(event.data['shippmentAddressId']).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message == 'SUCCESS') {
              event.confirm.resolve();
          } else {
              event.confirm.reject();
          }
      });
  }

}
