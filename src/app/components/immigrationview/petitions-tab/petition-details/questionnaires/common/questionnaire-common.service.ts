import {Injectable} from "@angular/core";
import { RestService } from '../../../../../../services/rest.service';
import {AppService} from '../../../../../../services/app.service'
import {Router} from "@angular/router";

@Injectable()
export class QuestionnaireCommonService {

  private _questionnaireList : any[];
  private _selectedQuestionnaire : any;

  set questionnaireList(questionnaireList: any[]){
    this._questionnaireList = questionnaireList;
  }
  get questionnaireList(){
    return this._questionnaireList;
  }
  set selectedQuestionnaire(selectedQuestionnaire: any){
    this._selectedQuestionnaire = selectedQuestionnaire;
  }
  get selectedQuestionnaire(){
      return this._selectedQuestionnaire;
  }

  constructor(private restService: RestService, private appService: AppService, private _router: Router) {
  }

  public moveToQuestionnaire(questionnaire: any) {
      this.selectedQuestionnaire = questionnaire;

      var pageName = "";
      if (this.selectedQuestionnaire['formName'] == "I-129") {
          if(this.appService.applicationViewMode == "Immigration"){
              pageName = 'i129Page1';
          } else {
             pageName = 'questionnaire-i129clientView';
          }
      }
      else if (this.selectedQuestionnaire['formName'] == "I-129 DC") {
            if(this.appService.applicationViewMode == "Immigration"){
               pageName = 'i129dcPage1';
            }
      }
      else {
          if(this.appService.applicationViewMode == "Immigration"){
              pageName = 'i129hPage1';
          } else {
             pageName = 'questionnaire-i129hclientView';
          }
      }

      this._router.navigate([pageName], { skipLocationChange: true });
    }



  public getQuestionnaireData(questionnaireId,pageNo){
      return this.restService.getData("/immigration/questionnaire/"+questionnaireId+"/page/"+pageNo);
  }

  public saveQuestionnaireData(questionnaireId,pageNo,data){
     return this.restService.postData("/immigration/questionnaire/"+questionnaireId+"/page/"+pageNo,data);
  }
}
