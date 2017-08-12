import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class petitionstagesreportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonStagereports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/petition/stage");
    }
}