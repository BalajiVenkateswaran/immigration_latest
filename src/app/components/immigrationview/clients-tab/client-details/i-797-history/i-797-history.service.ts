import { i797history } from '../../../../../models/i797history';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewI797HistoryService {

    constructor(private restService: RestService) {

    }
    public getI797Details(clientId: string) {
        return this.restService.getData('/client/i797details/' + clientId);
    }

    public saveI797Details(i797Details: i797history, userId: string) {
        let data = {
            'i797History': i797Details,
            'updatedByUser': userId
        };
        return this.restService.postData('/client/i797details', data);

    }
    public removeI797Details(i797DetailsId: string) {
        return this.restService.deleteData('/client/i797details/' + i797DetailsId);
    }
}
