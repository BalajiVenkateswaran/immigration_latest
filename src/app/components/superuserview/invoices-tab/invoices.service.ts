import { RestService } from '../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class SuperUserViewInvoicestabService {

  constructor(private restService: RestService) {

  }

  public getInvoices (orgId: string) {
      return this.restService.getData("/superuser/invoices");
  }
  public getClientsFilteredData(accountId:string,filterQueries:any){
    return this.restService.getData("/superuser/invoices"+accountId+'?'+"filter="+filterQueries);
  }
}
