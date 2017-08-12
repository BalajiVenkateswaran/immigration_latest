import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class SuperUserPetitionFinalActionReportsService {

    constructor(private restService: RestService) {

    }
    public getpetitonfinalactionreports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/superuser/account/" + accountId + "/petition/finalstatus");
    }
}