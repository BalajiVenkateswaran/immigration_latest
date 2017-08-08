﻿import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RestService} from "../../services/rest.service";

@Injectable()
export class superuserprofileuserservice {

    constructor(private restService: RestService) {

    }
    public getUserInfo(userid: string) {
        return this.restService.getData("/profile/user/" + userid);
    }
    public updateUser(userData: any) {
        return this.restService.putData("/user", userData);
    }
    //public getDefaultOrg(userid: string) {
    //    return this.restService.getData("/profile/user/defaultOrg/" + userid);
    //}
    //public setDefaultOrg(data: any) {
    //    var req = { "userDefaultOrg": data }
    //    return this.restService.postData("/profile/user/defaultOrg/", req);
    //}
}