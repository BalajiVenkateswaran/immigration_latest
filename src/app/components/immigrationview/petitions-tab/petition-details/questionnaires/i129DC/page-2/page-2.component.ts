import { Component, OnInit } from '@angular/core';
import {i129dcPage2Service} from "./page-2.service";
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-2.component',
    templateUrl: './page-2.component.html',
    styleUrls: ['./page-2.component.scss']
})
export class i129dcPage2Component implements OnInit {
    public questions;
    public aptType;
    public petitionType;
    public page2:any={
        "addressOfUSinstitution":{}
    }
    constructor(public appService: AppService) {
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
        this.petitionType=[
            {
                "id":"0",
                "display": "CAP H-1B Bachelor's Degree",
                "value": "CAP_BACHELOR_DEGREE"

            },
             {
                "id":"1",
                "display": "CAP H-1B U.S. Master's Degree or Higher",
                "value": "CAP_MASTER_DEGREE"

            },
             {
                "id":"2",
                "display": "CAP H-1B1 Chile/Singapore",
                "value": "CAP_CHILE_SINGAPORE"

            },
             {
                "id":"3",
                "display": "CAP Exempt",
                "value": "CAP_EXEMPT"

            }
        ]
        
    }
    
    ngOnInit() {
 
    }
    gotoNext() {
        this.appService.moveToPage('i129dcPage3');
    }
    gotoPrev() {
        this.appService.moveToPage('i129dcPage1');
    }
}
