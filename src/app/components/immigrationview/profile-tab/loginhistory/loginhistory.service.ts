import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class profileloginhisservice {

    constructor(private restService: RestService) {

    }
    public getLoginHistory(userid: string, queryData: string) {
        return this.restService.getData("/profile/user/loginHistory/" + userid+queryData);
    }

}
