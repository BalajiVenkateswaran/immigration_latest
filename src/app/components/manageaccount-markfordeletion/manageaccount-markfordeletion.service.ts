import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {markfordeletion} from "../../models/markfordeletion";

@Injectable()
export class markfordeletionservice {
    constructor(private restService: RestService) {

    }
    getMarkForDeletion(accountId:string){
        return this.restService.getData("/immigration/account/"+accountId+"/getMarkForDeletion");
    }
}