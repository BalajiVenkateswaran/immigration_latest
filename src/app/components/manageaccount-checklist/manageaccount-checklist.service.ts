import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ManageAccountChecklistService {

    constructor(private restService: RestService) {

    }
    public getChecklist(clientId: string) {
        return this.restService.getData("" + clientId);
    }
    
    
}
