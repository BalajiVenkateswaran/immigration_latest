import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountInvoiceService {
    constructor(private restService: RestService) {
    }
    public getAccountInvoice(accountid: string) {
        return this.restService.getData('/superuser/account/' + accountid + '/invoices');
    }
     public downloadFile(invoiceId: string) {
        return this.restService.getFile('/superuser/invoice/' + invoiceId);

    }
}
