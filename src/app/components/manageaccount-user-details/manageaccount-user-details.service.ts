import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";

@Injectable()
export class ManageAccountUserDetailsService {
    constructor(private restService: RestService) {
    }
    public updateUser(userData: User) {
      return this.restService.putData("/user", userData);
    }

    public getUserDet(userid, accountid) {
        return this.restService.getData("/userorgs/" + userid + "/accounts/" + accountid);
    }
}
