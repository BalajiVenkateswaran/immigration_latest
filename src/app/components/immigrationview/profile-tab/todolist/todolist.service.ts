import {RestService} from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ProfileTodoListService {

    constructor(private restService: RestService) {

    }
    public addTodo(data: any) {
        let req = {'userTodoList': data}
        return this.restService.postData('/profile/user/todoList/', req);
    }
    public getTodos(userid: string) {
        return this.restService.getData('/profile/user/todoList/' + userid);
    }
    public deleteTodos(todoid: string) {
        return this.restService.deleteData('/profile/user/todoList/' + todoid);
    }
}
