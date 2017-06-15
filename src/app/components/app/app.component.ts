import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    islogin: boolean = true;
    currentPage: string = '';
    constructor(
      private router: Router,
      public appService: AppService
    ) {
    }
  ngOnInit() {
      this.islogin = !this.islogin;
  }
}
