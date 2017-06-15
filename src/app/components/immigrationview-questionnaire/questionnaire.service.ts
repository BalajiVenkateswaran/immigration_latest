import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class QuestionnaireService {
    constructor(private restService: RestService) {
    }

    public getQuestionnaireForms(petitionId: string) {
        return this.restService.getData("/questionnaire/forms/petitionType/" + petitionId);
    }
    public getQuestionnaires(petitionId: string) {
        return this.restService.getData("/questionnaires/petition/" + petitionId + "?page=1&size=100");
    }
    public saveNewQuestionnaireClient(questionnaireData: any) {
        var req = {
          questionnaire : questionnaireData
        };
        return this.restService.postData("/questionnaire", req);
    }

    public sentQuestionnaireEmailToClient(req: any) {
        return this.restService.postData("/questionnaire/sendQuestionnaireToClient", req);
    }

    public deleteQuestionnaire(questionnaireId) {
        return this.restService.deleteData("/questionnaire/" + questionnaireId);
    }
}
