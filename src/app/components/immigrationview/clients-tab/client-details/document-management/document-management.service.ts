import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DocumentManagementService {
    constructor(private restService: RestService) {

    }

    public getOrgdocs(orgId: string) {
        return this.restService.getData('/file/entityId/' + orgId + '/entityType/ORGANIZATION');
    }

    public getClientdocs(clientId: string) {
        return this.restService.getData('/file/entityId/' + clientId + '/entityType/CLIENT');
    }

    public getPetitiondocs(petitionId: string) {
        return this.restService.getData('/file/entityId/' + petitionId + '/entityType/PETITION');
    }

    public getDocOrder(petitionId: string) {
      return this.restService.getData('/petition/doc/order/' + petitionId);
    }

    public saveDocOrder(req: any) {
      return this.restService.postData('/petition/doc/order', req);
    }
    public mergeFile(petitonId: string) {
        return this.restService.getData('/file/merge/' + petitonId);
    }
}

