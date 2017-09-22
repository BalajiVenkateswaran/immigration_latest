import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class petitionstagsreportsservice {

    constructor(private restService: RestService) {

    }
    public getpetitonTagsreports(accountId: string) {
        console.log("petiontypereportsreports|getstatus|", accountId);
        return this.restService.getData("/immigration/account/" + accountId + "/petition/tag");
    }
    public getpetitonstags(accountId: string) {
        return this.restService.getData("/immigration/getTags/" + accountId );
    }
}