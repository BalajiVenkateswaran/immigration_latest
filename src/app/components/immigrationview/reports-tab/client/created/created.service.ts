import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class clientscreatedreportsservice {
    constructor(private restService: RestService) {
    }
    public getClientCreationreports(accountId: string) {
        console.log("clientcreationreports|getstatus|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/client/creation");
    }
}
