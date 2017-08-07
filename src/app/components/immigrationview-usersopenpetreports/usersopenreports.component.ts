﻿import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {usersopenpetitionservice} from "./usersopenreports.service";


@Component({
    selector: 'app-useropenpetitons',
    templateUrl: './usersopenreports.component.html',
    styleUrls: ['./usersopenreports.component.sass']
})

export class useropenpetitioncomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = [];
    public orgsNames: any = [];
    public count: any = [];
    public username: any = [];
    public fullMonth: any = [];
   // public userNames: any = [];
    ngOnInit() {
        //this.userNames = this.appService.usersList;
        this.usersOpenpetitionservice.getuseropenpetitions(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.fullMonth = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.username = [this.orgsList[item][i]['firstName'], this.orgsList[item][i]['lastName']];
                        this.fullMonth.push(this.username.join(' '));
                    }
                    this.pieChartLabels[item] = this.fullMonth;
                    this.pieChartData[item] = this.count;
                }
            });
    }

    constructor(public appService: AppService, private usersOpenpetitionservice: usersopenpetitionservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}