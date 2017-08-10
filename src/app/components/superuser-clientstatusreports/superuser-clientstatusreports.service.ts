import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class superuserclientstatusreportsservice {

    constructor(private restService: RestService) {

    }
    public getclientstatusreports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/superuser/account/" + accountId + "/client/status");
    }
}