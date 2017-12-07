import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { SuperUserPetitionsStatusReportsService } from './status.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-superpetitionstatusreports',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.sass'],
  providers: [SuperUserPetitionsStatusReportsService]
})

export class SuperUserPetitionsStatusReportsComponent implements OnInit {

    public pieChartLabels: string[] = ['Opened Petitons', 'Closed Petitions'];
    public pieChartData: number[] = [0, 0];
    public pieChartType: string = 'pie';
    public selectedaccountId: string;
    public orgsList: any = {};
    public orgsNames: any = [];
    public closed: any;
    public opened: any;

    constructor(public appService: AppService, private superUserPetitionsStatusReportsService: SuperUserPetitionsStatusReportsService,
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
        this.superUserPetitionsStatusReportsService.getpetitonstatusreports(this.selectedaccountId)
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.orgsNames.push(item);
                        if (res['orgs'][item][0] != undefined) {
                            if (res['orgs'][item][0].status == "Open") {
                                this.opened = res['orgs'][item][0].count;
                            }
                            if (res['orgs'][item][0].status == "Close") {
                                this.closed = res['orgs'][item][0].count;
                            }
                        }
                        else {
                            this.opened = 0;
                            this.closed = 0;
                        }
                        if (res['orgs'][item][1] != undefined) {
                            if (res['orgs'][item][1].status == "Open") {
                                this.opened = res['orgs'][item][1].count;
                            }
                            if (res['orgs'][item][1].status == "Close") {
                                this.closed = res['orgs'][item][1].count;
                            }
                        }
                        else {
                            this.closed = 0;
                        }
                        this.pieChartData[item] = [this.opened, this.closed];
                    }
                }
            });
    }
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


}
