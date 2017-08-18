import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class profileuserservice {

    constructor(private restService: RestService) {

    }
    public getUserInfo(userid: string) {
        return this.restService.getData("/profile/user/" + userid);
    }
    public updateUser(userData: any) {
        return this.restService.putData("/user", userData);
    }
    public getDefaultOrg(accountId: string, userId: string) {
        return this.restService.getData("/immigration/account/"+accountId+"/user/"+userId+"/profile/defaultOrg");
    }
    public setDefaultOrg(data: any) {
        var req = { "userDefaultOrg": data}
        return this.restService.postData("/immigration/account/user/profile/defaultOrg", req);
    }
}
