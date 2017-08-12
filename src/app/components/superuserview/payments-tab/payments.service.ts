import { RestService } from '../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class SuperUserViewPaymentstabService {

  constructor(private restService: RestService) {

  }

  public getPayments() {
    return this.restService.getData("/superuser/payments");
  }
  public getClientsFilteredData(accountId:string,filterQueries:any){
    return this.restService.getData("/superuser/payments"+accountId+'?'+"filter="+filterQueries);
  }


}
