import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { sperusertotalpetitionsreportsservice } from './totalpetitions.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-superuserusertotalpetitions',
    templateUrl: './totalpetitions.component.html',
    styleUrls: ['./totalpetitions.component.sass']
})

export class superusertotalpetitionsreportscomponent implements OnInit {
    public data: any = [];
    public Year: any = [];
    public orgsList: any = {};
    public orgsNames: any = [];
    public yearMonth: any = [];
    public yearMntName: any = [];
    public fullName: any = [];
    public fullname: any = [];
    public finalLbl: any = [];
    public selectedaccountId: string;
    constructor(public appService: AppService, private speruserTotalpetitionsreportsservice: sperusertotalpetitionsreportsservice, public ReportscommonService: ReportsCommonService) { }
    ngOnInit() {
        this.selectedaccountId = this.ReportscommonService.totalAccounts[0].accountId;
        this.getreports();

    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {

        this.speruserTotalpetitionsreportsservice.gettotalpetitionsreports(this.appService.user.accountId)
            .subscribe((res) => {
                if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (var item in this.orgsList) {
                        this.data = [];
                        this.yearMonth = [];
                        this.finalLbl = [];
                        this.fullName = [];
                        this.orgsNames.push(item);
                        for (var i = 0; i < this.orgsList[item].length; i++) {
                            this.data.push(this.orgsList[item][i]['count']);
                            this.Year = [this.orgsList[item][i]['year'], this.orgsList[item][i]['month']];
                            this.yearMonth.push(this.Year.join('-'));
                            this.fullname = [this.orgsList[item][i]['firstName'], this.orgsList[item][i]['lastName']];
                            this.fullName.push(this.fullname.join(' '));
                            this.yearMntName = [this.yearMonth[i], this.fullName[i]];
                            this.finalLbl.push(this.yearMntName.join(','));
                        }
                        this.barChartLabels[item] = this.finalLbl;
                        this.barChartData[item] = [{ data: this.data, label: 'Clients Created' }];
                    }
                }
            });
    }
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: number[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public barChartData: any[] = [];
}