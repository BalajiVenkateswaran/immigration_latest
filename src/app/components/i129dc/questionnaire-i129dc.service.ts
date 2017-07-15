import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
@Injectable()
export class QuestionnaireI129DCService {
    constructor(private restService: RestService) {
    }
    public getI129DC(questionnaireId: string) {
        return this.restService.getData("/questionnaire/i129DC/" + questionnaireId);
    }
    public saveI129DC(questionnaireData, employerInfo: any[], determinationInfo: any[], generalInfo, questionnaireId: string) {
        console.log(questionnaireData);
        var req = {
            "i129DC": {
                "determinationInfo": determinationInfo,
                "generalInfo": { "employerInfo": employerInfo, "higherEducation": generalInfo.higherEducation, "primaryStudy": generalInfo.primaryStudy },
                "beneficiaryname": questionnaireData.beneficiaryname,
                "petitionerName": questionnaireData.petitionerName
            },
            "questionnaireId": questionnaireId
        };
        return this.restService.postData("/questionnaire/i129DC", req);
    }
    public populateQuestionnaireDC(questionnaireID: string) {
        console.log(questionnaireID);
        return this.restService.postData("/questionnaire/populate/"+questionnaireID, {});
    }
}
