import {Injectable} from "@angular/core";
import {RestService} from "../../../services/rest.service";
import {documentExpiration} from "../../../models/documentExpiration";

@Injectable()
export class DocumentExpirationsService {

    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData("/clientview/documentExpiration/" + clientId);
    }

    public saveDocumentExpairation(documentExpiration: documentExpiration) {
        var req = {
            "documentExpirations": documentExpiration
        }
        return this.restService.postData("/clientview/documentExpiration", req);
    }


    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData("/client/documentExpiration/" + documentExpirationId);
    }

}
