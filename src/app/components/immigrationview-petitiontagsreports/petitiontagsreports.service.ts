import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class petitionstagsreportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonTagsreports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/petition/tag");
    }
}