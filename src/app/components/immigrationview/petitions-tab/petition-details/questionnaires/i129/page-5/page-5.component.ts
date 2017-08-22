import { Component, OnInit } from '@angular/core';
import {i129Page5Service} from "./page-5.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-5.component',
    templateUrl: './page-5.component.html',
    styleUrls: ['./page-5.component.scss']
})
export class i129Page5Component implements OnInit {
     public page5:any={
         "address":{}
     };
     constructor() {
    }

    ngOnInit() {
 
    }

}
