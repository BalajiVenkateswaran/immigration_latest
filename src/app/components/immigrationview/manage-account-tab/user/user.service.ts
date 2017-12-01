import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageAccountUserService {
    constructor(private restService: RestService) {
    }

    public getUsers(accountId: string, queryParams: any) {
      return this.restService.getData('/user/immigration/' + accountId + queryParams);
    }
    public saveNewUser(userData: User) {
      return this.restService.postData('/user', userData);
    }
    public deleteUser(userId: string, accountId: string, officerId: string) {
        return this.restService.deleteData('/user/' + userId + '/account/' + accountId + '/officer/' + officerId);
    }
}
