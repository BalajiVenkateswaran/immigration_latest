
import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class passportInfoService {

    constructor(private restService: RestService) {

    }
    public getFile(clientid: string) {
        return this.restService.getData("/client/passport/" + clientid);
    }
    public savePassport(passport: any) {
        console.log("immigrationview-passport-info|savePassport|passport:%o", passport);
        var req = {
            "passport": passport
        };
        return this.restService.postData("/client/passport", req);
    }
}
