
import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class passportInfoService {

    constructor(private restService: RestService) {

    }
    public getFile(clientid: string) {
        return this.restService.getData("/client/passport/" + clientid);
    }
    public savePassport(passport: any, userId: string) {
        console.log("immigrationview-passport-info|savePassport|passport:%o", passport);
        var req = {
            "passport": passport,
            "updatedByUser": userId
        };
        return this.restService.postData("/client/passport", req);
    }
}
