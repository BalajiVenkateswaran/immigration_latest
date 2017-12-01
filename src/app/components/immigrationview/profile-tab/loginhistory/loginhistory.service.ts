import {RestService} from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ProfileLoginHisService {

    constructor(private restService: RestService) {

    }
    public getLoginHistory(userid: string, queryData: string) {
        return this.restService.getData('/profile/user/loginHistory/' + userid + queryData);
    }

}
