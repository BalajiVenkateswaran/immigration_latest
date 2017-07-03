import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {client} from "../../models/client";

@Injectable()
export class SuperUserViewInvoicestabService {

  constructor(private restService: RestService) {

  }

  public getInvoices (orgId: string) {
      return this.restService.getData("/superuser/invoices");
  }

  //public saveNewClient(clientData: client) {
  //    return this.restService.postData("/client", clientData);
  //}

  //public updateClient(clientData: client, updatedBy: string) {
  //  var req = {
  //    client : clientData,
  //    updatedBy: updatedBy
  //  };
  //    return this.restService.postData("/clients/immigration", req);
  //}
  //public removeclient(clientId: string, immigrationOfficerId: string) {
  //    return this.restService.deleteData("/client/" + clientId +"/immigrationOfficerId/"+immigrationOfficerId);
  //}
}
