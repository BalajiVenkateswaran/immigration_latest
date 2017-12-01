import {RestService} from '../../../../services/rest.service';
import {Injectable} from '@angular/core';
import { manageaccountorganization } from '../../../../models/manageaccountorganization';

@Injectable()
export class ManageAccountShippingAddressService {

  constructor(private restService: RestService) {

  }

  public getShipmentAddress(accountId: string) {
    return this.restService.getData('/shipment/getAddress/' + accountId);
  }
  public createShipmentAddress(manageAccount: manageaccountorganization) {

    return this.restService.postData('/shipment/addAddress', manageAccount);
  }
  public deleteShipmentAddress(shipmentId: string) {
    return this.restService.deleteData('/shipment/deleteAddress/' + shipmentId);
  }
  public updateShipmentAddress(data) {
    let req = {
      'shippmentAddress': data
    };
    return this.restService.postData('/shipment/updateAddress', req);
  }

}
