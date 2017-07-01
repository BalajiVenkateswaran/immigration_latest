import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {AppService} from "../../services/app.service";
import {superuserinvoice} from "../../models/superuserinvoice";

@Injectable()
export class AccountInvoiceService {
    constructor(private restService: RestService) {
    }
    public getAccountInvoice(accountid: string) {
        return this.restService.getData("/superuser/account/" + accountid + "/invoices");
    }
}