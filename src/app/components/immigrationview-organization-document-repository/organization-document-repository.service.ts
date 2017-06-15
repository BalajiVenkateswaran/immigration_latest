import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {documentRepository} from "../../models/documentRepository";

@Injectable()
export class OrganizationDocumentRepositoryService {

    constructor(private restService: RestService) {

    }
    public saveNewDocumentRepository(documentRepositorytData: documentRepository) {
        return this.restService.postData("/documentRepository", documentRepositorytData);
    }
    public getFile(petitionId: string) {
        return this.restService.getData("/file/entityId/" + petitionId+"/entityType/ORGANIZATION");
    }
    public deleteFile(fileId: string) {
        return this.restService.deleteData("/file/" + fileId);
    }
    public uploadFile(entityId: string, formData: FormData, headers: any) {
            return this.restService.postDataWithHeaders("/file/upload/entityId/"+entityId+"/entityType/ORGANIZATION",
              formData, headers);
    }
    public replaceFile(fileId: string, formData: FormData, headers: any) {
        return this.restService.postDataWithHeaders("/file/replace/" + fileId, formData, headers);
    }
    public renameFile(url: string, data: any) {
        return this.restService.postData(url, data);

    }
    public downloadFile(fileId: string) {
        return this.restService.getFile("/file/" + fileId);

    }

}
