import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {client} from "../../models/client";

@Injectable()
export class ClientsEnhansmentsService {

  constructor(private restService: RestService) {

  }

  public getClients (orgId: string) {
    console.log("PetitionsService|getPetitions|orgId:%o", orgId);
    return this.restService.getData("/clients/immigration/"+orgId);
  }

  public saveNewClient(clientData: client) {
      return this.restService.postData("/client", clientData);
  }

  public updateClient(clientData: client, updatedBy: string) {
    var req = {
      client : clientData,
      updatedBy: updatedBy
    };
      return this.restService.postData("/clients/immigration", req);
  }
  public removeclient(clientId: string, immigrationOfficerId: string) {
      return this.restService.deleteData("/client/" + clientId +"/immigrationOfficerId/"+immigrationOfficerId);
  }
}
