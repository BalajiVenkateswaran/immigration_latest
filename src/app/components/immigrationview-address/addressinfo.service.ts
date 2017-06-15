import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {RestService} from "../../services/rest.service";

@Injectable()
export class Addressinfoservice {

    constructor(private restService: RestService) {

    }

    public getClientAddress(clientId: string) {
        return this.restService.getData("/client/address/" + clientId);
    }
    public saveClientAddress(clientAddress:any, clientId: string) {
        var req = {
            "clientAddress": clientAddress,
            "clientId": clientId
        };

        return this.restService.postData("/client/address", req);

    }
}
