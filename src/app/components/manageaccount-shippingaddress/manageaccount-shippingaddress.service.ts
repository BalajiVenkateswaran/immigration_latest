﻿
import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {manageaccountorganization} from "../../models/manageaccountorganization"; 

@Injectable()
export class ManageAccountShippingAddressService {

    constructor(private restService: RestService) {

    }

    public getShipmentAddress(accountId: string) {
        //console.log("PetitionsService|getPetitions|orgId:%o", accountId);
        return this.restService.getData("/shipment/getAddress/" + accountId);
    }
    public createShipmentAddress(manageAccount: manageaccountorganization) {

        return this.restService.postData("/shipment/addAddress", manageAccount);
    }
    public deleteShipmentAddress(shipmentId: string) {
        return this.restService.deleteData("/shipment/deleteAddress/" + shipmentId);
    }
    public updateShipmentAddress(data) {
        var req = {
            "shippmentAddress":data
        };
        return this.restService.postData("/shipment/updateAddress", req);
    }
   
}
