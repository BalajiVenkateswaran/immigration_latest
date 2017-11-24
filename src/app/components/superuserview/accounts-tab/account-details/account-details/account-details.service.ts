import {Injectable} from '@angular/core';
import {RestService} from '../../../../../services/rest.service';

@Injectable()
export class SuperuserViewAccountDetailsService {

    constructor(private restService: RestService) {

    }
    public getAccountdetails(accountid: string) {
        return this.restService.getData('/superuser/account/' + accountid + '/details');
    }
    public saveAccountdetails(accountdetails: any) {
        console.log('superuserview-account|saveaccountdetails|accountdetails:%o', accountdetails);

        return this.restService.postData('/superuser/account/details', accountdetails);
    }
}
