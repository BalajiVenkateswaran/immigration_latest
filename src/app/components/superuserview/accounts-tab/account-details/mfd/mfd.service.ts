import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class SuperUserViewMFDService {

  constructor(private restService: RestService) {

  }

  getMarkForDeletion(accountId: string) {
    return this.restService.getData('/immigration/account/' + accountId + '/getMarkForDeletion');
  }


}
