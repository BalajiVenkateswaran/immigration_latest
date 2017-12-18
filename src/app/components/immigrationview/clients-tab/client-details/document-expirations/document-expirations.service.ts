import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationviewDocumentExpirationsService {
    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData('/immigration/client/details/documentexpiration/' + clientId);
    }
    public saveDocumentExpairation(documentExpiration: any, userId: string) {
        let req = {
            'documentExpirations': documentExpiration,
            'updatedByUser': userId
        }
        return this.restService.postData('/immigration/client/details/documentexpiration', req);
    }


    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData('/immigration/client/details/documentexpiration/' + documentExpirationId);
    }
}
