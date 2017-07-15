import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
@Injectable()
export class QuestionnaireI129HService {
    constructor(private restService: RestService) {
    }
    public getI129H(questionnaireId: string) {
        return this.restService.getData("/questionnaire/i129H/" + questionnaireId);
    }

    public saveQuestionnairei129(questionnairei129h: any, questionnaireId: string, questionnairei129hsignature: any, questionnairei129hstayPeriodList: any) {
        questionnairei129h['signature'] = questionnairei129hsignature;
        if (questionnairei129hstayPeriodList != null) {
            questionnairei129h['stayPeriodList'] = questionnairei129hstayPeriodList;
        }
        var req = {
            "i129H": questionnairei129h,
            "questionnaireId": questionnaireId
        }

        return this.restService.postData("/questionnaire/i129H", req);
    }
    public populateI129H(questionnaireID: string) {
        console.log(questionnaireID);
        return this.restService.postData("/questionnaire/populate/"+ questionnaireID,{});
    }
      }





