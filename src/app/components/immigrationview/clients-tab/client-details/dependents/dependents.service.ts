import { dependent } from '../../../../../models/dependent';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewDependentService {
    constructor(private restService: RestService) {

    }
    public getDependentSummery(clientId: string) {

        console.log(clientId);

        return this.restService.getData('/client/dependentSummary/' + clientId);
    }

    public saveDependentsSummary(dependentData: dependent, userId: string) {
        console.log(dependentData);

        let data = {
            'dependentsSummary': dependentData,
            'updatedByUser': userId
        }
        return this.restService.postData('/client/dependentSummary', data);
    }

    public editDependent(dependentData: dependent) {
        return this.restService.putData('/client/dependentSummary', dependentData);
    }
    public removeDependentsSummary(dependentId: string) {
        return this.restService.deleteData('/client/dependentSummary/' + dependentId);
    }




}
