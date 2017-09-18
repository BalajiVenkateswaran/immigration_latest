import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class SuperUserPetitionTagReportsService {

    constructor(private restService: RestService) {
    }
    public getpetitontagreports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/superuser/account/" + accountId + "/petition/tag");
    }
}
