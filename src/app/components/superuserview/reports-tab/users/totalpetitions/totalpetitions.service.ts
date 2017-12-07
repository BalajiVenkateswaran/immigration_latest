import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserTotalPetitionsReportsService {
    constructor(private restService: RestService) {
    }
    public gettotalpetitionsreports(accountId: string) {
        console.log('clientcreationreports|getstatus|', accountId);
        return this.restService.getData('/superuser/account/' + accountId + '/user/petition/creation');
    }
}
