import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PetitionTypeReportService {

    constructor(private restService: RestService) {

    }
    public getpetitonTypesreports(accountId: string, petitionId: string) {
        console.log('petiontypereportsreports|getstatus|', accountId, petitionId);
        return this.restService.getData('/immigration/account/' + accountId + '/petition/subtype/' + petitionId);
    }
}
