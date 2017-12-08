import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';

@Injectable()
export class ClientViewPassportInfoService {
    constructor(private restService: RestService) {

    }

    public getClientPassportDetails(userId: string) {
        return this.restService.getData('/client/' + userId + '/details/passport');
    }

    public savePassportDetails(passportDetails: any, userId: string) {
        let req = {
            'passport': passportDetails
        };

        return this.restService.postData('/client/' + userId + '/details/passport', req);
    }


}
