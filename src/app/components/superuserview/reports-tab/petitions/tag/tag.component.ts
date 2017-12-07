import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { SuperUserPetitionTagReportsService } from './tag.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-petitiontag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.sass'],
  providers: [SuperUserPetitionTagReportsService]
})

export class SuperUserPetitionTagReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public tags: any = [];
    public selectedaccountId: string;

    constructor(public appService: AppService, private superUserPetitionTagReportsService: SuperUserPetitionTagReportsService,
        public reportsCommonService: ReportsCommonService) { }


    ngOnInit() {
        this.selectedaccountId = this.reportsCommonService.totalAccounts[0].accountId;
        this.getreports();

    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {
        this.superUserPetitionTagReportsService.getpetitontagreports(this.selectedaccountId)
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
   public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
