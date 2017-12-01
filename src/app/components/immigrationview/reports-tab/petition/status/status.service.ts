import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PetitionsStatusReportsService {

    constructor(private restService: RestService) {

    }
    public getpetitonstatusreports(accountId: string) {
        console.log('petionstatusreports|getstatus|', accountId );
        return this.restService.getData('/immigration/account/' + accountId + '/petition/status');
    }
}
