import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class FormsService {

    constructor(private restService: RestService) {
    }

    public getForms(petitionId: string) {
        return this.restService.getData('/questionnaire/forms/' + petitionId);

    }
    public generateForms(questionnaireId: string, accountId: string, data: any) {
        return this.restService.postData('/questionnaire/generateForm/' + questionnaireId + '/accountId' + '/' + accountId, data);
    }
    public downloadFile(fileId: string, orgId: string) {
        return this.restService.getFile('/file/' + fileId + '/org/' + orgId);
    }
    public renameFile(url: string, data: any) {
        return this.restService.postData(url, data);

    }
}
