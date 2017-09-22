import {Injectable} from "@angular/core";
import {RestService} from "../../../../services/rest.service";

@Injectable()
export class SuperUserviewAccountService {

    constructor(private restService: RestService) {
    }

    public getAccountDetails(queryData) {
        var req = {};
        if(queryData == null){
          queryData = "?size=20";
        }
        return this.restService.postData("/superuser/account/accountSummary"+queryData,req);
    }

    public createAccount(accountDetails) {
        return this.restService.postData("/superuser/account", accountDetails);
    }
    public getaccountnames() {
        return this.restService.getData("/superuser/account/names");
    }
}
