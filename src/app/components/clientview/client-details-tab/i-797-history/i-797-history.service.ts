import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {i797history} from '../../../../models/i797history';

@Injectable()
export class I797HistoryService {

    constructor(private restService: RestService) {

    }

    public getI797Details(userId: string) {
        return this.restService.getData('/clientview/i797details/' + userId);
    }
    public saveI797Details(i797Details: i797history) {
        let data = {
            'i797History': i797Details
        };
        return this.restService.postData('/clientview/i797details', data);

    }
    public removeI797Details(i797DetailsId: string) {
        return this.restService.deleteData('/client/i797details/' + i797DetailsId);
    }
}
