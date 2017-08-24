import { Component, OnInit } from '@angular/core';
import {i129HPage2Service} from "./page-2.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html',
    styleUrls: ['./page-2.component.scss']
})
export class i129HPage2Component implements OnInit {
public I129Hpage2:any={};
constructor(public appService: AppService) {
    }

    ngOnInit() {
 
    }
    gotoNext() {
        this.appService.moveToPage('i129hPage3');
    }
    gotoPrev() {
        this.appService.moveToPage('i129hPage1');
    }
}
