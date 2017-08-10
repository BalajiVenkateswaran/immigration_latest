import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class superusersopenpetitionservice {

    constructor(private restService: RestService) {

    }
    public getuseropenpetitions(accountId: string) {
        return this.restService.getData("/superuser/account/" + accountId + "/user/open/petition");
    }
}