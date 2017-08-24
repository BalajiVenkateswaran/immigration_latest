import { Component, OnInit } from '@angular/core';
import {i129Page4Service} from "./page-4.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html',
    styleUrls: ['./page-4.component.scss']
})
export class i129Page4Component implements OnInit {
    public page4:any={};
    constructor(public appService: AppService) {
    }

    ngOnInit() {
 
    }
    gotoNext() {
        this.appService.moveToPage('i129Page5');
    }
    gotoPrev() {
        this.appService.moveToPage('i129Page3');
    }
}
