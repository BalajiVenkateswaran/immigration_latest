import { ArrivalDepartureInfo } from '../../../../../models/arrivalDepartureInfo';
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationViewArrivalDepartureInfoService {
    constructor(private restService: RestService) {

    }

    public getArrivalDepartureInfo(clientId: string) {
        return this.restService.getData('/client/arrivalDeparture/' + clientId);
    }
    public saveClientArrivalDeparture(arrivalData: ArrivalDepartureInfo, userId: string) {
        let data = {
            'arrivalDepartureInfo': arrivalData,
            'updatedByUser': userId
        };
        return this.restService.postData('/client/arrivalDeparture/', data);
    }
    public removeClientArrivalDeparture(arrivalDepartureId) {
        return this.restService.deleteData('/client/arrivalDeparture/' + arrivalDepartureId);
    }

}
