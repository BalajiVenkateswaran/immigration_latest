import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';

@Injectable()
export class ClientDetailsService {
    constructor(private restService: RestService) {
    }

    public getClientDetails(userId: string) {
        return this.restService.getData('/client/' + userId + '/details');
    }

    public saveClientDetails(clientDetails: any, client: any, userId: string) {
        let req = {
            'clientDetails': clientDetails,
            'client' : client
        };

        return this.restService.postData('/client/' + userId + '/details', req);
    }

}
