import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationviewDocumentExpirationsService {
    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData('/client/DocumentExpiration/' + clientId);
    }
    public saveDocumentExpairation(documentExpiration: any, userId: string) {
        let req = {
            'documentExpirations': documentExpiration,
            'updatedByUser': userId
        }
        return this.restService.postData('/client/DocumentExpiration', req);
    }


    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData('/client/DocumentExpiration/' + documentExpirationId);
    }
}
