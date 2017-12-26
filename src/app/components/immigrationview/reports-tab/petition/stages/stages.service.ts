import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PetitionStagesReportsService {

    constructor(private restService: RestService) {

    }
    public getpetitonStagereports(accountId: string, petitionTypeId: string) {
        console.log('petiontypereportsreports|getstatus|', accountId);
        return this.restService.getData('/immigration/account/' + accountId + '/petition/' + petitionTypeId + '/stage');
    }
}
