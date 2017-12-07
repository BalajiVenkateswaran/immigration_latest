import {Component, OnInit} from '@angular/core';
import {SuperUsersOpenPetitionService} from './openpetitions.service';
import {ReportsCommonService} from '../../common/reports-common.service';
import {HeaderService} from '../../../../common/header/header.service';


@Component({
    selector: 'app-superuseropenpetitons',
    templateUrl: './openpetitions.component.html',
    styleUrls: ['./openpetitions.component.sass'],
  providers: [SuperUsersOpenPetitionService]
})

export class SuperUserOpenPetitionComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = [];
    public orgsNames: any = [];
    public count: any = [];
    public username: any = [];
    public fullMonth: any = [];
    public selectedaccountId: string;

    constructor(public headerService: HeaderService, private superUsersopenpetitionservice: SuperUsersOpenPetitionService,
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
        this.superUsersopenpetitionservice.getuseropenpetitions(this.headerService.user.accountId)
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

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
