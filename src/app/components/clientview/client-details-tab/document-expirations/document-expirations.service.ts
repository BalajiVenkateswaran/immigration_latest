import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {DocumentExpiration} from '../../../../models/documentExpiration';

@Injectable()
export class DocumentExpirationsService {

    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData('/clientview/DocumentExpiration/' + clientId);
    }

    public saveDocumentExpairation(documentExpiration: DocumentExpiration) {
        let req = {
            'documentExpirations': documentExpiration
        }
        return this.restService.postData('/clientview/DocumentExpiration', req);
    }


    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData('/client/DocumentExpiration/' + documentExpirationId);
    }

}
