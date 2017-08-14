import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class ManageAccountChecklistService {

    constructor(private restService: RestService) {

    }
    public getChecklist(accountId: string) {
        return this.restService.getData("/immigration/account/" + accountId+ "/checklist");
    }
    public uploadFile(checklistId: string, formData: FormData) {
    return this.restService.postData("/immigration/account/" + checklistId + "/checklist/file/upload", formData);
    }
    public addChecklist(accountId: string, fileId: string, petitiontypeId: string) {
        var req = {
            "accountId": accountId,
            "fileId": fileId,
            "petitionTypeId": petitiontypeId
        };
        return this.restService.postData("/immigration/account/checklist",req);
    }
}
