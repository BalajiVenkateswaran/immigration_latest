﻿import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {superuserpetitionstagesreportsservice} from "./stage.service";

@Component({
    selector: 'app-petitionstages',
    templateUrl: './stage.component.html',
    styleUrls: ['./stage.component.sass']
})

export class superuserpetstagereportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public stages: any = [];
    public selectedaccountId: string;
    constructor(public appService: AppService, private superuserPetitionstagesreportsservice: superuserpetitionstagesreportsservice,
        public ReportscommonService: ReportsCommonService) { }
    ngOnInit() {
        this.selectedaccountId = this.ReportscommonService.totalAccounts[0].accountId;
        this.getreports();

    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {
        this.superuserPetitionstagesreportsservice.getpetitonStagereports(this.selectedaccountId)
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.count = [];
                        this.stages = [];
                        this.orgsNames.push(item);
                        for (var i = 0; i < this.orgsList[item].length; i++) {
                            this.count.push(this.orgsList[item][i]['count']);
                            this.stages.push(this.orgsList[item][i]['stage']);
                        }
                        this.pieChartData[item] = this.count;
                        this.pieChartLabels[item] = this.stages;
                    }
                }
            });
    }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}