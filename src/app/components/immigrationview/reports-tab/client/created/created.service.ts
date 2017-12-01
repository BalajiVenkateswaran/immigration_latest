import {RestService} from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ClientsCreatedReportsService {
    constructor(private restService: RestService) {
    }
    public getClientCreationreports(accountId: string) {
        console.log('clientcreationreports|getstatus|', accountId);
        return this.restService.getData('/immigration/account/' + accountId + '/client/creation');
    }
}
