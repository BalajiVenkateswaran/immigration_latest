import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {petitionstagesreportsservice} from "./petitionstagesreports.service";


@Component({
    selector: 'app-petitionsages-report',
    templateUrl: './petitionstagesreports.component.html',
    styleUrls: ['./petitionstagesreports.component.sass']
})

export class petitionstagesreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public stages: any = [];
    ngOnInit() {
        this.petitionStagesreportsservice.getpetitonStagereports(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.stages = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.stages.push(this.orgsList[item][i]['stage']);
                    }
                    this.pieChartData[item] = this.count;
                    this.pieChartLabels[item] = this.stages;
                }
            });
    }

    constructor(public appService: AppService, private petitionStagesreportsservice: petitionstagesreportsservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}