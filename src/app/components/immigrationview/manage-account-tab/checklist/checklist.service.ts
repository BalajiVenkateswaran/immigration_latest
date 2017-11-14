import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountChecklistService {

    constructor(private restService: RestService) {

    }
    public getChecklist(accountId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/checklist');
    }
    public uploadFile(accountId: string, petitiontypeId: string, formData: FormData) {
        return this.restService.postData('/immigration/account/' + accountId + '/checklist/upload/petitiontype/' + petitiontypeId, formData);
    }
    public downloadChecklist(checklistId: string) {
        return this.restService.getFile('/immigration/account/downloadCheckList/' + checklistId);
    }
}
