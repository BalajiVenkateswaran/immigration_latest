import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../../../../services/app.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-page-5.component',
    templateUrl: './page-5.component.html'
})
export class I129HPage5Component implements OnInit {
    public I129Hpage5: any = {};
    public employerDateOfSignature: string;
    public petitionerDateOfSignature: string;
    public jointEmployer1DateOfSignature: string;
    public jointEmployer2DateOfSignature: string;
    public jointEmployer3DateOfSignature: string;
    public jointEmployer4DateOfSignature: string;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public appService: AppService) {
    }

    ngOnInit() {

    }
    gotoNext() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/6');
    }
    gotoPrev() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/4');
    }
}
