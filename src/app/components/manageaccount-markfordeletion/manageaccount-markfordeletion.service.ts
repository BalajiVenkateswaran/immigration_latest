import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {markfordeletion} from "../../models/markfordeletion";

@Injectable()
export class markfordeletionservice {
    constructor(private restService: RestService) {

    }
}