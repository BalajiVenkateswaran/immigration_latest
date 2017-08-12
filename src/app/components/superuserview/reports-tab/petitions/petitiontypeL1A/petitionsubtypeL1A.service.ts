import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class superuserL1Areportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonTypesreports(accountId: string, petitionId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId, petitionId);
        return this.restService.getData("/superuser/account/" + accountId + "/petition/subtype/" + petitionId);
    }
}