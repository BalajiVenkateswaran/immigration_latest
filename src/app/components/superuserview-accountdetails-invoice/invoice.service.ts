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
    public downloadInvoice(invoiceid: string) {
        return this.restService.getData("/superuser/invoice/" + invoiceid );
    }
    public uploadFile(invoiceId: string, formData: FormData) {
            return this.restService.postDataWithHeaders("/superuser/invoice/"+invoiceId+"/file/upload",
              formData);
    }
    public downloadFile(invoiceId: string) {
        return this.restService.getFile("/superuser/invoice/" + invoiceId);

    }
}