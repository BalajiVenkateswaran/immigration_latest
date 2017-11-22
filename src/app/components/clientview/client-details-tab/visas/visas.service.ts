import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {visa} from '../../../../models/visa';

@Injectable()
export class VisasService {

    constructor(private restService: RestService) {
    }
    public getClientVisas(userId: string) {
        return this.restService.getData('/clientview/visa/' + userId);
    }
    public saveClientVisas(visaData: visa) {
        let req = {
            'visa': visaData
        };
        return this.restService.postData('/clientview/visa', req);
    }
    public deleteClientVisa(visaId: string) {
        return this.restService.deleteData('/client/visa/' + visaId);
    }

}
