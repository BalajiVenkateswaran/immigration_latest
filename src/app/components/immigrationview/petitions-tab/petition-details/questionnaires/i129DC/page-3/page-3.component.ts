import { Component, OnInit } from '@angular/core';
import {i129dcPage3Service} from "./page-3.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-3.component',
    templateUrl: './page-3.component.html',
    styleUrls: ['./page-3.component.scss']
})
export class i129dcPage3Component implements OnInit {
    public page3:any={
        "capExemptReason":{

        }
    };
    public questions;
     constructor() {
          this.questions = [
            {
                "id": "0",
                "display": "Yes",
                "value":"Y"
            },
            {
                "id": "1",
                "display": "No",
                "value": "N"
            },
        ];
    }

    ngOnInit() {
 
    }

}
