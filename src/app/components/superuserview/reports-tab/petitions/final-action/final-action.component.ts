import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { SuperUserPetitionFinalActionReportsService} from './final-action.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-petitionfinalaction',
    templateUrl: './final-action.component.html',
    styleUrls: ['./final-action.component.sass'],
  providers: [SuperUserPetitionFinalActionReportsService]
})

export class SuperUserPetitionFinalActionReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public status: any = [];
    public selectedaccountId: string;
    constructor(public appService: AppService, private superuserPetitionfinalactionreportsservice: SuperUserPetitionFinalActionReportsService,
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
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
