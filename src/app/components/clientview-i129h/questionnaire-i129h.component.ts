﻿import { Component, OnInit } from '@angular/core';
import {QuestionnaireI129HClentviewService} from "./questionnaire-i129h.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
@Component({
    selector: 'app-questionnaire-i129h.component',
    templateUrl: './questionnaire-i129h.component.html',
    //styleUrls: ['./questionnaire-i129h.component.sass']
})
export class QuestionnaireI129HclientviewComponent implements OnInit {
    isquestionnairei129hEdit;
    questionnairei129h: any = {};
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    public subName: any;
    public From: any;
    public To: any;
    public from: any;
    public to: any;
    private beforecancelquestionnairei129H: any = {};
    private beforecanceli129HSignature: any = {};
    private questionnairei129hsignature: any = {};
    private questionnaireId: string;
    public questionnairei129hstayPeriodList: any[] = [];
    onDateChanged(event: IMyDateModel) {
    }
    constructor(private questionnaireI129HClentviewService: QuestionnaireI129HClentviewService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.questionnaireId = params['questionnaireId'];
              this.isquestionnairei129hEdit = false;
              this.questionnaireI129HClentviewService.getI129Hclientview(this.questionnaireId)
                  .subscribe((res) => {
                      if (res['i129HbeneficiaryInfo']) {
                          this.questionnairei129h = res['i129HbeneficiaryInfo'];
                          console.log(this.questionnairei129h);
                          // this.questionnairei129hsignature = res['i129H']['signature'];
                      }
                      else {
                          this.questionnairei129h = {};
                          this.questionnairei129hstayPeriodList = [];
                      }
                      if (res['i129HbeneficiaryInfo']){
                          if (res['i129HbeneficiaryInfo']['stayPeriodList'].length>0) {
                              this.questionnairei129hstayPeriodList = res['i129HbeneficiaryInfo']['stayPeriodList'];
                              this.from = this.questionnairei129hstayPeriodList.map(function (item) { return item.from; });
                              this.to = this.questionnairei129hstayPeriodList.map(function (item) { return item.to; });
                          }
                          else {
                              this.questionnairei129hstayPeriodList = [];
                          }
                      }
                      //this.isquestionnairei129hEdit = true;
                  });
        });
    }

    savequestionnairei129Information() {
        for (var i = 0; i < this.questionnairei129hstayPeriodList.length; i++) {
            if (this.questionnairei129hstayPeriodList[i]['from'] == '' && this.questionnairei129hstayPeriodList[i]['to'] == '' && this.questionnairei129hstayPeriodList[i]['subjectName'] == '') {
                this.questionnairei129hstayPeriodList.splice(i, 1);
                i = i - 1;
            }
            else {
                if (this.questionnairei129hstayPeriodList[i]['from'] && this.questionnairei129hstayPeriodList[i]['from']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['from'] = this.questionnairei129hstayPeriodList[i]['from']['formatted'];
                }
                if (this.questionnairei129hstayPeriodList[i]['to'] && this.questionnairei129hstayPeriodList[i]['to']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['to'] = this.questionnairei129hstayPeriodList[i]['to']['formatted'];
                }
                this.questionnairei129hstayPeriodList[i]['subjectName'] = this.questionnairei129hstayPeriodList[i]['subjectName'];
            }
        }

        this.questionnaireI129HClentviewService.saveQuestionnairei129(this.questionnairei129h, this.questionnaireId, this.questionnairei129hstayPeriodList,'Save').subscribe(res => {

            if (res['i129HbeneficiaryInfo']) {
                //this.isquestionnairei129hEdit = true;
                this.questionnairei129h = res['i129HbeneficiaryInfo'];
                this.questionnairei129hsignature = res['i129HbeneficiaryInfo']['signature'];
            }
            //this.isquestionnairei129hEdit = true;

        });
    }

     savequestionnairei129AndInform(){
        for (var i = 0; i < this.questionnairei129hstayPeriodList.length; i++) {
            if (this.questionnairei129hstayPeriodList[i]['from'] == '' && this.questionnairei129hstayPeriodList[i]['to'] == '' && this.questionnairei129hstayPeriodList[i]['subjectName'] == '') {
                this.questionnairei129hstayPeriodList.splice(i, 1);
                i = i - 1;
            }
            else {
                if (this.questionnairei129hstayPeriodList[i]['from'] && this.questionnairei129hstayPeriodList[i]['from']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['from'] = this.questionnairei129hstayPeriodList[i]['from']['formatted'];
                }
                if (this.questionnairei129hstayPeriodList[i]['to'] && this.questionnairei129hstayPeriodList[i]['to']['formatted']) {
                    this.questionnairei129hstayPeriodList[i]['to'] = this.questionnairei129hstayPeriodList[i]['to']['formatted'];
                }
                this.questionnairei129hstayPeriodList[i]['subjectName'] = this.questionnairei129hstayPeriodList[i]['subjectName'];
            }
        }

        this.questionnaireI129HClentviewService.saveQuestionnairei129(this.questionnairei129h, this.questionnaireId, this.questionnairei129hstayPeriodList,'Inform').subscribe(res => {

            if (res['i129HbeneficiaryInfo']) {
                //this.isquestionnairei129hEdit = true;
                this.questionnairei129h = res['i129HbeneficiaryInfo'];
                this.questionnairei129hsignature = res['i129HbeneficiaryInfo']['signature'];
            }
            //this.isquestionnairei129hEdit = true;

        });
    }

    //editQuestinnairei129Form() {
    //    this.from = this.questionnairei129hstayPeriodList.map(function (item) { return item.from; });
    //    this.to = this.questionnairei129hstayPeriodList.map(function (item) { return item.to; });
    //    this.isquestionnairei129hEdit = !this.isquestionnairei129hEdit;
    //    this.beforecancelquestionnairei129H = (<any>Object).assign({}, this.questionnairei129h);
    //    this.beforecanceli129HSignature = (<any>Object).assign({}, this.questionnairei129hsignature);

    //}
    //cancelQuestinnairei129Edit() {
    //    this.questionnairei129hstayPeriodList = this.questionnairei129hstayPeriodList.filter(function (item) {
    //        if (item.from != '' && item.to != '' && item.subjectName != '') {
    //            return item;
    //        }
    //    })
    //    this.questionnairei129hstayPeriodList.map(function (item) {
    //        if (item['from'] && item['from']['formatted'] && item['to']['formatted'] && item['to']) {
    //            item.from = item['from']['formatted'];
    //            item.to = item['to']['formatted'];
    //        }
    //    })
    //    this.isquestionnairei129hEdit = !this.isquestionnairei129hEdit;
    //    this.questionnairei129h = this.beforecancelquestionnairei129H;
    //    this.questionnairei129hsignature = this.beforecanceli129HSignature;

    //}
    addStayPeriodListItem() {
        this.questionnairei129hstayPeriodList.push({ 'from': '', 'to': '', 'subjectName': '' });
    }
    deletePeriodList(i, periodListRowData) {
        this.questionnairei129hstayPeriodList.splice(i, 1);
    }

}
