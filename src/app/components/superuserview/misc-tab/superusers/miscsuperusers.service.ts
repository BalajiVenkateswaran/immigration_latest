import { User } from '../../../../models/user';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class MiscSuperUsersService {
    constructor(private restService: RestService) {
    }
    public saveNewsuperUser(userData: User) {
        return this.restService.postData('/superuser', userData);
    }


  public getSuperUsers(queryData: string) {
      return this.restService.getData('/superuser/users'+ queryData);
  }
}
