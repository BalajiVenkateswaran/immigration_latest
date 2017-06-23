import { Component, OnInit } from '@angular/core';
import {QuestionnaireI129HService} from "./questionnaire-i129h.service";
import {AppService} from "../../services/app.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
@Component({
    selector: 'app-questionnaire-i129h.component',
    templateUrl: './questionnaire-i129h.component.html',
    styleUrls: ['./questionnaire-i129h.component.sass']
})
export class QuestionnaireI129HComponent implements OnInit {
    isquestionnairei129hEdit;
    questionnairei129h: any = {};
    fileDetails;
    rowToBeAdded = false;
    private stayPeriodListItem = {};
    private questionnairei129hsignature: any = {};
    public questionnairei129hstayPeriodList: any[] = [];
    private beforecancelquestionnairei129H: any = {};
    private beforecanceli129HSignature: any = {};
    private beforeCancelPeriodList: any = {};
    private questionnaireId: string;
    public subName: any;
    public From: any;
    public To: any;
    public from: any;
    public to: any;
    private rowEdit: boolean[] = [];
    private ishStayPeriodList: boolean[] = [];
    private delete: boolean = false;
  
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private questionnaireI129HService: QuestionnaireI129HService, public appService: AppService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    onDateChanged(event: IMyDateModel) {


    }
 
    ngOnInit() {
      
        this.route.params.subscribe(params => {
            this.questionnaireId = params['questionnaireId'];
            this.isquestionnairei129hEdit = true;
            this.questionnaireI129HService.getI129H(this.questionnaireId)
                .subscribe((res) => {
                    if (res['i129H']) {
                        this.questionnairei129h = res['i129H'];
                        if (res['i129H']['signature']) {
                            this.questionnairei129hsignature = res['i129H']['signature'];
                        }
                        if (res['i129H']['stayPeriodList']) {
                            this.questionnairei129hstayPeriodList = res['i129H']['stayPeriodList'];
                        }
                    }
                    console.log(this.questionnairei129hstayPeriodList);
                    for (var i = 0; i < this.questionnairei129hstayPeriodList.length; i++) {
                        this.rowEdit[i] = true;
                        this.ishStayPeriodList[i] = true;
                    }
                });
        });
        console.log(this.questionnairei129hstayPeriodList);


    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    repopulateI129H() {
        this.questionnaireI129HService.populateI129H(this.questionnaireId).subscribe(res => {
            if (res['statusCode'] == "SUCCESS") {

            }
        });

    }
    savequestionnairei129Information() {
        for (var i = 0; i < this.questionnairei129hstayPeriodList.length; i++) {
            if (this.questionnairei129hstayPeriodList[i]['from'] == '' && this.questionnairei129hstayPeriodList[i]['to'] == '' && this.questionnairei129hstayPeriodList[i]['subjectName'] == '') {
                this.questionnairei129hstayPeriodList.splice(i, 1);
                i = i - 1;
            }
            else{
                if (this.questionnairei129hstayPeriodList[i]['from'] && this.questionnairei129hstayPeriodList[i]['from']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['from'] = this.questionnairei129hstayPeriodList[i]['from']['formatted'];
                }
                if (this.questionnairei129hstayPeriodList[i]['to'] && this.questionnairei129hstayPeriodList[i]['to']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['to'] = this.questionnairei129hstayPeriodList[i]['to']['formatted'];
                }
                this.questionnairei129hstayPeriodList[i]['subjectName'] = this.questionnairei129hstayPeriodList[i]['subjectName'];
            }  
        }
        this.questionnaireI129HService.saveQuestionnairei129(this.questionnairei129h, this.questionnaireId, this.questionnairei129hsignature, this.questionnairei129hstayPeriodList).subscribe(res => {
            this.ngOnInit();
            if (res['i129H']) {
                this.isquestionnairei129hEdit = true;
                this.questionnairei129h = res['i129H'];
                if (res['i129H']['signature']) {
                    this.questionnairei129hsignature = res['i129H']['signature'];
                }
                if (res['i129H']['stayPeriodList']) {
                    this.questionnairei129hstayPeriodList = res['i129H']['stayPeriodList'];

                }
            }
            this.isquestionnairei129hEdit = true;

        });
    }

    editQuestinnairei129Form() {

        this.from = this.questionnairei129hstayPeriodList.map(function (item) { return item.from; });
        this.to = this.questionnairei129hstayPeriodList.map(function (item) { return item.to; });
        this.isquestionnairei129hEdit = !this.isquestionnairei129hEdit;
        this.beforecancelquestionnairei129H = (<any>Object).assign({}, this.questionnairei129h);
        this.beforecanceli129HSignature = (<any>Object).assign({}, this.questionnairei129hsignature);

    }
    cancelQuestinnairei129Edit() {
        this.isquestionnairei129hEdit = true;
        //for (var i = 0; i < this.questionnairei129hstayPeriodList.length; i++) {
        //    if (this.questionnairei129hstayPeriodList[i]['from'] && this.questionnairei129hstayPeriodList[i]['from']['formatted']) {
        //        this.questionnairei129hstayPeriodList[i]['from'] = this.questionnairei129hstayPeriodList[i]['from']['formatted'];
        //    }
        //    if (this.questionnairei129hstayPeriodList[i]['to'] && this.questionnairei129hstayPeriodList[i]['to']['formatted']) {
        //        this.questionnairei129hstayPeriodList[i]['to'] = this.questionnairei129hstayPeriodList[i]['to']['formatted'];
        //    }
        //}
        this.questionnairei129hstayPeriodList = this.questionnairei129hstayPeriodList.filter(function(item){
            if (item.from != '' && item.to != '' && item.subjectName != '') {
                return item;
            }
        })
        this.questionnairei129hstayPeriodList.map(function (item) {
            if (item['from'] && item['from']['formatted'] && item['to']['formatted'] && item['to']) {
                item.from = item['from']['formatted'];
                item.to = item['to']['formatted'];
            }
        })
        this.questionnairei129h = this.beforecancelquestionnairei129H;
        this.questionnairei129hsignature = this.beforecanceli129HSignature;
    }
    addStayPeriodListItem() {
        this.questionnairei129hstayPeriodList.push({ 'from': '', 'to': '','subjectName':''});
    }
    editPeriodList(i, periodListRowData) {
        this.beforeCancelPeriodList = (<any>Object).assign({}, periodListRowData);
        this.rowEdit[i] = !this.rowEdit[i];
        this.ishStayPeriodList[i] = !this.ishStayPeriodList[i];

    }
    deletePeriodList(i, periodListRowData) {       
        this.questionnairei129hstayPeriodList.splice(i, 1);
    }

}
