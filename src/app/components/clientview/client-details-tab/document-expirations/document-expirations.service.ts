import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {DocumentExpiration} from '../../../../models/documentExpiration';

@Injectable()
export class DocumentExpirationsService {

    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData('/client/details/documentexpiration/' + clientId);
    }

    public saveDocumentExpairation(documentExpiration: DocumentExpiration, userId: string) {
        let req = {
            'documentExpirations': documentExpiration,
          'updatedByUser': userId
        }
        return this.restService.postData('/client/details/documentexpiration', req);
    }


    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData('/client/details/documentexpiration/' + documentExpirationId);
    }

}
