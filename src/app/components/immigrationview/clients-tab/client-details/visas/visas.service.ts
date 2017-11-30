import { visa } from '../../../../../models/visa';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewVisasService {

    constructor(private restService: RestService) {

    }
    public getClientVisas(clientId: string) {
        return this.restService.getData('/client/visa/' + clientId);
    }
    public saveClientVisas(visaData: visa, userId: string) {
        let req = {
            'visa': visaData,
            'updatedByUser': userId
        };
        return this.restService.postData('/client/visa', req);
    }
    public deleteClientVisa(visaId: string) {
        return this.restService.deleteData('/client/visa/' + visaId);
    }
}
