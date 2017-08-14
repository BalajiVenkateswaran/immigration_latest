import { AppService } from '../../../../services/app.service';
import { profiletodolistservice } from './todolist.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-profiletodolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.scss']
})

export class profiletodolistcomponent implements OnInit {
    public newTodo: string;
    public todos: any = [];
    ngOnInit() {
      
        this.getTodos();
    }
    getTodos() {
        this.profileTodolistservice.getTodos(this.appService.user.userId)
            .subscribe((res) => {
                console.log(res);
                if (res['statusCode'] == "SUCCESS") {
                    this.todos = res['userTodoList'];
                    for (var i = 0; i < this.todos.length; i++) {
                        if (this.todos[i]['completed']) {
                            if (this.todos[i]['completed'] == "YES") {
                                this.todos[i]['completed'] = true;
                            }
                            if (this.todos[i]['completed'] == "NO") {
                                this.todos[i]['completed'] = false;
                            }
                        }
                    }
                }
            });
    }
    constructor(public appService: AppService, private profileTodolistservice: profiletodolistservice) {
        this.newTodo = '';
    }
    addTodo(event) {
        var data = {"completed":"NO", "todoText": this.newTodo, "userId": this.appService.user.userId };
        this.profileTodolistservice.addTodo(data)
            .subscribe((res) => {
                console.log(res);
                if (res['statusCode'] == "SUCCESS") {
                    this.getTodos();
                    this.newTodo = "";
                }
            });
    }
    changed(selectedtodo) {
        if (selectedtodo.completed == true) {
            selectedtodo.completed = "YES";
        }
        if (selectedtodo.completed == false) {
            selectedtodo.completed = "NO";
        }
        var data = { "completed": selectedtodo.completed, "todoText": selectedtodo.todoText,"id": selectedtodo.id, "userId": this.appService.user.userId};
        this.profileTodolistservice.addTodo(data)
            .subscribe((res) => {
                console.log(res);
                if (res['statusCode'] == "SUCCESS") {
                    this.getTodos();
                    this.newTodo = "";
                }
            });
    }
    deleteTodo(index,selectedtodo) {
        this.todos.splice(index, 1);
        this.profileTodolistservice.deleteTodos(selectedtodo.id)
            .subscribe((res) => {
                console.log(res);
            });
    }

   
}