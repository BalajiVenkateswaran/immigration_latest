import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserH1BReportsService {

    constructor(private restService: RestService) {

    }
    public getpetitonTypesreports(accountId: string, petitionId: string) {
        console.log('petiontypereportsreports|getstatus|', accountId, petitionId);
        return this.restService.getData('/superuser/account/' + accountId + '/petition/subtype/' + petitionId);
    }
}
