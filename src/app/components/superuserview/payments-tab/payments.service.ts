import { RestService } from '../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserViewPaymentstabService {

  constructor(private restService: RestService) {

  }
  public getPaymentsWithQueryParams(queryData: any) {
    return this.restService.getData('/superuser/payments' + queryData);
  }


}
