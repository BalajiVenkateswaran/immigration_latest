import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class webAboutusService {

    constructor(private restService: RestService) {
    }
    public login(user: User) {
      return this.restService.postData("/user/authenticate", user);
    }
  

    public forgetPassword(email:string) {
        console.log("webImmigrationServicesService|updatePassword|email:%o", email);
        return this.restService.postData("/user/forgetPassword" , email);
    }

    public updateLoginHistory(userLoginHistoryId: string, roleId: string){
      return this.restService.postData("/user/login/history/"+userLoginHistoryId, {roleId: roleId});

    }
}
