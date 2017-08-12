import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class ManageAccountChecklistService {

    constructor(private restService: RestService) {

    }
    public getChecklist(clientId: string) {
        return this.restService.getData("" + clientId);
    }
    
    
}
