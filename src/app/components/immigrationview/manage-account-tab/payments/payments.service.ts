import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountPaymentsService {

    constructor(private restService: RestService) {

    }
    public getPaymentDetails(accountId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/payments');
    }

}
