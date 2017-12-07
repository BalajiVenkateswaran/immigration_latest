import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserPetitionsStatusReportsService {

    constructor(private restService: RestService) {

    }
    public getpetitonstatusreports(accountId: string) {
        console.log('petionstatusreports|getstatus|', accountId);
        return this.restService.getData('/superuser/account/' + accountId + '/petition/status');
    }
}
