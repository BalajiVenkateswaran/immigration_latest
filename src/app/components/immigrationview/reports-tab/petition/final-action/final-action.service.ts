import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class petitionfinalactionservice {

    constructor(private restService: RestService) {

    }
    public getfinalstatus(accountId: string) {
        return this.restService.getData("/immigration/account/" + accountId + "/petition/finalstatus");
    }
}