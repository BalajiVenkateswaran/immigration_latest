import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {clientstatusreportsservice} from "./clientstatusreports.service";


@Component({
    selector: 'app-petitiontags-report',
    templateUrl: './clientstatusreports.component.html',
    styleUrls: ['./clientstatusreports.component.sass']
})

export class clientstatusreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public Status: any = [];
    ngOnInit() {
        this.clientStatusreportsservice.getclientstatusreports(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
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
            });
    }

    constructor(public appService: AppService, private clientStatusreportsservice: clientstatusreportsservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}