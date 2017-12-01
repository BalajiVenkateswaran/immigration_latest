import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PetitionFinalActionService {

    constructor(private restService: RestService) {

    }
    public getfinalstatus(accountId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/petition/finalstatus');
    }
}
