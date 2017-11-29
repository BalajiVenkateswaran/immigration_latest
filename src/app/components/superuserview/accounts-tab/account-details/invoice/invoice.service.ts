import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class AccountInvoiceService {
  constructor(private restService: RestService) {
  }
  public getAccountInvoice(accountid: string) {
    return this.restService.getData('/superuser/account/' + accountid + '/invoices');
  }
  public downloadInvoice(invoiceid: string) {
    return this.restService.getData('/superuser/invoice/' + invoiceid);
  }
  public uploadFile(invoiceId: string, formData: FormData) {
    return this.restService.postDataWithHeaders('/superuser/invoice/' + invoiceId + '/file/upload', formData);
  }
  public downloadFile(invoiceId: string) {
    return this.restService.getFile('/superuser/invoice/' + invoiceId);
  }

  public saveInvoiceDetails(invoice: any) {
    return this.restService.postData('/superuser/invoice/details', invoice);
  }
  public sendInvoiceEmail(invoiceId: string) {
    return this.restService.postData('/superuser/invoice/' + invoiceId + '/email', {});
  }


}
