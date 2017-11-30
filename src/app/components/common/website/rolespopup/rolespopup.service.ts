import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class RolesPopupService {

    constructor(private restService: RestService, private http: Http) {
    }
    public updateLoginHistory(userLoginHistoryId: string, roleId: string) {
      return this.restService.postData('/user/login/history/' + userLoginHistoryId, {roleId: roleId});

    }
}
