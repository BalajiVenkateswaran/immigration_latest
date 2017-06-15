import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ResetPasswordService {
    constructor(private restService: RestService) {
    }
    public updatePassword(req: any) {
        return this.restService.postData("/user/updatePassword", req);
    }
}
