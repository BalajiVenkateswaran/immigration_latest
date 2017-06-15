import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
@Injectable()
export class QuestionnaireI129HClentviewService {
    constructor(private restService: RestService) {
    }
    public getI129Hclientview(questionnaireId: string) {
        return this.restService.getData("/questionnaire/i129H/clientView/" + questionnaireId);
    }
    public saveQuestionnairei129(questionnairei129h: any, questionnaireId: string, questionnairei129hstayPeriodList: any, action: string) {
        if (questionnairei129hstayPeriodList != null) {
            questionnairei129h['stayPeriodList'] = questionnairei129hstayPeriodList;
        }
        var req = {

            "i129HbeneficiaryInfo": questionnairei129h,
            "questionnaireId": questionnaireId,
            "action": action
        }

        return this.restService.postData("/questionnaire/i129H/clientView/beneficiaryInfo", req);
    }


}

