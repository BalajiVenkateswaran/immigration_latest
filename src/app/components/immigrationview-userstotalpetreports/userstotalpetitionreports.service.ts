import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class usertotalpetitionservice {

    constructor(private restService: RestService) {

    }
    public getuserstotpetitions(accountId: string) {
        return this.restService.getData("/immigration/account/" + accountId + "/user/petition/creation");
    }
}
