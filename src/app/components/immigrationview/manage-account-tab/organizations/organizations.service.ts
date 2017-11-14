import { manageaccountorganization } from '../../../../models/manageaccountorganization';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountOrganizationsService {

    constructor(private restService: RestService) {

    }

    public getManageAccountOrganizations(accountId: string, queryData: string) {
        return this.restService.getData('/org/' + accountId + queryData);
    }
    public saveNewOrganization(organizationData: manageaccountorganization) {
        let req = {
          'org' : organizationData
        };
        return this.restService.postData('/org', req);
    }
}
