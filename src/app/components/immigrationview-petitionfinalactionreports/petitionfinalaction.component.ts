import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {petitionfinalactionservice} from "./petitionfinalaction.service";


@Component({
    selector: 'app-petitionfinalaction',
    templateUrl: './petitionfinalaction.component.html',
    styleUrls: ['./petitionfinalaction.component.sass']
})

export class petitionfinalactioncomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = [];
    public orgsNames: any = [];
    public count: any = [];
    public status: any = [];
    ngOnInit() {
        this.petitionFinalactionservice.getfinalstatus(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
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
            });
    }

    constructor(public appService: AppService, private petitionFinalactionservice: petitionfinalactionservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}