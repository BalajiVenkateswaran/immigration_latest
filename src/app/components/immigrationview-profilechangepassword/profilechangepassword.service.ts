import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class profilechangepwdservice {

    constructor(private restService: RestService) {

    }
    public updatePassword(req: any) {
        return this.restService.postData("/user/updatePassword", req);
    }
}