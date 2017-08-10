import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {speruserclientscreatedreportsservice} from "./superuser-clientscreatedreports.service";
import {ReportsCommonService} from "../superuserview/reports/common/reports-common.service";


@Component({
    selector: 'app-superuserclientcreated-report',
    templateUrl: './superuser-clientscreatedreports.component.html',
    styleUrls: ['./superuser-clientscreatedreports.component.sass']
})

export class superuserclientscreatedreportscomponent implements OnInit {
    public data: any = [];
    public Year: any = [];
    public orgsList: any = {};
    public orgsNames: any = [];
    public yearMonth: any = [];
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

        this.speruserClientscreatedreportsservice.getClientCreationreports(this.appService.user.accountId)
            .subscribe((res) => {
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.data = [];
                    this.yearMonth = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.data.push(this.orgsList[item][i]['count']);
                        this.Year = [this.orgsList[item][i]['year'], this.orgsList[item][i]['month']];
                        this.yearMonth.push(this.Year.join('-'));
                    }
                    this.barChartLabels[item] = this.yearMonth;
                    this.barChartData[item] = [{ data: this.data, label: 'Clients Created' }];
                }
            });
    }
    constructor(public appService: AppService, private speruserClientscreatedreportsservice: speruserclientscreatedreportsservice, private ReportscommonService: ReportsCommonService) { }
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