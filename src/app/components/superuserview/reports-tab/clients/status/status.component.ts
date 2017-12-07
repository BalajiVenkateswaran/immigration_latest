import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SuperUserClientStatusReportsService} from "./status.service";


@Component({
    selector: 'app-clientstatusreport',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.sass'],
  providers: [SuperUserClientStatusReportsService]
})

export class SuperUserClientStatusReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public Status: any = [];
    public selectedaccountId: string;
   constructor(public appService: AppService, private superuserClientstatusreportsservice: SuperUserClientStatusReportsService,
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
        this.superuserClientstatusreportsservice.getclientstatusreports(this.selectedaccountId)
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.count = [];
                        this.Status = [];
                        this.orgsNames.push(item);
                        for (var i = 0; i < this.orgsList[item].length; i++) {
                            this.count.push(this.orgsList[item][i]['count']);
                            this.Status.push(this.orgsList[item][i]['status']);
                        }
                        this.pieChartLabels[item] = this.Status;
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
