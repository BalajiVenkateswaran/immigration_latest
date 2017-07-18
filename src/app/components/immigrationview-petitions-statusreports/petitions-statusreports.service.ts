import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class petitionsstatusreportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonstatusreports(accountId:string) {
        console.log("petionstatusreports|getstatus|", accountId );
        return this.restService.getData("/immigration/account/" + accountId + "/petition/status");
    }
}