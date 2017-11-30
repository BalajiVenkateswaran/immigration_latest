import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class WebsiteService {

    constructor(private restService: RestService, private http: Http) {
    }
    public login(user: User) {
      return this.restService.postData('/user/authenticate', user);
    }


    public forgetPassword(email: string) {
        console.log('loginService|updatePassword|email:%o', email);
        return this.restService.postData('/user/forgetPassword' , email);
    }

    public updateLoginHistory(userLoginHistoryId: string, roleId: string) {
      return this.restService.postData('/user/login/history/' + userLoginHistoryId, {roleId: roleId});

    }
    public getIPAndLocation() {
      return this.http.get('//freegeoip.net/json/').map(res => res.json());
    }
}
