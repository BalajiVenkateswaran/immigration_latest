import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {form} from "../../models/form";

@Injectable()
export class FormsService {

    constructor(private restService: RestService) {

    }

    public getForms(petitionId: string) {
        return this.restService.getData("/questionnaire/forms/" + petitionId);

    }
    public generateForms(questionnaireId: string, accountId: string,data:any) {
        return this.restService.postData("/questionnaire/generateForm/" + questionnaireId + "/accountId" +"/"+accountId,data);
    }
}
