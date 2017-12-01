import {RestService} from '../../../../services/rest.service';
import {Injectable} from '@angular/core';
@Injectable()
export class ManageAccountPetitionStagesService {
  constructor(private restService: RestService) {
  }

  public getPetitionTypes() {
    return this.restService.getData('/petition/types');
  }

  public getPetitionStages(petitionTypeId, accountId) {
    return this.restService.getData('/account/petitionStage/accountId/' + accountId + '/petitionType/' + petitionTypeId);
  }
  public deletePetitionStage(petitionStageId) {
    return this.restService.deleteData('/account/deletePetitionStage/' + petitionStageId);
  }
  public addPetitionStage(petitonstage) {
    return this.restService.postData('/account/addPetitionStage/', petitonstage);
  }
  public updatePetitionStage(updatedstage) {
    return this.restService.postData('/account/petitionStage/', updatedstage);
  }
  public saveStageOrder(req: any) {
    return this.restService.postData('/account/petitionStage', req);
  }
}
