import { Component, OnInit } from '@angular/core';
import {i129HPage4Service} from "./page-4.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-4.component',
    templateUrl: './page-4.component.html',
    styleUrls: ['./page-4.component.scss']
})
export class i129HPage4Component implements OnInit {
    public I129Hpage4: any = {};
   
     constructor() {
    }

    ngOnInit() {
 
    }

}
