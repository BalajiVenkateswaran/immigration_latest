import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersOpenPetitionService {

    constructor(private restService: RestService) {

    }
    public getuseropenpetitions(accountId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/user/open/petition');
    }
}
