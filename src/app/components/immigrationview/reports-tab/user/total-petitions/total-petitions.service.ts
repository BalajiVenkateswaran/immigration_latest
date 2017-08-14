import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class usertotalpetitionservice {

    constructor(private restService: RestService) {

    }
    public getuserstotpetitions(accountId: string) {
        return this.restService.getData("/immigration/account/" + accountId + "/user/petition/creation");
    }
}
