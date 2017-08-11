import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {clientdetails} from "../../models/clientdetails";

@Injectable()
export class ClientDetailsService {
    constructor(private restService: RestService) {
    }

    public getClientDetails(entityId: string) {
        return this.restService.getData("/clientview/details/" + entityId);
    }

    public saveClientDetails(clientDetails: any, client: any) {
        var req = {
            "clientDetails": clientDetails,
            "client" : client
        };

        return this.restService.postData("/clientview/details", req);
    }
  
}
