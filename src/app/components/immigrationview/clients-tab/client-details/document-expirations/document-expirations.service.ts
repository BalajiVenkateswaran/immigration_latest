import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class ImmigrationviewDocumentExpirationsService {
    constructor(private restService: RestService) {

    }
    public getDocumentExpiration(clientId: string) {
        return this.restService.getData("/client/documentExpiration/" + clientId);
    }
    public saveDocumentExpairation(documentExpiration: any) {
        var req = {
            "documentExpirations": documentExpiration
        }
        return this.restService.postData("/client/documentExpiration", req);
    }

    
    public deleteDocumentExpiration(documentExpirationId: string) {
        return this.restService.deleteData("/client/documentExpiration/" + documentExpirationId);
    }
}
