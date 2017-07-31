import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class profileloginhisservice {

    constructor(private restService: RestService) {

    }
    public getLoginHistory(userid: string) {
        return this.restService.getData("/profile/user/loginHistory/" + userid);
    }
   
}