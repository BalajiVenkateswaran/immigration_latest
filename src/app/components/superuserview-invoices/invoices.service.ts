import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {client} from "../../models/client";

@Injectable()
export class SuperUserViewInvoicestabService {

  constructor(private restService: RestService) {

  }

  public getInvoices (orgId: string) {
      return this.restService.getData("/superuser/invoices");
  }


}
