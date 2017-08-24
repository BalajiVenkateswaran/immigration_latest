import { Component, OnInit } from '@angular/core';
import {i129HPage6Service} from "./page-6.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-6.component',
    templateUrl: './page-6.component.html',
    styleUrls: ['./page-6.component.scss']
})
export class i129HPage6Component implements OnInit {
public I129Hpage6:any={};

constructor(public appService: AppService) {
    }

    ngOnInit() {
 
    }
    gotoNext() {
        
    }
    gotoPrev() {
        this.appService.moveToPage('i129hPage5');
    }
}
