import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class QuestionnaireService {
    constructor(private restService: RestService) {
    }

    public getQuestionnaireForms(petitionId: string) {
        return this.restService.getData('/questionnaire/forms/petitionType/' + petitionId);
    }
    public getQuestionnaires(petitionId: string) {
        return this.restService.getData('/questionnaires/petition/' + petitionId + '?page=1&size=10');
    }
    public saveNewQuestionnaireClient(questionnaireData: any, updatedUserId: string) {
        let req = {
          questionnaire: questionnaireData,
          updatedUserId: updatedUserId
        };
        return this.restService.postData('/questionnaire', req);
    }

    public sentQuestionnaireEmailToClient(req: any) {
        return this.restService.postData('/questionnaire/sendQuestionnaireToClient', req);
    }

    public deleteQuestionnaire(questionnaireId) {
        return this.restService.deleteData('/questionnaire/' + questionnaireId);
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
