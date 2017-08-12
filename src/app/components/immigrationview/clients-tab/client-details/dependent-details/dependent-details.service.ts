import { RestService } from '../../../../../services/rest.service';
import {Injectable} from "@angular/core";

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


