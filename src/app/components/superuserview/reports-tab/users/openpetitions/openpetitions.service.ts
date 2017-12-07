import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class SuperUsersOpenPetitionService {

    constructor(private restService: RestService) {

    }
    public getuseropenpetitions(accountId: string) {
        return this.restService.getData('/superuser/account/' + accountId + '/user/open/petition');
    }
}
