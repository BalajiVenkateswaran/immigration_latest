import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";


@Injectable()
export class loginService {

    constructor(private restService: RestService) {
    }

    public forgetPassword(email:string) {
        console.log("loginService|updatePassword|email:%o", email);
        return this.restService.postData("/user/forgetPassword" , email);
    }
    public getUserOrgs(accountid: string, userid: string, roleid:string) {
        return this.restService.getData("/org/account/"+accountid+"/user/"+userid+"/role/"+roleid);
    }
}
