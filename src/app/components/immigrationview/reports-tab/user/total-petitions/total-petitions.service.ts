import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UserTotalPetitionService {

    constructor(private restService: RestService) {

    }
    public getuserstotpetitions(accountId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/user/petition/creation');
    }
}
