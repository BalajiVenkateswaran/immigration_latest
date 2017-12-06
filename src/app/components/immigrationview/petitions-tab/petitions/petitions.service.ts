import { petition } from '../../../../models/petitions';
import { RestService } from '../../../../services/rest.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {PaginationUtil} from '../../../framework/utils/pagination';

@Injectable()
export class PetitionsService {

    constructor(private restService: RestService) {

    }

    public saveNewPetition(petitionData: petition) {
        return this.restService.postData('/petition', petitionData);

    }

    public getUsersForAccount(accountId: string) {
        return this.restService.getData('/user/immigration/' + accountId);
    }
    public getPetitionsWithQueryParams(orgId: string, queryData) {

      let request = PaginationUtil.constructRequest(queryData);
      request['queryParams'] = {
        orgId : orgId
      };
      return this.restService.postData('/immigration?id=2', btoa(JSON.stringify(request)));
      //return this.restService.getData('/petitions/immigration/' + orgId + queryData);
    }
    public getAllPetitionTypesAndSubTypes() {
        return this.restService.getData('/petition/config/all/types/subtypes');
    }


}
