import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../../../../services/app.service';
import {IMyOptions} from 'mydatepicker';

@Component({
    selector: 'app-page-3.component',
    templateUrl: './page-3.component.html'
})
export class I129HPage3Component implements OnInit {
    public I129Hpage3: any = {};
    public I129Hpage3questions: any = [];
    public dateOfBirth: string;
    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.I129Hpage3questions = [
            {
                'id': '0',
                'display': 'Yes',
                'value': 'Y'
            },
            {
                'id': '1',
                'display': 'No',
                'value': 'N'
            },
        ];
    }
    gotoNext() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/4');
    }
    gotoPrev() {
        this.appService.moveToPage('immigrationview/questionnaire/i129h/page/3');
    }
}
