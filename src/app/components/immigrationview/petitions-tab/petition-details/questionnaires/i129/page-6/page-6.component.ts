import { Component, OnInit } from '@angular/core';
import {i129Page6Service} from "./page-6.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-6.component',
    templateUrl: './page-6.component.html',
    styleUrls: ['./page-6.component.scss']
})
export class i129Page6Component implements OnInit {
    public page6:any={};
     constructor() {
    }

    ngOnInit() {
 
    }

}
