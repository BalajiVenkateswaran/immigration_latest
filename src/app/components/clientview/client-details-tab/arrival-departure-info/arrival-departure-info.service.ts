import {Injectable} from '@angular/core';
import {RestService} from '../../../../services/rest.service';
import {arrivaldespartureinfo} from '../../../../models/arrivaldespartureinfo';

@Injectable()
export class ArrivalDepartureInfoService {

  constructor(private restService: RestService) {
  }

  public getArrivalDepartureInfo(userId: string) {
    return this.restService.getData('/clientview/arrivalDeparture/' + userId);
  }
  public saveClientArrivalDeparture(arrivalData: arrivaldespartureinfo) {
    let data = {
      'arrivalDepartureInfo': arrivalData
    };
    return this.restService.postData('/clientview/arrivalDeparture', data);
  }
  public removeClientArrivalDeparture(arrivalDepartureId) {
    return this.restService.deleteData('/client/arrivalDeparture/' + arrivalDepartureId);
  }
}
