import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserPetitionStagesReportsService {
  constructor(private restService: RestService) {}
  public getpetitonStagereports(accountId: string, petitionTypeId: string) {
    console.log('petiontypereportsreports|getstatus|', accountId);
    return this.restService.getData('/superuser/account/' + accountId + '/petition/' + petitionTypeId + '/stage');
  }
  public getPetitionTypes() {
    return this.restService.getData('/petition/types');
  }
}
