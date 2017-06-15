import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class DependentDetailsService {
    constructor(private restService: RestService) {

    }

    public getDependentDetails(dependentId: string) {
        return this.restService.getData("/client/dependent/" + dependentId);
    }

    public saveDependentDetails(dependent: any) {
        var req = {
            "dependent": dependent
        };
        return this.restService.postData("/client/dependent", req);
    }

}


