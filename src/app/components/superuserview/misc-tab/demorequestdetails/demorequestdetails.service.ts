import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class Demorequestdetailsservice {
    constructor(private restService: RestService) {
    }
}