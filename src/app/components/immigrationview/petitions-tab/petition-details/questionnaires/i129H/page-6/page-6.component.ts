import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-6.component',
    templateUrl: './page-6.component.html'
})
export class I129HPage6Component implements OnInit {
public I129Hpage6:any={};

constructor(public appService: AppService) {
    }

    ngOnInit() {

    }
    gotoNext() {

    }
    gotoPrev() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/5');
    }
}
