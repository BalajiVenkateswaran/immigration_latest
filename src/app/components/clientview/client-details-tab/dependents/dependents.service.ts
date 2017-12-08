import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {dependent} from '../../../../models/dependent';

@Injectable()
export class DependentService {
    constructor(private restService: RestService) {

    }
    public getDependentSummary(userId: string) {
        return this.restService.getData('/clientview/dependentSummary/' + userId)
    }

    public saveDependentsSummary(dependentData: dependent) {
        let data = {
            'dependentsSummary': dependentData
        };
        return this.restService.postData('/clientview/dependentSummary', data);
    }
    public removeDependentsSummary(dependentId: string) {
        return this.restService.deleteData('/client/dependentSummary/' + dependentId);
    }


}
