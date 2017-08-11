import {Injectable} from "@angular/core";
import {RestService} from "../../../../services/rest.service";

@Injectable()
export class superUserviewAccountService {

    constructor(private restService: RestService) {
    }

    public getAccountDetails() {
        var req = {};
        return this.restService.postData("/superuser/account/accountSummary",req);
    }

    public createAccount(accountDetails) {
        return this.restService.postData("/superuser/account", accountDetails);
    }
}