import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-5.component',
    templateUrl: './page-5.component.html',
    styleUrls: ['./page-5.component.scss']
})
export class i129HPage5Component implements OnInit {
    public I129Hpage5: any = {};
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public appService: AppService) {
    }

    ngOnInit() {
 
    }
    gotoNext() {
        this.appService.moveToPage('i129hPage6');
    }
    gotoPrev() {
        this.appService.moveToPage('i129hPage4');
    }
}
