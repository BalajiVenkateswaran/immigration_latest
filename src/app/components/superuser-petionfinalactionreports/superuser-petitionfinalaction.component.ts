import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superuserpetitionfinalactionreportsservice} from "./superuser-petitionfinalaction.service";
import {ReportsCommonService} from "../superuserview/reports-tab/common/reports-common.service";


@Component({
    selector: 'app-petitionfinalaction',
    templateUrl: './superuser-petitionfinalaction.component.html',
    styleUrls: ['./superuser-petitionfinalaction.component.sass']
})

export class superuserpetfinalactionreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public status: any = [];
    public selectedaccountId: string;
    ngOnInit() {
        this.selectedaccountId = this.ReportscommonService.totalAccounts[0].accountId;
        this.getreports();

    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {
        this.superuserPetitionfinalactionreportsservice.getpetitonfinalactionreports(this.selectedaccountId)
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.count = [];
                        this.status = [];
                        this.orgsNames.push(item);
                        for (var i = 0; i < this.orgsList[item].length; i++) {
                            this.count.push(this.orgsList[item][i]['count']);
                            this.status.push(this.orgsList[item][i]['status'])
                        }
                        this.pieChartLabels[item] = this.status;
                        this.pieChartData[item] = this.count;
                    }
                }
            });
    }
    constructor(public appService: AppService, private superuserPetitionfinalactionreportsservice: superuserpetitionfinalactionreportsservice,
        public ReportscommonService: ReportsCommonService) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}