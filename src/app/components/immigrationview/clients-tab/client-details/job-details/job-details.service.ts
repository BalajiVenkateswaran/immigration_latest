
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class JobdetailsService {

    constructor(private restService: RestService) {

    }
    public getFile(clientid: string) {
        return this.restService.getData("/client/jobDetails/" + clientid);
    }


   public saveJobDetails(jobDetails: any) {
        console.log("immigrationview-client-details|saveClientDetails|clientDetails:%o", jobDetails);
        var req = {
            "jobDetails": jobDetails
        };

        return this.restService.postData("/client/jobDetails", req);
    }  

}
