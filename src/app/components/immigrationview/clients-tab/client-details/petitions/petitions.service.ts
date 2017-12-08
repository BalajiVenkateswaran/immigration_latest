import { petition } from '../../../../../models/petitions';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ImmigrationViewPetitionsService {

    constructor(private restService: RestService) {

    }

    public getPetitions(orgId: string, clientId: string, queryParams: any) {
        console.log('PetitionsService|getPetitions|orgId:%o, clientId:%o', orgId, clientId, queryParams);
        return this.restService.getData('/petitions/orgId/' + orgId + '/clientId/' + clientId + queryParams);
    }


    public getAllPetitionTypesAndSubTypes() {
        return this.restService.getData('/petition/config/all/types/subtypes');
    }

    public saveNewImmigrationViewPetition(petitionData: petition, userId: string) {
      let req = {
        petition : petitionData,
        userId: userId
      };
      return this.restService.postData('/petition', req);
  }

  public updatePetition(petitionData: petition) {
        let req = {
          petition : petitionData
        };
        return this.restService.putData('/petition', req);
    }
  public getPetitionTypes() {

      return this.restService.getData('/petition/config/all/types/subtypes');
  }
  public toggleEmailNotification(clientId: string) {
      return this.restService.postData('/immigration/clientId/' + clientId, {});
  }
}
