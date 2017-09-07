import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";

@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html',
    styleUrls: ['./page-4.component.scss']
})
export class i129HPage4Component implements OnInit {
    public I129Hpage4: any = {};

    constructor(public appService: AppService) {
    }

    ngOnInit() {

    }
    gotoNext() {
        this.appService.moveToPage('i129hPage5');
    }
    gotoPrev() {
        this.appService.moveToPage('i129hPage3');
    }
}
