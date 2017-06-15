import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
@Injectable()
export class QuestionnaireClientViewService {
    constructor(private restService: RestService) {
    }
    public getQuestionnaire(questionnaireId: string) {
        console.log(questionnaireId);
        return this.restService.getData("/questionnaire/i129/clientView/beneficiaryInfo/" + questionnaireId);
    }
    public saveQuestionnaire(data: any, questionnaireId: string, action: string) {
            var req = {
                "beneficiaryInfo": data,
                "questionnaireId": questionnaireId,
                "action": action
                   }

            return this.restService.postData("/questionnaire/i129/clientView/beneficiaryInfo", req);
    }

        }



