import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ImmigrationViewClientDetailsService {

    constructor(private restService: RestService) {
    }

    public getClientDetails(clientId: string) {
        return this.restService.getData("/client/details/" + clientId);
    }

     public saveClientDetails(clientDetails: any, client: any, updatedBy: string) {
            var req = {
              "clientDetails" : clientDetails,
              "client" : client,
              "updatedBy" : updatedBy
            };

            return this.restService.postData("/client/details", req);
     }

     public sendClientInvite(clientId: string){
        return this.restService.getData("/client/sendinvite/"+clientId);
     }
     public getClientInvites(userId: string) {
      return this.restService.getData("/client/invite/" + userId);
  }
}
