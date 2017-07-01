import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {client} from "../../models/client";
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";

@Injectable()
export class superUserviewAccountService {

    constructor(private restService: RestService) {

    }

    public getAccountDetails(accountId: string) {
        return this.restService.getData("/superuser/account/" + accountId+"/details");
    }

    public saveAccountDetails(accountDetails) {
        return this.restService.postData("/superuser/account/details    ", accountDetails);
    }

  
}