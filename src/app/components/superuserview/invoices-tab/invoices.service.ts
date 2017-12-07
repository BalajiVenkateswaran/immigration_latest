import { RestService } from '../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SuperUserViewInvoicestabService {

  constructor(private restService: RestService) {
  }

  public getInvoicesWithQueryParams(queryData: any) {
    return this.restService.getData('/superuser/invoices' + queryData);
  }
}
