import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {i797history} from "../../models/i797history";

@Injectable()
export class SmartTableI797HistoryService {

    constructor(private restService: RestService) {

    }
    public getI797Details(clientId: string) {
        return this.restService.getData("/client/i797details/" + clientId);
    }
    public saveI797Details(i797Details: i797history) {
        var data={
            "i797History": i797Details
        };
        return this.restService.postData("/client/i797details",data);

    }
    public removeI797Details(i797DetailsId: string) {
        return this.restService.deleteData("/client/i797details/" + i797DetailsId);
    }
    public getI797FilterData(clientId:string,filterData:any){
        return this.restService.getData("/client/i797details/"+clientId+'?'+"filter"+filterData);
    }
}
