import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";

@Injectable()
export class UiFieldService {
    constructor(private restService: RestService) {

    }

    public getUiDetails(screenName: string, entityId: string) {
        return this.restService.getData("/uifields/screen/"+screenName+"/entity/" + entityId);
    }

    public saveEditUser(sectionDetails: any, entityId: string) {
        var request = new Object();
        request["uiFieldGroups"] = sectionDetails;
        request["entityId"] = entityId;

        console.log("Save request: %o", request);
        return this.restService.postData("/uifields", request);
    }

    public saveUIFields(request: any) {
        console.log("Save request: %o", request);
        return this.restService.postData("/uifields", request);
    }

    public deleteUIFields(request: any) {
        console.log("Save request: %o", request);
        return this.restService.putData("/uifields", request);
    }

}
