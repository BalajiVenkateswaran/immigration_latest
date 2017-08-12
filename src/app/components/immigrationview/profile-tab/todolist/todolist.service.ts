import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class profiletodolistservice {

    constructor(private restService: RestService) {

    }
    public addTodo(data: any) {
        var req = {"userTodoList":data}
        return this.restService.postData("/profile/user/todoList/", req);
    }
    public getTodos(userid: string) {
        return this.restService.getData("/profile/user/todoList/" + userid);
    }
    public deleteTodos(todoid: string) {
        return this.restService.deleteData("/profile/user/todoList/" + todoid);
    }
}