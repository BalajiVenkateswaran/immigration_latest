import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class sperusertotalpetitionsreportsservice {
    constructor(private restService: RestService) {
    }
    public gettotalpetitionsreports(accountId: string) {
        console.log("clientcreationreports|getstatus|", accountId);
        return this.restService.getData("/superuser/account/" + accountId + "/user/petition/creation");
    }
}
