import {Injectable} from "@angular/core";
import {RestService} from "../../../../services/rest.service";
import {passportinfo} from "../../../../models/passportinfo";

@Injectable()
export class PassportInfoService {
    constructor(private restService: RestService) {

    }

    public getPassportInfo(entityId: string) {
        return this.restService.getData("/uifields/screen/Passport/entity/" + entityId);
    }

    public saveEditUser(clientdetails: any) {
        var uiFieldGroups = new Object();
        uiFieldGroups["uiFieldGroups"] = clientdetails;
        return this.restService.postData("/uifields", uiFieldGroups);
    }



    public getFile(userId: string) {
        return this.restService.getData("/clientview/passport/" + userId);
    }


    public savePassportDetails(passportDetails: any) {
        var req = {
            "passport": passportDetails
        };

        return this.restService.postData("/clientview/passport", req);
    }


}
