
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PassportInfoService {

    constructor(private restService: RestService) {
    }

    public getClientPassportDetails(clientId: string) {
        return this.restService.getData('/immigration/client/' + clientId + '/details/passport');
    }

    public savePassport(accountId: string, passport: any, userId: string) {
        console.log('immigrationview-passport-info|savePassport|passport:%o', passport);
        let req = {
            'passport': passport,
            'updatedByUser': userId
        };
        return this.restService.postData('/immigration/account/' + accountId + '/client/' + userId + '/details/passport', req);
    }
}
