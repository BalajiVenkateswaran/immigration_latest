import {Injectable} from "@angular/core";
import { RestService } from '../../../../../../services/rest.service';

@Injectable()
export class QuestionnaireCommonService {
constructor(private restService: RestService) {
}
public getQuestionnaireData(questionnaireId,pageNo){
    return this.restService.getData("/immigration/questionnaire/"+questionnaireId+"/page/"+pageNo);
}
public saveQuestionnaireData(questionnaireId,pageNo,data){
  
   return this.restService.postData("/immigration/questionnaire/"+questionnaireId+"/page/"+pageNo,data);
}
  
}
