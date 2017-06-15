import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-manageaccount-preferences',
    templateUrl: './manageaccount-preferences.component.html',
    styleUrls: ['./manageaccount-preferences.component.sass']
})
export class ManageAccountPreferencesComponent implements OnInit {
    private user: User;
    constructor(private appService: AppService) {
        if (this.appService.user) {
            this.user = this.appService.user;

        }
    }

  ngOnInit() {
  }

}
