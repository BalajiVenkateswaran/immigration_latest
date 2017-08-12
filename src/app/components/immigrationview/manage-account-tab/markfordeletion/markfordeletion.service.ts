import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class markfordeletionservice {
    constructor(private restService: RestService) {

    }
    getMarkForDeletion(accountId:string){
        return this.restService.getData("/immigration/account/"+accountId+"/getMarkForDeletion");
    }
}