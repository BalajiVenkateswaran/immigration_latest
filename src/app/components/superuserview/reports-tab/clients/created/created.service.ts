import {RestService} from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class SuperUserClientsCreatedReportsService {
  constructor(private restService: RestService) {
  }
  public getClientCreationreports(accountId: string) {
    console.log("clientcreationreports|getstatus|", accountId);
    return this.restService.getData("/superuser/account/" + accountId + "/client/creation");
  }
}
