import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.showSideBarMenu(null, "reports");
    }

}
