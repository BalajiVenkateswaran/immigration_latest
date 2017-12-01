import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';

@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html'
})
export class I129HPage4Component implements OnInit {
    public I129Hpage4: any = {};

    constructor(public appService: AppService) {
    }

    ngOnInit() {

    }
    gotoNext() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/5');
    }
    gotoPrev() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/3');
    }
}
