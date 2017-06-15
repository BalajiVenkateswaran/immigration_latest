import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {clientDocuments} from "../../models/documents";

@Injectable()
export class documentService {
    constructor(private restService: RestService) {

    }

    public saveNewDocumentRepository(documentRepositorytData) {
        return this.restService.postData("/documentRepository", documentRepositorytData);

    }
    public getFile(clientId: string) {
        return this.restService.getData("/file/entityId/" + clientId + "/entityType/CLIENT");
    }
    public deleteFile(fileId: string) {
        return this.restService.deleteData("/file/" + fileId);
    }
    public uploadFile(entityId: string, formData: FormData, headers: any) {
        return this.restService.postDataWithHeaders("/file/upload/entityId/" + entityId + "/entityType/CLIENT",
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