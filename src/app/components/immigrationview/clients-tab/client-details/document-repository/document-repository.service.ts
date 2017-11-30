import { documentRepository } from '../../../../../models/documentRepository';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ClientDocumentRepositoryService {

    constructor(private restService: RestService) {
    }
    public saveNewDocumentRepository(documentRepositorytData: documentRepository) {
        return this.restService.postData('/documentRepository', documentRepositorytData);

    }
    public getFile(clientId: string) {
        return this.restService.getData('/file/entityId/' + clientId + '/entityType/CLIENT');
    }
    public deleteFile(fileId: string, orgId: string) {
        return this.restService.deleteData('/file/' + fileId + '/org/' + orgId);
    }
    public uploadFile(entityId: string, orgId: string, formData: FormData) {
            return this.restService.postDataWithHeaders('/file/upload/entityId/' + entityId + '/entityType/CLIENT/org/' + orgId,
              formData);
    }
    public replaceFile(fileId: string, orgId: string, formData: FormData) {
        return this.restService.postDataWithHeaders('/file/replace/' + fileId + '/org/' + orgId, formData);
    }
    public renameFile(url: string, data: any) {
        return this.restService.postData(url, data);

    }
    public downloadFile(fileId: string, orgId: string) {
        return this.restService.getFile('/file/' + fileId + '/org/' + orgId);
    }

}
