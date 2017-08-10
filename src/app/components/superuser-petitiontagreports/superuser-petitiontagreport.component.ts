import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superuserpetitiontagreportsservice} from "./superuser-petitiontagreport.service";
import {ReportsCommonService} from "../superuserview/reports/common/reports-common.service";


@Component({
    selector: 'app-petitiontag',
    templateUrl: './superuser-petitiontagreport.component.html',
    styleUrls: ['./superuser-petitiontagreport.component.sass']
})

export class superuserpettagreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public tags: any = [];
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
        this.superUserpetitiontagreportsservice.getpetitontagreports(this.selectedaccountId)
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.count = [];
                        this.tags = [];
                        this.orgsNames.push(item);
                        for (var i = 0; i < this.orgsList[item].length; i++) {
                            this.count.push(this.orgsList[item][i]['count']);
                            this.tags.push(this.orgsList[item][i]['tag']);
                        }
                        this.pieChartLabels[item] = this.tags;
                        this.pieChartData[item] = this.count;
                    }
                }
            });
    }
    constructor(public appService: AppService, private superUserpetitiontagreportsservice: superuserpetitiontagreportsservice,
        public ReportscommonService: ReportsCommonService) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}