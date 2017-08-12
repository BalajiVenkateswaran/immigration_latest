import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class superuserpetitionstagesreportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonStagereports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/superuser/account/" + accountId + "/petition/stage");
    }
}