import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class superuserH1Breportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonTypesreports(accountId: string, petitionId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId, petitionId);
        return this.restService.getData("/superuser/account/" + accountId + "/petition/subtype/" + petitionId);
    }
}