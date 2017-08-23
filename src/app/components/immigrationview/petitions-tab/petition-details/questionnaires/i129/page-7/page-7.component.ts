import { Component, OnInit } from '@angular/core';
import {i129Page7Service} from "./page-7.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-7.component',
    templateUrl: './page-7.component.html',
    styleUrls: ['./page-7.component.scss']
})
export class i129Page7Component implements OnInit {
    public page7:any={
        "preparerAddress":{}
    };
    public aptType;
     constructor() {
         this.aptType = [
            {
                "id": "0",
                "display": "Apt.",
                "value":"APT"
            },
            {
                "id": "1",
                "display": "Stc.",
                "value": "STE"
            },
            {
                "id": "2",
                "display": "Flr.",
                "value": "FLR"
            }
            
        ];
    }

    ngOnInit() {
 
    }

}
