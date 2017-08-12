import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class clientstatusreportsservice {

    constructor(private restService: RestService) {
    }
    public getclientstatusreports(accountId: string) {
        console.log("getclientstatusreports|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/client/status");
    }
}