
import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class JobdetailsService {

    constructor(private restService: RestService) {

    }

    //public saveNewDocumentRepository(documentRepositorytData: documentRepository) {
    //    return this.restService.postData("/documentRepository", documentRepositorytData);

    //}
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

    //public deleteFile(fileId: string) {
    //    console.log("document-repositry.service|deleteFile|fileId:%o", fileId);
    //    return this.restService.getData("/file/" + fileId);
    //}

}
