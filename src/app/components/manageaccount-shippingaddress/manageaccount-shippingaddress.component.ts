import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';

import {ManageAccountShippingAddressService} from "./manageaccount-shippingaddress.service";
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'app-manageaccount-shippingaddress',
    templateUrl: './manageaccount-shippingaddress.component.html',
    styleUrls: ['./manageaccount-shippingaddress.component.sass']
})
export class ManageAccountShippingAddressComponent implements OnInit {

    public addShippingAddress: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private data;
    private user: User;

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

    constructor(private manageAccountShippingAddressService: ManageAccountShippingAddressService, private appService: AppService, private dialogService: DialogService) {
      if (this.appService.user) {
          this.user = this.appService.user;
      }
     }
    source: LocalDataSource = new LocalDataSource();
    getaccountid = function (accountid) {
    }
  ngOnInit() {
      this.manageAccountShippingAddressService.getShipmentAddress(this.appService.user.accountId)
          .subscribe((res) => {
              for(var address in res){
                  res[address]['slNo'] = address;
              }
              this.source.load(res);
              console.log(res);
          });

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
