import { RestService } from '../../../services/rest.service';
import {Injectable} from "@angular/core";

@Injectable()
export class ResetPasswordService {
    constructor(private restService: RestService) {
    }
    public updatePassword(req: any) {
        return this.restService.postData("/user/updatePassword", req);
    }
}
