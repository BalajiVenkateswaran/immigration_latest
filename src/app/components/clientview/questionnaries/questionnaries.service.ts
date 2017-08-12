import {Injectable} from "@angular/core";
import {RestService} from "../../../services/rest.service";

@Injectable()
export class ClientQuestionnaireService{
    constructor(private restService: RestService) {
    }
    public getQuestionnaireForClient(clientId: string) {
        return this.restService.getData("/questionnaires/client/" + clientId +"?page=1&size=100")
    }
    public getQuestionnaireForms(petitionId: string) {
        return this.restService.getData("/questionnaire/forms/petitionType/" + petitionId);
    }
}
