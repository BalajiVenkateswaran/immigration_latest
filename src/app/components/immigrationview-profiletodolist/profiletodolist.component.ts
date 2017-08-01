import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {profiletodolistservice} from "./profiletodolist.service";


@Component({
    selector: 'app-profiletodolist',
    templateUrl: './profiletodolist.component.html',
    styleUrls: ['./profiletodolist.component.sass']
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

    deleteTodo(index) {
        this.todos.splice(index, 1);
    }

    deleteSelectedTodos() {
        for (var i = (this.todos.length - 1); i > -1; i--) {
            if (this.todos[i].completed) {
                this.todos.splice(i, 1);
            }
        }
    }
}