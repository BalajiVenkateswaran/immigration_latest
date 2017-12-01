import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountUserDetailsService {
    constructor(private restService: RestService) {
    }
    public updateUser(userData: User) {
        return this.restService.putData('/userorgs', userData);
    }

    public getUserDet(userid, accountid) {
        return this.restService.getData('/userorgs/' + userid + '/accounts/' + accountid);
    }
    public getLoginHistory(userId: string, queryData: string) {
        return this.restService.getData('/profile/user/loginHistory/' + userId + queryData);
    }

}
