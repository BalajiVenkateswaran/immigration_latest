import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {client} from "../../models/client";

@Injectable()
export class SuperUserViewPaymentstabService {

  constructor(private restService: RestService) {

  }

  public getPayments() {
    return this.restService.getData("/superuser/payments");
  }


}
