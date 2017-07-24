import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class clientstatusreportsservice {

    constructor(private restService: RestService) {

    }
    public getclientstatusreports(accountId: string) {
        console.log("getclientstatusreports|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/client/status");
    }
}