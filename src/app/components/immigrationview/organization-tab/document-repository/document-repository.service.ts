import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class OrganizationDocumentRepositoryService {

    constructor(private restService: RestService) {

    }
    public getFile(petitionId: string) {
        return this.restService.getData("/file/entityId/" + petitionId+"/entityType/ORGANIZATION");
    }
    public deleteFile(fileId: string) {
        return this.restService.deleteData("/file/" + fileId);
    }
    public uploadFile(entityId: string, formData: FormData) {
            return this.restService.postDataWithHeaders("/file/upload/entityId/"+entityId+"/entityType/ORGANIZATION", formData);
    }
    public replaceFile(fileId: string, formData: FormData) {
        return this.restService.postDataWithHeaders("/file/replace/" + fileId, formData);
    }
    public renameFile(url: string, data: any) {
        return this.restService.postData(url, data);

    }
    public downloadFile(fileId: string) {
        return this.restService.getFile("/file/" + fileId);

    }

}
