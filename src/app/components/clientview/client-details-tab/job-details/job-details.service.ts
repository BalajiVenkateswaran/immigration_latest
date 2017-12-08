import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {clientdetails} from '../../../../models/clientdetails';

@Injectable()
export class JobDetailsService {
    constructor(private restService: RestService) {

    }

    public getJobDetails(userId: string) {
        return this.restService.getData('/clientview/jobDetails/' + userId);
    }

    public saveJobDetails(jobDetails: any) {
        let req = {
            'jobDetails': jobDetails
        };

        return this.restService.postData('/clientview/jobDetails', req);
    }



}
