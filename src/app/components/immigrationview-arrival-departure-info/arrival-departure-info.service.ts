import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {ArrivalDepartureInfo} from "../../models/arrivalDepartureInfo";

@Injectable()
export class ImmigrationViewArrivalDepartureInfoService {
    constructor(private restService: RestService) {

    }

    public getArrivalDepartureInfo(clientId: string) {
        return this.restService.getData("/client/arrivalDeparture/" + clientId);
    }
    public saveClientArrivalDeparture(arrivalData: ArrivalDepartureInfo) {
        var data = {
            "arrivalDepartureInfo": arrivalData
        };
        return this.restService.postData("/client/arrivalDeparture/",data);
    }
    public removeClientArrivalDeparture(arrivalDepartureId) {
        return this.restService.deleteData("/client/arrivalDeparture/" + arrivalDepartureId);
    }

}
