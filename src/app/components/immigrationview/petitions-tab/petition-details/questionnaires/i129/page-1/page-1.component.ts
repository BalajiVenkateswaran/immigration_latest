import { Component, OnInit } from '@angular/core';
import {i129Page1Service} from "./page-1.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-1.component',
    templateUrl: './page-1.component.html',
    styleUrls: ['./page-1.component.scss']
})
export class i129Page1Component implements OnInit {
     public page1:any={
         'address':{},
         'contact':{}
     };
     constructor() {
    }

    ngOnInit() {
        
    }
    

}
