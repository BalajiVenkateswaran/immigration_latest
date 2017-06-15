import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {visa} from "../../models/visa";

@Injectable()
export class ImmigrationViewVisasService {

    constructor(private restService: RestService) {

    }
    public getClientVisas(clientId: string) {
        //console.log("PetitionsService|getPetitions|orgId:%o", petitionId);
        return this.restService.getData("/client/visa/" + clientId);
    }
    public saveClientVisas(visaData: visa) {
        var req = {
            "visa": visaData
        };
        return this.restService.postData("/client/visa", req);
    }
    public deleteClientVisa(visaId: string) {
        return this.restService.deleteData("/client/visa/" + visaId);
    }
}
